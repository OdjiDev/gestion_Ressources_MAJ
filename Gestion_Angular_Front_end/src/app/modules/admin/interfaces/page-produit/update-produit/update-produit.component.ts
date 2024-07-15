import { CategorieService } from 'src/app/services/categorie.service';
import { CategorieDto } from 'src/app/classes/categorie-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {


  formProduit: any;
  produitDto: ProduitDto= new ProduitDto();
  idProduit: number=0;
  categorieDtos:CategorieDto[]=[];
  message: any;
  style: any;
  formSubmitAttempt: boolean= false;


  constructor(private formBuilder: FormBuilder,
              private produitService: ProduitService,
              private categorieService:CategorieService,
              private router: ActivatedRoute,
              private route: Router
              ){
                this.formProduit= this.formBuilder.group({
                  code: [null, Validators.required],
                  nom: [null, Validators.required],
                  // categorieDto: [null, Validators.required],
                  });
      this.idProduit= this.router.snapshot.params['id'];
      this.getProduit(this.idProduit);
      // this.produitDto.categorieDto.id=1;
      this.getAllCategories();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //Envoi de données vers le serveur
  submitForm(){
    this.formSubmitAttempt= true;
      this.updateProduit(this.produitDto);
      // this.getAllCategories();
  }


  //envoi des données de differentes interfaces à la base de données
  updateProduit(et: ProduitDto){
    if (this.formProduit.valid) {
    this.produitService.updateProduit(et.id, et).subscribe(
      (data: ProduitDto) => {
        this.produitDto= data;
        this.showSuccessMessage('Produit enrégistré avec succès');
        this.formProduit.reset();
        this.formSubmitAttempt= false;
        return;
      },
      (error) => {
        // Handle error scenario (e.g., display error message)
        console.error("Error updating produit:", error);
      }
    );
  }else{
    this.showErrorMessage('Verifiez vos données et renseignez les champs obligatoire avec un *')
  }
  }





  getProduit(id: number){
    this.produitService.getProduitById(id).subscribe(
      (data: ProduitDto) => {
        this.produitDto= data;
      }
    );
  }

  showSuccessMessage(id: any) {
    this.message = 'Opération réussie !\n '+id;
    this.style= "alert alert-success";
    setTimeout(() => {
      this.message = '';
    }, 5000);
    this.route.navigate(['/admin/list-produit']);
  }

  showErrorMessage(id: any) {
    this.message = 'Oops un probleme est survenu. Opération échouée !\n '+id;
    this.style= "alert alert-danger";
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  //load categories form the forms
  getAllCategories(){
    this.categorieService.getCategories().subscribe(
      (data: CategorieDto[]) => {
        this.categorieDtos= data;
      }
    );
  }
  // verify if the formProduit's fields are validated
  isFieldValid(field: string) {
    return (!this.formProduit.get(field).valid && this.formProduit.get(field).touched) ||
    (this.formProduit.get(field).untouched && this.formSubmitAttempt);
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

