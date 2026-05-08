import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

interface BalaoMensagemProps {
  texto: string;
  isUsuario: boolean;
}

export default function BalaoMensagem({ texto, isUsuario }: BalaoMensagemProps) {
  return (
    <View style={[styles.container, isUsuario ? styles.containerUsuario : styles.containerBot]}>
      {!isUsuario && <View style={styles.avatar} />}
      <View style={[styles.balao, isUsuario ? styles.balaoUsuario : styles.balaoBot]}>
        <Text style={[styles.texto, isUsuario ? styles.textoUsuario : styles.textoBot]}>
          {texto}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '100%',
  },
  containerUsuario: {
    justifyContent: 'flex-end',
  },
  containerBot: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentSecondary,
    marginRight: 12,
  },
  balao: {
    maxWidth: '75%',
    padding: 16,
    borderRadius: 20,
  },
  balaoUsuario: {
    backgroundColor: Colors.accentSecondary,
    borderBottomRightRadius: 4,
  },
  balaoBot: {
    backgroundColor: Colors.accentPrimary,
    borderBottomLeftRadius: 4,
  },
  texto: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    lineHeight: 22,
  },
  textoUsuario: {
    color: Colors.fontPrimary,
  },
  textoBot: {
    color: Colors.white,
  },
});