import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, MessageSquare } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import CardDesabafo from '../../components/CardDesabafo';
import { useAuth } from '../../contexts/AuthContext';
import { useMuralStore } from '../../store/useMuralStore';

export default function Mural() {
  const router = useRouter();
  const { user } = useAuth();
  const { desabafos, loading, saving, inicializar, alternarLike } = useMuralStore();

  useEffect(() => {
    if (!user) return;
    return inicializar(user.uid);
  }, [user?.uid, inicializar]);

  const handleLike = (postId: string) => {
    if (!user || saving) return;
    alternarLike(user.uid, postId);
  };

  const EstadoVazio = () => (
    <View style={styles.vazioContainer}>
      <MessageSquare size={48} color={Colors.fontTertiary} />
      <Text style={styles.vazioTitulo}>Nenhum desabafo ainda</Text>
      <Text style={styles.vazioSubtitulo}>
        Seja o primeiro a compartilhar. Este é um espaço seguro e anônimo.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.fontPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Mural de desabafos</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subtitle}>Você não está sozinho (a)</Text>

        {loading && desabafos.length === 0 ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.accentPrimary}
          />
        ) : (
          <FlatList
            data={desabafos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardDesabafo
                texto={item.texto}
                likes={item.likes}
                curtiu={item.curtiu}
                onLike={() => handleLike(item.id)}
                disabled={saving}
              />
            )}
            contentContainerStyle={
              desabafos.length === 0 ? styles.listEmpty : styles.listContainer
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EstadoVazio}
          />
        )}

        <Pressable
          style={({ pressed }) => [styles.fab, pressed && styles.pressedEffect]}
          onPress={() => router.push('/mural-novo')}
        >
          <Plus size={24} color={Colors.white} />
          <Text style={styles.fabText}>Desabafar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.fontSecondary,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
    justifyContent: 'center',
  },
  loader: {
    marginTop: 48,
  },
  vazioContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
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
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: Colors.accentPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabText: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
  pressedEffect: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
