import React, { useState, useEffect, useRef } from 'react';
import { 
  Swords, 
  Users, 
  Crown, 
  Coins, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Copy, 
  Check, 
  LogIn, 
  Flame, 
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Radio,
  Trophy,
  KeyRound,
  PlusCircle,
  Hash,
  Dices
} from 'lucide-react';
import { UserProfile, VocabularyItem } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { 
  auth, 
  db, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  getDocs,
  query, 
  where,
  serverTimestamp,
  FirebaseUser
} from '../firebase';
import { ItemGraphic } from './ItemGraphic';
import confetti from 'canvas-confetti';

interface LobbyPlayer {
  uid: string;
  name: string;
  avatar: string;
  costume: string;
  gold: number;
  streakDays: number;
  status: 'available' | 'in_match' | 'offline';
  updatedAt: string;
}

interface DuelQuestion {
  question: string;
  furigana?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

interface ChallengeDoc {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  status: 'pending' | 'accepted' | 'declined' | 'playing' | 'finished';
  roomCode?: string;
  questions: DuelQuestion[];
  currentRound: number;
  scores: Record<string, number>;
  answers: Record<string, Record<number, number>>; // userId -> round -> choiceIndex
  winnerId?: string | null;
  createdAt: any;
}

interface MultiplayerDuelSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentUser: FirebaseUser | null;
  isGuestMode: boolean;
  vocabulary: VocabularyItem[];
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
  onOpenAuth: () => void;
}

export const MultiplayerDuelSection: React.FC<MultiplayerDuelSectionProps> = ({
  user,
  setUser,
  currentUser,
  isGuestMode,
  vocabulary,
  isDarkMode,
  activePreset,
  onAddGold,
  onOpenAuth,
}) => {
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<ChallengeDoc | null>(null);
  const [incomingChallenge, setIncomingChallenge] = useState<ChallengeDoc | null>(null);
  const [outgoingPending, setOutgoingPending] = useState<ChallengeDoc | null>(null);
  const [openRooms, setOpenRooms] = useState<ChallengeDoc[]>([]);
  
  // 3-digit Room codes inputs
  const [createRoomCodeInput, setCreateRoomCodeInput] = useState('');
  const [joinRoomCodeInput, setJoinRoomCodeInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);

  // In-Game state
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [matchEnded, setMatchEnded] = useState(false);

  const activeChallengeRef = useRef<ChallengeDoc | null>(null);
  activeChallengeRef.current = activeChallenge;

  // Helper: Generate Random 3-Digit Code (100 - 999)
  const generateRandom3Digits = () => {
    return String(Math.floor(100 + Math.random() * 900));
  };

  // 1. Publish Current User to Lobby when logged in
  useEffect(() => {
    if (!currentUser || isGuestMode) return;

    const myLobbyRef = doc(db, 'lobby', currentUser.uid);
    const updatePresence = async (status: 'available' | 'in_match') => {
      try {
        await setDoc(myLobbyRef, {
          uid: currentUser.uid,
          name: user.fullName || currentUser.displayName || 'Học viên N3',
          avatar: user.equippedAvatar || 'avatar-tanuki',
          costume: user.equippedCostume || 'costume-school',
          gold: user.gold,
          streakDays: user.streakDays,
          status: status,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.warn('Lobby presence update error:', err);
      }
    };

    updatePresence('available');

    // Heartbeat every 45s
    const heartbeat = setInterval(() => {
      updatePresence(activeChallengeRef.current ? 'in_match' : 'available');
    }, 45000);

    return () => {
      clearInterval(heartbeat);
      deleteDoc(myLobbyRef).catch(() => {});
    };
  }, [currentUser, isGuestMode, user.fullName, user.equippedAvatar, user.equippedCostume, user.gold, user.streakDays]);

  // 2. Listen to Lobby Players in Real-Time
  useEffect(() => {
    if (!currentUser || isGuestMode) return;

    const lobbyCol = collection(db, 'lobby');
    const unsubLobby = onSnapshot(lobbyCol, (snapshot) => {
      const players: LobbyPlayer[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as LobbyPlayer;
        if (data.uid) {
          players.push(data);
        }
      });
      players.sort((a, b) => {
        if (a.uid === currentUser.uid) return -1;
        if (b.uid === currentUser.uid) return 1;
        if (a.status === 'available' && b.status !== 'available') return -1;
        return 0;
      });
      setLobbyPlayers(players);
    }, (err) => {
      console.warn('Lobby listen warning:', err);
    });

    return () => unsubLobby();
  }, [currentUser, isGuestMode]);

  // 3. Listen to Open 3-Digit Rooms in Real-Time
  useEffect(() => {
    if (!currentUser || isGuestMode) return;

    const q = query(
      collection(db, 'challenges'),
      where('status', '==', 'pending')
    );

    const unsubRooms = onSnapshot(q, (snapshot) => {
      const rooms: ChallengeDoc[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as ChallengeDoc;
        if (data.roomCode && data.status === 'pending') {
          rooms.push({ ...data, id: d.id });
        }
      });
      setOpenRooms(rooms);
    }, () => {});

    return () => unsubRooms();
  }, [currentUser, isGuestMode]);

  // 4. Listen to Incoming Challenges in Real-Time
  useEffect(() => {
    if (!currentUser || isGuestMode) return;

    const q = query(
      collection(db, 'challenges'),
      where('receiverId', '==', currentUser.uid),
      where('status', '==', 'pending')
    );

    const unsubIncoming = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data() as ChallengeDoc;
        setIncomingChallenge({ ...docData, id: snapshot.docs[0].id });
      } else {
        setIncomingChallenge(null);
      }
    }, () => {});

    return () => unsubIncoming();
  }, [currentUser, isGuestMode]);

  // 5. Generate 5 authentic N3 Duel Questions from Mimikara Vocab
  const generateDuelQuestions = (): DuelQuestion[] => {
    const list = vocabulary.length >= 10 ? vocabulary : [
      { id: '1', kanji: '約束', hiragana: 'やくそく', meaningVi: 'Lời hứa, hẹn ước' },
      { id: '2', kanji: '準備', hiragana: 'じゅんび', meaningVi: 'Chuẩn bị' },
      { id: '3', kanji: '経験', hiragana: 'けいけん', meaningVi: 'Kinh nghiệm' },
      { id: '4', kanji: '遠慮', hiragana: 'えんりょ', meaningVi: 'Khách khí, ngại ngần' },
      { id: '5', kanji: '確認', hiragana: 'かくにん', meaningVi: 'Xác nhận, kiểm tra lại' },
    ];

    const shuffled = [...list].sort(() => 0.5 - Math.random()).slice(0, 5);
    return shuffled.map((item) => {
      const wrong = list.filter(w => w.id !== item.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      const allChoices = [item.meaningVi, ...wrong.map(w => w.meaningVi)].sort(() => 0.5 - Math.random());
      return {
        question: `Từ "${item.kanji}" (${item.hiragana}) có nghĩa là gì?`,
        furigana: item.hiragana,
        choices: allChoices,
        correctIndex: allChoices.indexOf(item.meaningVi),
        explanation: `${item.kanji} (${item.hiragana}): ${item.meaningVi}`,
      };
    });
  };

  // 6. Create Room by 3-digit Code (Tự tạo phòng bằng số 3 chữ số)
  const handleCreateRoomWithCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const code = createRoomCodeInput.trim();
    if (!/^\d{3}$/.test(code)) {
      alert('Vui lòng nhập đúng mã phòng gồm đúng 3 chữ số (từ 000 đến 999)!');
      return;
    }

    setIsCreatingRoom(true);
    try {
      const existing = openRooms.find(r => r.roomCode === code && r.status === 'pending');
      if (existing) {
        alert(`Mã phòng #${code} hiện đang được sử dụng bởi học viên khác. Vui lòng chọn số khác!`);
        setIsCreatingRoom(false);
        return;
      }

      const challengeId = `room_${code}_${Date.now()}`;
      const questions = generateDuelQuestions();

      const newChallenge: ChallengeDoc = {
        id: challengeId,
        senderId: currentUser.uid,
        senderName: user.fullName || currentUser.displayName || 'Học viên N3',
        senderAvatar: user.equippedAvatar || 'avatar-tanuki',
        receiverId: '', // Open room: anyone who inputs this 3-digit code can join!
        receiverName: 'Đang đợi đối thủ...',
        receiverAvatar: 'avatar-ninja',
        status: 'pending',
        roomCode: code,
        questions,
        currentRound: 0,
        scores: {
          [currentUser.uid]: 0,
        },
        answers: {
          [currentUser.uid]: {},
        },
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'challenges', challengeId), newChallenge);
      setOutgoingPending(newChallenge);

      // Listen for when an opponent joins
      const unsub = onSnapshot(doc(db, 'challenges', challengeId), (snap) => {
        if (snap.exists()) {
          const updated = snap.data() as ChallengeDoc;
          if (updated.status === 'playing') {
            setActiveChallenge(updated);
            setOutgoingPending(null);
            setSelectedChoice(null);
            setTimerSeconds(15);
            setMatchEnded(false);
            unsub();
          } else if (updated.status === 'declined') {
            setOutgoingPending(null);
            unsub();
          }
        }
      });
    } catch (err: any) {
      alert(`Không thể tạo phòng: ${err.message}`);
    } finally {
      setIsCreatingRoom(false);
    }
  };

  // 7. Join Room by 3-digit Code (Chỗ nhập mã phòng 3 số để vô)
  const handleJoinRoomWithCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const code = joinRoomCodeInput.trim();
    if (!/^\d{3}$/.test(code)) {
      alert('Vui lòng nhập đúng mã phòng gồm 3 chữ số (VD: 123, 789, 888)!');
      return;
    }

    setIsJoiningRoom(true);
    try {
      let targetDocId = '';
      let targetDocData: ChallengeDoc | null = null;

      // 1. Check local real-time openRooms first for instant zero-latency match
      const localMatch = openRooms.find(r => r.roomCode === code && r.status === 'pending');
      if (localMatch) {
        targetDocId = localMatch.id;
        targetDocData = localMatch;
      } else {
        // 2. Query Firestore directly with getDocs
        const q = query(
          collection(db, 'challenges'),
          where('roomCode', '==', code),
          where('status', '==', 'pending')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          targetDocId = snap.docs[0].id;
          targetDocData = snap.docs[0].data() as ChallengeDoc;
        }
      }

      if (!targetDocData || !targetDocId) {
        alert(`Không tìm thấy phòng số #${code} hoặc phòng này đã bắt đầu/hết hạn. Vui lòng kiểm tra lại mã số!`);
        setIsJoiningRoom(false);
        return;
      }

      if (targetDocData.senderId === currentUser.uid) {
        alert(`Đây là phòng do chính bạn tạo với mã #${code}. Hãy chia sẻ mã này cho bạn bè cùng vào nhé!`);
        setIsJoiningRoom(false);
        return;
      }

      // Join room and start match!
      await updateDoc(doc(db, 'challenges', targetDocId), {
        receiverId: currentUser.uid,
        receiverName: user.fullName || currentUser.displayName || 'Học viên N3',
        receiverAvatar: user.equippedAvatar || 'avatar-tanuki',
        status: 'playing',
        [`scores.${currentUser.uid}`]: 0,
        [`answers.${currentUser.uid}`]: {},
      });

      setActiveChallenge({
        ...targetDocData,
        id: targetDocId,
        receiverId: currentUser.uid,
        receiverName: user.fullName || currentUser.displayName || 'Học viên N3',
        receiverAvatar: user.equippedAvatar || 'avatar-tanuki',
        status: 'playing',
      });
      setIncomingChallenge(null);
      setSelectedChoice(null);
      setTimerSeconds(15);
      setMatchEnded(false);
      setJoinRoomCodeInput('');
    } catch (err: any) {
      alert(`Lỗi khi vào phòng: ${err.message}`);
    } finally {
      setIsJoiningRoom(false);
    }
  };

  // Direct Join from Open Room item
  const handleDirectJoinRoom = async (room: ChallengeDoc) => {
    if (!currentUser) return;
    if (room.senderId === currentUser.uid) {
      alert(`Đây là phòng của bạn (#${room.roomCode}). Hãy chia sẻ mã cho bạn bè nhé!`);
      return;
    }

    try {
      await updateDoc(doc(db, 'challenges', room.id), {
        receiverId: currentUser.uid,
        receiverName: user.fullName || currentUser.displayName || 'Học viên N3',
        receiverAvatar: user.equippedAvatar || 'avatar-tanuki',
        status: 'playing',
        [`scores.${currentUser.uid}`]: 0,
        [`answers.${currentUser.uid}`]: {},
      });

      setActiveChallenge({
        ...room,
        receiverId: currentUser.uid,
        receiverName: user.fullName || currentUser.displayName || 'Học viên N3',
        receiverAvatar: user.equippedAvatar || 'avatar-tanuki',
        status: 'playing',
      });
      setSelectedChoice(null);
      setTimerSeconds(15);
      setMatchEnded(false);
    } catch (err: any) {
      alert(`Lỗi vào phòng: ${err.message}`);
    }
  };

  // 8. Direct Challenge from Lobby List
  const handleSendChallenge = async (targetPlayer: LobbyPlayer) => {
    if (!currentUser) return;
    if (targetPlayer.uid === currentUser.uid) return;

    const code = generateRandom3Digits();
    const challengeId = `match_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const questions = generateDuelQuestions();

    const newChallenge: ChallengeDoc = {
      id: challengeId,
      senderId: currentUser.uid,
      senderName: user.fullName || currentUser.displayName || 'Học viên N3',
      senderAvatar: user.equippedAvatar || 'avatar-tanuki',
      receiverId: targetPlayer.uid,
      receiverName: targetPlayer.name,
      receiverAvatar: targetPlayer.avatar,
      status: 'pending',
      roomCode: code,
      questions,
      currentRound: 0,
      scores: {
        [currentUser.uid]: 0,
        [targetPlayer.uid]: 0,
      },
      answers: {
        [currentUser.uid]: {},
        [targetPlayer.uid]: {},
      },
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'challenges', challengeId), newChallenge);
      setOutgoingPending(newChallenge);

      const unsub = onSnapshot(doc(db, 'challenges', challengeId), (snap) => {
        if (snap.exists()) {
          const updated = snap.data() as ChallengeDoc;
          if (updated.status === 'playing') {
            setActiveChallenge(updated);
            setOutgoingPending(null);
            setSelectedChoice(null);
            setTimerSeconds(15);
            setMatchEnded(false);
            unsub();
          } else if (updated.status === 'declined') {
            alert(`${targetPlayer.name} hiện đang bận và đã từ chối lời thách đấu.`);
            setOutgoingPending(null);
            unsub();
          }
        }
      });
    } catch (err: any) {
      alert(`Không thể gửi lời thách đấu: ${err.message}`);
    }
  };

  // Accept / Decline Incoming
  const handleAcceptChallenge = async (challenge: ChallengeDoc) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, 'challenges', challenge.id), {
        status: 'playing',
      });
      setActiveChallenge(challenge);
      setIncomingChallenge(null);
      setSelectedChoice(null);
      setTimerSeconds(15);
      setMatchEnded(false);
    } catch (err: any) {
      alert(`Lỗi chấp nhận thách đấu: ${err.message}`);
    }
  };

  const handleDeclineChallenge = async (challenge: ChallengeDoc) => {
    try {
      await updateDoc(doc(db, 'challenges', challenge.id), {
        status: 'declined',
      });
      setIncomingChallenge(null);
    } catch (err) {}
  };

  // Cancel Outgoing / Waiting Room
  const handleCancelOutgoing = async () => {
    if (outgoingPending) {
      try {
        await deleteDoc(doc(db, 'challenges', outgoingPending.id));
      } catch {}
      setOutgoingPending(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 9. Synchronize Active Match Real-Time Updates
  useEffect(() => {
    if (!activeChallenge || !currentUser) return;

    const unsubMatch = onSnapshot(doc(db, 'challenges', activeChallenge.id), (docSnap) => {
      if (docSnap.exists()) {
        const updated = docSnap.data() as ChallengeDoc;
        setActiveChallenge(updated);

        if (updated.status === 'finished' && !matchEnded) {
          setMatchEnded(true);
          const myScore = updated.scores[currentUser.uid] || 0;
          const otherUid = Object.keys(updated.scores).find(k => k !== currentUser.uid);
          const otherScore = otherUid ? (updated.scores[otherUid] || 0) : 0;

          if (myScore > otherScore) {
            onAddGold(50);
            confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          } else {
            onAddGold(15);
          }
        }
      }
    });

    return () => unsubMatch();
  }, [activeChallenge?.id, currentUser?.uid]);

  // 10. Timer for active round
  useEffect(() => {
    if (!activeChallenge || activeChallenge.status !== 'playing' || matchEnded) return;
    if (selectedChoice !== null) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          handleSubmitAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeChallenge?.currentRound, selectedChoice, matchEnded]);

  // Submit Answer
  const handleSubmitAnswer = async (choiceIdx: number) => {
    if (!activeChallenge || !currentUser || selectedChoice !== null) return;

    setSelectedChoice(choiceIdx);
    const round = activeChallenge.currentRound;
    const currentQ = activeChallenge.questions[round];
    const isCorrect = choiceIdx === currentQ.correctIndex;
    const pointsGained = isCorrect ? 1 : 0;

    const myCurrentScore = activeChallenge.scores[currentUser.uid] || 0;
    const newScore = myCurrentScore + pointsGained;

    try {
      const matchDocRef = doc(db, 'challenges', activeChallenge.id);

      await updateDoc(matchDocRef, {
        [`scores.${currentUser.uid}`]: newScore,
        [`answers.${currentUser.uid}.${round}`]: choiceIdx,
      });

      setTimeout(async () => {
        const nextRound = round + 1;
        if (nextRound >= activeChallenge.questions.length) {
          const myFinalScore = newScore;
          const otherUid = Object.keys(activeChallenge.scores).find(k => k !== currentUser.uid);
          const otherScore = otherUid ? (activeChallenge.scores[otherUid] || 0) : 0;

          let winner: string | null = null;
          if (myFinalScore > otherScore) winner = currentUser.uid;
          else if (otherScore > myFinalScore && otherUid) winner = otherUid;

          await updateDoc(matchDocRef, {
            status: 'finished',
            winnerId: winner,
          });
        } else {
          await updateDoc(matchDocRef, {
            currentRound: nextRound,
          });
          setSelectedChoice(null);
          setTimerSeconds(15);
        }
      }, 1500);
    } catch (err) {
      console.warn('Error submitting answer:', err);
    }
  };

  const handleExitMatch = () => {
    setActiveChallenge(null);
    setMatchEnded(false);
    setSelectedChoice(null);
  };

  // =========================================================================
  // GUEST MODE LOCK
  // =========================================================================
  if (isGuestMode || !currentUser) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div 
          className="p-8 rounded-3xl border text-center space-y-4 shadow-lg"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
          }}
        >
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto shadow-md">
            <Swords className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              <ShieldAlert className="w-4 h-4" />
              Yêu Cầu Đăng Nhập Tài Khoản Google
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              Đấu Trường Thách Đấu 1v1 Học Viên N3
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Bạn có thể tự tạo phòng đấu với mã 3 chữ số hoặc nhập mã phòng của bạn bè để cùng thi đấu trực tiếp. Tính năng này yêu cầu đăng nhập tài khoản Google.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenAuth}
              className="px-6 py-3 rounded-2xl font-black text-sm text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
              style={{ backgroundColor: activePreset.primary }}
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng Nhập Bằng Google Để Thách Đấu Ngay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // LIVE 1v1 MATCH ARENA (Đang trong trận đấu)
  // =========================================================================
  if (activeChallenge && (activeChallenge.status === 'playing' || activeChallenge.status === 'finished')) {
    const round = Math.min(activeChallenge.currentRound, activeChallenge.questions.length - 1);
    const q = activeChallenge.questions[round];
    const myScore = activeChallenge.scores[currentUser.uid] || 0;
    const opponentUid = Object.keys(activeChallenge.scores).find(k => k !== currentUser.uid) || 'opponent';
    const opponentScore = activeChallenge.scores[opponentUid] || 0;
    const opponentName = activeChallenge.senderId === currentUser.uid 
      ? activeChallenge.receiverName 
      : activeChallenge.senderName;
    const opponentAvatar = activeChallenge.senderId === currentUser.uid 
      ? activeChallenge.receiverAvatar 
      : activeChallenge.senderAvatar;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
        {/* Match Header Bar: You vs Opponent Real-time Scores */}
        <div 
          className="p-5 rounded-3xl border shadow-md flex items-center justify-between"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
          }}
        >
          {/* Player Left: You */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-1.5 shadow-sm border"
              style={{ backgroundColor: activePreset.badgeBg, borderColor: activePreset.primary }}
            >
              <ItemGraphic itemId={user.equippedAvatar || 'avatar-tanuki'} className="w-9 h-9" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Bạn</span>
              <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 max-w-[120px] truncate">
                {user.fullName}
              </h4>
              <span className="text-base font-black text-emerald-500">{myScore} điểm</span>
            </div>
          </div>

          {/* Center VS Indicator & Timer */}
          <div className="text-center px-3">
            {activeChallenge.roomCode && (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 block mb-1 font-mono">
                Phòng #{activeChallenge.roomCode}
              </span>
            )}
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-500 mb-1">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{timerSeconds}s</span>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-black bg-rose-500 text-white tracking-widest shadow-xs">
              VS
            </div>
            <span className="text-[10px] text-gray-400 block mt-1 font-bold">
              Câu {round + 1} / {activeChallenge.questions.length}
            </span>
          </div>

          {/* Player Right: Opponent */}
          <div className="flex items-center gap-3 text-right flex-row-reverse">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-1.5 shadow-sm border"
              style={{ backgroundColor: '#FEE2E2', borderColor: '#EF4444' }}
            >
              <ItemGraphic itemId={opponentAvatar || 'avatar-ninja'} className="w-9 h-9" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-500 block uppercase">Đối Thủ</span>
              <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 max-w-[120px] truncate">
                {opponentName}
              </h4>
              <span className="text-base font-black text-rose-500">{opponentScore} điểm</span>
            </div>
          </div>
        </div>

        {/* If Match is Finished */}
        {matchEnded ? (
          <div 
            className="p-8 rounded-3xl border text-center space-y-5 shadow-xl animate-in zoom-in-95 duration-200"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
            }}
          >
            <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg bg-amber-100 dark:bg-amber-950/60">
              <Trophy className="w-10 h-10 text-amber-500" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                {myScore > opponentScore ? '🎉 BẠN ĐÃ CHIẾN THẮNG!' : myScore === opponentScore ? '🤝 TRẬN ĐẤU HÒA ĐIỂM!' : '💪 BẠN ĐÃ THUA TRẬN NÀY!'}
              </h3>
              <p className="text-sm text-gray-500 mt-1 font-bold">
                Tỉ số chung cuộc: <span className="text-emerald-500">{myScore}</span> - <span className="text-rose-500">{opponentScore}</span>
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400 font-black text-sm">
              <Coins className="w-5 h-5 fill-amber-400" />
              <span>Phần thưởng: {myScore > opponentScore ? '+50 Vàng' : '+15 Vàng khích lệ'}</span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={handleExitMatch}
                className="px-6 py-3 rounded-2xl font-bold text-xs text-white shadow-md transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: activePreset.primary }}
              >
                Quay Lại Sảnh Đấu
              </button>
            </div>
          </div>
        ) : (
          /* Live Question Card */
          <div 
            className="p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
            }}
          >
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                Câu hỏi số {round + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                {q.question}
              </h3>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {q.choices.map((choice, idx) => {
                const isSelected = selectedChoice === idx;
                const isCorrect = idx === q.correctIndex;
                const showFeedback = selectedChoice !== null;

                let btnBg = isDarkMode ? '#242B36' : '#F8FAFC';
                let btnBorder = isDarkMode ? '#374151' : '#E2E8F0';
                let btnText = isDarkMode ? '#F8FAFC' : '#1E293B';

                if (showFeedback) {
                  if (isCorrect) {
                    btnBg = isDarkMode ? '#064E3B' : '#ECFDF5';
                    btnBorder = '#10B981';
                    btnText = isDarkMode ? '#A7F3D0' : '#047857';
                  } else if (isSelected) {
                    btnBg = isDarkMode ? '#7F1D1D' : '#FEF2F2';
                    btnBorder = '#EF4444';
                    btnText = isDarkMode ? '#FECACA' : '#B91C1C';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedChoice !== null}
                    onClick={() => handleSubmitAnswer(idx)}
                    className="p-4 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-between shadow-2xs disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: btnBg,
                      borderColor: btnBorder,
                      color: btnText,
                    }}
                  >
                    <span>{choice}</span>
                    {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // SẢNH THÁCH ĐẤU LOBBY: TỰ TẠO PHÒNG 3 SỐ + NHẬP MÃ PHÒNG 3 SỐ + HỌC VIÊN ONLINE
  // =========================================================================
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Incoming Challenge Alert Banner */}
      {incomingChallenge && (
        <div className="p-5 rounded-3xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-bounce-in">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-200 dark:bg-rose-900 flex items-center justify-center p-1.5 shadow-sm">
              <ItemGraphic itemId={incomingChallenge.senderAvatar || 'avatar-tanuki'} className="w-9 h-9" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-rose-600 dark:text-rose-400">
                ⚔️ Lời mời thách đấu 1v1 JLPT N3!
              </span>
              <h4 className="text-base font-black text-gray-900 dark:text-gray-100">
                {incomingChallenge.senderName} muốn thách đấu đối kháng cùng bạn!
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleDeclineChallenge(incomingChallenge)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Từ Chối
            </button>
            <button
              onClick={() => handleAcceptChallenge(incomingChallenge)}
              className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Swords className="w-4 h-4" />
              <span>Chấp Nhận Ngay (+50 Vàng)</span>
            </button>
          </div>
        </div>
      )}

      {/* Outgoing / Waiting Room Banner */}
      {outgoingPending && (
        <div 
          className="p-5 rounded-3xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 shadow-md space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 dark:bg-amber-900 flex items-center justify-center font-black text-lg text-amber-800 dark:text-amber-200">
                #{outgoingPending.roomCode}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block">
                  Phòng đấu của bạn đang mở
                </span>
                <h4 className="text-base font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span>Mã phòng:</span>
                  <span className="text-xl font-mono text-amber-600 dark:text-amber-400 font-black">
                    #{outgoingPending.roomCode}
                  </span>
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Đang đợi đối thủ nhập mã <strong>#{outgoingPending.roomCode}</strong> để tự động bắt đầu trận đấu 1v1...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopyCode(outgoingPending.roomCode || '')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Đã sao chép!' : 'Sao chép mã'}</span>
              </button>

              <button
                onClick={handleCancelOutgoing}
                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
              >
                Hủy phòng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Main Section: Introduction Banner */}
      <div 
        className="p-6 rounded-3xl border shadow-xs"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span 
            className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1"
            style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
          >
            <Radio className="w-3 h-3 text-emerald-500 animate-ping" />
            Đấu Trường Trực Tuyến Đa Người Dùng
          </span>
          <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
            ● {lobbyPlayers.length} học viên đang trực tuyến
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
          Thách Đấu 1v1 Đối Kháng N3 Trực Tiếp
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
          Tự tạo phòng thi đấu với <strong>mã 3 chữ số</strong> tùy chọn hoặc nhập mã phòng của bạn bè để cùng tranh tài 5 câu hỏi N3 trắc nghiệm, phân định thắng bại và đoạt Vàng!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2 ACTION CARDS: TỰ TẠO PHÒNG 3 SỐ & NHẬP MÃ PHÒNG 3 SỐ ĐỂ VÔ */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CARD 1: TỰ TẠO PHÒNG BẰNG SỐ (3 CHỮ SỐ) */}
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-4"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: activePreset.primary }}
            >
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                Tự Tạo Phòng Đấu (3 Chữ Số)
              </h3>
              <p className="text-xs text-gray-400">
                Tự đặt số phòng từ 000 đến 999 để bạn bè vào đấu
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateRoomWithCode} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold text-sm">
                  #
                </span>
                <input
                  type="text"
                  maxLength={3}
                  inputMode="numeric"
                  placeholder="Nhập 3 số (VD: 123)"
                  value={createRoomCodeInput}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 3);
                    setCreateRoomCodeInput(clean);
                  }}
                  className="w-full pl-8 pr-3 py-2.5 rounded-2xl border text-sm font-black font-mono tracking-wider outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#3B4758' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              {/* Random 3-digit button */}
              <button
                type="button"
                onClick={() => setCreateRoomCodeInput(generateRandom3Digits())}
                className="px-3 py-2.5 rounded-2xl border text-xs font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1.5 shrink-0 cursor-pointer text-gray-600 dark:text-gray-300"
                style={{ borderColor: isDarkMode ? '#3B4758' : '#CBD5E1' }}
                title="Tạo ngẫu nhiên một mã 3 chữ số"
              >
                <Dices className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">Số ngẫu nhiên</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isCreatingRoom || createRoomCodeInput.length !== 3}
              className="w-full py-3 rounded-2xl font-black text-xs text-white shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: activePreset.primary }}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isCreatingRoom ? 'Đang tạo phòng...' : 'Tạo Phòng Đấu Ngay'}</span>
            </button>
          </form>
        </div>

        {/* CARD 2: CÓ CHỖ NHẬP MÃ PHÒNG ĐỂ VÔ (3 CHỮ SỐ) */}
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-4"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                Nhập Mã Phòng 3 Số Để Vào
              </h3>
              <p className="text-xs text-gray-400">
                Nhập mã phòng do bạn bè chia sẻ để thi đấu ngay
              </p>
            </div>
          </div>

          <form onSubmit={handleJoinRoomWithCode} className="space-y-3">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold text-sm">
                #
              </span>
              <input
                type="text"
                maxLength={3}
                inputMode="numeric"
                placeholder="Nhập mã 3 số (VD: 888)"
                value={joinRoomCodeInput}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setJoinRoomCodeInput(clean);
                }}
                className="w-full pl-8 pr-3 py-2.5 rounded-2xl border text-sm font-black font-mono tracking-wider outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                  borderColor: isDarkMode ? '#3B4758' : '#CBD5E1',
                  color: isDarkMode ? '#F8FAFC' : '#1E293B',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isJoiningRoom || joinRoomCodeInput.length !== 3}
              className="w-full py-3 rounded-2xl font-black text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Swords className="w-4 h-4" />
              <span>{isJoiningRoom ? 'Đang tìm phòng...' : 'Vào Phòng Thi Đấu ⚔️'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DANH SÁCH CÁC PHÒNG 3 SỐ ĐANG CHỜ MỞ (NẾU CÓ) */}
      {/* ========================================================================= */}
      {openRooms.length > 0 && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-4"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-500" />
              <span>Các Phòng 3 Số Đang Chờ Đối Thủ ({openRooms.length})</span>
            </h3>
            <span className="text-xs text-gray-400">Bấm tham gia trực tiếp</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {openRooms.map((room) => {
              const isMyRoom = room.senderId === currentUser.uid;

              return (
                <div
                  key={room.id}
                  className="p-3.5 rounded-2xl border flex items-center justify-between transition-all"
                  style={{
                    backgroundColor: isMyRoom 
                      ? (isDarkMode ? '#2A2B20' : '#FEFCE8')
                      : (isDarkMode ? '#222832' : '#F8FAFC'),
                    borderColor: isMyRoom ? '#EAB308' : (isDarkMode ? '#333D4C' : '#E2E8F0'),
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                      #{room.roomCode}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                        {room.senderName} {isMyRoom && '(Bạn)'}
                      </p>
                      <p className="text-[10px] text-gray-400">Đang chờ 1v1</p>
                    </div>
                  </div>

                  {isMyRoom ? (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950/60 px-2 py-1 rounded-lg">
                      Phòng của bạn
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDirectJoinRoom(room)}
                      className="px-3 py-1.5 rounded-xl text-xs font-black text-white bg-rose-600 hover:bg-rose-700 shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                    >
                      Vào Đấu
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DANH SÁCH HỌC VIÊN ĐANG TRỰC TUYẾN (CÓ THỂ THÁCH ĐẤU TRỰC TIẾP) */}
      {/* ========================================================================= */}
      <div 
        className="p-6 rounded-3xl border shadow-sm space-y-4"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Danh Sách Học Viên Đang Đăng Nhập ({lobbyPlayers.length})</span>
          </h3>
          <span className="text-xs text-gray-400 font-medium">Tự động cập nhật thời gian thực</span>
        </div>

        {lobbyPlayers.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <Users className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-500 font-bold">Chưa có người chơi nào khác đang kết nối.</p>
            <p className="text-[11px] text-gray-400">Bạn có thể tạo phòng 3 số ở trên và gửi mã số cho bạn bè cùng vào thách đấu!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lobbyPlayers.map((player) => {
              const isMe = player.uid === currentUser.uid;
              const isAvailable = player.status === 'available';

              return (
                <div
                  key={player.uid}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isMe 
                      ? 'ring-2 ring-offset-1 border-blue-400' 
                      : 'hover:shadow-xs'
                  }`}
                  style={{
                    backgroundColor: isMe 
                      ? (isDarkMode ? '#252F3D' : activePreset.badgeBg)
                      : (isDarkMode ? '#222832' : '#F8FAFC'),
                    borderColor: isMe ? activePreset.primary : (isDarkMode ? '#333D4C' : '#E8EEF5'),
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center p-1 shadow-xs border shrink-0"
                      style={{ 
                        backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                        borderColor: isMe ? activePreset.primary : (isDarkMode ? '#374151' : '#CBD5E1')
                      }}
                    >
                      <ItemGraphic itemId={player.avatar || 'avatar-tanuki'} className="w-8 h-8" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-gray-900 dark:text-gray-100 truncate">
                          {player.name}
                        </h4>
                        {isMe && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-blue-500 text-white">
                            Bạn
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold mt-0.5">
                        <span className="flex items-center gap-1 text-amber-500">
                          <Coins className="w-3 h-3 fill-amber-400" />
                          {player.gold} Vàng
                        </span>
                        <span className="flex items-center gap-1 text-orange-500">
                          <Flame className="w-3 h-3 fill-orange-500" />
                          {player.streakDays} ngày
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isMe ? (
                      <span className="text-[10px] font-bold text-gray-400">Đang trực tuyến</span>
                    ) : isAvailable ? (
                      <button
                        onClick={() => handleSendChallenge(player)}
                        disabled={outgoingPending !== null}
                        className="px-3.5 py-2 rounded-xl text-xs font-black text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                        style={{ backgroundColor: activePreset.primary }}
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Thách Đấu</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                        Đang trong trận
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
