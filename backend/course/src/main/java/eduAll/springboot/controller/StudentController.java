package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

import eduAll.springboot.repository.StudentRepository;
import eduAll.springboot.entity.Student;
import eduAll.springboot.exception.ResourceNotFoundException;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/eduall/student")
public class StudentController {

	@Autowired
	private StudentRepository repo;

	// get all students
	@GetMapping
	public List<Student> getAllStudent(){
		return this.repo.findAll();
	}

	//get student by id
	@GetMapping("/{id}")
	public Student getStudentById(@PathVariable (value = "id") long student) {
		return this.repo.findById(student).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
	}

	//create student
	//need id, year, and major to create
	@PostMapping
	public Student createStudent(@RequestBody Student student) {
		return this.repo.save(student);
	}

	//create student by passing token, year, and major
	@PostMapping("/{token}/{year}/{major}")
	public Student createStudent(@PathVariable (value = "token") String token,
			@PathVariable (value = "year") int year,
			@PathVariable (value = "major") String major) throws Exception {
		return this.repo.save(new Student(HttpRequest.getUserId(token),year,major));
	}

	//update student
	@PutMapping("/{id}")
	public Student updateStudent(@RequestBody Student student, @PathVariable (value = "id") long id) {
		Student exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		exist.setYear(student.getYear());
		exist.setMajor(student.getMajor());
		return this.repo.save(exist);
	}

	// delete student by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Student> deleteStudent(@PathVariable (value = "id") long id){
		Student exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		this.repo.delete(exist);
		return ResponseEntity.ok().build();
	}

}
