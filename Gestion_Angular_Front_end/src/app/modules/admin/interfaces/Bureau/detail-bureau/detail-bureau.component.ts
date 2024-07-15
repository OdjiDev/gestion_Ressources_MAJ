import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { BureauService } from 'src/app/services/bureau.service';

@Component({
  selector: 'app-detail-bureau',
  templateUrl: './detail-bureau.component.html',
  styleUrls: ['./detail-bureau.component.css']
})
export class DetailBureauComponent implements OnInit {


  id!: number;
bureauDto: BureauDto= new BureauDto();
  constructor(private route: ActivatedRoute, private bureauService: BureauService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.bureauDto = new BureauDto();
    this.bureauService.getBureauById(this.id).subscribe( data => {
      this.bureauDto = data;
    });
  }

}
