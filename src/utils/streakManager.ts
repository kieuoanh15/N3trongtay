export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDayDifference = (dateStr1: string, dateStr2: string): number => {
  if (!dateStr1 || !dateStr2) return 0;
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  if (isNaN(y1) || isNaN(y2)) return 0;
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

export interface StreakCheckResult {
  streakDays: number;
  isNewDay: boolean;
  isConsecutive: boolean;
  awardedGold: number;
  todayString: string;
}

/**
 * Calculates updated streak and login bonus on day transition:
 * - First login / new account: streak starts at 1
 * - Same day login: streak stays unchanged
 * - Next day (difference = 1 day): streak increments 1 -> 2 -> 3 -> 4... (+10 login gold)
 * - Missed 1+ days (difference > 1): streak resets back to 1
 */
export const checkAndUpdateStreak = (
  currentStreak: number = 1,
  lastLoginDate?: string
): StreakCheckResult => {
  const todayString = getLocalDateString();
  const safeCurrentStreak = Math.max(1, currentStreak || 1);

  if (!lastLoginDate) {
    return {
      streakDays: 1,
      isNewDay: true,
      isConsecutive: false,
      awardedGold: 10,
      todayString,
    };
  }

  if (lastLoginDate === todayString) {
    return {
      streakDays: safeCurrentStreak,
      isNewDay: false,
      isConsecutive: false,
      awardedGold: 0,
      todayString,
    };
  }

  const diff = getDayDifference(lastLoginDate, todayString);

  if (diff === 1) {
    // Next consecutive day login
    return {
      streakDays: safeCurrentStreak + 1,
      isNewDay: true,
      isConsecutive: true,
      awardedGold: 10,
      todayString,
    };
  } else if (diff > 1) {
    // Missed a day -> reset to 1
    return {
      streakDays: 1,
      isNewDay: true,
      isConsecutive: false,
      awardedGold: 10,
      todayString,
    };
  } else {
    // Clock anomaly or same day
    return {
      streakDays: safeCurrentStreak,
      isNewDay: false,
      isConsecutive: false,
      awardedGold: 0,
      todayString,
    };
  }
};
