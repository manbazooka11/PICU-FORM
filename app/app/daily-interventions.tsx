import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useForm } from '@/contexts/FormContext';
const interventions = [
  { code: '1', label: 'Invasive ventilation via endotracheal tube', category: 'Airway' },
  { code: '2', label: 'Invasive ventilation via tracheostomy tube', category: 'Airway' },
  { code: '3', label: 'Non-invasive ventilatory support', category: 'Airway' },
  { code: '4', label: 'Pharyngeal airway', category: 'Airway' },
  { code: '5', label: 'Tracheostomy cared for by nursing staff', category: 'Airway' },
  { code: '6', label: 'Supplemental oxygen therapy (irrespective of ventilatory state)', category: 'Airway' },
  { code: '7', label: 'High flow therapy', category: 'Airway' },
  { code: '8', label: 'Treatment of acute severe asthma requiring IV therapy', category: 'Airway' },
  { code: '9', label: 'Acute severe asthma requiring IV bronchodilator therapy or continuous nebuliser', category: 'Airway' },
  { code: '10', label: 'Augmented extubation and/or withdrawal of mechanical ventilatory support', category: 'Airway' },
  { code: '11', label: 'Continuous pulse oximetry', category: 'Airway' },
  { code: '1', label: 'Arterial line (including umbilical)', category: 'Cardiac/Vascular' },
  { code: '2', label: 'Arrhythmia requiring intravenous anti-arrhythmic therapy', category: 'Cardiac/Vascular' },
  { code: '', label: 'Central venous catheter in situ', category: 'Cardiac/Vascular' },
  { code: '3', label: 'Central venous pressure monitoring', category: 'Cardiac/Vascular' },
  { code: '4', label: 'Continuous infusion of saline/dextrose (premixed no. of times CPR done in box)', category: 'Cardiac/Vascular' },
  { code: '5', label: 'Inotrope/vasopressor/vasodilator (preterm)', category: 'Cardiac/Vascular' },
  { code: '6', label: 'Continuous ECG monitoring', category: 'Cardiac/Vascular' },
  { code: '1', label: 'Peritoneal dialysis', category: 'Renal' },
  { code: '2', label: 'Haemodialysis', category: 'Renal' },
  { code: '1', label: 'Haemofiltration', category: 'Renal' },
  { code: '2', label: 'Peritoneal exchange', category: 'Renal' },
  { code: '3', label: 'Haemofiltration', category: 'Renal' },
  { code: '4', label: 'Plasma exchange', category: 'Renal' },
  { code: '1', label: 'Intraventricular catheter or external ventricular drain', category: 'Neurological' },
  { code: '2', label: 'Status epilepticus requiring treatment with continuous infusion', category: 'Neurological' },
  { code: '3', label: 'Reduced conscious level of GCS 12 or (more frequent) GCS monitoring', category: 'Neurological' },
  { code: '1', label: 'Delirium screening result (record Positive, Negative, Unable to assess, Did not assess)', category: 'Neurological' },
  { code: '1', label: 'Continuous infusion of a paralytic agent', category: 'Paralytic/Sedation' },
  { code: '2', label: 'Continuous intravenous infusion of a sedative agent', category: 'Paralytic/Sedation' },
  { code: '1', label: 'Diabetic ketoacidosis (DKA) requiring continuous infusion of insulin', category: 'Metabolic' },
  { code: '1', label: 'Abdominal distension requiring girth measurement', category: 'Abdominal' },
  { code: '2', label: 'Ascent or abnormal bowel sounds on auscultation', category: 'Abdominal' },
  { code: '3', label: 'Feeding intolerance (vomiting, large gastric residuals, or significant aspirates)', category: 'Abdominal' },
  { code: '4', label: 'Enteral feeding status (TPN / NG or OG feeds or both / Enteral nutrition)', category: 'Abdominal' },
  { code: '5', label: 'Acute pancreatitis requiring continuous NG/nasojejunal drainage', category: 'Abdominal' },
  { code: '6', label: 'Gastrointestinal bleeding (haematemesis / blood in stool)', category: 'Abdominal' },
  { code: '7', label: 'Abdominal tenderness, rigidity, or discoloration suggestive of peritonitis / NEC', category: 'Abdominal' },
  { code: '8', label: 'Organomegaly (liver / spleen) on palpation', category: 'Abdominal' },
  { code: '9', label: 'Palpable bladder requiring monitoring / intervention', category: 'Abdominal' },
  { code: '1', label: 'Exchange transfusion', category: 'Other' },
  { code: '2', label: 'Intravenous thrombolysis', category: 'Other' },
  { code: '3', label: 'Extracorporeal liver support using molecular adsorbent recirculating system (MARS)', category: 'Other' },
  { code: '4', label: 'Patient nursed in single occupancy cubicle (state reason for isolation below)', category: 'Other' },
];
export default function DailyInterventionsScreen() {
  const router = useRouter();
  const { formData, updateDailyInterventions } = useForm();
  const [numDays] = useState(13);
  const toggleIntervention = (day: number, code: string) => {
    const existing = formData.dailyInterventions.find((d) => d.day === day);
    if (existing) {
      const updated = formData.dailyInterventions.map((d) =>
        d.day === day
          ? { ...d, interventions: { ...d.interventions, [code]: !d.interventions[code] } }
          : d
      );
      updateDailyInterventions(updated);
    } else {
      updateDailyInterventions([
        ...formData.dailyInterventions,
        { day, interventions: { [code]: true } },
      ]);
    }
  };
  const isChecked = (day: number, code: string): boolean => {
    const existing = formData.dailyInterventions.find((d) => d.day === day);
    return existing?.interventions[code] || false;
  };
  const handleNext = () => {
    router.push('/investigations' as any);
  };

  const groupedInterventions = interventions.reduce((acc, intervention) => {
    if (!acc[intervention.category]) {
      acc[intervention.category] = [];
    }
    acc[intervention.category].push(intervention);
    return acc;
  }, {} as Record<string, typeof interventions>);
  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          For each day of admission, record (using an X unless otherwise specified) all applicable interventions and observations from the list below.
          If none apply, select No defined critical care activity
        </Text>
      </View>

      <ScrollView horizontal style={styles.horizontalScroll}>
        <View>
          <View style={styles.headerRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.headerText}>Intervention</Text>
            </View>
            <View style={styles.codeColumn}>
              <Text style={styles.headerText}>Code</Text>
            </View>
            {Array.from({ length: numDays }, (_, i) => (
              <View key={i} style={styles.dayColumn}>
                <Text style={styles.dayText}>{i}</Text>
              </View>
            ))}
          </View>

          <ScrollView style={styles.verticalScroll} contentContainerStyle={styles.scrollContent}>
            {Object.entries(groupedInterventions).map(([category, items]) => (
              <View key={category}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
                {items.map((intervention, idx) => (
                  <View key={`${category}-${idx}`} style={styles.row}>
                    <View style={styles.labelColumn}>
                      <Text style={styles.labelText}>{intervention.label}</Text>
                    </View>
                    <View style={styles.codeColumn}>
                      <Text style={styles.codeText}>{intervention.code}</Text>
                    </View>
                    {Array.from({ length: numDays }, (_, day) => (
                      <TouchableOpacity
                        key={day}
                        style={styles.dayColumn}
                        onPress={() => toggleIntervention(day, `${category}-${idx}`)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, isChecked(day, `${category}-${idx}`) && styles.checkboxChecked]}>
                          {isChecked(day, `${category}-${idx}`) && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next: Investigations</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  instructions: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F59E0B',
  },
  instructionsText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  horizontalScroll: {
    flex: 1,
  },
  verticalScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderBottomWidth: 2,
    borderBottomColor: '#374151',
  },
  labelColumn: {
    width: 300,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    justifyContent: 'center',
  },
  codeColumn: {
    width: 60,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayColumn: {
    width: 50,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoryHeader: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2563EB',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  labelText: {
    fontSize: 13,
    color: '#1F2937',
    lineHeight: 18,
  },
  codeText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  checkmark: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
