import { ProduitDto } from "./produit-dto";
import { ReparerDto } from "./reparer-dto";

export class LignereparationDto {
  id: number= 0;
  quantite: number= 0;
  date: string= "";
 produitDto: ProduitDto= new ProduitDto();
 reparerDto: ReparerDto= new ReparerDto();
}
