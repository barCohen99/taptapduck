export const DAILY_QUESTS_CONFIG = [
    { id: 'daily_tapper', name: 'Tapper', description: 'Tap 500 times', target: 500, reward: 100, icon: 'A.ACHIVMENT.svg' },
    { id: 'field_patrol', name: 'Patrol', description: 'Kill 50 monsters', target: 50, reward: 200, icon: 'A.ACHIVMENT.svg' },
];

export const ACHIEVEMENTS_CONFIG = [
    { id: 'duck_hunter', name: 'Duck Hunter', description: 'Kill ducks', type: 'LINEAR', icon: 'A.ACHIVMENT.svg' },
    { id: 'boss_slayer', name: 'Boss Slayer', description: 'Kill bosses', type: 'LINEAR', icon: 'A.ACHIVMENT.svg' },
];

export const getAchievementTarget = (ach, level) => {
    return Math.pow(10, level) * 10;
};

export const getAchievementReward = (ach, level) => {
    return level * 100;
};
