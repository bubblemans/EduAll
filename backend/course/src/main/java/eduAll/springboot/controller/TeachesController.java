package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import eduAll.springboot.repository.SectionRepository;
import eduAll.springboot.repository.TeachesRepository;
import eduAll.springboot.repository.InstructorRepository;
import eduAll.springboot.entity.Instructor;
import eduAll.springboot.entity.Section;
import eduAll.springboot.entity.Teaches;
import eduAll.springboot.exception.ResourceNotFoundException;


@RestController
@RequestMapping("/eduall/teaches")
@CrossOrigin(origins = "*")
public class TeachesController{

	@Autowired
	private TeachesRepository repo;
	@Autowired
	private SectionRepository sectionRepo;
	@Autowired
	private InstructorRepository instructorRepo;


	// get all teaches
	@GetMapping
	public List<Teaches> getAllTeaches(){
		return this.repo.findAll();
	}

	// get all sections by an instructor id
	@RequestMapping(params="id", method = RequestMethod.GET)
	public List<Section> getAllSection(@RequestParam("id") long id){
		List<Teaches> all = getAllTeaches();
		List<Section> sections = sectionRepo.findAll();
		List<Section> answer = new ArrayList<Section>();
		long course_id, section_id;
		for(Teaches teach: all) {
			if(teach.getId() == id) {
				course_id = teach.getCourse_id();
				section_id = teach.getSection_id();
				for(Section section: sections) {
					if(section.getCourse_id() == course_id &&
							section.getSection_id() == section_id)
						answer.add(section);
				}
			}
		}
		if(answer.isEmpty()) {
			throw new ResourceNotFoundException("grade not found");
		}
		return answer;
	}

	// get all instructors by a course id
	@RequestMapping(params="course_id", method = RequestMethod.GET)
	public List<Instructor> getAllInstructor(@RequestParam("course_id") long course){
		List<Teaches> all = getAllTeaches();
		List<Instructor> answer = new ArrayList<Instructor>();
		List<Instructor> instructors = instructorRepo.findAll();
		for(Teaches teach: all) {
			if(teach.getCourse_id() == course) {
				for(Instructor instructor: instructors) {
					if(instructor.getId() == teach.getId()) {
						answer.add(instructor);
					}
				}
			}
		}
		if(answer.isEmpty()) {
			throw new ResourceNotFoundException("grade not found");
		}
		return answer;
	}

	//create teaches
	@PostMapping
	public Teaches createTeaches(@RequestBody Teaches teaches) {
		return this.repo.save(teaches);

		/* prevent from creating wrong mappings
		SectionController co = new SectionController();
		List<Instructor> instructors = instructorRepo.findAll();
		long id = teaches.getId();
		long course_id = teaches.getCourse_id();
		long section_id = teaches.getSection_id();
		String semester = teaches.getSemester();
		String year = teaches.getYear();
		for(Instructor instructor: instructors) {
			if(instructor.getId() == id) {
				if(co.checkExist(course_id, section_id, semester, year))
					return this.repo.save(teaches);
				break;
			}
		}
		throw new ResourceNotFoundException("grade not found");
		*/
	}

	//update teaches -> all is PK, not allowed. just delete

	// delete teaches by instructor id
	@DeleteMapping("/{id}")
	public ResponseEntity<Teaches> deleteSection(@PathVariable (value = "id") long id){
		List<Teaches> all = getAllTeaches();
		for (Teaches exist: all) {
			if(exist.getId() == id)
				this.repo.delete(exist);
		}
		return ResponseEntity.ok().build();
	}

	// delete one teaches by instructor and course_id
	@RequestMapping(path = "/{id}/{course_id}", method = RequestMethod.DELETE)
	public ResponseEntity<Section> deleteOne(@PathVariable (value = "id") long student,
			@PathVariable (value = "course_id") long course){
		List<Teaches> all = getAllTeaches();
		for (Teaches teach: all) {
			if(teach.getId() == student && teach.getCourse_id() == course) {
				this.repo.delete(teach);
				break;
			}
		}
		return ResponseEntity.ok().build();
	}
}
