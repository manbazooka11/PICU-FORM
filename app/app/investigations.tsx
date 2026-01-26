import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FormInput } from '@/components/FormInput';
import { useForm } from '@/contexts/FormContext';

export default function InvestigationsScreen() {
  const router = useRouter();
  const { formData, updateInvestigations } = useForm();
  const { investigations } = formData;

  const handleNext = () => {
    router.push('/medications-discharge' as any);
  };

  const updateTest = (test: keyof typeof investigations, field: 'doa' | 'dod', value: string) => {
    const testData = investigations[test] as { doa: string; dod: string };
    updateInvestigations({
      [test]: { ...testData, [field]: value },
    });
  };

  const updateCulture = (
    cultureType: 'blood' | 'tracheal' | 'urine' | 'other',
    field: 'organism' | 'sensitive' | 'resistant' | 'intermediate',
    value: string
  ) => {
    updateInvestigations({
      cultures: {
        ...investigations.cultures,
        [cultureType]: {
          ...investigations.cultures[cultureType],
          [field]: value,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investigations</Text>
          <View style={styles.tableHeader}>
            <View style={styles.testNameColumn}>
              <Text style={styles.headerText}>Test</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.headerText}>DOA</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.headerText}>DOD</Text>
            </View>
          </View>

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>CBC</Text>
          </View>
          {['cbc', 'wbc', 'platelets', 'crp', 'lymphocyte'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>{test.toUpperCase()}</Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Biochemistry</Text>
          </View>
          {['glucose', 'na', 'k', 'ca', 'phosphorus', 'magnesium'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>{test.charAt(0).toUpperCase() + test.slice(1)}</Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Renal Function Test</Text>
          </View>
          {['bun', 'urea', 'cr', 'gfr'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>{test.toUpperCase()}</Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Liver Function Test</Text>
          </View>
          {['albumin', 'totalBilirubin', 'sgpt'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>
                  {test === 'totalBilirubin' ? 'Total Bilirubin' : test.toUpperCase()}
                </Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Coagulation Profile</Text>
          </View>
          {['ptInr', 'aptt'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>{test === 'ptInr' ? 'PT/INR' : test.toUpperCase()}</Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Viral Workup</Text>
          </View>
          {['antiHav', 'hbsag', 'antiHcv'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>
                  {test === 'antiHav' ? 'Anti HAV' : test === 'hbsag' ? 'HBsAg' : 'Anti HCV'}
                </Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <View style={styles.subsectionHeader}>
            <Text style={styles.subsectionTitle}>Metabolic Workup</Text>
          </View>
          {['ammonia', 'lactate', 'urineOrganicAcids', 'plasmaOrganicAcids'].map((test) => (
            <View key={test} style={styles.tableRow}>
              <View style={styles.testNameColumn}>
                <Text style={styles.testName}>
                  {test === 'urineOrganicAcids'
                    ? 'Urine for Organic Acids'
                    : test === 'plasmaOrganicAcids'
                    ? 'Plasma for Organic Acids'
                    : test.charAt(0).toUpperCase() + test.slice(1)}
                </Text>
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).doa}
                  onChangeText={(text) => updateTest(test as any, 'doa', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
              <View style={styles.valueColumn}>
                <FormInput
                  label=""
                  value={(investigations[test as keyof typeof investigations] as any).dod}
                  onChangeText={(text) => updateTest(test as any, 'dod', text)}
                  placeholder=""
                  style={styles.compactInput}
                />
              </View>
            </View>
          ))}

          <FormInput
            label="Neurocombo"
            value={investigations.neurocombo}
            onChangeText={(text) => updateInvestigations({ neurocombo: text })}
            placeholder="Enter neurocombo details"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Radiological Workup</Text>
          <FormInput
            label="X-Ray"
            value={investigations.xray}
            onChangeText={(text) => updateInvestigations({ xray: text })}
            placeholder="Enter X-Ray findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="Ultrasound"
            value={investigations.ultrasound}
            onChangeText={(text) => updateInvestigations({ ultrasound: text })}
            placeholder="Enter ultrasound findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="MRI"
            value={investigations.mri}
            onChangeText={(text) => updateInvestigations({ mri: text })}
            placeholder="Enter MRI findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="CT Scan"
            value={investigations.ctScan}
            onChangeText={(text) => updateInvestigations({ ctScan: text })}
            placeholder="Enter CT scan findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="CSF Fluid"
            value={investigations.csfFluid}
            onChangeText={(text) => updateInvestigations({ csfFluid: text })}
            placeholder="Enter CSF fluid findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="Other Significant Investigations"
            value={investigations.otherInvestigations}
            onChangeText={(text) => updateInvestigations({ otherInvestigations: text })}
            placeholder="Enter other investigations"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
          <FormInput
            label="Gene Xpert"
            value={investigations.geneXpert}
            onChangeText={(text) => updateInvestigations({ geneXpert: text })}
            placeholder="Enter Gene Xpert findings"
            multiline
            numberOfLines={2}
            style={styles.textArea}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultures</Text>
          {['blood', 'tracheal', 'urine', 'other'].map((cultureType) => (
            <View key={cultureType} style={styles.cultureSection}>
              <Text style={styles.cultureTitle}>{cultureType.charAt(0).toUpperCase() + cultureType.slice(1)}</Text>
              <FormInput
                label="Organism"
                value={investigations.cultures[cultureType as 'blood' | 'tracheal' | 'urine' | 'other'].organism}
                onChangeText={(text) => updateCulture(cultureType as any, 'organism', text)}
                placeholder="Enter organism"
              />
              <FormInput
                label="Sensitive"
                value={investigations.cultures[cultureType as 'blood' | 'tracheal' | 'urine' | 'other'].sensitive}
                onChangeText={(text) => updateCulture(cultureType as any, 'sensitive', text)}
                placeholder="Enter sensitive antibiotics"
              />
              <FormInput
                label="Resistant"
                value={investigations.cultures[cultureType as 'blood' | 'tracheal' | 'urine' | 'other'].resistant}
                onChangeText={(text) => updateCulture(cultureType as any, 'resistant', text)}
                placeholder="Enter resistant antibiotics"
              />
              <FormInput
                label="Intermediate"
                value={investigations.cultures[cultureType as 'blood' | 'tracheal' | 'urine' | 'other'].intermediate}
                onChangeText={(text) => updateCulture(cultureType as any, 'intermediate', text)}
                placeholder="Enter intermediate antibiotics"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next: Medications & Discharge</Text>
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  testNameColumn: {
    flex: 2,
    justifyContent: 'center',
  },
  valueColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  subsectionHeader: {
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  testName: {
    fontSize: 13,
    color: '#4B5563',
  },
  compactInput: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 13,
    minHeight: 0,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  cultureSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  cultureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
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
