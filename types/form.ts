export interface PatientDetails {
  serialNo: string;
  mrNo: string;
  name: string;
  address: string;
  age: string;
  weight: string;
  height: string;
  ethnicGroup: string;
  gestationalAge: string;
  pastHistory: string;
  comorbidity: string;
  familyHistory: string;
  vaccinationStatus: 'complete' | 'partial' | 'unvaccinated' | '';
  sex: 'male' | 'female' | 'ambiguous' | '';
  previousCriticalCare: string[];
  dateOfAdmission: string;
  typeOfAdmission: string[];
  sourceOfAdmission: string;
  careAdmittedFrom: string[];
  wasOnOxygen: 'yes' | 'no' | '';
  oxygenType: string[];
  primaryDiagnosis: string;
  otherReasonsForAdmission: string;
  formCompletedBy: string;
}

export interface PICUObservations {
  receivesStillOneFaceToFace: 'yes' | 'no' | '';
  hrOnAdmission: string;
  rrOnAdmission: string;
  tempOnAdmission: string;
  spo2OnAdmission: string;
  bloodGasMeasured: 'yes' | 'no' | '';
  arterialPao2: string;
  fio2: string;
  pco2: string;
  hco3: string;
  ph: string;
  intubation: 'yes' | 'no' | '';
  baseExcessSource: string[];
  lactateSource: string[];
  actionScore: string;
  mainReasonForPICU: string[];
  evidenceForPastMedicalHistory: 'yes' | 'no' | '';
  pastMedicalEvidence: string[];
  mechanicalVentilation: string;
  respiratorySupport: string;
  gcs: string;
  pupilReaction: string;
}

export interface DailyIntervention {
  day: number;
  interventions: { [key: string]: boolean };
}

export interface Investigations {
  cbc: { doa: string; dod: string };
  wbc: { doa: string; dod: string };
  platelets: { doa: string; dod: string };
  crp: { doa: string; dod: string };
  lymphocyte: { doa: string; dod: string };
  glucose: { doa: string; dod: string };
  na: { doa: string; dod: string };
  k: { doa: string; dod: string };
  ca: { doa: string; dod: string };
  phosphorus: { doa: string; dod: string };
  magnesium: { doa: string; dod: string };
  bun: { doa: string; dod: string };
  urea: { doa: string; dod: string };
  cr: { doa: string; dod: string };
  gfr: { doa: string; dod: string };
  albumin: { doa: string; dod: string };
  totalBilirubin: { doa: string; dod: string };
  sgpt: { doa: string; dod: string };
  ptInr: { doa: string; dod: string };
  aptt: { doa: string; dod: string };
  antiHav: { doa: string; dod: string };
  hbsag: { doa: string; dod: string };
  antiHcv: { doa: string; dod: string };
  ammonia: { doa: string; dod: string };
  lactate: { doa: string; dod: string };
  urineOrganicAcids: { doa: string; dod: string };
  plasmaOrganicAcids: { doa: string; dod: string };
  neurocombo: string;
  xray: string;
  ultrasound: string;
  mri: string;
  ctScan: string;
  csfFluid: string;
  otherInvestigations: string;
  geneXpert: string;
  cultures: {
    blood: { organism: string; sensitive: string; resistant: string; intermediate: string };
    tracheal: { organism: string; sensitive: string; resistant: string; intermediate: string };
    urine: { organism: string; sensitive: string; resistant: string; intermediate: string };
    other: { organism: string; sensitive: string; resistant: string; intermediate: string };
  };
}

export interface MedicationsDischarge {
  antibiotics: { name: string; days: string }[];
  steroidsGiven: { name: string; days: string }[];
  anticonvulsants: string;
  otherMedications: string;
  pastMedications: string;
  primaryDiagnosisForAdmission: string;
  operationsPerformed: string;
  procedureIndication: string;
  tracheostomyPerformed: 'yes' | 'no' | '';
  statusAtDischarge: 'alive' | 'dead' | '';
  dateOfDischarge: string;
  modeOfDeath: string[];
  oxygenAtDischarge: 'yes' | 'no' | '';
  oxygenTypeAtDischarge: string[];
  destinationAfterDischarge: string;
  lengthOfPICUStay: string;
  comments: string;
}

export interface FormData {
  patientDetails: PatientDetails;
  picuObservations: PICUObservations;
  dailyInterventions: DailyIntervention[];
  investigations: Investigations;
  medicationsDischarge: MedicationsDischarge;
}
