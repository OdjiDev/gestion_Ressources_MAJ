package com.odji.spring_back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AffectationDto {

    private Integer id;

    private BigDecimal quantite;

    private String date;

    private String motif;

    @JsonIgnore
    private ProduitDto produitDto;

    @JsonIgnore
    private PersonelDto personelDto;

    @JsonIgnore
    private BureauDto bureauDto;



}
