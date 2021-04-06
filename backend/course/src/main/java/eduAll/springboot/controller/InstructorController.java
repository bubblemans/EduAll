package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

import eduAll.springboot.repository.InstructorRepository;
import eduAll.springboot.entity.Instructor;
import eduAll.springboot.exception.ResourceNotFoundException;



@RestController
@RequestMapping("/eduall/instructor")
public class InstructorController {

	@Autowired
	private InstructorRepository repo;
	
	// get all instructors
	@GetMapping
	public List<Instructor> getAllInstructor(){
		return this.repo.findAll();
	}
	
	//get instructor by id
	@GetMapping("/{id}")
	public Instructor getInstructorById(@PathVariable (value = "id") long instructor) {
		return this.repo.findById(instructor).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
	}
	
	//create instructor
	@PostMapping
	public Instructor createInstructor(@RequestBody Instructor instructor) {
		return this.repo.save(instructor);
	}
	
	//update instructor
	@PutMapping("/{id}")
	public Instructor updateInstructor(@RequestBody Instructor instructor, @PathVariable (value = "id") long id) {
		Instructor exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		exist.setYear(instructor.getYear());
		exist.setDepartment(instructor.getDepartment());
		return this.repo.save(exist);
	}
	
	// delete instructor by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Instructor> deleteInstructor(@PathVariable (value = "id") long id){
		Instructor exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		this.repo.delete(exist);
		return ResponseEntity.ok().build();
	}
}
