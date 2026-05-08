import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lock, Leaf } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import AvisoMural from '../../components/AvisoMural';

export default function NovoDesabafo() {
  const router = useRouter();

  const [textoDesabafo, setTextoDesabafo] = useState('');

  const handlePublicar = () => {

    if (textoDesabafo.trim() === '') {
      return; 
    }

    // Futura integração com Firebase:

    setTextoDesabafo('');
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
              multiline={true}
              value={textoDesabafo}
              onChangeText={setTextoDesabafo}
              textAlignVertical="top"
            />
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.publishButton, 
              pressed && styles.pressedEffect,
              textoDesabafo.trim() === '' && { opacity: 0.5 }
            ]}
            onPress={handlePublicar}
            disabled={textoDesabafo.trim() === ''}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
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