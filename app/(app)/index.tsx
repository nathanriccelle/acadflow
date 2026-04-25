import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Frown, Meh, Smile, Wind, MessageSquare, Heart, List } from 'lucide-react-native';
import { Fonts } from '../../constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, Ana Clara.</Text>
          <Text style={styles.subGreeting}>Como você está hoje?</Text>
        </View>

        {/* Reações */}
        <View style={styles.moodCard}>
          <TouchableOpacity style={styles.moodItem}>
            <Frown size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Ruim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moodItem}>
            <Meh size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Neutro</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moodItem}>
            <Smile size={32} color={Colors.accentPrimary} strokeWidth={2} />
            <Text style={styles.moodLabel}>Bem</Text>
          </TouchableOpacity>
        </View>

        {/* Grid de Atalhos */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem}>
            <Wind size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Respiração Guiada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <MessageSquare size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Mural de desabafos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Heart size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Falar com psicólogo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <List size={28} color={Colors.accentPrimary} />
            <Text style={styles.gridText}>Minhas tarefas</Text>
          </TouchableOpacity>
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

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Começar agora</Text>
          </TouchableOpacity>
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
  header: {
    marginBottom: 32,
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
});