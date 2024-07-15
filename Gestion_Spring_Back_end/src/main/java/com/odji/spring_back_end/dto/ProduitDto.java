package com.odji.spring_back_end.dto;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.odji.spring_back_end.model.Affectation;
import com.odji.spring_back_end.model.Produit;
import com.odji.spring_back_end.model.Suivie;
import jakarta.persistence.Column;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProduitDto {

    private Integer id;

    private String codeproduit;

    private String nom;

    private String designation;

    private BigDecimal prixAchat;

    private BigDecimal quantite;

    private CategorieDto categorieDto;

    //private MagasinDto magasinDto;

    @JsonIgnore
    private List<AvarieDto> avaries;

    @JsonIgnore
    private List<LigneFactureDto> lignefactures;

    @JsonIgnore
    private List<LigneFactureReparerDto> lignefacturereparers;

    @JsonIgnore
    private List<LigneReparationDto> lignereparations;

    @JsonIgnore
    private List<LigneDemandeDto> lignedemandes;

    @JsonIgnore
    private List<Affectation> affectation;

    @JsonIgnore
    private List<Suivie> suivies;

}
