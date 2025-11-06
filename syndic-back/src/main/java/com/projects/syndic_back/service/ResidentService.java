package com.projects.syndic_back.service;

import com.projects.syndic_back.entity.Resident;
import com.projects.syndic_back.repository.ResidentRepository;
import com.projects.syndic_back.service.interfaces.IResidentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResidentService implements IResidentService {

    private final ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    @Override
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    @Override
    public Resident getResidentById(Long id) {
        return residentRepository.findById(id).get();
    }

    @Override
    public Resident createResident(Resident resident) {
        return residentRepository.save(resident);
    }

    @Override
    public Resident updateResident(Resident resident, Long id) {
        Resident existingResident = getResidentById(id);
        if (existingResident != null) {
            existingResident.setFirstName(resident.getFirstName());
            existingResident.setLastName(resident.getLastName());
            existingResident.setCin(resident.getCin());
            existingResident.setPhone(resident.getPhone());
            existingResident.setEmail(resident.getEmail());

            residentRepository.save(existingResident);
        }
        return null;
    }

    @Override
    public void deleteResident(Long id) {
        Resident existingResident = getResidentById(id);
        if (existingResident != null) {
            residentRepository.deleteById(id);
        }
    }

    @Override
    public List<Resident> searchResidents(String keyword) {
        return residentRepository.searchByName(keyword);
    }
}
