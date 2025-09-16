import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import AuthHeader from '../components/AuthHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { signIn } from '../lib/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // demo, no se valida

  const handleLogin = async () => {
    if (!email) { Alert.alert('Falta correo'); return; }
    await signIn({ email });
    navigation.replace('Profile'); // vuelve a Profile ya logueado
  };

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'#fff' }} behavior={Platform.select({ ios:'padding', android:undefined })}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <AuthHeader />
        <View style={{ marginTop:-32, paddingHorizontal:20 }}>
          <View style={{ backgroundColor:'#fff', borderRadius:20, padding:20, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:16, elevation:2 }}>
            <Text style={{ fontSize:22, fontWeight:'800', color:'#111', marginBottom:12 }}>Login</Text>
            <AuthInput label="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <AuthInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <AuthButton title="Login" onPress={handleLogin} />
            <Pressable onPress={() => navigation.navigate('SignUp')} style={{ alignSelf:'center', marginTop:16 }}>
              <Text style={{ color:'#666' }}>Don’t have any account? <Text style={{ color:'#111', fontWeight:'700' }}>Sign up</Text></Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
