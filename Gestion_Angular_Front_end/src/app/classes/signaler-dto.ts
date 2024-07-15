import { PersonelDto } from 'src/app/classes/personel-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
export class SignalerDto {

  id: number=0
  etat: string= "";
produitDto:ProduitDto= new ProduitDto();
personelDto:PersonelDto= new PersonelDto();
}
