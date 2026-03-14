import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { getBgPaths } from '../utils/backgrounds';
import { getAsset } from '../utils/assetMap';

const BottomPanel = ({ isLobby }) => {
    const { state, dispatch, calculateHeroStats, calculateStatUpgradeCost } = useGame();
    const [activeTab, setActiveTab] = useState('stats');
    const gold = state.gold;
    const currentStats = calculateHeroStats(state.hero);
    const bgPaths = getBgPaths(state.world, state.stage);

    const handleUpgrade = (statKey, cost) => {
        if (gold >= cost) {
            dispatch({ type: 'UPGRADE_STAT', payload: statKey });
        }
    };

    const HERO_STATS_UI = [
        { key: 'atk', name: 'DuckPrincess Damage', text: 'Tap DMG' },
        { key: 'hp', name: 'Duck Life', text: 'Health' },
        { key: 'critDamage', name: 'Duck Power', text: 'Crit DMG' },
        { key: 'def', name: 'Iron Feathers', text: 'Defense' },
        { key: 'goldMultiplier', name: 'Duck Bank', text: 'Gold Bonus' },
    ];

    return (
        <ImageBackground 
            source={getAsset(bgPaths.bottomBg) || getAsset('bg_B.01.D')} 
            style={[styles.container, isLobby && { backgroundColor: '#4a8c9e' }]}
            resizeMode="cover"
        >
            <View style={styles.tabs}>
                {['stats', 'weapon', 'duck'].map(t => (
                    <TouchableOpacity 
                        key={t} 
                        style={[styles.tabBtn, activeTab === t && styles.activeTab]} 
                        onPress={() => setActiveTab(t)}
                    >
                        <Text style={styles.tabText}>{t.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scrollContent}>
                {activeTab === 'stats' && HERO_STATS_UI.map(stat => {
                    const level = state.hero.levels[stat.key];
                    const cost = calculateStatUpgradeCost(stat.key, level);
                    const canAfford = gold >= cost;

                    return (
                        <View key={stat.key} style={styles.upgradeItem}>
                            <View style={styles.upgradeInfo}>
                                <Text style={styles.upgradeName}>{stat.name}</Text>
                                <Text style={styles.upgradeLvl}>LV. {level}</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.buyBtn, !canAfford && styles.disabledBtn]} 
                                onPress={() => handleUpgrade(stat.key, cost)}
                                disabled={!canAfford}
                            >
                                <Text style={styles.costText}>{formatNumber(cost)} 💰</Text>
                                <Text style={styles.lvlUpText}>Level Up</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}

                {activeTab === 'weapon' && (
                    <View style={styles.comingSoon}><Text style={styles.comingText}>Weapons coming soon</Text></View>
                )}

                {activeTab === 'duck' && (
                    <View style={styles.comingSoon}><Text style={styles.comingText}>Companions coming soon</Text></View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.35,
        backgroundColor: '#2A2A2A',
        borderTopWidth: 3,
        borderColor: '#332211',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        padding: 5,
    },
    tabBtn: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#fcd86d',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollContent: {
        flex: 1,
        padding: 10,
    },
    upgradeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#444',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    upgradeInfo: {
        flex: 1,
    },
    upgradeName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    upgradeLvl: {
        color: '#ffcc00',
        fontSize: 12,
    },
    buyBtn: {
        backgroundColor: '#4ade80',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledBtn: {
        backgroundColor: '#666',
    },
    costText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    lvlUpText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
    },
    comingSoon: {
        padding: 20,
        alignItems: 'center',
    },
    comingText: {
        color: '#aaa',
    }
});

export default BottomPanel;
