import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, Animated, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/formatters';
import { getAsset } from '../utils/assetMap';

const Stage = () => {
    const { state, clickMonster, calculateHeroStats } = useGame();
    const { monster } = state;
    const [clickEffects, setClickEffects] = useState([]);
    const [duckType, setDuckType] = useState('N');
    const shakeAnim = useRef(new Animated.Value(0)).current;

    const handlePress = (evt) => {
        if (state.isGameOver) return;
        clickMonster();

        const stats = calculateHeroStats(state.hero);
        let damage = stats.atk;
        const isCrit = Math.random() < stats.critRate;
        if (isCrit) damage *= stats.critDamage;

        // Shake animation for duck
        setDuckType('H');
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
        ]).start(() => setDuckType('N'));

        const id = Date.now() + Math.random();
        const { locationX, locationY } = evt.nativeEvent;

        setClickEffects(prev => [...prev, { id, x: locationX, y: locationY, damage, isCrit }]);

        setTimeout(() => {
            setClickEffects(prev => prev.filter(eff => eff.id !== id));
        }, 500); 
    };

    const wIdNum = parseInt(state.world) || 1;
    const wId = wIdNum < 10 ? `0${wIdNum}` : wIdNum;
    const mId = monster.imageId || "01";
    
    // Attempt multiple fallbacks if the specific duck size/type doesn't match
    const assetKey = `duck_D.${wId}.${mId}.${duckType}`;
    const fallbackAssetKey = `duck_D.${wId}.01.${duckType}`;
    const ultimateFallbackKey = `duck_D.01.01.N`;
    
    const duckImage = getAsset(assetKey) || getAsset(fallbackAssetKey) || getAsset(ultimateFallbackKey);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.stageArea}>
                    <Animated.Image 
                        source={duckImage} 
                        style={[styles.duck, { transform: [{ translateX: shakeAnim }] }]} 
                        resizeMode="contain" 
                    />
                    <Image source={getAsset('hero_hero')} style={styles.hero} resizeMode="contain" />
                </View>

                {clickEffects.map(effect => (
                    <DamageText key={effect.id} effect={effect} />
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
};

const DamageText = ({ effect }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(moveAnim, { toValue: -50, duration: 500, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true })
        ]).start();
    }, []);

    return (
        <Animated.Text style={[styles.damageText, effect.isCrit && styles.critText, { 
            left: effect.x - 20, 
            top: effect.y - 20,
            opacity: fadeAnim,
            transform: [{ translateY: moveAnim }]
        }]}>
            {formatNumber(effect.damage)}
        </Animated.Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    stageArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    duck: {
        width: 200,
        height: 200,
    },
    hero: {
        width: 120,
        height: 120,
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    damageText: {
        position: 'absolute',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    critText: {
        color: '#ffcc00',
        fontSize: 32,
    }
});

export default Stage;
