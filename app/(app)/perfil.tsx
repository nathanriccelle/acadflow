import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { ArrowLeft, Flame, Bell, Lock, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import GraficoHumor from '../../components/GraficoHumor';

import { useMoodStore } from '../../store/useMoodStore';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../services/authService';

export default function Perfil() {
  const router = useRouter();
  const { profile, user } = useAuth();

  const historicoSemanal = useMoodStore((state) => state.historicoSemanal);
  const streak = useMoodStore((state) => state.streak);
  const sessoesRespiracaoSemana = useMoodStore((state) => state.sessoesRespiracaoSemana);
  const moodLoading = useMoodStore((state) => state.loading);

  const streakLabel =
    streak === 0
      ? 'Faça seu check-in ou respire hoje'
      : `${streak} ${streak === 1 ? 'dia de autocuidado' : 'dias de autocuidado'}`;

  const respiracaoLabel =
    sessoesRespiracaoSemana === 0
      ? 'Nenhuma sessão de respiração esta semana'
      : `${sessoesRespiracaoSemana} ${
          sessoesRespiracaoSemana === 1 ? 'sessão de respiração' : 'sessões de respiração'
        } esta semana`;

  const nomeExibicao = profile?.nome ?? user?.email ?? 'Usuário';
  const cursoExibicao =
    profile?.curso?.trim() || 'Complete seu curso no cadastro';

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch {
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      
      <SafeAreaView edges={['top']} style={styles.headerFundo}>
        <View style={styles.headerCurvo}>
          
          <View style={styles.topBar}>
            <Pressable 
              style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.fontPrimary} />
            </Pressable>
            <Text style={styles.topBarTitle}>Perfil</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{nomeExibicao}</Text>
            <Text style={styles.userCourse}>{cursoExibicao}</Text>

            <View style={styles.streakBadge}>
              <Flame size={18} color={Colors.fontPrimary} strokeWidth={2.5} />
              <Text style={styles.streakText}>
                {moodLoading ? 'Carregando...' : streakLabel}
              </Text>
            </View>
            {!moodLoading && (
              <Text style={styles.respiracaoHint}>{respiracaoLabel}</Text>
            )}
          </View>

        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GraficoHumor dados={historicoSemanal} />

        <View style={styles.menuContainer}>
          <Pressable style={({ pressed }) => [styles.menuItem, pressed && styles.pressedEffect]}>
            <Bell size={20} color={Colors.fontPrimary} />
            <Text style={styles.menuText}>Notificações</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.menuItem, pressed && styles.pressedEffect]}>
            <Lock size={20} color={Colors.fontPrimary} />
            <Text style={styles.menuText}>Privacidade de Dados</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressedEffect]}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#FF4B4B" />
            <Text style={[styles.menuText, { color: '#FF4B4B' }]}>Sair</Text>
          </Pressable>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  headerFundo: {
    backgroundColor: Colors.accentSecondary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerCurvo: {
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  topBarTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  userName: {
    fontFamily: Fonts.titleBold,
    fontSize: 36,
    color: Colors.fontPrimary,
    marginBottom: 8,
  },
  userCourse: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.fontSecondary,
    marginBottom: 20,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  streakText: {
    fontFamily: Fonts.titleBold,
    fontSize: 14,
    color: Colors.fontPrimary,
    marginLeft: 8,
  },
  respiracaoHint: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.fontSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  menuContainer: {
    gap: 16, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'flex-start',

  },
  menuText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.fontPrimary,
    marginLeft: 12,
  },
  pressedEffect: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});