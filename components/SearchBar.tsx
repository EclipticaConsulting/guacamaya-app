import { TextInput, View } from "react-native";

export default function SearchBar({ value, onChange }: { value: string; onChange: (s: string) => void; }) {
  return (
    <View style={{ padding: 12 }}>
      <TextInput
        placeholder="Buscar..."
        value={value}
        onChangeText={onChange}
        style={{ backgroundColor: "#f5f5f5", padding: 12, borderRadius: 12 }}
      />
    </View>
  );
}
