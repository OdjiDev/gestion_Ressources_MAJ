import { FactureDto } from './facture-dto';
import { ProduitDto } from './produit-dto';

export class LigneFactureDto {
  id: number = 0;
  quantite: number = 0;
  //date: string= "";
  total: number = 0;

  produitDto: ProduitDto = new ProduitDto();
  factureDto: FactureDto = new FactureDto();
}
