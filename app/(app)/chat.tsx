import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  FlatList, 
  KeyboardAvoidingView, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import BalaoMensagem from '../../components/BalaoMensagem';

interface Mensagem {
  id: string;
  texto: string;
  isUsuario: boolean;
}
// As respostas do Bot
const RESPOSTAS_BOT = [
  "Compreendo perfeitamente. Como isso fez você se sentir no momento?",
  "Entendo. É muito comum se sentir assim diante dessa situação.",
  "Estou aqui para ouvir você. Pode me dar mais detalhes?",
  "Isso parece ter sido desafiador. O que você acha que ajudaria agora?",
  "Agradeço por compartilhar isso comigo. Respire fundo, estamos juntos nessa."
];

export default function Chat() {
  const router = useRouter();
  
  const flatListRef = useRef<FlatList>(null);

  // Estados
  const [mensagemAtual, setMensagemAtual] = useState('');
  const [listaMensagens, setListaMensagens] = useState<Mensagem[]>([
    { id: '1', texto: 'Olá, Ana Clara! Como posso te ajudar hoje?', isUsuario: false }
  ]);

  // Função para enviar mensagem
  const enviarMensagem = () => {
    if (mensagemAtual.trim() === '') return;
    const novaMsgUsuario: Mensagem = {
      id: Math.random().toString(),
      texto: mensagemAtual,
      isUsuario: true,
    };

    setListaMensagens((mensagensAntigas) => [...mensagensAntigas, novaMsgUsuario]);
    setMensagemAtual('');
    // Tempo de resposta do Bot de 1,5 segundos
    setTimeout(() => {
      const respostaAleatoria = RESPOSTAS_BOT[Math.floor(Math.random() * RESPOSTAS_BOT.length)];
      
      const novaMsgBot: Mensagem = {
        id: Math.random().toString(),
        texto: respostaAleatoria,
        isUsuario: false,
      };

      setListaMensagens((mensagensAntigas) => [...mensagensAntigas, novaMsgBot]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding"
      >
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedEffect]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.fontPrimary} />
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Dra. Juliana</Text>
            <Text style={styles.headerRole}>Psicóloga</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {/* Lista de Mensagens */}
        <FlatList
          ref={flatListRef}
          style={{ flex: 1 }}
          data={listaMensagens}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaMensagens}
          renderItem={({ item }) => (
            <BalaoMensagem texto={item.texto} isUsuario={item.isUsuario} />
          )}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Área de Digitação */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.fontTertiary}
            value={mensagemAtual}
            onChangeText={setMensagemAtual}
            multiline
          />
          <Pressable 
            style={({ pressed }) => [styles.sendButton, pressed && styles.pressedEffect]}
            onPress={enviarMensagem}
          >
            <Send size={20} color={Colors.white} />
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
  listaMensagens: {
    padding: 24,
    paddingBottom: 10,
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
  pressedEffect: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }]
  }
});