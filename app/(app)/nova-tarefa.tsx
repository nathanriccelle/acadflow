import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { useTaskStore } from '../../store/useTaskStore';

export default function NovaTarefa() {
  const router = useRouter();
  const { adicionarTarefa } = useTaskStore();

  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');

  // Função para validar e formatar o horário,tipo 12:30
  const handleHorarioChange = (texto: string) => {
    const numerico = texto.replace(/\D/g, '');

    let formatado = numerico;
    if (numerico.length > 2) {
      formatado = `${numerico.slice(0, 2)}:${numerico.slice(2, 4)}`;
    }
    setHorario(formatado);
  };

  const handleSalvar = () => {
    if (titulo.trim() === '') return;

    const horarioFinal = horario.trim() === '' ? 'Livre' : horario;

    adicionarTarefa(titulo, horarioFinal);

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <ArrowLeft size={24} color={Colors.fontPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Criar Tarefa</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>O que você precisa fazer?</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Revisar matéria de cálculo"
              placeholderTextColor={Colors.fontTertiary}
              value={titulo}
              onChangeText={setTitulo}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Horário (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 15:30"
              placeholderTextColor={Colors.fontTertiary}
              value={horario}
              onChangeText={handleHorarioChange}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

        </View>

        {/* Botão Salvar */}
        <View style={styles.footer}>
          <Pressable 
            style={({ pressed }) => [
              styles.saveButton, 
              pressed && styles.pressed,
              titulo.trim() === '' && styles.saveButtonDisabled
            ]}
            onPress={handleSalvar}
            disabled={titulo.trim() === ''}
          >
            <Check size={20} color={Colors.white} style={styles.saveIcon} />
            <Text style={styles.saveButtonText}>Criar Tarefa</Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 40,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: Fonts.titleBold,
    fontSize: 20,
    color: Colors.fontPrimary,
  },
  formContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
    color: Colors.fontPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: Fonts.bodyRegular,
    fontSize: 16,
    color: Colors.fontPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  saveButton: {
    backgroundColor: Colors.accentPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    fontFamily: Fonts.titleBold,
    fontSize: 16,
    color: Colors.white,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});