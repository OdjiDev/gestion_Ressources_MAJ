import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { BureauService } from 'src/app/services/bureau.service';

@Component({
  selector: 'app-update-bureau',
  templateUrl: './update-bureau.component.html',
  styleUrls: ['./update-bureau.component.css']
})
export class UpdateBureauComponent implements OnInit {



  formBureau: any;
  bureauDto: BureauDto= new BureauDto();
  idBureau: number=0;
departementDtos:DepartementDto[]=[];
  message: any;
  style: any;
  formSubmitAttempt: boolean= false;

  constructor(private formBuilder: FormBuilder,
              private bureauService: BureauService,
                     private router: ActivatedRoute,
              private route: Router
              ){
                this.formBureau= this.formBuilder.group({
                  // id: [null, Validators.required],
                  nom: [null, Validators.required],
                  // bureauDto: [null, Validators.required],
                  });
      this.idBureau= this.router.snapshot.params['id'];
      this.getBureau(this.idBureau);
      // this.bureauDto.bureauDto.id=1;
      //                                                                                this.getAllBureaus();




  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //Envoi de données vers le serveur
  submitForm(){
    this.formSubmitAttempt= true;
      this.updateBureau(this.bureauDto);
      // this.getAllBureaus();
  }


  //envoi des données de differentes interfaces à la base de données
  updateBureau(eb: BureauDto){
    if (this.formBureau.valid) {
    this.bureauService.updateBureau(eb.id, eb).subscribe(
      (data: BureauDto) => {
        this.bureauDto= data;
        this.showSuccessMessage('Bureau enrégistré avec succès');
        this.formBureau.reset();
        this.formSubmitAttempt= false;
        return;
      },
      (error) => {
        // Handle error scenario (e.g., display error message)
        console.error("Error updating bureau:", error);
      }
    );
  }else{
    this.showErrorMessage('Verifiez vos données et renseignez les champs obligatoire avec un *')
  }
  }



  getBureau(id: number){
    this.bureauService.getBureauById(id).subscribe(
      (data: BureauDto) => {
        this.bureauDto= data;
      }
    );
  }

  showSuccessMessage(id: any) {
    this.message = 'Opération réussie !\n '+id;
    this.style= "alert alert-success";
    setTimeout(() => {
      this.message = '';
    }, 5000);
    this.route.navigate(['/admin/list-bureau']);
  }

  showErrorMessage(id: any) {
    this.message = 'Oops un probleme est survenu. Opération échouée !\n '+id;
    this.style= "alert alert-danger";
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  //load bureaus form the forms
  // getAllDepartements(){
  //   this.departementService.getdepartements().subscribe(
  //     (data: departementDto[]) => {
  //       this.departementDtos= data;
  //     }
  //   );
  // }
  // verify if the formBureau's fields are validated
  isFieldValid(field: string) {
    return (!this.formBureau.get(field).valid && this.formBureau.get(field).touched) ||
    (this.formBureau.get(field).untouched && this.formSubmitAttempt);
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

