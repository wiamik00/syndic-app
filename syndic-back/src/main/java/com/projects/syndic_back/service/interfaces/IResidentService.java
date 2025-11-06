package com.projects.syndic_back.service.interfaces;

import com.projects.syndic_back.entity.Resident;

import java.util.List;

public interface IResidentService {
    List<Resident> getAllResidents();
    Resident getResidentById(Long id);
    Resident createResident(Resident resident);
    Resident updateResident(Resident resident, Long id);
    void deleteResident(Long id);
    List<Resident> searchResidents(String keyword);
}
