import { RoleDto } from "./role-dto";

export class PersonelDto {
  formatDate(arg0: Date): Date {
    throw new Error("Method not implemented.");
  }
  id: number= 0;
    nom: string= "";
    prenom: string= "";
    dateDeNaissance: string='';
    sexe: string= "";
    lieuDeNaissance: string= "";
    //username: any;
    numero: number= 0;
    email: string= "";
    password: string= "";
    roleDto:RoleDto= new RoleDto();
    

}
