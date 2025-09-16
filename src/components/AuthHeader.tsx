import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthHeader() {
  return (
    <View style={{ height: 180, backgroundColor: '#0c0c0c', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' }}>
      <LinearGradient
        colors={['#0c0c0c', '#151515']}
        style={{ position:'absolute', left:0, right:0, top:0, bottom:0 }}
      />
      {/* Bloques decorativos simples */}
      <View style={{ position:'absolute', right:-30, top:20, width:140, height:140, borderRadius:32, backgroundColor:'#111' }}/>
      <View style={{ position:'absolute', left:-20, bottom:-20, width:120, height:120, borderRadius:24, backgroundColor:'#111' }}/>
      <View style={{ position:'absolute', left:40, top:40, width:28, height:28, borderRadius:8, backgroundColor:'#191919' }}/>
      <View style={{ position:'absolute', left:80, top:70, width:18, height:18, borderRadius:6, backgroundColor:'#202020' }}/>
    </View>
  );
}
