import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CircleUser, ThumbsUp } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

interface CardDesabafoProps {
  texto: string;
  likes: number;
}

export default function CardDesabafo({ texto, likes }: CardDesabafoProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <CircleUser size={24} color={Colors.accentPrimary} />
        <Text style={styles.username}>Anonimo</Text>
      </View>

      <Text style={styles.bodyText}>{texto}</Text>

      <View style={styles.footer}>
        <Pressable 
          style={({ pressed }) => [styles.likeButton, pressed && styles.pressedEffect]}
        >
          <ThumbsUp size={18} color={Colors.accentPrimary} />
          <Text style={styles.likeText}>{likes}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 16,
    color: Colors.fontPrimary,
    marginLeft: 8,
  },
  bodyText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.fontSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  likeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.fontPrimary,
    marginLeft: 8,
  },
  pressedEffect: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});