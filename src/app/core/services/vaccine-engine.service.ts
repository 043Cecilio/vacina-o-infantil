import { Injectable } from '@angular/core';
import { IVaccinationRecord, VaccineStatus } from '../models/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineEngineService {
  constructor() {}

  public determineRecordStatus(record: IVaccinationRecord): VaccineStatus {
    if (record.appliedAt || record.status === VaccineStatus.APPLIED) {
      return VaccineStatus.APPLIED;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const limitDate = new Date(record.dueDate);
    limitDate.setHours(0, 0, 0, 0);

    if (limitDate < today) {
      return VaccineStatus.OVERDUE;
    }

    return VaccineStatus.PENDING;
  }
}