import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

interface AvisoMuralProps {
  icone: React.ReactNode;
  texto: string;
  comFundo?: boolean;

}

export default function AvisoMural({ icone, texto, comFundo = false }: AvisoMuralProps) {
  return (
    <View style={[styles.container, comFundo && styles.containerFundo]}>
      <View style={styles.iconContainer}>
        {icone}
      </View>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  containerFundo: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  texto: {
    flex: 1,
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.fontSecondary,
    lineHeight: 20,
  },
});