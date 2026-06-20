import { Injectable } from '@angular/core';
import { IChild, IVaccinationRecord, VaccineStatus } from '../models/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private children: IChild[] = [
    { id: '1', name: 'Pedro Henrique', birthDate: new Date(2024, 5, 10), gender: 'M' },
    { id: '2', name: 'Ana Clara', birthDate: new Date(2021, 2, 15), gender: 'F' }
  ];

  private vaccinationRecords: IVaccinationRecord[] = [
    { id: 'r1', childId: '1', vaccineName: 'BCG', dose: 'Dose Única', status: VaccineStatus.APPLIED, dueDate: new Date(2024, 5, 15), appliedAt: new Date(2024, 5, 12) },
    { id: 'r2', childId: '1', vaccineName: 'Hepatite B', dose: '1ª Dose', status: VaccineStatus.PENDING, dueDate: new Date(2026, 8, 20) },
    { id: 'r3', childId: '2', vaccineName: 'Tríplice Viral', dose: '1ª Dose', status: VaccineStatus.APPLIED, dueDate: new Date(2022, 2, 15), appliedAt: new Date(2022, 2, 20) },
    { id: 'r4', childId: '2', vaccineName: 'Febre Amarela', dose: 'Reforço', status: VaccineStatus.PENDING, dueDate: new Date(2025, 11, 1) }
  ];

  private campaigns = [
    { id: 'c1', title: 'Campanha Nacional de Multivacinação', description: 'Leve seu filho menor de 15 anos para atualizar a caderneta.', target: 'Crianças e adolescentes' }
  ];

  constructor() {}

  getChildren(): IChild[] {
    return this.children;
  }

  getCampaigns() {
    return this.campaigns;
  }

  getRecordsByChildId(childId: string): IVaccinationRecord[] {
    return this.vaccinationRecords.filter(record => record.childId === childId);
  }
}