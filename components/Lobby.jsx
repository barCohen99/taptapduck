import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import BottomPanel from './BottomPanel';

const Lobby = () => {
    const { state, dispatch } = useGame();
    const [activeTab, setActiveTab] = useState('play');

    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.goldText}>💰 {state.gold}</Text>
                <Text style={styles.worldLockText}>World {state.unlockedWorlds} Unlocked</Text>
            </View>

            <View style={styles.main}>
                {activeTab === 'play' && (
                    <ScrollView contentContainerStyle={styles.playTab}>
                        <Text style={styles.title}>Welcome to Tap Duck!</Text>
                        <TouchableOpacity 
                            style={styles.startBtn} 
                            onPress={() => dispatch({ type: 'START_GAME' })}
                        >
                            <Text style={styles.startText}>ENTER WORLD {state.selectedWorld}</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.spacer} />

                        {Array.from({ length: 10 }).map((_, i) => {
                            const worldNum = i + 1;
                            const isUnlocked = worldNum <= state.unlockedWorlds;
                            return (
                                <TouchableOpacity 
                                    key={`world-${worldNum}`}
                                    style={[styles.worldBtn, state.selectedWorld === worldNum && styles.worldBtnSelected, !isUnlocked && styles.worldBtnLocked]}
                                    onPress={() => isUnlocked && dispatch({ type: 'SELECT_WORLD', payload: worldNum })}
                                    disabled={!isUnlocked}
                                >
                                    <Text style={styles.worldBtnText}>
                                        {isUnlocked ? `Select World ${worldNum}` : `World ${worldNum} (Locked)`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                )}
                {activeTab === 'upgrades' && (
                    <View style={styles.upgradesTab}>
                        <BottomPanel isLobby={true} />
                    </View>
                )}
            </View>

            <View style={styles.nav}>
                {['upgrades', 'play', 'special'].map(tab => (
                    <TouchableOpacity 
                        key={tab}
                        style={[styles.navBtn, activeTab === tab && styles.navBtnActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={styles.navBtnText}>{tab.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1C1E',
    },
    topbar: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
    },
    goldText: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    playTab: {
        alignItems: 'center',
        padding: 20
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    spacer: {
        height: 20,
    },
    worldLockText: {
        color: '#ccc',
        marginTop: 5,
        fontSize: 14,
    },
    worldBtn: {
        backgroundColor: '#444',
        padding: 15,
        marginVertical: 5,
        width: 250,
        borderRadius: 10,
        alignItems: 'center',
    },
    worldBtnSelected: {
        backgroundColor: '#4ade80',
        borderColor: '#fff',
        borderWidth: 2,
    },
    worldBtnLocked: {
        backgroundColor: '#222',
    },
    worldBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    startBtn: {
        backgroundColor: '#4ade80',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    startText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    upgradesTab: {
        flex: 1,
    },
    nav: {
        flexDirection: 'row',
        backgroundColor: '#2A2A2A',
        paddingBottom: 20,
        paddingTop: 10,
    },
    navBtn: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    navBtnActive: {
        borderTopWidth: 3,
        borderColor: '#fcd86d',
    },
    navBtnText: {
        color: '#ccc',
        fontWeight: 'bold',
    }
});

export default Lobby;
