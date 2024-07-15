import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureDto } from 'src/app/classes/facture-dto';
import { FactureService } from 'src/app/services/facture.service';

@Component({
  selector: 'app-headerfacture',
  templateUrl: './headerfacture.component.html',
  styleUrls: ['./headerfacture.component.css']
})
export class HeaderfactureComponent implements OnInit {


factureDto: FactureDto = new FactureDto();
constructor(private factureService:FactureService,
  private router: Router) { }

ngOnInit(): void {
}

saveFacture(){
  this.factureService.addFacture(this.factureDto).subscribe( data =>{
    console.log(data);
    this.goTofactureList();
  },
  error => console.log(error));
}

goTofactureList(){
  this.router.navigate(['admin/listfacture']);
}

onSubmit(){
  console.log(this.factureDto);
  this.saveFacture();
}

}


