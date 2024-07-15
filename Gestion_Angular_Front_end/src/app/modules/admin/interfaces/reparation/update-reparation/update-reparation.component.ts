import { BureauService } from 'src/app/services/bureau.service';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReparationService } from 'src/app/services/reparation.service';
import { ReparationDto } from 'src/app/reparation-dto';

@Component({
  selector: 'app-update-reparation',
  templateUrl: './update-reparation.component.html',
  styleUrls: ['./update-reparation.component.css']
})
export class UpdateReparationComponent implements OnInit {


  formReparation: any;
  reparationDto: ReparationDto= new ReparationDto();
  idReparation: number=0;
  bureauDtos:BureauDto[]=[];
  message: any;
  style: any;
  formSubmitAttempt: boolean= false;


  constructor(private formBuilder: FormBuilder,
              private reparationService: ReparationService,
              private bureauService:BureauService,
              private router: ActivatedRoute,
              private route: Router
              ){
                this.formReparation= this.formBuilder.group({
                  code: [null, Validators.required],
                  nom: [null, Validators.required],
                  // bureauDto: [null, Validators.required],
                  });
      this.idReparation= this.router.snapshot.params['id'];
      this.getReparation(this.idReparation);
      // this.reparationDto.bureauDto.id=1;
      this.getAllBureaus();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //Envoi de données vers le serveur
  submitForm(){
    this.formSubmitAttempt= true;
      this.updateReparation(this.reparationDto);
                 this.getAllBureaus();
  }


  //envoi des données de differentes interfaces à la base de données
  updateReparation(et: ReparationDto){
    if (this.formReparation.valid) {
    this.reparationService.updateReparation(et.id, et).subscribe(
      (data: ReparationDto) => {
        this.reparationDto= data;
        this.showSuccessMessage('Reparation enrégistré avec succès');
        this.formReparation.reset();
        this.formSubmitAttempt= false;
        return;
      },
      (error) => {
        // Handle error scenario (e.g., display error message)
        console.error("Error updating reparation:", error);
      }
    );
  }else{
    this.showErrorMessage('Verifiez vos données et renseignez les champs obligatoire avec un *')
  }
  }





  getReparation(id: number){
    this.reparationService.getReparationById(id).subscribe(
      (data: ReparationDto) => {
        this.reparationDto= data;
      }
    );
  }

  showSuccessMessage(id: any) {
    this.message = 'Opération réussie !\n '+id;
    this.style= "alert alert-success";
    setTimeout(() => {
      this.message = '';
    }, 5000);
    this.route.navigate(['/admin/listreparation']);
  }

  showErrorMessage(id: any) {
    this.message = 'Oops un probleme est survenu. Opération échouée !\n '+id;
    this.style= "alert alert-danger";
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  //load bureaus form the forms
  getAllBureaus(){
    this.bureauService.getBureaus().subscribe(
      (data: BureauDto[]) => {
        this.bureauDtos= data;
      }
    );
  }
  // verify if the formReparation's fields are validated
  isFieldValid(field: string) {
    return (!this.formReparation.get(field).valid && this.formReparation.get(field).touched) ||
    (this.formReparation.get(field).untouched && this.formSubmitAttempt);
  }

  // display css style for the the fields that aren't validate
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  // loops fields in ordeer to verify if all are ok
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
}

