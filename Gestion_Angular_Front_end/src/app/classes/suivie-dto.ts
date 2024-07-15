import { CategorieDto } from './categorie-dto';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { ProduitDto } from "./produit-dto";

export class SuivieDto {
  id: number= 0;
  numero: string="";
   date: string="";
  code: string="";
  nomComplet: string="";
  designation: string="";
  typeSuivie: string="";
  etat: string="";
  genre: string="";

   categorieDto:CategorieDto=new CategorieDto();
   produitDto: ProduitDto= new ProduitDto();
   personelDto: PersonelDto= new PersonelDto();
   bureauDto:BureauDto=new BureauDto();
}

