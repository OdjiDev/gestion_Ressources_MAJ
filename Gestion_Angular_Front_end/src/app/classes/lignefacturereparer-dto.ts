import { ReparerDto } from './reparer-dto';
import { FacturereparerDto } from "./facturereparer-dto";
import { ProduitDto } from "./produit-dto";

export class LignefacturereparerDto {
  id: number= 0;
  quantite: number= 0;
  date: string= "";
 produitDto: ProduitDto= new ProduitDto();
reparerDto: ReparerDto= new ReparerDto();
 facturereparerDto: FacturereparerDto= new FacturereparerDto();
}
