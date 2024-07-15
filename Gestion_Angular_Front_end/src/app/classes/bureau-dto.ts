import { DepartementDto } from 'src/app/classes/departement-dto';
import { PersonelDto } from 'src/app/classes/personel-dto';

export class BureauDto {

  id: number=0
  nom: string= "";
  departementDto:DepartementDto= new DepartementDto();
  //personelsDto: PersonelDto[]=[];

}
