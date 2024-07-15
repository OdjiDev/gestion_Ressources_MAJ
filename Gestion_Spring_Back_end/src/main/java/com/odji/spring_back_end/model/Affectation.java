package com.odji.spring_back_end.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@Entity
@Table(name = "affectation")
@AllArgsConstructor
@NoArgsConstructor
public class Affectation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quantite")
    private BigDecimal quantite;

    @Column(name = "date")
    private String date;

    @Column(name = "motif")
    private String motif;

    @ManyToOne
    @JoinColumn(name = "idproduit")
    private Produit produit ;

    @ManyToOne
    @JoinColumn(name = "idpersonel")
    private Personel personel ;

    @ManyToOne
    @JoinColumn(name = "idbureau")
    private Bureau bureau ;
}
