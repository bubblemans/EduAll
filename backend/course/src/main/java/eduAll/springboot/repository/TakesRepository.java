package eduAll.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eduAll.springboot.entity.Takes;

@Repository
public interface TakesRepository extends JpaRepository<Takes, Long>{

}