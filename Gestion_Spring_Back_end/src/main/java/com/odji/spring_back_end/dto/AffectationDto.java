package com.odji.spring_back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.odji.spring_back_end.model.Produit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AffectationDto {

    private Integer id;

    private BigDecimal quantite;

    private String date;

    private String motif;

   private  Produit produit;


    private PersonelDto personelDto;


    private BureauDto bureauDto;

    private ProduitDto produitDto;



}
