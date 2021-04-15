package eduAll.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import eduAll.springboot.repository.CourseRepository;
import eduAll.springboot.repository.SectionRepository;
import eduAll.springboot.repository.TakesRepository;
import eduAll.springboot.entity.Course;
import eduAll.springboot.entity.Section;
import eduAll.springboot.entity.Takes;
import eduAll.springboot.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/eduall/section")
@CrossOrigin(origins = "*")
public class SectionController{

	@Autowired
	private SectionRepository repo;
	@Autowired
	private TakesRepository takesRepo;
	@Autowired
	private CourseRepository courseRepo;

	// get all sections
	public List<Section> getAllSection(){
		return this.repo.findAll();
	}

	//get sections by current semester and year
	@GetMapping
	public List<Section> getSectionBySemYear() {

		// statically define current semester for now.
		String semester = "Spring";
		int year = 2021;
		List<Section> sections = new ArrayList<Section>();

		for (Section section: getAllSection()) {
			if(section.getSemester().equals(semester) && section.getYear() == year)
				sections.add(section);
		}
		return sections;
	}	
	
	
	// get sections taken by one student in current semester
	// might be used for home page later  
	@GetMapping("/{token}")
	public List<Section> getSectionsByStudent(@PathVariable (value = "token") String token) throws Exception {

		String semester = "Spring";
		int year = 2021;

		long student = HttpRequest.getUserId(token);
		List<Section> AllSections = getAllSection();
		List<Takes> allTakes = this.takesRepo.findAll();
		List<Section> sections = new ArrayList<Section>();
		long id;
		for (Takes take: allTakes) {
			if(take.getStudent_id() == student && take.getSemester().equals(semester) && take.getYear() == year) {
				id = take.getId();
				for (Section section: AllSections) {
					// student may have taken the section before
					if(id == section.getId()) {
						sections.add(section);
						break;
					}
				}
			}
		}
		return sections;
	}

	//create section
	@PostMapping
	public Section createSection(@RequestBody Section section) {
		List<Course> all = this.courseRepo.findAll();
		long id = section.getCourse_id();
		for(Course course: all) {
			if(id == course.getCourse_id())
				return this.repo.save(section);
		}
		throw new ResourceNotFoundException("section not found");
	}

	/*** unnecessary APIs
	// prevent from creating wrong mappings (takes, teaches)
	public boolean checkExist(long course_id, long section_id, String semester, String year) {
		List<Section> all = getAllSection();
		for (Section section: all) {
			if(section.getCourse_id() == course_id && section.getSection_id() == section_id
					&& section.getSemester().equals(semester) && section.getYear().equals(year))
				return true;
		}
		return false;
	}

	//get one section by section PKs
	@GetMapping("/{course_id}/{section_id}/{semester}/{year}")
	public Section getSectionById(@PathVariable (value = "course_id") long course_id,
			@PathVariable (value = "section_id") long section_id,
			@PathVariable (value = "semester") String semester,
			@PathVariable (value = "year") String year) {
		List<Section> all = getAllSection();
		for (Section section: all) {
			if(section.getCourse_id() == course_id && section.getSection_id() == section_id
					&& section.getSemester().equals(semester) && section.getYear().equals(year))
				return section;
		}
		throw new ResourceNotFoundException("section not found");
	}

	// get sections by course_id
	@RequestMapping(params="course_id", method = RequestMethod.GET)
	public List<Section> getSectionsByCourse(@RequestParam("course_id") long course){
		List<Section> AllSections = getAllSection();
		List<Section> sections = new ArrayList<Section>();
		for (Section section: AllSections) {
			if(section.getCourse_id() == course)
				sections.add(section);
		}
		if(sections.isEmpty())
			throw new ResourceNotFoundException("section not found");
		return sections;
	}

	// get all sections by one student
	@RequestMapping(params="student_id", method = RequestMethod.GET)
	public List<Section> getSectionsByStudent(@RequestParam("student_id") long student) {
		List<Section> AllSections = getAllSection();
		List<Takes> all = this.takesRepo.findAll();
		List<Section> sections = new ArrayList<Section>();
		long course_id, section_id;
		for (Takes take: all) {
			if(take.getStudent_id() == student) {
				course_id = take.getCourse_id();
				section_id = take.getSection_id();
				for (Section section: AllSections) {
					if(section.getCourse_id() == course_id && section.getSection_id() == section_id) {
						sections.add(section);
						break;
					}
				}
			}
		}
		if(sections.isEmpty())
			throw new ResourceNotFoundException("section not found");
		return sections;
	}


	//update section
	@RequestMapping(path = "/{course_id}/{section_id}/{semester}/{year}", method = RequestMethod.PUT)
	public Section updateSection(@RequestBody Section section,
			@PathVariable (value = "course_id") long course_id,
			@PathVariable (value = "section_id") long section_id,
			@PathVariable (value = "semester") String semester,
			@PathVariable (value = "year") String year) {
		Section exist = getSectionById(course_id, section_id,semester,year);
		exist.setCourse_id(section.getCourse_id());
		exist.setSection_id(section.getSection_id());
		exist.setSemester(section.getSemester());
		exist.setYear(section.getYear());
		exist.setTimeslot(section.getTimeslot());
		exist.setCapacity(section.getCapacity());
		return this.repo.save(exist);
	}

	// delete section by id
	@RequestMapping(path = "/{course_id}/{section_id}/{semester}/{year}", method = RequestMethod.DELETE)
	public ResponseEntity<Section> deleteSection(@PathVariable (value = "course_id") long course_id,
			@PathVariable (value = "section_id") long section_id,
			@PathVariable (value = "semester") String semester,
			@PathVariable (value = "year") String year){
		Section exist = getSectionById(course_id, section_id, semester, year);
		this.repo.delete(exist);
		return ResponseEntity.ok().build();
	}
	***/
}
