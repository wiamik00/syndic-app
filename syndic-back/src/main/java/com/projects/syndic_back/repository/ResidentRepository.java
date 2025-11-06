package com.projects.syndic_back.repository;

import com.projects.syndic_back.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    @Query("SELECT r FROM Resident r " +
            " WHERE r.firstName like :kw " +
            " OR r.lastName like :kw ")
    List<Resident> searchByName(@Param("kw") String keyword);
}
