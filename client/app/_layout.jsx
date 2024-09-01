import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="Book" options={{ title: 'Book', headerStyle: {borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, backgroundColor: '#0e3b43', }}} />
      <Stack.Screen name="LogIn" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" options={{ headerStyle: {borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, backgroundColor: '#0e3b43', }}} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
