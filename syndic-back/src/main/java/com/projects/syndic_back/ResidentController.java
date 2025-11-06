package com.projects.syndic_back;

import com.projects.syndic_back.entity.Resident;
import com.projects.syndic_back.service.interfaces.IResidentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("residents")
public class ResidentController {

    private final IResidentService residentService;

    public ResidentController(IResidentService residentService) {
        this.residentService = residentService;
    }

    @GetMapping()
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("{id}")
    public Resident getResidentById(@PathVariable Long id) {
        return residentService.getResidentById(id);
    }

    @PostMapping
    public Resident createResident(@RequestBody Resident resident) {
        return residentService.createResident(resident);
    }

    @PutMapping("{id}")
    public Resident updateResident(@RequestBody Resident resident, @PathVariable Long id) {
        return residentService.updateResident(resident, id);
    }

    @DeleteMapping("{id}")
    public void deleteResident(@PathVariable Long id) {
        residentService.deleteResident(id);
    }
}
