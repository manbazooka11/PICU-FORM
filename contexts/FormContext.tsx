import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import type { FormData } from '@/types/form';
const STORAGE_KEY = 'nich-form-data';
const initialFormData: FormData = {
  patientDetails: {
    serialNo: '',
    mrNo: '',
    name: '',
    address: '',
    age: '',
    weight: '',
    height: '',
    ethnicGroup: '',
    gestationalAge: '',
    pastHistory: '',
    comorbidity: '',
    familyHistory: '',
    vaccinationStatus: '',
    sex: '',
    previousCriticalCare: [],
    dateOfAdmission: '',
    typeOfAdmission: [],
    sourceOfAdmission: '',
    careAdmittedFrom: [],
    wasOnOxygen: '',
    oxygenType: [],
    primaryDiagnosis: '',
    otherReasonsForAdmission: '',
    formCompletedBy: '',
  },
  picuObservations: {
    receivesStillOneFaceToFace: '',
    hrOnAdmission: '',
    rrOnAdmission: '',
    tempOnAdmission: '',
    spo2OnAdmission: '',
    bloodGasMeasured: '',
    arterialPao2: '',
    fio2: '',
    pco2: '',
    hco3: '',
    ph: '',
    intubation: '',
    baseExcessSource: [],
    lactateSource: [],
    actionScore: '',
    mainReasonForPICU: [],
    evidenceForPastMedicalHistory: '',
    pastMedicalEvidence: [],
    mechanicalVentilation: '',
    respiratorySupport: '',
    gcs: '',
    pupilReaction: '',
  },
  dailyInterventions: [],
  investigations: {
    cbc: { doa: '', dod: '' },
    wbc: { doa: '', dod: '' },
    platelets: { doa: '', dod: '' },
    crp: { doa: '', dod: '' },
    lymphocyte: { doa: '', dod: '' },
    glucose: { doa: '', dod: '' },
    na: { doa: '', dod: '' },
    k: { doa: '', dod: '' },
    ca: { doa: '', dod: '' },
    phosphorus: { doa: '', dod: '' },
    magnesium: { doa: '', dod: '' },
    bun: { doa: '', dod: '' },
    urea: { doa: '', dod: '' },
    cr: { doa: '', dod: '' },
    gfr: { doa: '', dod: '' },
    albumin: { doa: '', dod: '' },
    totalBilirubin: { doa: '', dod: '' },
    sgpt: { doa: '', dod: '' },
    ptInr: { doa: '', dod: '' },
    aptt: { doa: '', dod: '' },
    antiHav: { doa: '', dod: '' },
    hbsag: { doa: '', dod: '' },
    antiHcv: { doa: '', dod: '' },
    ammonia: { doa: '', dod: '' },
    lactate: { doa: '', dod: '' },
    urineOrganicAcids: { doa: '', dod: '' },
    plasmaOrganicAcids: { doa: '', dod: '' },
    neurocombo: '',
    xray: '',
    ultrasound: '',
    mri: '',
    ctScan: '',
    csfFluid: '',
    otherInvestigations: '',
    geneXpert: '',
    cultures: {
      blood: { organism: '', sensitive: '', resistant: '', intermediate: '' },
      tracheal: { organism: '', sensitive: '', resistant: '', intermediate: '' },
      urine: { organism: '', sensitive: '', resistant: '', intermediate: '' },
      other: { organism: '', sensitive: '', resistant: '', intermediate: '' },
    },
  },
  medicationsDischarge: {
    antibiotics: [],
    steroidsGiven: [],
    anticonvulsants: '',
    otherMedications: '',
    pastMedications: '',
    primaryDiagnosisForAdmission: '',
    operationsPerformed: '',
    procedureIndication: '',
    tracheostomyPerformed: '',
    statusAtDischarge: '',
    dateOfDischarge: '',
    modeOfDeath: [],
    oxygenAtDischarge: '',
    oxygenTypeAtDischarge: [],
    destinationAfterDischarge: '',
    lengthOfPICUStay: '',
    comments: '',
  },
};

export const [FormProvider, useForm] = createContextHook(() => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadFormData();
  }, []);

  const saveFormData = async (data: FormData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const loadFormData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFormData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      saveFormData(formData);
    }
  }, [formData, isLoaded]);

  const updatePatientDetails = (data: Partial<FormData['patientDetails']>) => {
    setFormData((prev) => ({
      ...prev,
      patientDetails: { ...prev.patientDetails, ...data },
    }));
  };

  const updatePICUObservations = (data: Partial<FormData['picuObservations']>) => {
    setFormData((prev) => ({
      ...prev,
      picuObservations: { ...prev.picuObservations, ...data },
    }));
  };

  const updateDailyInterventions = (data: FormData['dailyInterventions']) => {
    setFormData((prev) => ({
      ...prev,
      dailyInterventions: data,
    }));
  };

  const updateInvestigations = (data: Partial<FormData['investigations']>) => {
    setFormData((prev) => ({
      ...prev,
      investigations: { ...prev.investigations, ...data },
    }));
  };

  const updateMedicationsDischarge = (data: Partial<FormData['medicationsDischarge']>) => {
    setFormData((prev) => ({
      ...prev,
      medicationsDischarge: { ...prev.medicationsDischarge, ...data },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updatePatientDetails,
    updatePICUObservations,
    updateDailyInterventions,
    updateInvestigations,
    updateMedicationsDischarge,
    resetForm,
    isLoaded,
  };
});
