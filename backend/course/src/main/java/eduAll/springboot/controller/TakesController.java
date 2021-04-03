package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import eduAll.springboot.repository.StudentRepository;
import eduAll.springboot.repository.TakesRepository;
import eduAll.springboot.entity.Section;
import eduAll.springboot.entity.Student;
import eduAll.springboot.entity.Takes;
import eduAll.springboot.exception.ResourceNotFoundException;



@RestController
@RequestMapping("/eduall/grade")
public class TakesController{

	@Autowired
	private TakesRepository repo;
	@Autowired
	private StudentRepository studentRepo;
	
	// get all takes
	@GetMapping
	public List<Takes> getAllTakes(){
		return this.repo.findAll();
	}
	
	// get all grades by a student id
	// assume student cannot take same course 
	@GetMapping("/{id}")
	public List<Takes> getGradesByStudent(@PathVariable (value = "id") long student) {
		List<Takes> grades = new ArrayList<Takes>();
		List<Takes> all = getAllTakes();
		for (Takes take: all) {
			if(take.getStudent_id() == student)
				grades.add(take);
		}
		if(grades.isEmpty())
			throw new ResourceNotFoundException("grades not found");
		return grades;		
	}
	
	//get a grade by student_id and course_id
	// assume student cannot take same course 
	@RequestMapping(path = "/{id}/{course_id}", method = RequestMethod.GET)
	public String getTakesByCourse(@PathVariable (value = "id") long student, 
			@PathVariable (value = "course_id") long course) {
		List<Takes> all = getAllTakes();
		for (Takes take: all) {
			if(take.getStudent_id() == student && take.getCourse_id() == course)
				return take.getGrade();
		}
		throw new ResourceNotFoundException("grade not found");
	}
	
	//create a grade
	@PostMapping
	public Takes createTakes(@RequestBody Takes takes) {
		return this.repo.save(takes);
		
		/* prevent from creating wrong mappings
		SectionController co = new SectionController();
		List<Student> students = studentRepo.findAll();
		long id = takes.getStudent_id();
		long course_id = takes.getCourse_id();
		long section_id = takes.getSection_id();
		String semester = takes.getSemester();
		String year = takes.getYear();
		for(Student student: students) {
			if(student.getId() == id) {
				if(co.checkExist(course_id, section_id, semester, year))
					return this.repo.save(takes);
				break;
			}
		}
		throw new ResourceNotFoundException("section not found");
		*/
	}
	
	//update a grade  student id + course id
	//@PutMapping("/{id}/{course_id}")
	@RequestMapping(path = "/{id}/{course_id}", method = RequestMethod.PUT)
	public Takes updateTakes(@RequestBody Takes takes,
			@PathVariable (value = "id") long student, 
			@PathVariable (value = "course_id") long course) {
		List<Takes> all = getAllTakes();
		for (Takes exist: all) {
			if(exist.getStudent_id() == student && exist.getCourse_id() == course) {
				exist.setGrade(takes.getGrade());
				return this.repo.save(exist);
			}
		}
		throw new ResourceNotFoundException("section not found");
	}
	
	// delete all grades of a student
	@DeleteMapping("/{id}")
	public ResponseEntity<Section> deleteAll(@PathVariable (value = "id") long id){
		List<Takes> all = getAllTakes();
		for (Takes take: all) {
			if(take.getStudent_id() == id)
				this.repo.delete(take);
		}
		return ResponseEntity.ok().build();
	}
	
	// delete one grade of a student
	@RequestMapping(path = "/{id}/{course_id}", method = RequestMethod.DELETE)
	public ResponseEntity<Section> deleteOne(@PathVariable (value = "id") long student, 
			@PathVariable (value = "course_id") long course){
		List<Takes> all = getAllTakes();
		for (Takes take: all) {
			if(take.getStudent_id() == student && take.getCourse_id() == course) {
				this.repo.delete(take);
				break;
			}
		}
		return ResponseEntity.ok().build();
	}
}