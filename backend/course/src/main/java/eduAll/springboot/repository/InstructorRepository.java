package eduAll.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import eduAll.springboot.entity.Instructor;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long>{

}
