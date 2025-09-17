// components/AnimatedSplash.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ImageSourcePropType } from "react-native";
import * as SplashScreen from "expo-splash-screen";

type Props = {
  onFinish?: () => void;
  bg?: string;
  logo: ImageSourcePropType;     // <- ahora es requerido
  fadeInMs?: number;
  holdMs?: number;
  fadeOutMs?: number;
};

export default function AnimatedSplash({
  onFinish,
  bg = "#171717",
  logo,
  fadeInMs = 450,
  holdMs = 350,
  fadeOutMs = 300,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;
    SplashScreen.hideAsync().catch(() => {});

    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: fadeInMs, useNativeDriver: true }),
      Animated.delay(holdMs),
      Animated.timing(opacity, { toValue: 0, duration: fadeOutMs, useNativeDriver: true }),
    ]).start(() => {
      if (!mounted) return;
      onFinish?.();
    });

    return () => { mounted = false; };
  }, []);

  return (
    <View style={[styles.overlay, { backgroundColor: bg }]}>
      <Animated.Image source={logo} resizeMode="contain" style={[styles.logo, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0, right: 0, top: 0, bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 160, height: 160 },
});
