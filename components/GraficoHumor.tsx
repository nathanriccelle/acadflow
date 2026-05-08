import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

export interface DiaHumor {
  dia: string;
  nivel: number;
  destaque: boolean;
}

interface GraficoHumorProps {
  dados: DiaHumor[];
}

export default function GraficoHumor({ dados }: GraficoHumorProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Meu humor esta semana</Text>
      
      <View style={styles.graficoContainer}>
        {dados.map((item, index) => (
          <View key={index} style={styles.colunaContainer}>
            <View style={styles.trilhaBarra}>
              <View 
                style={[
                  styles.barraPreenchida,
                  { 
                    height: `${item.nivel}%`, 
                    backgroundColor: item.destaque ? Colors.accentPrimary : Colors.accentSecondary 
                  }
                ]} 
              />
            </View>
            <Text style={styles.diaTexto}>{item.dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  titulo: {
    fontFamily: Fonts.titleBold,
    fontSize: 18,
    color: Colors.fontPrimary,
    marginBottom: 24,
  },
  graficoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  colunaContainer: {
    alignItems: 'center',
    flex: 1,
  },
  trilhaBarra: {
    height: 120,
    width: 24,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  barraPreenchida: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  diaTexto: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.accentPrimary,
  },
});