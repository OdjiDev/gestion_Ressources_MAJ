import { PersonelDto } from 'src/app/classes/personel-dto';
import { BureauDto } from 'src/app/classes/bureau-dto';

export class DemandeDto {
  id: number= 0
  motif: string= "";

bureauDto: BureauDto= new BureauDto();
personelDto: PersonelDto= new PersonelDto();
}
