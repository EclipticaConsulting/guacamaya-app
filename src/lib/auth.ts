import AsyncStorage from '@react-native-async-storage/async-storage';
const AUTH_KEY = 'auth-demo-v1';

export async function signIn({ email }: { email: string }) {
  // En demo: guardamos usuario "falso"
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ email, name: email.split('@')[0] }));
}

export async function signUp({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ email, name: `${firstName} ${lastName}`.trim() }));
}

export async function signOut() {
  await AsyncStorage.removeItem(AUTH_KEY);
}

export async function getUser() {
  const raw = await AsyncStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}
