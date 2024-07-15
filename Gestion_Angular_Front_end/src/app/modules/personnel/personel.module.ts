import { Router } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeronelRoutingModule } from './personel-routing.module';

import { CreateDemandeComponent } from './interfaces/demande/create-demande/create-demande.component';
import {  SideBarComponent} from '../personnel/components/side-bar/side-bar.component';
import { ListDemandeComponent } from './interfaces/demande/list-demande/list-demande.component';
import { PersonelDashboardComponent } from './components/personel-dashboard/personel-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListPersonelComponent } from './interfaces/personel/list-personel/list-personel.component';
import { DetailPersonelComponent } from './interfaces/personel/detail-personel/detail-personel.component';
import { CreateSignalerComponent } from './interfaces/signaler/create-signaler/create-signaler.component';
import { ListSignalerComponent } from './interfaces/signaler/list-signaler/list-signaler.component';
import { UpdateSignalerComponent } from './interfaces/signaler/update-signaler/update-signaler.component';
import { FieldErrorDisplayComponent } from 'src/app/field-error-display/field-error-display.component';
import { CreateSuivieComponent } from '../comptable/interfaces/suivie/create-suivie/create-suivie.component';


@NgModule({
  declarations: [
    SideBarComponent,
    PersonelDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,

CreateDemandeComponent,
ListDemandeComponent,
ListPersonelComponent,
DetailPersonelComponent,
CreateSignalerComponent,
ListSignalerComponent,
UpdateSignalerComponent,
//FieldErrorDisplayComponent,


],


imports: [
  CommonModule,
  PeronelRoutingModule,
  FormsModule,
  ReactiveFormsModule
]
})
export class PersonelModule { }
