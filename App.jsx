import React from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, View } from 'react-native';
import { GameProvider, useGame } from './context/GameContext';
import TopBar from './components/TopBar';
import Stage from './components/Stage';
import BottomPanel from './components/BottomPanel';
import Lobby from './components/Lobby';
import LoseScreen from './components/LoseScreen';
import UnlocksPopup from './components/UnlocksPopup';
import { getBgPaths } from './utils/backgrounds';
import { getAsset } from './utils/assetMap';

const GameContainer = () => {
    const { state } = useGame();
    const bgPaths = getBgPaths(state.world, state.stage);

    return (
        <SafeAreaView style={styles.appContainer}>
            {state.gameState === 'LOBBY' ? (
                <Lobby />
            ) : (
                <>
                    <ImageBackground 
                        source={getAsset(bgPaths.topBg) || getAsset('bg_B.01.U.01')} 
                        style={styles.topSectionWrapper}
                        resizeMode="cover"
                    >
                        <TopBar />
                        <Stage />
                    </ImageBackground>
                    <BottomPanel />
                    <LoseScreen />
                </>
            )}
            <UnlocksPopup />
        </SafeAreaView>
    );
};

export default function App() {
    return (
        <GameProvider>
            <GameContainer />
        </GameProvider>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#1E1E1E', 
    },
    topSectionWrapper: {
        flex: 0.65, 
        width: '100%',
    }
});
