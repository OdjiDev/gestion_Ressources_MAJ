import { ActivatedRoute, Router } from '@angular/router';
import { PersonelService } from 'src/app/services/personel.service';
import { ProduitService } from 'src/app/services/produit.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AffectationDto } from 'src/app/classes/affectation-dto';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { AffectationService } from 'src/app/services/affectation.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-affectation',
  templateUrl: './update-affectation.component.html',
  styleUrls: ['./update-affectation.component.css']
})
export class UpdateAffectationComponent implements OnInit {

  formAffectation: any;
  affectationDto: AffectationDto= new AffectationDto();
  idAffectation: number=0;
  affectationDtos:AffectationDto[]=[];
  message: any;
  style: any;
  formSubmitAttempt: boolean= false;


  constructor(private formBuilder: FormBuilder,
              private affectationService: AffectationService,
                           private router: ActivatedRoute,
              private route: Router
              ){
                this.formAffectation= this.formBuilder.group({
                   id: [null, Validators.required],
                  //nom: [null, Validators.required],
                  motif: [null, Validators.required],
                  date: [null, Validators.required],
                  // affectationDto: [null, Validators.required],
                  });
      this.idAffectation= this.router.snapshot.params['id'];
      this.getAffectation(this.idAffectation);
      // this.affectationDto.affectationDto.id=1;
      this.getAllAffectations();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //Envoi de données vers le serveur
  submitForm(){
    this.formSubmitAttempt= true;
      this.updateAffectation(this.affectationDto);
      // this.getAllAffectations();
  }


  //envoi des données de differentes interfaces à la base de données
  updateAffectation(et: AffectationDto){
    if (this.formAffectation.valid) {
    this.affectationService.updateAffectation(et.id, et).subscribe(
      (data: AffectationDto) => {
        this.affectationDto= data;
        this.showSuccessMessage('Affectation enrégistré avec succès');
        this.formAffectation.reset();
        this.formSubmitAttempt= false;
        return;
      },
      (error) => {
        // Handle error scenario (e.g., display error message)
        console.error("Error updating affectation:", error);
      }
    );
  }else{
    this.showErrorMessage('Verifiez vos données et renseignez les champs obligatoire avec un *')
  }
  }





  getAffectation(id: number){
    this.affectationService.getAffectationById(id).subscribe(
      (data: AffectationDto) => {
        this.affectationDto= data;
      }
    );
  }

  showSuccessMessage(id: any) {
    this.message = 'Opération réussie !\n '+id;
    this.style= "alert alert-success";
    setTimeout(() => {
      this.message = '';
    }, 5000);
    this.route.navigate(['/admin/listaffectation']);
  }

  showErrorMessage(id: any) {
    this.message = 'Oops un probleme est survenu. Opération échouée !\n '+id;
    this.style= "alert alert-danger";
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  //load affectations form the forms
  getAllAffectations(){
    this.affectationService.getAffectations().subscribe(
      (data: AffectationDto[]) => {
        this.affectationDtos= data;
      }
    );
  }
  // verify if the formAffectation's fields are validated
  isFieldValid(field: string) {
    return (!this.formAffectation.get(field).valid && this.formAffectation.get(field).touched) ||
    (this.formAffectation.get(field).untouched && this.formSubmitAttempt);
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

