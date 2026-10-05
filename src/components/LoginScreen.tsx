import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Sparkles, 
  Flame, 
  Coins, 
  BookOpen, 
  UserCheck, 
  Lock, 
  ArrowRight,
  Mail,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile 
} from '../firebase';
import { ThemePreset } from '../utils/themePresets';

interface LoginScreenProps {
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onGuestLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  isDarkMode,
  activePreset,
  onGuestLogin,
}) => {
  const [authTab, setAuthTab] = useState<'google' | 'email'>('google');
  const [emailMode, setEmailMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Sign In With Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.warn('Popup sign in failed, attempting redirect or fallback:', err);
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          setErrorMessage('Trình duyệt đang chặn cửa sổ Popup. Vui lòng cho phép popup hoặc đăng nhập bằng Email bên dưới.');
        }
      } else {
        setErrorMessage(err.message || 'Không thể đăng nhập bằng tài khoản Google. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Sign In or Register with Email / Password
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (emailMode === 'register') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName.trim() && userCred.user) {
          await updateProfile(userCred.user, {
            displayName: displayName.trim(),
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMessage('Email hoặc mật khẩu không chính xác.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng Nhập.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('Mật khẩu cần ít nhất 6 ký tự.');
      } else {
        setErrorMessage(err.message || 'Lỗi xác thực. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-sans transition-colors duration-200"
      style={{
        backgroundColor: isDarkMode ? '#13171D' : '#F4F7FB',
        color: isDarkMode ? '#F8FAFC' : '#1E293B',
      }}
    >
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-sm"
            style={{ backgroundColor: activePreset.primary }}
          >
            N3
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight block">
              N3 trong tay
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Lộ trình 90 ngày đỗ JLPT N3
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="hidden sm:inline">Bảo vệ quyền riêng tư 100%</span>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md mx-auto w-full my-6 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        <div 
          className="p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
          }}
        >
          {/* Header Title */}
          <div className="text-center space-y-2">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-1"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Đăng Nhập Học Viên
            </div>
            <h2 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight">
              Bắt Đầu Hành Trình JLPT N3
            </h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Mỗi học viên có một kho dữ liệu học tập riêng biệt, đồng bộ xuyên suốt giữa điện thoại và máy tính.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Login Options Tab */}
          <div className="flex rounded-xl p-1 bg-gray-100 dark:bg-gray-800 text-xs font-bold">
            <button
              onClick={() => { setAuthTab('google'); setErrorMessage(null); }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authTab === 'google' 
                  ? 'bg-white dark:bg-gray-700 shadow-xs text-gray-900 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Tài Khoản Google
            </button>
            <button
              onClick={() => { setAuthTab('email'); setErrorMessage(null); }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authTab === 'email' 
                  ? 'bg-white dark:bg-gray-700 shadow-xs text-gray-900 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Email & Mật Khẩu
            </button>
          </div>

          {/* 1. Google Login Tab */}
          {authTab === 'google' && (
            <div className="space-y-4">
              <button
                id="btn-google-signin"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-xs disabled:opacity-60"
                style={{
                  backgroundColor: isDarkMode ? '#28313E' : '#FFFFFF',
                  borderColor: isDarkMode ? '#3F4D5F' : '#CBD5E1',
                  color: isDarkMode ? '#F8FAFC' : '#1E293B',
                }}
              >
                {/* Official Google Icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.31 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <span>{isLoading ? 'Đang kết nối Google...' : 'Đăng nhập với tài khoản Google'}</span>
              </button>

              <div className="p-3.5 rounded-2xl border space-y-2 text-xs"
                style={{
                  backgroundColor: isDarkMode ? '#232A33' : '#F8FAFC',
                  borderColor: isDarkMode ? '#333E4D' : '#E8EEF5',
                }}
              >
                <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Quyền lợi tài khoản Google của bạn:</span>
                </div>
                <ul className="text-gray-500 dark:text-gray-400 space-y-1.5 pl-6 list-disc text-[11px] leading-relaxed">
                  <li>Tự động lấy tên hiển thị theo tài khoản Google và có thể tự đổi tên bất kỳ lúc nào.</li>
                  <li>Lưu trữ bảo mật riêng biệt: Từ vựng tự thêm, điểm số thi thử, chuỗi ngày học và số Vàng.</li>
                  <li>Mở ứng dụng trên điện thoại hay máy tính đều tự động đồng bộ tức thì.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. Email / Password Tab */}
          {authTab === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              <div className="flex justify-center gap-4 text-xs font-bold pb-1">
                <button
                  type="button"
                  onClick={() => setEmailMode('login')}
                  className={`pb-1 border-b-2 transition-all cursor-pointer ${
                    emailMode === 'login' 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-400'
                  }`}
                >
                  Đăng Nhập Có Sẵn
                </button>
                <button
                  type="button"
                  onClick={() => setEmailMode('register')}
                  className={`pb-1 border-b-2 transition-all cursor-pointer ${
                    emailMode === 'register' 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-400'
                  }`}
                >
                  Đăng Ký Tài Khoản Mới
                </button>
              </div>

              {emailMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Họ và tên của bạn
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn An"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#242B36' : '#FFFFFF',
                      borderColor: isDarkMode ? '#3B4758' : '#CBD5E1',
                    }}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#242B36' : '#FFFFFF',
                      borderColor: isDarkMode ? '#3B4758' : '#CBD5E1',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="Tối thiểu 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#242B36' : '#FFFFFF',
                      borderColor: isDarkMode ? '#3B4758' : '#CBD5E1',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                style={{ backgroundColor: activePreset.primary }}
              >
                {isLoading 
                  ? 'Đang xử lý...' 
                  : (emailMode === 'register' ? 'Tạo Tài Khoản & Bắt Đầu Học' : 'Đăng Nhập')}
              </button>
            </form>
          )}

          {/* Quick Trial / Guest Fallback Option */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-center">
            <button
              onClick={onGuestLogin}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <span>Vào học thử nghiệm (Chế độ Khách)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Feature Badges (Cross-device & Privacy) */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div 
          className="p-3 rounded-2xl border flex items-center gap-3 text-left"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Dùng Tốt Trên Điện Thoại</h4>
            <p className="text-[11px] text-gray-400">Giao diện cảm ứng tối ưu cho iOS và Android</p>
          </div>
        </div>

        <div 
          className="p-3 rounded-2xl border flex items-center gap-3 text-left"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Đồng Bộ Máy Tính & Điện Thoại</h4>
            <p className="text-[11px] text-gray-400">Học mọi lúc mọi nơi không lo mất tiến độ</p>
          </div>
        </div>

        <div 
          className="p-3 rounded-2xl border flex items-center gap-3 text-left"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Bảo Vệ Quyền Riêng Tư</h4>
            <p className="text-[11px] text-gray-400">Dữ liệu cá nhân chỉ mình bạn truy cập</p>
          </div>
        </div>
      </div>
    </div>
  );
};
