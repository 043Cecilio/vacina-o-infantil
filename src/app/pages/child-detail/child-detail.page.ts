import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- 1. IMPORTAÇÃO ADICIONADA AQUI
import { DataService } from '../../core/services/data.service';
import { VaccineEngineService } from '../../core/services/vaccine-engine.service';
import { IVaccinationRecord, VaccineStatus } from '../../core/models/vaccine.model';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.page.html',
  styleUrls: ['./child-detail.page.scss'],
  standalone: true,
  // 2. ADICIONADO O GERENCIADOR DE FORMULÁRIOS (FormsModule) NA LISTA ABAIXO
  imports: [IonicModule, CommonModule, RouterModule, FormsModule] 
})
export class ChildDetailPage implements OnInit {
  public child: any;
  public records: IVaccinationRecord[] = [];
  public segmentView: string = 'all'; // Controla os filtros de abas (segmentos)

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private vaxEngine: VaccineEngineService
  ) {}

  ngOnInit() {
    // Captura o ID vindo da URL
    const childId = this.route.snapshot.paramMap.get('id');
    
    if (childId) {
      // Busca dados da criança
      const rawChildren = this.dataService.getChildren();
      this.child = rawChildren.find(c => c.id === childId);

      // Busca e calcula os status das vacinas dela
      const rawRecords = this.dataService.getRecordsByChildId(childId);
      this.records = rawRecords.map(record => ({
        ...record,
        status: this.vaxEngine.determineRecordStatus(record)
      }));
    }
  }

  // Helper para filtrar os registros na tela baseado no segmento selecionado
  get filteredRecords() {
    if (this.segmentView === 'applied') {
      return this.records.filter(r => r.status === VaccineStatus.APPLIED);
    }
    if (this.segmentView === 'pending') {
      return this.records.filter(r => r.status === VaccineStatus.PENDING || r.status === VaccineStatus.OVERDUE);
    }
    return this.records;
  }
}