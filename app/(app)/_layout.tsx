import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import { useMoodStore } from '../../store/useMoodStore';
import { useTaskStore } from '../../store/useTaskStore';

export default function AppLayout() {
  const { user, loading } = useAuth();
  const inicializarMood = useMoodStore((state) => state.inicializar);
  const resetMood = useMoodStore((state) => state.reset);
  const inicializarTasks = useTaskStore((state) => state.inicializar);
  const resetTasks = useTaskStore((state) => state.reset);

  useEffect(() => {
    if (user) {
      inicializarMood(user.uid);
      inicializarTasks(user.uid);
    } else {
      resetMood();
      resetTasks();
    }
  }, [user?.uid, inicializarMood, resetMood, inicializarTasks, resetTasks]);

  if (loading) return null;

  if (!user) return <Redirect href="/login" />;

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
      <Stack.Screen name="checkin" options={{ title: 'Minhas Tarefas' }} />
      <Stack.Screen name="nova-tarefa" options={{ title: 'Nova Tarefa' }} />
      <Stack.Screen name="respiracao" options={{ title: 'Respiração Guiada' }} />
      <Stack.Screen name="mural" options={{ title: 'Mural de Desabafos' }} />
      <Stack.Screen name="mural-novo" options={{ title: 'Novo Desabafo' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat com Psicólogo' }} />
      <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Stack>
  );
}
