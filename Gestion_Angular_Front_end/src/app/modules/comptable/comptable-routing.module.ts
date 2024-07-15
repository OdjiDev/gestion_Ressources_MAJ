import { CreateProcesVerbalReceptionComponent } from './interfaces/create-proces-verbal-reception/create-proces-verbal-reception.component';
import { ListProcesVerbalReceptionComponent } from './interfaces/list-proces-verbal-reception/list-proces-verbal-reception.component';
import { RouterModule, Routes } from "@angular/router";
import { ComptableDashboardComponent } from "./components/comptable-dashboard/comptable-dashboard.component";
import { NgModule } from '@angular/core';
import { CreateOrdreMouvementComponent } from './interfaces/create-ordre-mouvement/create-ordre-mouvement.component';
import { ListOrdreMouvementComponent } from './interfaces/list-ordre-mouvement/list-ordre-mouvement.component';
import { CreateSuivieComponent } from './interfaces/suivie/create-suivie/create-suivie.component';
import { ListSuivieComponent } from './interfaces/suivie/list-suivie/list-suivie.component';

const routes: Routes = [
  {
    path: '',
    component: ComptableDashboardComponent,
     children: [

    //routes de proces verbal
    { path: 'add-proces-verbal',component: CreateProcesVerbalReceptionComponent },
    { path: 'list-proces-verbal',component: ListProcesVerbalReceptionComponent },
    //{ path: 'updateprocesverbal',component: UpdateProcesverbalRComponent},
   // { path: 'searchprocesverbal',component: CreateProcesverbalComponent  },


     //routes de ordre mouvement
     { path: 'add-ordre-mouvement',component: CreateOrdreMouvementComponent},
     { path: 'list-ordre-mouvement',component: ListOrdreMouvementComponent },
     //{ path: 'updateprocesverbal',component: UpdateProcesverbalRComponent},
    // { path: 'searchprocesverbal',component: CreateProcesverbalComponent  },

//routes de ordre mouvement
{ path: 'add-suivie',component: CreateSuivieComponent},
{ path: 'list-suivie',component: ListSuivieComponent },
//{ path: 'updateprocesverbal',component: UpdateProcesverbalRComponent},
// { path: 'searchprocesverbal',component: CreateProcesverbalComponent  },




  ]
},

];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class ComptableRoutingModule { }
