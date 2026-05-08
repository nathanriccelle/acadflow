import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ArrowLeft, Flame, Bell, Lock, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import GraficoHumor from '../../components/GraficoHumor';

import { useMoodStore } from '../../store/useMoodStore';

export default function Perfil() {
  const router = useRouter();

  const historicoSemanal = useMoodStore((state) => state.historicoSemanal);

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
            <Text style={styles.userName}>Ana clara</Text>
            <Text style={styles.userCourse}>Sistemas para Internet - 5º semestre</Text>

            <View style={styles.streakBadge}>
              <Flame size={18} color={Colors.fontPrimary} strokeWidth={2.5} />
              <Text style={styles.streakText}>7 dias consecutivos</Text>
            </View>
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

          <Pressable style={({ pressed }) => [styles.menuItem, pressed && styles.pressedEffect]}>
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