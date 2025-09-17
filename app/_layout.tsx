// app/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import AnimatedSplash from "../components/AnimatedSplash";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    (async () => {
      // Precargas opcionales (fonts/assets) aquí…
      setReady(true);
    })();
  }, []);

  const handleAnimFinish = useCallback(() => {
    setAnimDone(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#171717" }}>
      <StatusBar style="light" backgroundColor="#171717" />
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </SafeAreaProvider>

      {ready && !animDone && (
        <AnimatedSplash
          onFinish={handleAnimFinish}
          bg="#171717"
          logo={require("../assets/guacamaya-logo.png")}
        />
      )}
    </View>
  );
}
