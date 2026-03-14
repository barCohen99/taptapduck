import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import { WORLD_CONFIG } from '../data/gameData';
import MenuModal from './MenuModal';
import { ACHIEVEMENTS_CONFIG, getAchievementTarget, getAchievementReward, DAILY_QUESTS_CONFIG } from '../data/achievementsData';
import { formatNumber } from '../utils/formatters';

const TopBar = () => {
    const { state, dispatch, calculateHeroStats } = useGame();
    const { gold, stage, monster } = state;
    const [activeModal, setActiveModal] = useState(null);

    const handleOpenModal = (type) => {
        setActiveModal(type);
        dispatch({ type: 'SET_PAUSE', payload: true });
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        dispatch({ type: 'SET_PAUSE', payload: false });
    };

    const maxHeroHp = calculateHeroStats(state.hero).hp;
    const worldCfg = WORLD_CONFIG.find(w => w.world === state.world);
    const maxMonsters = worldCfg ? worldCfg.monstersPerStage : 10;
    const totalStages = worldCfg ? worldCfg.stages : 1;

    const UnifiedHPBar = ({ label, current, max, isHero }) => {
        const percent = Math.max(0, (current / max) * 100);
        return (
            <View style={styles.hpBarContainer}>
                <View style={[styles.hpBarFill, { width: `${percent}%`, backgroundColor: isHero ? '#4ade80' : '#ef4444' }]} />
                <Text style={styles.hpBarText}>{label}  {formatNumber(current)}/{formatNumber(max)}</Text>
            </View>
        );
    };

    return (
        <View style={styles.topBar}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => handleOpenModal('SETTINGS')}>
                    <Text style={styles.iconPlaceholder}>⚙️</Text>
                </TouchableOpacity>

                <Text style={styles.stageText}>STAGE {stage}/{totalStages}</Text>

                <TouchableOpacity style={styles.bossProgress} onPress={() => handleOpenModal('ACHIEVEMENTS')}>
                     <Text style={styles.iconPlaceholder}>💀</Text>
                     <Text style={styles.monsterCountText}>{monster.monsterCount + 1}/{maxMonsters}</Text>
                </TouchableOpacity>
            </View>

            {/* HP Bars */}
            <View style={styles.barsStack}>
                <UnifiedHPBar label="DuckPrincess" current={state.hero.hp} max={maxHeroHp} isHero />
                <UnifiedHPBar label={monster.type || 'Duck'} current={monster.currentHp} max={monster.maxHp} />
            </View>

            {/* Coins */}
            <View style={styles.coinDisplay}>
                <Text style={styles.coinText}>{formatNumber(gold)}</Text>
                <Text style={styles.iconPlaceholder}> 💰</Text>
            </View>

            {/* Modals */}
            <MenuModal isOpen={activeModal === 'SETTINGS'} onClose={handleCloseModal} title="SETTINGS">
                <TouchableOpacity style={styles.exitBtn} onPress={() => { handleCloseModal(); dispatch({ type: 'EXIT_GAME' }); }}>
                    <Text style={styles.exitBtnText}>EXIT GAME</Text>
                </TouchableOpacity>
            </MenuModal>

            <MenuModal isOpen={activeModal === 'ACHIEVEMENTS'} onClose={handleCloseModal} title="ACHIEVEMENTS">
                <ScrollView style={{maxHeight: 400}}>
                    {DAILY_QUESTS_CONFIG.map(q => (
                        <View key={q.id} style={styles.achieveItem}>
                            <Text style={styles.achieveTitle}>{q.name}</Text>
                            <Text>{q.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </MenuModal>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        padding: 10,
        paddingTop: 40, 
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    stageText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    bossProgress: {
        alignItems: 'center',
    },
    monsterCountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    iconPlaceholder: {
        fontSize: 24,
    },
    barsStack: {
        gap: 5,
        alignItems: 'center',
    },
    hpBarContainer: {
        width: '90%',
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 5,
    },
    hpBarFill: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
    },
    hpBarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    coinDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    coinText: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    exitBtn: {
        backgroundColor: '#ef4444',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    exitBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    achieveItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    achieveTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default TopBar;
