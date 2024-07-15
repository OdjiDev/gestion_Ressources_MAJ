import { BureauDto } from 'src/app/classes/bureau-dto';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { ProduitDto } from './classes/produit-dto';


export class ReparationDto {
  id: number= 0;
   date: string="";
   motif: string="";
   produitDto: ProduitDto= new ProduitDto();
   //personelDto: PersonelDto= new PersonelDto();
   //bureauDto:BureauDto=new BureauDto();
}

