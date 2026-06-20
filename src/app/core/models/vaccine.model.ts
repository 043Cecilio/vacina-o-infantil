export enum VaccineStatus {
  APPLIED = 'applied',
  PENDING = 'pending',
  OVERDUE = 'overdue'
}

export interface IChild {
  id: string;
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  photoUrl?: string;
}

export interface IVaccinationRecord {
  id: string;
  childId: string;
  vaccineName: string;
  dose: string;
  status: VaccineStatus;
  dueDate: Date;
  appliedAt?: Date;
}