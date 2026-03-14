import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
    gameState: 'LOBBY', // 'LOBBY', 'PLAYING'
    isGameOver: false,
    isPaused: false,
    world: 1,
    stage: 1,
    selectedWorld: 1,
    unlockedWorlds: 1,
    gold: 0,
    hero: {
        hp: 100, // Current HP
        levels: { atk: 1, hp: 1, critDamage: 1, def: 1, goldMultiplier: 1 },
        equippedWeapon: 1,
        weaponLevels: { 1: 1 },
        companions: {},
        activeCompanions: []
    },
    monster: {
        currentHp: 10,
        maxHp: 10,
        isDead: false,
        imageId: "01",
        type: "Normal", // "Normal", "Stage Boss", "Half-World Boss", "World Boss"
        monsterCount: 0,
        isFrozen: false
    },
    dailyQuests: {
        daily_tapper: { claimed: false },
        field_patrol: { claimed: false },
    },
    achievements: {
        duck_hunter: { level: 1 },
        boss_slayer: { level: 1 },
    },
    stats: {
        daily: { taps: 0, monsters: 0, bosses: 0, upgrades: 0, login: 0 },
        monstersKilled: 0,
        bossesKilled: 0,
        worldsCompleted: 0,
        totalTaps: 0,
        totalUpgrades: 0,
        maxStatLevel: 1,
        criticalHits: 0,
        totalGoldEarned: 0,
        hatchedEggs: 0,
        uniqueMonsters: [],
        maxTPS: 0
    }
};

const getBossType = (count, stage) => {
    if (count === 9 && stage === 10) return 'World Boss';
    if (count === 9) return 'Stage Boss'; // Previous default was 'World Boss' but now that is tied to Stage 10
    if (count === 4) return 'Half-Stage Boss'; // Previously 'Half-World Boss'
    return count % 2 === 1 ? 'Mini Boss' : 'Normal';
};

const getMonsterMaxHp = (world, stage, count) => {
    let hp = 10 * Math.pow(1.5, world - 1) * Math.pow(1.1, stage - 1) * Math.pow(1.05, count);
    const type = getBossType(count);
    if (type === 'World Boss') hp *= 5;
    if (type === 'Half-World Boss') hp *= 3;
    if (type === 'Stage Boss') hp *= 2;
    return Math.floor(hp);
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAUSE':
            return { ...state, isPaused: action.payload };
        case 'START_GAME': {
            const initialCount = 0;
            const initialStage = 1;
            const wId = state.selectedWorld;
            const type = getBossType(initialCount, initialStage);
            
            return { 
                ...state, 
                gameState: 'PLAYING', 
                isGameOver: false, 
                world: wId, 
                stage: initialStage, 
                monster: { 
                    ...state.monster, 
                    monsterCount: initialCount, 
                    currentHp: getMonsterMaxHp(wId, initialStage, initialCount), 
                    maxHp: getMonsterMaxHp(wId, initialStage, initialCount), 
                    type: type, 
                    isDead: false, 
                    imageId: type === 'World Boss' ? "B" : "01" 
                } 
            };
        }
        case 'SELECT_WORLD':
            return { ...state, selectedWorld: action.payload };
        case 'EXIT_GAME':
            return { ...state, gameState: 'LOBBY' };
        case 'UPGRADE_STAT': {
            const level = state.hero.levels[action.payload];
            const cost = Math.floor(10 * Math.pow(1.2, level));
            if (state.gold < cost) return state;
            return {
                ...state,
                gold: state.gold - cost,
                hero: {
                    ...state.hero,
                    levels: { ...state.hero.levels, [action.payload]: level + 1 }
                }
            };
        }
        case 'UPGRADE_WEAPON': {
            const level = state.hero.weaponLevels[action.payload] || 0;
            const cost = Math.floor(100 * Math.pow(1.3, level));
            if (state.gold < cost) return state;
            return {
                ...state,
                gold: state.gold - cost,
                hero: { ...state.hero, weaponLevels: { ...state.hero.weaponLevels, [action.payload]: level + 1 } }
            };
        }
        case 'EQUIP_WEAPON':
            return { ...state, hero: { ...state.hero, equippedWeapon: action.payload } };
        case 'DAMAGE_MONSTER': {
            if (state.monster.isDead || state.isPaused) return state;
            const damage = action.payload;
            const newHp = state.monster.currentHp - damage;
            if (newHp <= 0) {
                // Monster died
                const newGold = state.gold + Math.floor(state.monster.maxHp * 0.1);
                let newCount = state.monster.monsterCount + 1;
                let newStage = state.stage;
                let newWorld = state.world;

                if (newCount >= 10) {
                    newCount = 0;
                    if (newStage === 10) {
                        // World Boss Defeated
                        return {
                            ...state,
                            gold: newGold,
                            gameState: 'LOBBY',
                            unlockedWorlds: Math.max(state.unlockedWorlds, state.world + 1),
                            isGameOver: true,
                            monster: { ...state.monster, isDead: true }
                        };
                    } else {
                        newStage++;
                    }
                }

                const newType = getBossType(newCount, newStage);
                let newImageId = (newCount + 1).toString().padStart(2, '0');
                if (newType === 'World Boss') {
                    newImageId = "B";
                }

                return {
                    ...state,
                    gold: newGold,
                    world: newWorld,
                    stage: newStage,
                    unlockedWorlds: Math.max(state.unlockedWorlds, newWorld),
                    monster: {
                        ...state.monster,
                        monsterCount: newCount,
                        maxHp: getMonsterMaxHp(newWorld, newStage, newCount),
                        currentHp: getMonsterMaxHp(newWorld, newStage, newCount),
                        type: newType,
                        imageId: newImageId,
                        isDead: false
                    }
                };
            }
            return { ...state, monster: { ...state.monster, currentHp: newHp } };
        }
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const calculateHeroStats = (hero) => {
        return {
            atk: 10 + (hero.levels.atk * 2),
            hp: 100 + (hero.levels.hp * 20),
            critDamage: 1.5 + (hero.levels.critDamage * 0.1),
            critRate: 0.1,
            def: hero.levels.def * 2,
            goldMultiplier: 1 + (hero.levels.goldMultiplier * 0.05)
        };
    };

    const calculateStatUpgradeCost = (key, level) => Math.floor(10 * Math.pow(1.2, level));
    const calculateWeaponUpgradeCost = (id, level) => Math.floor(100 * Math.pow(1.3, level));
    const calculateFriendUpgradeCost = (id, level) => Math.floor(50 * Math.pow(1.15, level));

    const clickMonster = () => {
        const stats = calculateHeroStats(state.hero);
        let damage = stats.atk;
        if (Math.random() < stats.critRate) damage *= stats.critDamage;
        dispatch({ type: 'DAMAGE_MONSTER', payload: damage });
    };

    return (
        <GameContext.Provider value={{
            state,
            dispatch,
            calculateHeroStats,
            calculateStatUpgradeCost,
            calculateWeaponUpgradeCost,
            calculateFriendUpgradeCost,
            clickMonster
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
