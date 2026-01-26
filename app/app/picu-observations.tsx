import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { FormInput } from '@/components/FormInput';
import { useForm } from '@/contexts/FormContext';

export default function PICUObservationsScreen() {
  const router = useRouter();
  const { formData, updatePICUObservations } = useForm();
  const { picuObservations } = formData;

  const handleNext = () => {
    router.push('/daily-interventions' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PICU Admission</Text>
          <CheckboxGroup
            label="Applies to observations recorded between the first face-to-face review by ICU doctor until one hour after admission"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            selectedValues={picuObservations.receivesStillOneFaceToFace ? [picuObservations.receivesStillOneFaceToFace] : []}
            onChange={(values) => updatePICUObservations({ receivesStillOneFaceToFace: values[0] as any })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital Signs (within first hour)</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormInput
                label="HR (bpm)"
                value={picuObservations.hrOnAdmission}
                onChangeText={(text) => updatePICUObservations({ hrOnAdmission: text })}
                placeholder="mmHg"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput
                label="Temp (°C)"
                value={picuObservations.tempOnAdmission}
                onChangeText={(text) => updatePICUObservations({ tempOnAdmission: text })}
                placeholder="°C"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormInput
                label="RR (breaths/min)"
                value={picuObservations.rrOnAdmission}
                onChangeText={(text) => updatePICUObservations({ rrOnAdmission: text })}
                placeholder="%"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput
                label="SpO2 (%)"
                value={picuObservations.spo2OnAdmission}
                onChangeText={(text) => updatePICUObservations({ spo2OnAdmission: text })}
                placeholder="%"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Gas Analysis</Text>
          <CheckboxGroup
            label="Blood gas measured?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            selectedValues={picuObservations.bloodGasMeasured ? [picuObservations.bloodGasMeasured] : []}
            onChange={(values) => updatePICUObservations({ bloodGasMeasured: values[0] as any })}
          />
          {picuObservations.bloodGasMeasured === 'yes' && (
            <>
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="Arterial PaO2 (mmHg)"
                    value={picuObservations.arterialPao2}
                    onChangeText={(text) => updatePICUObservations({ arterialPao2: text })}
                    placeholder="mmHg"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="FiO2 (%)"
                    value={picuObservations.fio2}
                    onChangeText={(text) => updatePICUObservations({ fio2: text })}
                    placeholder="%"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="PCO2"
                    value={picuObservations.pco2}
                    onChangeText={(text) => updatePICUObservations({ pco2: text })}
                    placeholder="PCO2"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="HCO3"
                    value={picuObservations.hco3}
                    onChangeText={(text) => updatePICUObservations({ hco3: text })}
                    placeholder="HCO3"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <FormInput
                label="pH"
                value={picuObservations.ph}
                onChangeText={(text) => updatePICUObservations({ ph: text })}
                placeholder="pH"
                keyboardType="numeric"
              />
              <CheckboxGroup
                label="Intubation"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                selectedValues={picuObservations.intubation ? [picuObservations.intubation] : []}
                onChange={(values) => updatePICUObservations({ intubation: values[0] as any })}
              />
              <CheckboxGroup
                label="Base excess (specify source)"
                options={[
                  { value: 'arterial', label: 'Arterial' },
                  { value: 'capillary', label: 'Capillary' },
                  { value: 'venous', label: 'Venous' },
                ]}
                selectedValues={picuObservations.baseExcessSource}
                onChange={(values) => updatePICUObservations({ baseExcessSource: values })}
                multiple
              />
              <CheckboxGroup
                label="Lactate (specify source)"
                options={[
                  { value: 'arterial', label: 'Arterial' },
                  { value: 'capillary', label: 'Capillary' },
                  { value: 'venous', label: 'Venous' },
                ]}
                selectedValues={picuObservations.lactateSource}
                onChange={(values) => updatePICUObservations({ lactateSource: values })}
                multiple
              />
              <FormInput
                label="Action Score"
                value={picuObservations.actionScore}
                onChangeText={(text) => updatePICUObservations({ actionScore: text })}
                placeholder="Enter action score"
              />
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Reason for PICU Admission</Text>
          <CheckboxGroup
            label="Select all that apply"
            options={[
              { value: 'acute-kidney-injury', label: 'Acute Kidney Injury' },
              { value: 'acute-respiratory-failure', label: 'Acute Respiratory Failure' },
              { value: 'bronchiolitis', label: 'Bronchiolitis' },
              { value: 'burn', label: 'Burn' },
              { value: 'diabetic-ketoacidosis', label: 'Diabetic ketoacidosis' },
              { value: 'gbs', label: 'GBS' },
              { value: 'meningitis', label: 'Meningitis/meningoencephalitis' },
              { value: 'myocarditis', label: 'Myocarditis' },
              { value: 'pneumonia', label: 'Pneumonia' },
              { value: 'post-surgical', label: 'Post surgical (Recovery from surgery)' },
              { value: 'seizure-disorder', label: 'Seizure disorder' },
              { value: 'tetanus', label: 'Tetanus' },
              { value: 'trauma', label: 'Trauma' },
              { value: 'other', label: 'Other (specify)' },
            ]}
            selectedValues={picuObservations.mainReasonForPICU}
            onChange={(values) => updatePICUObservations({ mainReasonForPICU: values })}
            multiple
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Medical History</Text>
          <CheckboxGroup
            label="Is evidence available to assess past medical history?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            selectedValues={picuObservations.evidenceForPastMedicalHistory ? [picuObservations.evidenceForPastMedicalHistory] : []}
            onChange={(values) => updatePICUObservations({ evidenceForPastMedicalHistory: values[0] as any })}
          />
          {picuObservations.evidenceForPastMedicalHistory === 'yes' && (
            <CheckboxGroup
              label="If yes, tick all that apply"
              options={[
                { value: 'chest', label: 'Chest' },
                { value: 'cns', label: 'CNS' },
                { value: 'cvs', label: 'CVS' },
                { value: 'git', label: 'GIT' },
                { value: 'infectious', label: 'Infectious' },
                { value: 'other', label: 'Other' },
              ]}
              selectedValues={picuObservations.pastMedicalEvidence}
              onChange={(values) => updatePICUObservations({ pastMedicalEvidence: values })}
              multiple
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Respiratory Support</Text>
          <FormInput
            label="Mechanical ventilation"
            value={picuObservations.mechanicalVentilation}
            onChangeText={(text) => updatePICUObservations({ mechanicalVentilation: text })}
            placeholder="Enter details"
          />
          <FormInput
            label="Respiratory support"
            value={picuObservations.respiratorySupport}
            onChangeText={(text) => updatePICUObservations({ respiratorySupport: text })}
            placeholder="Enter details"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Neurological Status</Text>
          <FormInput
            label="GCS: __/15"
            value={picuObservations.gcs}
            onChangeText={(text) => updatePICUObservations({ gcs: text })}
            placeholder="Enter GCS score"
            keyboardType="numeric"
          />
          <FormInput
            label="Pupil reaction"
            value={picuObservations.pupilReaction}
            onChangeText={(text) => updatePICUObservations({ pupilReaction: text })}
            placeholder="Both fixed and dilated / Other"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next: Daily Interventions</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
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
