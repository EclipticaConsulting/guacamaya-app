// src/components/AnimatedSplash.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

type Props = {
  onFinish?: () => void;  
  fadeInMs?: number;      
  holdMs?: number;       
};

export default function AnimatedSplash({
  onFinish,
  fadeInMs = 600,
  holdMs = 400,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeInMs,
      useNativeDriver: true,
    }).start(async () => {
      setTimeout(async () => {
        try { await SplashScreen.hideAsync(); } catch {}
        onFinish?.();
      }, holdMs);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Image
          source={require('../../assets/guacamaya-logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',       // fondo negro
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
});
