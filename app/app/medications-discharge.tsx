import { useRouter } from 'expo-router';
import { Home, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { FormInput } from '@/components/FormInput';
import { useForm } from '@/contexts/FormContext';

export default function MedicationsDischargeScreen() {
  const router = useRouter();
  const { formData, updateMedicationsDischarge, resetForm } = useForm();
  const { medicationsDischarge } = formData;

  const addAntibiotic = () => {
    const updated = [...medicationsDischarge.antibiotics, { name: '', days: '' }];
    updateMedicationsDischarge({ antibiotics: updated });
  };

  const removeAntibiotic = (index: number) => {
    const updated = medicationsDischarge.antibiotics.filter((_, i) => i !== index);
    updateMedicationsDischarge({ antibiotics: updated });
  };

  const updateAntibiotic = (index: number, field: 'name' | 'days', value: string) => {
    const updated = medicationsDischarge.antibiotics.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateMedicationsDischarge({ antibiotics: updated });
  };

  const addSteroid = () => {
    const updated = [...medicationsDischarge.steroidsGiven, { name: '', days: '' }];
    updateMedicationsDischarge({ steroidsGiven: updated });
  };

  const removeSteroid = (index: number) => {
    const updated = medicationsDischarge.steroidsGiven.filter((_, i) => i !== index);
    updateMedicationsDischarge({ steroidsGiven: updated });
  };

  const updateSteroid = (index: number, field: 'name' | 'days', value: string) => {
    const updated = medicationsDischarge.steroidsGiven.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateMedicationsDischarge({ steroidsGiven: updated });
  };

  const handleComplete = () => {
    Alert.alert(
      'Form Completed',
      'The patient data has been saved successfully. Would you like to start a new form?',
      [
        {
          text: 'Stay Here',
          style: 'cancel',
        },
        {
          text: 'New Form',
          onPress: () => {
            resetForm();
            router.push('/' as any);
          },
        },
        {
          text: 'Go Home',
          onPress: () => {
            router.push('/' as any);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medications</Text>
          
          <Text style={styles.subsectionTitle}>Antibiotics</Text>
          {medicationsDischarge.antibiotics.map((item, index) => (
            <View key={index} style={styles.medicationRow}>
              <View style={styles.medicationInputs}>
                <View style={styles.medicationName}>
                  <FormInput
                    label=""
                    value={item.name}
                    onChangeText={(text) => updateAntibiotic(index, 'name', text)}
                    placeholder="Name"
                    style={styles.compactInput}
                  />
                </View>
                <View style={styles.medicationDays}>
                  <FormInput
                    label=""
                    value={item.days}
                    onChangeText={(text) => updateAntibiotic(index, 'days', text)}
                    placeholder="Days"
                    keyboardType="numeric"
                    style={styles.compactInput}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeAntibiotic(index)}
                activeOpacity={0.7}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAntibiotic} activeOpacity={0.7}>
            <Plus size={20} color="#0066CC" />
            <Text style={styles.addButtonText}>Add Antibiotic</Text>
          </TouchableOpacity>

          <Text style={styles.subsectionTitle}>Steroids Given</Text>
          {medicationsDischarge.steroidsGiven.map((item, index) => (
            <View key={index} style={styles.medicationRow}>
              <View style={styles.medicationInputs}>
                <View style={styles.medicationName}>
                  <FormInput
                    label=""
                    value={item.name}
                    onChangeText={(text) => updateSteroid(index, 'name', text)}
                    placeholder="Name"
                    style={styles.compactInput}
                  />
                </View>
                <View style={styles.medicationDays}>
                  <FormInput
                    label=""
                    value={item.days}
                    onChangeText={(text) => updateSteroid(index, 'days', text)}
                    placeholder="Days"
                    keyboardType="numeric"
                    style={styles.compactInput}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeSteroid(index)}
                activeOpacity={0.7}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addSteroid} activeOpacity={0.7}>
            <Plus size={20} color="#0066CC" />
            <Text style={styles.addButtonText}>Add Steroid</Text>
          </TouchableOpacity>

          <FormInput
            label="Anticonvulsants"
            value={medicationsDischarge.anticonvulsants}
            onChangeText={(text) => updateMedicationsDischarge({ anticonvulsants: text })}
            placeholder="Enter anticonvulsants"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <FormInput
            label="Any other medications"
            value={medicationsDischarge.otherMedications}
            onChangeText={(text) => updateMedicationsDischarge({ otherMedications: text })}
            placeholder="Enter other medications"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          <FormInput
            label="Any past medications"
            value={medicationsDischarge.pastMedications}
            onChangeText={(text) => updateMedicationsDischarge({ pastMedications: text })}
            placeholder="Enter past medications"
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Procedures</Text>
          <FormInput
            label="Primary diagnosis for this admission"
            value={medicationsDischarge.primaryDiagnosisForAdmission}
            onChangeText={(text) => updateMedicationsDischarge({ primaryDiagnosisForAdmission: text })}
            placeholder="Enter primary diagnosis"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="Operations and procedures performed during and prior to this admission"
            value={medicationsDischarge.operationsPerformed}
            onChangeText={(text) => updateMedicationsDischarge({ operationsPerformed: text })}
            placeholder="Name of procedure"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="Indication"
            value={medicationsDischarge.procedureIndication}
            onChangeText={(text) => updateMedicationsDischarge({ procedureIndication: text })}
            placeholder="Elective / Emergency"
          />
          <CheckboxGroup
            label="Was a tracheostomy performed during this admission?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            selectedValues={medicationsDischarge.tracheostomyPerformed ? [medicationsDischarge.tracheostomyPerformed] : []}
            onChange={(values) => updateMedicationsDischarge({ tracheostomyPerformed: values[0] as any })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discharge / Outcome Information</Text>
          <CheckboxGroup
            label="Status at discharge from your unit"
            options={[
              { value: 'alive', label: 'Alive' },
              { value: 'dead', label: 'Dead' },
            ]}
            selectedValues={medicationsDischarge.statusAtDischarge ? [medicationsDischarge.statusAtDischarge] : []}
            onChange={(values) => updateMedicationsDischarge({ statusAtDischarge: values[0] as any })}
          />
          <FormInput
            label="Date of discharge (dd/mm/yyyy)"
            value={medicationsDischarge.dateOfDischarge}
            onChangeText={(text) => updateMedicationsDischarge({ dateOfDischarge: text })}
            placeholder="DD/MM/YYYY"
          />

          {medicationsDischarge.statusAtDischarge === 'dead' && (
            <CheckboxGroup
              label="Mode of death"
              options={[
                { value: 'treatment-withdrawn', label: 'Treatment withdrawn' },
                { value: 'treatment-limitation', label: 'Treatment limitation' },
                { value: 'brainstem-death', label: 'Brainstem death criteria' },
                { value: 'failed-cpr', label: 'Failed cardiopulmonary resuscitation' },
                { value: 'other', label: 'Other' },
              ]}
              selectedValues={medicationsDischarge.modeOfDeath}
              onChange={(values) => updateMedicationsDischarge({ modeOfDeath: values })}
              multiple
            />
          )}

          {medicationsDischarge.statusAtDischarge === 'alive' && (
            <>
              <CheckboxGroup
                label="If alive at discharge: Was the patient discharged with oxygen or long term ventilation?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                selectedValues={medicationsDischarge.oxygenAtDischarge ? [medicationsDischarge.oxygenAtDischarge] : []}
                onChange={(values) => updateMedicationsDischarge({ oxygenAtDischarge: values[0] as any })}
              />
              {medicationsDischarge.oxygenAtDischarge === 'yes' && (
                <CheckboxGroup
                  label="Specify type (record highest level of intervention)"
                  options={[
                    { value: 'invasive-ett', label: 'Invasive ventilation via ETT' },
                    { value: 'invasive-trach', label: 'Invasive ventilation via trach' },
                    { value: 'non-invasive', label: 'Non-invasive ventilation' },
                    { value: 'high-flow', label: 'High Flow Therapy' },
                    { value: 'low-flow', label: 'Low Flow Therapy' },
                    { value: 'other', label: 'Other (specify)' },
                  ]}
                  selectedValues={medicationsDischarge.oxygenTypeAtDischarge}
                  onChange={(values) => updateMedicationsDischarge({ oxygenTypeAtDischarge: values })}
                  multiple
                />
              )}
            </>
          )}

          <FormInput
            label="Destination following discharge from your unit"
            value={medicationsDischarge.destinationAfterDischarge}
            onChangeText={(text) => updateMedicationsDischarge({ destinationAfterDischarge: text })}
            placeholder="Same hospital / Other hospital / LAMA / Home/DOR"
          />
          <FormInput
            label="Length of PICU stay"
            value={medicationsDischarge.lengthOfPICUStay}
            onChangeText={(text) => updateMedicationsDischarge({ lengthOfPICUStay: text })}
            placeholder="Enter number of days"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments</Text>
          <FormInput
            label=""
            value={medicationsDischarge.comments}
            onChangeText={(text) => updateMedicationsDischarge({ comments: text })}
            placeholder="Enter any additional comments"
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
          activeOpacity={0.7}
        >
          <Home size={20} color="#FFFFFF" />
          <Text style={styles.completeButtonText}>Complete Form</Text>
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
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B5563',
    marginTop: 12,
    marginBottom: 12,
  },
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  medicationInputs: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  medicationName: {
    flex: 2,
  },
  medicationDays: {
    flex: 1,
  },
  compactInput: {
    paddingVertical: 10,
    minHeight: 0,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0066CC',
    borderStyle: 'dashed',
    marginBottom: 16,
    gap: 8,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066CC',
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
  completeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
