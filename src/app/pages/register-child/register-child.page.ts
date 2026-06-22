import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.page.html',
  styleUrls: ['./register-child.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class RegisterChildPage {
  public child = {
    name: '',
    birthDate: '',
    gender: '',
    cpf: '',
    parentName: '',
    phone: '',
    notes: ''
  };

  public successMessage = '';

  submitForm() {
    console.log('Cadastro solicitado:', this.child);

    this.successMessage = 'Cadastro solicitado';

    this.child = {
      name: '',
      birthDate: '',
      gender: '',
      cpf: '',
      parentName: '',
      phone: '',
      notes: ''
    };
  }
}
