import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import BalaoMensagem from '../../components/BalaoMensagem';
import ChatAviso from '../../components/ChatAviso';
import { useAuth } from '../../contexts/AuthContext';
import { useChatStore } from '../../store/useChatStore';

export default function Chat() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const flatListRef = useRef<FlatList>(null);

  const {
    mensagens,
    loading,
    enviando,
    botDigitando,
    inicializar,
    enviarMensagem,
  } = useChatStore();

  const [mensagemAtual, setMensagemAtual] = React.useState('');

  const primeiroNome =
    profile?.nome?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'estudante';

  useEffect(() => {
    if (!user) return;
    return inicializar(user.uid, primeiroNome);
  }, [user?.uid, primeiroNome, inicializar]);

  const handleEnviar = async () => {
    if (!user || mensagemAtual.trim() === '') return;
    const texto = mensagemAtual;
    setMensagemAtual('');
    await enviarMensagem(user.uid, texto);
  };

  const desabilitado = enviando || botDigitando || loading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.fontPrimary} />
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Dra. Juliana</Text>
            <Text style={styles.headerRole}>Apoio virtual</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <ChatAviso />

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.accentPrimary} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            style={{ flex: 1 }}
            data={mensagens}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaMensagens}
            renderItem={({ item }) => (
              <BalaoMensagem texto={item.texto} isUsuario={item.isUsuario} />
            )}
            ListFooterComponent={
              botDigitando ? (
                <View style={styles.digitando}>
                  <View style={styles.avatar} />
                  <View style={styles.digitandoBalao}>
                    <Text style={styles.digitandoTexto}>Digitando...</Text>
                  </View>
                </View>
              ) : null
            }
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.fontTertiary}
            value={mensagemAtual}
            onChangeText={setMensagemAtual}
            multiline
            editable={!desabilitado}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.pressedEffect,
              desabilitado && styles.sendButtonDisabled,
            ]}
            onPress={handleEnviar}
            disabled={desabilitado || mensagemAtual.trim() === ''}
          >
            {enviando ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Send size={20} color={Colors.white} />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.accentSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.accentSecondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerName: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
  },
  headerRole: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.fontSecondary,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaMensagens: {
    padding: 24,
    paddingBottom: 10,
  },
  digitando: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentSecondary,
    marginRight: 12,
  },
  digitandoBalao: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  digitandoTexto: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.fontTertiary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundSecondary,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: Fonts.bodyRegular,
    fontSize: 15,
    color: Colors.fontPrimary,
    maxHeight: 120,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: Colors.accentPrimary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  pressedEffect: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
