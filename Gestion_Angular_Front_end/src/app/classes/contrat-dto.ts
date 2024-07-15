import { ProduitDto } from "./produit-dto";
import { SocieteDto } from "./societe-dto";

export class ContratDto {
  id: number= 0;
  code: string= "";
  nom: string= "";
  datedebut: string="";
  datedefin: string="";
  motif: string="";
  societeDto: SocieteDto= new SocieteDto();
}
