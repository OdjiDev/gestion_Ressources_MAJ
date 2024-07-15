package com.odji.spring_back_end.services;

import com.odji.spring_back_end.dto.AffectationDto;
import com.odji.spring_back_end.model.Affectation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class AffectationService {
    private  final ProduitService produitService;
    private  final  PersonelService personelService;
    private  final  BureauService bureauService;

    public List<AffectationDto> affectationsDtoList(List<Affectation> affectations){
        return affectations.stream()
                .map(this::affectationToDto) //utilise la methode de conversion individuel
                .collect(Collectors.toList());
    }


    public  AffectationDto affectationToDto(Affectation affectation) {
        if (affectation == null) {
            return null;
        }

        AffectationDto affectationDto = new AffectationDto();
        affectationDto.setId(affectation.getId());
        affectationDto.setQuantite(affectation.getQuantite());
        affectationDto.setDate(affectation.getDate());
        affectationDto.setMotif(affectation.getMotif());
        affectationDto.setProduitDto(produitService.produitToDto(affectation.getProduit()));
        affectationDto.setPersonelDto(personelService.personelToDto(affectation.getPersonel()));
        affectationDto.setBureauDto(bureauService.BureauToDto(affectation.getBureau()));
        return affectationDto;

    }

    public  Affectation dtoToAffectation(AffectationDto affectationDto) {
        if (affectationDto== null) {
            return null;
        }
        Affectation affectation = new Affectation();
        affectation.setId(affectationDto.getId());
        affectation.setQuantite(affectationDto.getQuantite());
        affectation.setDate(affectationDto.getDate());
        affectation.setMotif(affectationDto.getMotif());

        affectation.setProduit(produitService.dtoToProduit(affectationDto.getProduitDto()));
        affectation.setPersonel(personelService.dtoToPersonel(affectationDto.getPersonelDto()));
        affectation.setBureau(bureauService.dtoToBureau(affectationDto.getBureauDto()));
        return affectation;
    }
    
}
