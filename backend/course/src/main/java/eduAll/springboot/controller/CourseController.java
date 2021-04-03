package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import eduAll.springboot.repository.CourseRepository;
import eduAll.springboot.entity.Course;
import eduAll.springboot.exception.ResourceNotFoundException;



@RestController
@RequestMapping("/eduall/course")
public class CourseController{

	@Autowired
	private CourseRepository repo;
	
	// get all courses
	@GetMapping
	public List<Course> getAllCourse(){
		return this.repo.findAll();
	}
	
	//get course by id
	@GetMapping("/{id}")
	public Course getCourseById(@PathVariable (value = "id") long course) {
		return this.repo.findById(course).orElseThrow(
				() -> new ResourceNotFoundException("course not found"));
	}
	
	//get course by department
	@RequestMapping(params="dep", method = RequestMethod.GET)
	public List<Course> getCourseByMajor(@RequestParam("dep") String dep) {
		List<Course> all = getAllCourse();
		List<Course> answer = new ArrayList<Course>();
		for (Course course: all) {
			if (course.getDepartment().equals(dep))
				answer.add(course);
		}
		return answer;
	}
	
	//create course
	@PostMapping
	public Course createInstructor(@RequestBody Course course) {
		return this.repo.save(course);
	}
	
	//update course
	@PutMapping("/{id}")
	public Course updateInstructor(@RequestBody Course course, @PathVariable (value = "id") long id) {
		Course exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		exist.setName(course.getName());
		exist.setTitle(course.getTitle());
		exist.setCredit(course.getCredit());
		exist.setSeason(course.getSeason());
		exist.setDepartment(course.getDepartment());
		return this.repo.save(exist);
	}
	
	// delete course by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Course> deleteCourse(@PathVariable (value = "id") long id){
		Course exist = this.repo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("instructor not found"));
		this.repo.delete(exist);
		return ResponseEntity.ok().build();
	}
	
}
