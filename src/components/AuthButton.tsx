import { Pressable, Text, ViewStyle } from 'react-native';

export default function AuthButton({ title, onPress, style }: { title: string; onPress: () => void; style?: ViewStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={[{
        backgroundColor:'#111',
        paddingVertical:14,
        borderRadius:12,
        alignItems:'center',
      }, style]}
    >
      <Text style={{ color:'#fff', fontWeight:'700' }}>{title}</Text>
    </Pressable>
  );
}
