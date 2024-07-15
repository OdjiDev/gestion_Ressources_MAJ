import { BureauService } from 'src/app/services/bureau.service';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.css']
})
export class UpdateDepartementComponent implements OnInit {


  formDepartement: any;
  departementDto: DepartementDto= new DepartementDto();
  idDepartement: number=0;
  bureauDtos:BureauDto[]=[];
  message: any;
  style: any;
  formSubmitAttempt: boolean= false;


  constructor(private formBuilder: FormBuilder,
              private departementService: DepartementService,
              private bureauService:BureauService,
              private router: ActivatedRoute,
              private route: Router
              ){
                this.formDepartement= this.formBuilder.group({
                  code: [null, Validators.required],
                  nom: [null, Validators.required],
                  // bureauDto: [null, Validators.required],
                  });
      this.idDepartement= this.router.snapshot.params['id'];
      this.getDepartement(this.idDepartement);
      // this.departementDto.bureauDto.id=1;
      this.getAllBureaus();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //Envoi de données vers le serveur
  submitForm(){
    this.formSubmitAttempt= true;
      this.updateDepartement(this.departementDto);
                 this.getAllBureaus();
  }


  //envoi des données de differentes interfaces à la base de données
  updateDepartement(et: DepartementDto){
    if (this.formDepartement.valid) {
    this.departementService.updateDepartement(et.id, et).subscribe(
      (data: DepartementDto) => {
        this.departementDto= data;
        this.showSuccessMessage('Departement enrégistré avec succès');
        this.formDepartement.reset();
        this.formSubmitAttempt= false;
        return;
      },
      (error) => {
        // Handle error scenario (e.g., display error message)
        console.error("Error updating departement:", error);
      }
    );
  }else{
    this.showErrorMessage('Verifiez vos données et renseignez les champs obligatoire avec un *')
  }
  }





  getDepartement(id: number){
    this.departementService.getDepartementById(id).subscribe(
      (data: DepartementDto) => {
        this.departementDto= data;
      }
    );
  }

  showSuccessMessage(id: any) {
    this.message = 'Opération réussie !\n '+id;
    this.style= "alert alert-success";
    setTimeout(() => {
      this.message = '';
    }, 5000);
    this.route.navigate(['/admin/listdepartement']);
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
  // verify if the formDepartement's fields are validated
  isFieldValid(field: string) {
    return (!this.formDepartement.get(field).valid && this.formDepartement.get(field).touched) ||
    (this.formDepartement.get(field).untouched && this.formSubmitAttempt);
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

