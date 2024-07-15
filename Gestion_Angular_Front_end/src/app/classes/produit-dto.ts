
import { CategorieDto } from './categorie-dto';

export class ProduitDto {


  /** Identifiant unique du produit */
  id: number = 0;

  /** Code produit unique */
  codeproduit: string = "";

  /** Nom du produit */
  nom: string = "";

  /** Description détaillée du produit */
  designation: string = "";
  quantite: number= 0;

  prixAchat: number = 0;

   categorieDto:CategorieDto= new CategorieDto();



}

