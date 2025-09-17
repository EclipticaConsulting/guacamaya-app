import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplash from "../components/AnimatedSplash";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    (async () => {
      setReady(true);
    })();
  }, []);

  const handleAnimFinish = useCallback(async () => {
    setAnimDone(true);
    try { await SplashScreen.hideAsync(); } catch {}
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Rutas principales */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Pantallas de auth */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>

      {/* Overlay animado encima de todo al inicio */}
      {ready && !animDone && (
        <AnimatedSplash onFinish={handleAnimFinish} background="#FFFFFF" />
      )}
    </View>
  );
}
