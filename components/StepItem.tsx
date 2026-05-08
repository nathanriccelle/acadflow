import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

interface StepItemProps {
  label: string;
  time: string;
  isActive: boolean;
}
export default function StepItem({ label, time, isActive }: StepItemProps) {
  return (
    <View style={styles.stepItem}>
      <Text style={[styles.stepLabel, isActive ? styles.stepActive : styles.stepInactive]}>
        {label}
      </Text>
      <Text style={[styles.stepTime, isActive ? styles.stepTimeActive : styles.stepInactive]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepItem: {
    alignItems: 'center',
  },
  stepLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    marginBottom: 4,
  },
  stepTime: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
  },
  stepActive: {
    color: Colors.accentPrimary,
  },
  stepTimeActive: {
    color: Colors.fontPrimary,
  },
  stepInactive: {
    color: Colors.fontTertiary,
  },
});