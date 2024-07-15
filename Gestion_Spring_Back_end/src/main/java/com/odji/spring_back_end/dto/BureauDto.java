package com.odji.spring_back_end.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.odji.spring_back_end.model.Affectation;
import com.odji.spring_back_end.model.Bureau;
import com.odji.spring_back_end.model.Suivie;
import lombok.*;

import java.util.List;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BureauDto {

    private Integer id;

    private String nom;

    @JsonIgnore
    private List<DemandeDto> demandes;

    private DepartementDto departementDto;

    @JsonIgnore
    private List<Affectation> affectations;

    @JsonIgnore
    private List<Affectation> affectation;

    @JsonIgnore
    private List<Suivie> suivie;
}
