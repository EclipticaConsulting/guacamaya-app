import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AuthButton from '../components/AuthButton';
import { getUser, signOut } from '../lib/auth';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => { getUser().then(setUser); }, []);

  if (!user) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:20 }}>
        <Text style={{ fontSize:22, fontWeight:'800', marginBottom:12 }}>Perfil</Text>
        <Text style={{ color:'#666', marginBottom:16 }}>No has iniciado sesión</Text>
        <AuthButton title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:'800', marginBottom:8 }}>Hola, {user.name}</Text>
      <Text style={{ color:'#666', marginBottom:16 }}>{user.email}</Text>
      <AuthButton title="Cerrar sesión" onPress={async () => { await signOut(); navigation.replace('Profile'); }} />
    </View>
  );
}
