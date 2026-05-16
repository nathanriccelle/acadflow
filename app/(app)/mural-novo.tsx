import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lock, Leaf } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import AvisoMural from '../../components/AvisoMural';
import { useAuth } from '../../contexts/AuthContext';
import { MAX_TEXTO } from '../../services/muralService';
import { useMuralStore } from '../../store/useMuralStore';

export default function NovoDesabafo() {
  const router = useRouter();
  const { user } = useAuth();
  const { publicar, saving } = useMuralStore();

  const [textoDesabafo, setTextoDesabafo] = useState('');

  const handlePublicar = async () => {
    if (!user || textoDesabafo.trim() === '') return;

    if (textoDesabafo.trim().length > MAX_TEXTO) {
      Alert.alert('Atenção', `O texto pode ter no máximo ${MAX_TEXTO} caracteres.`);
      return;
    }

    try {
      await publicar(user.uid, textoDesabafo);
      setTextoDesabafo('');
      router.back();
    } catch {
      Alert.alert('Erro', 'Não foi possível publicar. Tente novamente.');
    }
  };

  const disabled = textoDesabafo.trim() === '' || saving;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.fontPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Novo Desabafo</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AvisoMural
            comFundo={true}
            icone={<Lock size={20} color={Colors.accentPrimary} />}
            texto="Sua postagem será 100% anônima. Sinta-se seguro(a) para se expressar."
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="O que está no seu coração hoje?"
              placeholderTextColor={Colors.fontTertiary}
              multiline
              value={textoDesabafo}
              onChangeText={setTextoDesabafo}
              textAlignVertical="top"
              maxLength={MAX_TEXTO}
            />
            <Text style={styles.charCount}>
              {textoDesabafo.length}/{MAX_TEXTO}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.publishButton,
              pressed && styles.pressedEffect,
              disabled && { opacity: 0.5 },
            ]}
            onPress={handlePublicar}
            disabled={disabled}
          >
            {saving ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.publishButtonText}>Publicar</Text>
            )}
          </Pressable>

          <View style={styles.footerNote}>
            <AvisoMural
              comFundo={false}
              icone={<Leaf size={20} color={Colors.accentPrimary} />}
              texto="Lembre-se: este é um espaço de apoio. Seja gentil."
            />
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    minHeight: 280,
    padding: 20,
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.bodyRegular,
    fontSize: 16,
    color: Colors.fontPrimary,
    lineHeight: 24,
    minHeight: 220,
  },
  charCount: {
    fontFamily: Fonts.bodyRegular,
    fontSize: 12,
    color: Colors.fontTertiary,
    textAlign: 'right',
    marginTop: 8,
  },
  publishButton: {
    backgroundColor: Colors.accentPrimary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  publishButtonText: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 20,
    color: Colors.white,
  },
  footerNote: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pressedEffect: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
