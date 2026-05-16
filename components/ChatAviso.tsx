import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Info } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

export default function ChatAviso() {
  return (
    <View style={styles.container}>
      <Info size={16} color={Colors.accentPrimary} />
      <Text style={styles.texto}>
        Apoio virtual acolhedor. Não substitui psicólogo ou psiquiatra. Em crise: CVV 188 (24h).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  texto: {
    flex: 1,
    fontFamily: Fonts.bodyRegular,
    fontSize: 12,
    color: Colors.fontSecondary,
    lineHeight: 18,
  },
});
