import { BureauDto } from 'src/app/classes/bureau-dto';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { ProduitDto } from "./produit-dto";

export class AffectationDto {
  id: number= 0;
  quantite: string= "";
   date: string="";
   motif: string="";
   produitDto: ProduitDto= new ProduitDto();
   personelDto: PersonelDto= new PersonelDto();
   bureauDto:BureauDto=new BureauDto();
}

