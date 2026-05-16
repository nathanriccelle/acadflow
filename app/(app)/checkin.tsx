import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, ClipboardList } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import ItemTarefa from '../../components/ItemTarefa';
import { useAuth } from '../../contexts/AuthContext';
import { useTaskStore } from '../../store/useTaskStore';

export default function MinhasTarefas() {
  const router = useRouter();
  const { user } = useAuth();
  const { tarefas, loading, saving, alternarTarefa, removerTarefa } = useTaskStore();

  const concluidas = tarefas.filter((t) => t.concluida).length;
  const total = tarefas.length;

  const handleToggle = (id: string) => {
    if (!user || saving) return;
    alternarTarefa(user.uid, id);
  };

  const handleDelete = (id: string) => {
    if (!user || saving) return;
    removerTarefa(user.uid, id);
  };

  const EstadoVazio = () => (
    <View style={styles.vazioContainer}>
      <ClipboardList size={48} color={Colors.fontTertiary} />
      <Text style={styles.vazioTitulo}>Nenhuma tarefa ainda</Text>
      <Text style={styles.vazioSubtitulo}>
        Clique no botão + para adicionar sua primeira tarefa do dia.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <ArrowLeft size={24} color={Colors.fontPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Minhas Tarefas</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.subtitle}>Organize sua rotina com calma</Text>

      <View style={styles.progressCard}>
        <View>
          <Text style={styles.progressTitle}>{total} tarefas para hoje</Text>
          <Text style={styles.progressSubtitle}>Você está indo muito bem.</Text>
        </View>
        {loading ? (
          <ActivityIndicator color={Colors.accentPrimary} />
        ) : (
          <Text style={styles.progressNumber}>
            {concluidas}/{total}
          </Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>A fazer</Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemTarefa
            titulo={item.titulo}
            horario={item.horario}
            concluida={item.concluida}
            onPress={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={tarefas.length === 0 ? styles.listEmpty : styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? null : EstadoVazio}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
        onPress={() => router.push('/nova-tarefa')}
      >
        <Plus size={24} color={Colors.white} />
        <Text style={styles.fabText}>Nova tarefa</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.accentSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 20,
    color: Colors.fontPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.fontSecondary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
  },
  progressSubtitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.fontTertiary,
    marginTop: 4,
  },
  progressNumber: {
    fontFamily: Fonts.titleBold,
    fontSize: 20,
    color: Colors.accentPrimary,
  },
  sectionTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: Colors.accentPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 5,
  },
  fabText: {
    fontFamily: Fonts.titleBold,
    color: Colors.white,
    marginLeft: 8,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  vazioTitulo: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 18,
    color: Colors.fontSecondary,
    marginTop: 16,
  },
  vazioSubtitulo: {
    fontFamily: Fonts.bodyRegular,
    fontSize: 14,
    color: Colors.fontTertiary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
});
