import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { VaccineEngineService } from '../core/services/vaccine-engine.service';
import { IChild, VaccineStatus } from '../core/models/vaccine.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  public childrenList: any[] = [];
  public activeCampaigns: any[] = [];
  public currentBannerIndex = 0;
  public banners = [
    'assets/images/banner.png',
    'assets/images/banner-1.png',
    'assets/images/banner-2.png'
  ];

  constructor(
    private dataService: DataService,
    private vaxEngine: VaccineEngineService
  ) {}

  ngOnInit() {
    this.activeCampaigns = this.dataService.getCampaigns();
    this.loadChildrenDashboard();
  }

  nextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
  }

  prevBanner() {
    this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
  }

  loadChildrenDashboard() {
    const rawChildren = this.dataService.getChildren();

    this.childrenList = rawChildren.map(child => {
      const records = this.dataService.getRecordsByChildId(child.id);

      const updatedRecords = records.map(r => ({
        ...r,
        status: this.vaxEngine.determineRecordStatus(r)
      }));

      const hasOverdue = updatedRecords.some(r => r.status === VaccineStatus.OVERDUE);

      return {
        ...child,
        statusResumo: hasOverdue ? 'Pendente de Atenção' : 'Caderneta em Dia',
        hasAlert: hasOverdue
      };
    });
  }
}