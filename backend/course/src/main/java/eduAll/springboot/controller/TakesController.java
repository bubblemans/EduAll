package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import eduAll.springboot.repository.SectionRepository;
import eduAll.springboot.repository.TakesRepository;
import eduAll.springboot.entity.Takes;
import eduAll.springboot.entity.Section;
import eduAll.springboot.exception.ResourceNotFoundException;



@RestController
@RequestMapping("/eduall/grade")
@CrossOrigin(origins = "*")
public class TakesController{

	@Autowired
	private TakesRepository repo;
	@Autowired
	private SectionRepository sectionRepo;


	// get all takes
	@GetMapping
	public List<Takes> getAllTakes(){
		return this.repo.findAll();
	}

	// get all grades by one student in current semester
	@GetMapping("/{token}")
	public List<Takes> getGradesByStudent(@PathVariable (value = "token") String token) throws Exception {
		String semester = "Spring";
		int year = 2021;
		long student = HttpRequest.getUserId(token);
		List<Takes> grades = new ArrayList<Takes>();
		for (Takes take: getAllTakes()) {
			if(take.getStudent_id() == student && take.getSemester().equals(semester)
					&& take.getYear() == year)
				grades.add(take);
		}
		return grades;
	}

	// get students who enrolled in the section
	public List<Long> getStudentsBySection(long id){
		List<Long> students = new ArrayList<Long>();
		for (Takes takes: getAllTakes()) {
			if (takes.getId() == id)
				students.add(takes.getStudent_id());
		}
		return students;
	}


	//create takes for section registration
	@RequestMapping(path = "/{token}", method=RequestMethod.POST,consumes="application/json",produces="application/json")
	@ResponseBody
	public List<Long> createTakes(@PathVariable (value = "token") String token,
			@RequestBody long[] sectionIds) throws Exception {
		List<Long> retVal = new ArrayList<Long>();
		long userId = HttpRequest.getUserId(token);
		for (long id: sectionIds) {
			HttpRequest.updateContacts(token, getStudentsBySection(id));
			retVal.add(id);
			for(Section section: this.sectionRepo.findAll()){
				if(section.getId() == id) {
					this.repo.save(
							new Takes(id, userId, section.getSection_id(), section.getCourse_id(), 
									section.getCourse_name(), section.getSemester(), section.getYear(), null));
					break;
				}
			}
		}
		return retVal;
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

	/***

	//get a grade by student_id and course_id
	//assume student cannot take the same course
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
	***/
}