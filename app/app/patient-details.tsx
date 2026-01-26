import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { FormInput } from '@/components/FormInput';
import { useForm } from '@/contexts/FormContext';

export default function PatientDetailsScreen() {
  const router = useRouter();
  const { formData, updatePatientDetails } = useForm();
  const { patientDetails } = formData;

  const handleNext = () => {
    router.push('/picu-observations' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hospital Label</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormInput
                label="Serial No."
                value={patientDetails.serialNo}
                onChangeText={(text) => updatePatientDetails({ serialNo: text })}
                placeholder="Enter serial number"
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput
                label="MR No."
                value={patientDetails.mrNo}
                onChangeText={(text) => updatePatientDetails({ mrNo: text })}
                placeholder="Enter MR number"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Details</Text>
          <FormInput
            label="Name"
            value={patientDetails.name}
            onChangeText={(text) => updatePatientDetails({ name: text })}
            placeholder="Enter patient name"
          />
          <FormInput
            label="Address"
            value={patientDetails.address}
            onChangeText={(text) => updatePatientDetails({ address: text })}
            placeholder="Enter address"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <View style={styles.row}>
            <View style={styles.thirdWidth}>
              <FormInput
                label="Age (months/years)"
                value={patientDetails.age}
                onChangeText={(text) => updatePatientDetails({ age: text })}
                placeholder="Age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.thirdWidth}>
              <FormInput
                label="Weight (kg)"
                value={patientDetails.weight}
                onChangeText={(text) => updatePatientDetails({ weight: text })}
                placeholder="Weight"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.thirdWidth}>
              <FormInput
                label="Height (cm)"
                value={patientDetails.height}
                onChangeText={(text) => updatePatientDetails({ height: text })}
                placeholder="Height"
                keyboardType="numeric"
              />
            </View>
          </View>
          <FormInput
            label="Ethnic Group"
            value={patientDetails.ethnicGroup}
            onChangeText={(text) => updatePatientDetails({ ethnicGroup: text })}
            placeholder="Enter ethnic group"
          />
          <FormInput
            label="Gestational age at delivery (weeks)"
            value={patientDetails.gestationalAge}
            onChangeText={(text) => updatePatientDetails({ gestationalAge: text })}
            placeholder="Enter gestational age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <FormInput
            label="Past History"
            value={patientDetails.pastHistory}
            onChangeText={(text) => updatePatientDetails({ pastHistory: text })}
            placeholder="Enter past history"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <FormInput
            label="Comorbidity"
            value={patientDetails.comorbidity}
            onChangeText={(text) => updatePatientDetails({ comorbidity: text })}
            placeholder="Enter comorbidity"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <FormInput
            label="Family History"
            value={patientDetails.familyHistory}
            onChangeText={(text) => updatePatientDetails({ familyHistory: text })}
            placeholder="Enter family history"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        <View style={styles.section}>
          <CheckboxGroup
            label="Vaccination Status"
            options={[
              { value: 'complete', label: 'Complete' },
              { value: 'partial', label: 'Partial' },
              { value: 'unvaccinated', label: 'Unvaccinated' },
            ]}
            selectedValues={patientDetails.vaccinationStatus ? [patientDetails.vaccinationStatus] : []}
            onChange={(values) => updatePatientDetails({ vaccinationStatus: values[0] as any })}
          />
          <CheckboxGroup
            label="Sex"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'ambiguous', label: 'Ambiguous' },
            ]}
            selectedValues={patientDetails.sex ? [patientDetails.sex] : []}
            onChange={(values) => updatePatientDetails({ sex: values[0] as any })}
          />
          <CheckboxGroup
            label="Previous Critical Care Admission"
            options={[
              { value: 'picu', label: 'PICU' },
              { value: 'nicu', label: 'NICU' },
              { value: 'none', label: 'None' },
              { value: 'unknown', label: 'Unknown' },
            ]}
            selectedValues={patientDetails.previousCriticalCare}
            onChange={(values) => updatePatientDetails({ previousCriticalCare: values })}
            multiple
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admission Details</Text>
          <FormInput
            label="Date of Admission to Unit"
            value={patientDetails.dateOfAdmission}
            onChangeText={(text) => updatePatientDetails({ dateOfAdmission: text })}
            placeholder="DD/MM/YYYY"
          />
          <CheckboxGroup
            label="Type of Admission to Unit"
            options={[
              { value: 'planned-surgery', label: 'Planned - following surgery' },
              { value: 'planned-other-surgery', label: 'Planned - following other surgery' },
              { value: 'planned-other', label: 'Planned - other' },
              { value: 'unplanned-other', label: 'Unplanned - other' },
            ]}
            selectedValues={patientDetails.typeOfAdmission}
            onChange={(values) => updatePatientDetails({ typeOfAdmission: values })}
            multiple
          />
          <CheckboxGroup
            label="Source of Admission"
            options={[
              { value: 'same-hospital', label: 'Same hospital' },
              { value: 'other-hospital', label: 'Other hospital' },
              { value: 'clinic', label: 'Clinic' },
              { value: 'home', label: 'Home' },
            ]}
            selectedValues={patientDetails.sourceOfAdmission ? [patientDetails.sourceOfAdmission] : []}
            onChange={(values) => updatePatientDetails({ sourceOfAdmission: values[0] })}
          />
          <CheckboxGroup
            label="Care Admitted From"
            options={[
              { value: 'paediatric-icu', label: 'Paediatric ICU' },
              { value: 'nicu', label: 'NICU' },
              { value: 'level-2-hdu', label: 'Level 2 unit (HDU)' },
            ]}
            selectedValues={patientDetails.careAdmittedFrom}
            onChange={(values) => updatePatientDetails({ careAdmittedFrom: values })}
            multiple
          />
          <CheckboxGroup
            label="Was the patient on oxygen or long term ventilation prior to this admission?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            selectedValues={patientDetails.wasOnOxygen ? [patientDetails.wasOnOxygen] : []}
            onChange={(values) => updatePatientDetails({ wasOnOxygen: values[0] as any })}
          />
          {patientDetails.wasOnOxygen === 'yes' && (
            <CheckboxGroup
              label="Specify type"
              options={[
                { value: 'invasive-ett', label: 'Invasive ventilation via ETT' },
                { value: 'invasive-trach', label: 'Invasive ventilation via trach' },
                { value: 'non-invasive', label: 'Non-invasive ventilation' },
                { value: 'high-flow', label: 'High Flow Oxygen Therapy' },
                { value: 'low-flow', label: 'Low Flow Oxygen Therapy' },
                { value: 'others', label: 'Others' },
              ]}
              selectedValues={patientDetails.oxygenType}
              onChange={(values) => updatePatientDetails({ oxygenType: values })}
              multiple
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <FormInput
            label="Primary Diagnosis"
            value={patientDetails.primaryDiagnosis}
            onChangeText={(text) => updatePatientDetails({ primaryDiagnosis: text })}
            placeholder="Enter primary diagnosis"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <FormInput
            label="Other Reasons for Admission"
            value={patientDetails.otherReasonsForAdmission}
            onChangeText={(text) => updatePatientDetails({ otherReasonsForAdmission: text })}
            placeholder="Enter other reasons"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        <View style={styles.section}>
          <FormInput
            label="Form Completed By"
            value={patientDetails.formCompletedBy}
            onChangeText={(text) => updatePatientDetails({ formCompletedBy: text })}
            placeholder="Enter name"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next: PICU Observations</Text>
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
  thirdWidth: {
    flex: 1,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
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
