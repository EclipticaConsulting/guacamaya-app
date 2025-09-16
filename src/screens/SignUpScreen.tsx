import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import AuthHeader from '../components/AuthHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { signUp } from '../lib/auth';

export default function SignUpScreen({ navigation }: any) {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !email) { Alert.alert('Completa nombre y correo'); return; }
    if (password !== confirm) { Alert.alert('Las contraseñas no coinciden'); return; }
    await signUp({ firstName, lastName, email });
    navigation.replace('Profile');
  };

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'#fff' }} behavior={Platform.select({ ios:'padding', android:undefined })}>
      <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <AuthHeader />
        <View style={{ marginTop:-32, paddingHorizontal:20 }}>
          <View style={{ backgroundColor:'#fff', borderRadius:20, padding:20, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:16, elevation:2 }}>
            <Text style={{ fontSize:22, fontWeight:'800', color:'#111', marginBottom:12 }}>Sign Up</Text>
            <AuthInput label="First name" value={firstName} onChangeText={setFirst} />
            <AuthInput label="Last name" value={lastName} onChangeText={setLast} />
            <AuthInput label="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <AuthInput label="Password" secureTextEntry value={password} onChangeText={setPass} />
            <AuthInput label="Confirm password" secureTextEntry value={confirm} onChangeText={setConfirm} />
            <AuthButton title="Sign up" onPress={handleSignUp} />
            <Pressable onPress={() => navigation.goBack()} style={{ alignSelf:'center', marginTop:16 }}>
              <Text style={{ color:'#666' }}>Already have any account? <Text style={{ color:'#111', fontWeight:'700' }}>Login</Text></Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
