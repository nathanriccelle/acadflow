import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.backgroundPrimary },
        headerTintColor: Colors.fontPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Início' }} />
      <Stack.Screen name="checkin" options={{ title: 'Como você está?' }} />
      <Stack.Screen name="respiracao" options={{ title: 'Respiração Guiada' }} />
      <Stack.Screen name="mural" options={{ title: 'Mural de Desabafos' }} />
      <Stack.Screen name="mural-novo" options={{ title: 'Novo Desabafo' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat com Psicólogo' }} />
    </Stack>
  );
}