import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* añade aquí "saved" cuando lo tengas: <Tabs.Screen name="saved" ... /> */}
    </Tabs>
  );
}
