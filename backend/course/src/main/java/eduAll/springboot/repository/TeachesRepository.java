package eduAll.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eduAll.springboot.entity.Teaches;

@Repository
public interface TeachesRepository extends JpaRepository<Teaches, Long>{

}