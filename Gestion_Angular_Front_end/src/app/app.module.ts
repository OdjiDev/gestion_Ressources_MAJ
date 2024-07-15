import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'; // Importez ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageStatistiquesComponent } from './pages/page-statistiques/page-statistiques.component';
import { MenuComponent } from './composants/menu/menu.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommandComponent } from './command/command.component';
import { CreateUsersComponent } from './pages/page-login/create-users/create-users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MiseAJourComponent } from './Mise-a-jour/mise-a-jour/mise-a-jour.component';
import { ProgressBarComponent } from './Mise-a-jour/mise-a-jour/progress-bar/progress-bar.component';
import { InscrireComponent } from './login/inscrire/inscrire.component';
import { ComptableDashboardComponent } from './modules/comptable/components/comptable-dashboard/comptable-dashboard.component';
import { TestComponent } from './test/test/test.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
//import { PersonelDashboardComponent } from './modules/personnel/components/personel-dashboard/personel-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
  //  LoginComponent,
    PageInscriptionComponent,
    PageDashboardComponent,
    PageLoginComponent,
    PageStatistiquesComponent,
    MenuComponent,
    CommandComponent,
    CreateUsersComponent,
    RegisterComponent,
    LoginComponent,
    MiseAJourComponent,
    ProgressBarComponent,
    InscrireComponent,
    TestComponent,
     



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbProgressbarModule,


  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
