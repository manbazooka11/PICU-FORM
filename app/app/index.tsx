import { useRouter } from 'expo-router';
import { FileText, Plus } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <FileText size={40} color="#0066CC" />
        </View>
        <Text style={styles.title}>NICH PICU</Text>
        <Text style={styles.subtitle}>Data Collection System</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patient Data Collection Form</Text>
          <Text style={styles.cardDescription}>
            National Institute of Child Health{'\n'}
            Paediatric Intensive Care Unit
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/patient-details' as any)}
            activeOpacity={0.7}
          >
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>New Admission Form</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Form Sections</Text>
          <View style={styles.sectionList}>
            <View style={styles.sectionItem}>
              <View style={styles.sectionNumber}>
                <Text style={styles.sectionNumberText}>1</Text>
              </View>
              <Text style={styles.sectionText}>Patient Details & Admission</Text>
            </View>
            <View style={styles.sectionItem}>
              <View style={styles.sectionNumber}>
                <Text style={styles.sectionNumberText}>2</Text>
              </View>
              <Text style={styles.sectionText}>PICU Observations</Text>
            </View>
            <View style={styles.sectionItem}>
              <View style={styles.sectionNumber}>
                <Text style={styles.sectionNumberText}>3</Text>
              </View>
              <Text style={styles.sectionText}>Daily Interventions</Text>
            </View>
            <View style={styles.sectionItem}>
              <View style={styles.sectionNumber}>
                <Text style={styles.sectionNumberText}>4</Text>
              </View>
              <Text style={styles.sectionText}>Investigations & Cultures</Text>
            </View>
            <View style={styles.sectionItem}>
              <View style={styles.sectionNumber}>
                <Text style={styles.sectionNumberText}>5</Text>
              </View>
              <Text style={styles.sectionText}>Medications & Discharge</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  sectionList: {
    gap: 12,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumberText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0066CC',
  },
  sectionText: {
    fontSize: 15,
    color: '#4B5563',
    fontWeight: '500',
  },
});
