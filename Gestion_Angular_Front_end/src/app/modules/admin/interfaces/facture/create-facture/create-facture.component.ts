import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FactureDto } from 'src/app/classes/facture-dto';
import { FournisseurDto } from 'src/app/classes/fournisseur-dto';
import { LigneFactureDto } from 'src/app/classes/lignefacture-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { FactureService } from 'src/app/services/facture.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { LigneFactureService } from 'src/app/services/lignefacture.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-create-facture',
  templateUrl: './create-facture.component.html',
  styleUrls: ['./create-facture.component.css'],
})
export class CreateFactureComponent {
  // Declaration des variables
  produitDtos: ProduitDto[] = [];
  ligneFactureDtos: LigneFactureDto[] = [];
  fournisseurDtos: FournisseurDto[] = [];
  factureDto: FactureDto = new FactureDto();
  ligneFactureDto: LigneFactureDto = new LigneFactureDto();
  fournisseurDto: FournisseurDto = new FournisseurDto();
  formLigneFacture: any;
  formLigneFactureSubmitAttempt: boolean = false;
  formFacture: any;
  formFactureSubmitAttempt: boolean = false;
  style: string = '';
  message: string = '';
  filterBy: string = '';
  montant: number = 0;

  constructor(
    private produitService: ProduitService,
    private factureService: FactureService,
    private ligneFactureService: LigneFactureService,
    private fournisseurService: FournisseurService,
    private formBuilder: FormBuilder
  ) {}
  // Chargement des données et Calcul du libelle total d'items
  ngOnInit(): void {
    this.loadProduits();
    this.loadFournisseurs();
    this.buildLigneFactureForm();
    this.buildFactureForm();
  }
  // Soumission du formulaire
  submitForm() {
    console.log(this.fournisseurDto);
    this.factureDto.fournisseurDto = this.fournisseurDto;
    console.log(this.factureDto);
    console.log(this.ligneFactureDtos);
    this.formLigneFactureSubmitAttempt = true;
    this.formFactureSubmitAttempt = true;
    // Verifier si la facture contient au moins une ligne
    if (this.ligneFactureDtos.length == 0) {
      this.style = 'alert alert-danger';
      this.showSuccessMessage(
        'Veuillez ajouter au moins une ligne à la facture'
      );
      return;
    }
    // Verifier si le fournisseur est renseigner
    if (this.fournisseurDto.id == null || this.fournisseurDto.id == 0) {
      if (this.fournisseurDto.nom == null || this.fournisseurDto.nom == '') {
        this.style = 'alert alert-danger';
        this.showSuccessMessage('Veuillez renseigner le nom du fournisseur');
        return;
      }
    }
    // Affectation du fournisseur a la facture
    this.factureDto.fournisseurDto = this.fournisseurDto;
    // Enregistrement de la facture
    this.addFacture();
  }
  async addFacture() {
    try {
      // Enregistrement de la facture dans la base de donnée et attendre la fin de l'enregistrement pour avoir une id
      const data = await this.factureService
        .addFacture(this.factureDto)
        .toPromise();
      console.log('factureDto avant recursive: ', data);
      // verifier si l'enregistrement a echoué
      if (data == null || data.id == 0) {
        this.style = 'alert alert-danger';
        this.showSuccessMessage('Veuillez renseigner le nom du fournisseur');
        return;
      }
      // Enregistrement des lignes de facture dans la base de donnée
      await this.registerLigneFactureRecursively(
        data,
        this.ligneFactureDtos,
        0
      );
      // Réinitialisation de tout le formulaire après toutes les opérations d'enregistrement
      this.factureDto = new FactureDto();
      this.ligneFactureDtos = [];
      this.fournisseurDto = new FournisseurDto();
      this.formLigneFacture.reset();
      this.formLigneFactureSubmitAttempt = false;
    } catch (error) {
      console.error(error);
    }
  }
  // La methode qui gere l'enregistrement des lignes de facture
  registerLigneFactureRecursively(
    factureDto: FactureDto,
    ligneFactureDtos: LigneFactureDto[],
    index: number
  ): any {
    if (index < ligneFactureDtos.length) {
      let ligneFactureDto = ligneFactureDtos[index];
      ligneFactureDto.factureDto = factureDto;
      console.log('ligne ligneFactureDto dans recursive: ', ligneFactureDto);
      return this.registerLigneFacture(ligneFactureDto).then(() =>
        this.registerLigneFactureRecursively(
          factureDto,
          ligneFactureDtos,
          index + 1
        )
      );
    } else {
      return Promise.resolve();
    }
  }
  // la methode qui gere l'enregistrement d'une ligne de facture et mise a jour du produit
  async registerLigneFacture(ligneFacture: LigneFactureDto) {
    try {
      const data = await this.ligneFactureService
        .addLignefacture(ligneFacture)
        .toPromise();
      console.log('Ligne facture ajouter avec succes: ', data);
      // mise a jour du produit
      ligneFacture.produitDto.quantite =
        ligneFacture.produitDto.quantite + ligneFacture.quantite;
      await this.produitService
        .updateProduit(ligneFacture.produitDto.id, ligneFacture.produitDto)
        .toPromise();
      console.log('Produit mis a jour avec succes: ', data);
    } catch (error) {
      console.error(error);
    }
  }
  // Ajouter une ligneFacture au tableau lignes de facture
  ajouterLigneFacture() {
    if (
      this.ligneFactureDto.produitDto.id == null ||
      this.ligneFactureDto.produitDto.id == 0
    ) {
      return;
    }
    // Chercher le produit dans le tableau ligneFactureDtos, s'il existe, return sinon ajouter au tableau
    if (
      this.ligneFactureDtos.find(
        (ligneFactureDto) =>
          ligneFactureDto.produitDto.id == this.ligneFactureDto.produitDto.id
      )
    ) {
      this.style = 'alert alert-danger';
      this.showSuccessMessage('Ce produit existe déja dans la facture');
      return;
    }
    if(this.ligneFactureDto.quantite == null || this.ligneFactureDto.quantite == 0){
      this.style = 'alert alert-danger';
      this.showSuccessMessage('Veuillez renseigner la quantite');
      return;
    }
    // Calcul du montant de la ligneFacture et affectation des prix de vente et d'achat
    this.ligneFactureDtos.push(this.ligneFactureDto);
    this.montant +=
      this.ligneFactureDto.produitDto.prixAchat * this.ligneFactureDto.quantite;

    this.ligneFactureDto = new LigneFactureDto();
    this.formLigneFactureSubmitAttempt = false;
    this.formLigneFacture.reset();
  }
  // Modification d'une ligneFacture
  modifyLigneFacture(ligneFacture: LigneFactureDto) {
    // Chercher ligneFacture dans le tableau ligneFactureDtos, l'affecter a ligneFacture et le supprimer du tableau
    const index = this.ligneFactureDtos.indexOf(ligneFacture);
    this.ligneFactureDto = this.ligneFactureDtos[index];
    this.ligneFactureDtos.splice(index, 1);
  }
  // Suppression d'une ligneFacture
  deleteLigneFacture(ligneFacture: LigneFactureDto) {
    // Chercher ligneFacture dans le tableau ligneFactureDtos,
    // l'affecter a ligneFacture et le supprimer du tableau
    const index = this.ligneFactureDtos.indexOf(ligneFacture);
    this.ligneFactureDtos.splice(index, 1);
  }
  // Affectation du produit selectionner a la variable ligne.produit
  selectedProduit(produitDto: ProduitDto) {
    this.ligneFactureDto.produitDto = produitDto;
  }
  // Creation d'un ligneFacture form
  buildLigneFactureForm() {
    this.formLigneFacture = this.formBuilder.group({
      quantite: [null, [Validators.min(1)]],
    });
  }
  // Creation d'un ligneFacture form
  buildFactureForm() {
    this.formFacture = this.formBuilder.group({
      numero: [null, Validators.required],
      fournisseurDto: [null, Validators.required],
    });
  }
  // suppression d'un produit avec une confirmation au prealable
  deleteProduit(produitId: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet produit ?')) {
      this.produitService.deleteProduit(produitId).subscribe(() => {
        this.loadProduits();
      });
    }
  }
  // Chargement des produits depuis le service et tri des produits par ordre alphabétique
  async loadProduits() {
    try {
      await this.produitService
        .getProduits()
        .subscribe((data: ProduitDto[]) => {
          this.produitDtos = data;
        });
    } catch (error) {
      console.error(error);
    }
  }
  // Chargement des fournisseurs depuis le service et tri des fournisseurs par ordre alphabétique
  async loadFournisseurs() {
    try {
      await this.fournisseurService
        .getFournisseurs()
        .subscribe((data: FournisseurDto[]) => {
          this.fournisseurDtos = data;
        });
    } catch (error) {
      console.error(error);
    }
  }
  // Afficher le message d'erreur
  showSuccessMessage(message: string) {
    this.message = message;
    this.style = 'alert alert-danger';
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
  // verify if the formLigneFacture's fields are validated
  isFieldLigneFactureValid(field: string) {
    return (
      (!this.formLigneFacture.get(field).valid &&
        this.formLigneFacture.get(field).touched) ||
      (this.formLigneFacture.get(field).untouched &&
        this.formLigneFactureSubmitAttempt)
    );
  }

  // display css style for the the fields that aren't validate
  displayLigneFactureFieldCss(field: string) {
    return {
      'has-error': this.isFieldLigneFactureValid(field),
      'has-feedback': this.isFieldLigneFactureValid(field),
    };
  }
  // verify if the formFacture's fields are validated
  isFieldFactureValid(field: string) {
    return (
      (!this.formFacture.get(field).valid &&
        this.formFacture.get(field).touched) ||
      (this.formFacture.get(field).untouched && this.formFactureSubmitAttempt)
    );
  }

  // display css style for the the fields that aren't validate
  displayFactureFieldCss(field: string) {
    return {
      'has-error': this.isFieldFactureValid(field),
      'has-feedback': this.isFieldFactureValid(field),
    };
  }

  // loops fields in ordeer to verify if all are ok
  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}
