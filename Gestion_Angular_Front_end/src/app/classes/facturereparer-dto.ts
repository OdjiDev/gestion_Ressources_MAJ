import { SocieteDto } from "./societe-dto";

export class FacturereparerDto {
  id: number= 0;
  code: string= "";
  date: string= "";
  societeDto: SocieteDto= new SocieteDto();
  datecommande: any;
}
