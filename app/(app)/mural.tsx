import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import CardDesabafo from '../../components/CardDesabafo';

interface Desabafo {
  id: string;
  texto: string;
  likes: number;
}

export default function Mural() {
  const router = useRouter();

  // Dados falsos que depois serão substituídos pelo Firebase
  const [desabafos, setDesabafos] = useState<Desabafo[]>([
    {
      id: '1',
      texto: 'Semana de provas chegou e parece que minha mente travou completamente...',
      likes: 42,
    },
    {
      id: '2',
      texto: 'Finalmente consegui dormir 8 Horas!\nPequena vitória, mas quero compartilhar.',
      likes: 78,
    },
    {
      id: '3',
      texto: 'Às vezes sinto que estou ficando para trás em relação aos meus colegas de turma.',
      likes: 15,
    },
    {
      id: '4',
      texto: 'Hoje o dia foi muito produtivo, consegui terminar aquele trabalho difícil!',
      likes: 112,
    }
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
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

        {/* Lista de Desabafos */}
        <FlatList
          data={desabafos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardDesabafo texto={item.texto} likes={item.likes} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Botão Flutuante */}
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
