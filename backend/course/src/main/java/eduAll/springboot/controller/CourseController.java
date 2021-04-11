package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import eduAll.springboot.repository.CourseRepository;
import eduAll.springboot.repository.SectionRepository;
import eduAll.springboot.entity.Course;
import eduAll.springboot.entity.Section;



@RestController
@RequestMapping("/eduall/course")
@CrossOrigin(origins = "*")
public class CourseController{

	@Autowired
	private CourseRepository repo;
	@Autowired
	private SectionRepository sectionRepo;

	// get all courses
	@GetMapping
	public List<Course> getAllCourse(){
		return this.repo.findAll();
	}

	//get sections by course name, semester and year
	@GetMapping("/{course_name}/{semester}/{year}")
	public List<Section> getCourseByName_Sem(@PathVariable (value = "course_name") String course_name,
			@PathVariable (value = "semester") String semester,
			@PathVariable (value = "year") int year) {
		List<Course> all = getAllCourse();
		Set<Long> course_ids = new HashSet<Long>();
		List<Section> answer = new ArrayList<Section>();
		List<Section> sections = sectionRepo.findAll();
		for (Course course: all) {
			if (course.getName().equals(course_name)) // e.g. CS157A
				course_ids.add(course.getCourse_id());
		}
		// get sections from semester, year, and course_id
		// PK of section is section_id, course_id, semester, and year
		for (Section section: sections) {
			if(course_ids.contains(section.getCourse_id())
					&& section.getSemester().equals(semester)
					&& section.getYear() == year) {
				answer.add(section);
			}
		}
		return answer;
	}

	//create course
	@PostMapping
	public Course createInstructor(@RequestBody Course course) {
		return this.repo.save(course);
	}


	/*** unnecessary APIs
	//get course by id
	@GetMapping("/{id}")
	public Course getCourseById(@PathVariable (value = "id") long course) {
		return this.repo.findById(course).orElseThrow(
				() -> new ResourceNotFoundException("course not found"));
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
	***/

}
