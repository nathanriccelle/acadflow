import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Circle, CheckCircle2, Clock, Trash2 } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

interface ItemTarefaProps {
  titulo: string;
  horario: string;
  concluida: boolean;
  onPress: () => void;
  onDelete: () => void;
}

export default function ItemTarefa({ titulo, horario, concluida, onPress, onDelete }: ItemTarefaProps) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.leftSide}>
        {concluida ? (
          <CheckCircle2 size={24} color={Colors.accentPrimary} />
        ) : (
          <Circle size={24} color={Colors.fontPrimary} />
        )}
        <Text style={[styles.titulo, concluida && styles.tituloConcluido]}>
          {titulo}
        </Text>
      </View>

      <View style={styles.rightSide}>
        <Clock size={16} color={Colors.fontTertiary} />
        <Text style={styles.horario}>{horario}</Text>
        <Pressable onPress={onDelete} style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
          <Trash2 size={20} color="#FF4B4B" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titulo: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
    color: Colors.fontPrimary,
    marginLeft: 12,
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: Colors.fontTertiary,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horario: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.fontTertiary,
    marginLeft: 4,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});