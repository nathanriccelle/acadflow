import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import StepItem from '../../components/StepItem';
import { useAuth } from '../../contexts/AuthContext';
import {
  DURACAO_SESSAO_SEGUNDOS,
  saveCompletedSession,
} from '../../services/breathingService';
import { useMoodStore } from '../../store/useMoodStore';

export default function Respiracao() {
  const router = useRouter();
  const { user } = useAuth();
  const inicializarMood = useMoodStore((state) => state.inicializar);

  const [isActive, setIsActive] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(4);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(DURACAO_SESSAO_SEGUNDOS);
  const [salvando, setSalvando] = useState(false);

  const sessaoSalvaRef = useRef(false);

  useEffect(() => {
    if (!isActive || sessionTimeLeft <= 0) return;

    const timer = setTimeout(() => {
      setSessionTimeLeft((prev) => prev - 1);

      if (phaseTimeLeft > 1) {
        setPhaseTimeLeft((prev) => prev - 1);
      } else {
        if (currentPhase === 'inspire') {
          setCurrentPhase('hold');
          setPhaseTimeLeft(7);
        } else if (currentPhase === 'hold') {
          setCurrentPhase('expire');
          setPhaseTimeLeft(8);
        } else {
          setCurrentPhase('inspire');
          setPhaseTimeLeft(4);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive, sessionTimeLeft, phaseTimeLeft, currentPhase]);

  useEffect(() => {
    if (sessionTimeLeft > 0) {
      sessaoSalvaRef.current = false;
      return;
    }

    if (sessaoSalvaRef.current || !user) return;

    sessaoSalvaRef.current = true;
    setSalvando(true);

    void (async () => {
      try {
        await saveCompletedSession(user.uid, DURACAO_SESSAO_SEGUNDOS);
        await inicializarMood(user.uid);
      } catch {
        Alert.alert(
          'Aviso',
          'Sessão concluída, mas não foi possível salvar o progresso. Tente novamente mais tarde.'
        );
      } finally {
        setSalvando(false);
      }
    })();
  }, [sessionTimeLeft, user, inicializarMood]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePause = () => setIsActive(!isActive);

  const getPhaseLabel = () => {
    if (currentPhase === 'inspire') return 'Inspire';
    if (currentPhase === 'hold') return 'Segure';
    return 'Expire';
  };

  const sessaoConcluida = sessionTimeLeft <= 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.fontPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Respiração</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.dashedCircle}>
          <View style={styles.solidCircle}>
            <Text style={styles.circleActionText}>{getPhaseLabel()}</Text>
            <Text style={styles.circleTimeText}>{phaseTimeLeft}s</Text>
          </View>
        </View>
      </View>

      <View style={styles.stepsCard}>
        <StepItem label="Inspire" time="4s" isActive={currentPhase === 'inspire'} />
        <ArrowRight size={16} color={Colors.fontTertiary} />
        <StepItem label="Segure" time="7s" isActive={currentPhase === 'hold'} />
        <ArrowRight size={16} color={Colors.fontTertiary} />
        <StepItem label="Expire" time="8s" isActive={currentPhase === 'expire'} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.instructionText}>
          {!sessaoConcluida
            ? 'Feche os olhos e siga o\nritmo'
            : salvando
              ? 'Salvando seu\nprogresso...'
              : 'Sessão concluída!\nMuito bem.'}
        </Text>
        <Text style={styles.timerText}>{formatTime(sessionTimeLeft)}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.pauseButton,
          pressed && styles.pressedEffect,
          !isActive && sessionTimeLeft > 0 && styles.resumeButton,
        ]}
        onPress={togglePause}
        disabled={sessaoConcluida}
      >
        <Text style={styles.pauseButtonText}>
          {sessaoConcluida
            ? 'Finalizado'
            : isActive
              ? 'Pausar'
              : 'Retomar'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSecondary,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dashedCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: Colors.accentPrimary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidCircle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActionText: {
    fontFamily: Fonts.titleBold,
    fontSize: 36,
    color: Colors.fontPrimary,
    marginBottom: 4,
  },
  circleTimeText: {
    fontFamily: Fonts.titleMedium,
    fontSize: 24,
    color: Colors.fontPrimary,
  },
  stepsCard: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  infoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  instructionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 18,
    color: Colors.fontSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  timerText: {
    fontFamily: Fonts.titleBold,
    fontSize: 52,
    color: Colors.fontPrimary,
  },
  pauseButton: {
    backgroundColor: Colors.accentPrimary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  resumeButton: {
    backgroundColor: Colors.fontPrimary,
  },
  pauseButtonText: {
    color: Colors.white,
    fontFamily: Fonts.titleSemiBold,
    fontSize: 18,
  },
  pressedEffect: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },
});
