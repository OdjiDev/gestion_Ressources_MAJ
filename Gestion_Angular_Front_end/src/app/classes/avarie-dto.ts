import { ProduitDto } from "./produit-dto";

export class AvarieDto {
  id: number= 0;
 quantite: string= "";
  nom: string= "";
  date: string="";
  motif: string="";
  produitDto: ProduitDto= new ProduitDto();
}
