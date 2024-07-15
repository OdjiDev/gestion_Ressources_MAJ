import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalerDto } from 'src/app/classes/signaler-dto';
import { SignalerService } from 'src/app/services/signaler-dto.service';

@Component({
  selector: 'app-list-signaler',
  templateUrl: './list-signaler.component.html',
  styleUrls: ['./list-signaler.component.css']
})
export class ListSignalerComponent implements OnInit {


  signalerDtos: SignalerDto[] = [];

  constructor(private signalerService: SignalerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSignalers();
  }

  private getSignalers(){
    this.signalerService.getSignalers().subscribe(data => {
      this.signalerDtos = data;
    });
  }
onCreateSignaler()
{
  this.router.navigate(['personel/addsignaler']);
}
  signalerDetails(id: number){
    this.router.navigate(['detailssignaler', id]);
  }

  updateSignaler(id: number){
    this.router.navigate(['updatesignaler', id]);
  }

  deleteSignaler(id: number){
    this.signalerService.deleteSignaler(id).subscribe( data => {
      console.log(data);
      this.getSignalers();
    })
  }
}



