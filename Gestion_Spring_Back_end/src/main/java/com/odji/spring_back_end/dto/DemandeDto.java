package com.odji.spring_back_end.dto;

import com.odji.spring_back_end.model.Demande;
import com.odji.spring_back_end.model.LigneDemande;
import jakarta.persistence.Column;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DemandeDto {

    private Integer id;

    private String motif;

    private  LigneDemandeDto lignedemandeDto;

    private  BureauDto bureauDto;


}
