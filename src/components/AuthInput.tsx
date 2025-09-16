import { TextInput, View, Text } from 'react-native';

export default function AuthInput({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color:'#444', fontSize:13, marginBottom:6 }}>{label}</Text>
      <TextInput
        placeholderTextColor="#9aa"
        style={{
          backgroundColor:'#F7F7F9',
          borderWidth:1, borderColor:'#E7E8EE',
          borderRadius:12, paddingHorizontal:14, paddingVertical:12,
          fontSize:15, color:'#111'
        }}
        {...props}
      />
    </View>
  );
}
