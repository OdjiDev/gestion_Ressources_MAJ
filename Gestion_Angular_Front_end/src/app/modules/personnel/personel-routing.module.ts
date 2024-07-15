import { PersonelDashboardComponent } from "./components/personel-dashboard/personel-dashboard.component";
import { CreateDemandeComponent } from "./interfaces/demande/create-demande/create-demande.component";
import { ListDemandeComponent } from "./interfaces/demande/list-demande/list-demande.component";
import { UpdateDemandeComponent } from "./interfaces/demande/update-demande/update-demande.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSignalerComponent } from "./interfaces/signaler/create-signaler/create-signaler.component";
import { ListSignalerComponent } from "./interfaces/signaler/list-signaler/list-signaler.component";
import { CreateSuivieComponent } from "../comptable/interfaces/suivie/create-suivie/create-suivie.component";




const routes: Routes = [
  {
    path: '',
    component: PersonelDashboardComponent,
     children: [

    //routes de departement
    { path: 'adddemande',component: CreateDemandeComponent },
    { path: 'listdemande',component: ListDemandeComponent  },
    { path: 'updatedemande',component: UpdateDemandeComponent},
   // { path: 'searchdemande',component: CreateDemandeComponent  },

    //routes de personeldepartement
      { path: 'listpersonel',component: ListDemandeComponent  },


          //routes de signalement
    { path: 'addsignaler',component: CreateSignalerComponent },
    { path: 'listsignaler',component: ListSignalerComponent  },
   // { path: 'searchsignaler',component: CreateSignalerComponent  },



    //routes de Suivie
    { path: 'add-suivie',component: CreateSuivieComponent },
    { path: 'list-suivie',component: ListDemandeComponent  },
    { path: 'update-suivie',component: UpdateDemandeComponent},
   // { path: 'search-suivie',component: CreateDemandeComponent  },

     ]
     },

     ];
     @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    export class PeronelRoutingModule { }
