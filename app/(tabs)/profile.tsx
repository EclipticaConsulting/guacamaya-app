// app/(tabs)/profile.tsx
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12 }}>
        Perfil
      </Text>
      <Text style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
        Aquí irá la información del usuario (nombre, correo, artículos guardados, etc.)
      </Text>

      <Pressable
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#6366F1",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Ir a Login</Text>
      </Pressable>
    </View>
  );
}
