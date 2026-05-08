import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Frown, Meh, Smile, Wind, MessageSquare, Heart, List, CircleUser } from 'lucide-react-native';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

import { useMoodStore } from '../../store/useMoodStore';

export default function Home() {
  const router = useRouter();

  const humorDeHoje = useMoodStore((state) => state.humorDeHoje);
  const salvarHumorHoje = useMoodStore((state) => state.salvarHumorHoje);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Olá, Ana Clara</Text>
            <Text style={styles.subGreeting}>Como você está hoje?</Text>
          </View>
          
          <Pressable 
            onPress={() => router.push('/perfil')}
            style={({ pressed }) => pressed && styles.pressedEffect}
          >
            <CircleUser size={36} color={Colors.accentPrimary} />
          </Pressable>
        </View>

        <View style={styles.moodCard}>
          <Pressable 
            onPress={() => salvarHumorHoje('ruim')}
            style={({ pressed }) => [
              styles.moodItem, 
              pressed && styles.pressedEffect,
              humorDeHoje === 'ruim' && styles.moodSelecionado // Aplica o estilo se estiver selecionado
            ]}
          >
            <Frown size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Ruim</Text>
          </Pressable>
          
          <Pressable 
            onPress={() => salvarHumorHoje('neutro')}
            style={({ pressed }) => [
              styles.moodItem, 
              pressed && styles.pressedEffect,
              humorDeHoje === 'neutro' && styles.moodSelecionado
            ]}
          >
            <Meh size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Neutro</Text>
          </Pressable>
          
          <Pressable 
            onPress={() => salvarHumorHoje('bem')}
            style={({ pressed }) => [
              styles.moodItem, 
              pressed && styles.pressedEffect,
              humorDeHoje === 'bem' && styles.moodSelecionado
            ]}
          >
            <Smile size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Bem</Text>
          </Pressable>
        </View>

        {/* Grid de Atalhos */}
        <View style={styles.grid}>
          <Pressable
            onPress={() => router.push('/respiracao')}
            style={({ pressed }) => [styles.gridItem, pressed && styles.pressedEffect]}
          >
            <Wind size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Respiração Guiada</Text>
          </Pressable>

          <Pressable 
            onPress={() => router.push('/mural')}
            style={({ pressed }) => [styles.gridItem, pressed && styles.pressedEffect]}
          >
            <MessageSquare size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Mural de desabafos</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/chat')} 
            style={({ pressed }) => [styles.gridItem, pressed && styles.pressedEffect]}
          >
            <Heart size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Falar com psicólogo</Text>
          </Pressable>

          <Pressable 
            onPress={() => router.push('/checkin')}
            style={({ pressed }) => [styles.gridItem, pressed && styles.pressedEffect]}>
            <List size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Minhas tarefas</Text>
          </Pressable>
        </View>

        {/* Card de Destaque */}
        <View style={styles.highlightCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Dica de hoje</Text>
          </View>
          
          <Text style={styles.highlightTitle}>Exercício do dia</Text>
          <Text style={styles.highlightDescription}>
            Técnica 4-7-8 para reduzir a ansiedade e melhorar o foco antes dos estudos.
          </Text>

          <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressedEffect]}>
            <Text style={styles.primaryButtonText}>Começar agora</Text>
          </Pressable>
        </View>

      </ScrollView>
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
  },
  contentContainer: {
    padding: 24,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontFamily: Fonts.titleBold,
    fontSize: 32,
    color: Colors.fontPrimary,
  },
  subGreeting: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 18,
    color: Colors.fontSecondary,
    marginTop: 4,
  },
  moodCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  moodItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  moodSelecionado: {
    backgroundColor: Colors.accentSecondary,
  },
  moodLabel: {
    fontFamily: Fonts.bodyMedium,
    color: Colors.fontSecondary,
    marginTop: 8,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  gridItem: {
    backgroundColor: Colors.backgroundSecondary,
    width: '48%',
    aspectRatio: 1.1,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
  },
  gridText: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
    color: Colors.fontPrimary,
    marginTop: 12,
    lineHeight: 20,
  },
  highlightCard: {
    backgroundColor: Colors.accentSecondary,
    borderRadius: 28,
    padding: 24,
  },
  badge: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.fontPrimary,
  },
  highlightTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 20,
    color: Colors.fontPrimary,
    marginBottom: 8,
  },
  highlightDescription: {
    fontFamily: Fonts.bodyRegular,
    fontSize: 15,
    color: Colors.fontSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: Colors.accentPrimary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
  },
  pressedEffect: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }]
  }
});