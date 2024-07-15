import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeDto } from 'src/app/classes/demande-dto';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {


  demandeDtos: DemandeDto[] = [];

  constructor(private demandeService: DemandeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDemandes();
  }

  private getDemandes(){
    this.demandeService.getDemandes().subscribe(data => {
      this.demandeDtos = data;
    });
  }
onCreateDemande()
{
  this.router.navigate(['personel/adddemande']);
}
  demandeDetails(id: number){
    this.router.navigate(['detailsdemande', id]);
  }

  updateDemande(id: number){
    this.router.navigate(['updatedemande', id]);
  }

  deleteDemande(id: number){
    this.demandeService.deleteDemande(id).subscribe( data => {
      console.log(data);
      this.getDemandes();
    })
  }
}






