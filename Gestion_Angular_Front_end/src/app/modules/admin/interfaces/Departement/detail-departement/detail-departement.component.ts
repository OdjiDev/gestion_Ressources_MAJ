import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-detail-departement',
  templateUrl: './detail-departement.component.html',
  styleUrls: ['./detail-departement.component.css']
})
export class DetailDepartementComponent implements OnInit {

  id!: number;
departementDto: DepartementDto= new DepartementDto();
  constructor(private route: ActivatedRoute, private departementService: DepartementService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.departementDto = new DepartementDto();
    this.departementService.getDepartementById(this.id).subscribe( data => {
      this.departementDto = data;
    });
  }

}
