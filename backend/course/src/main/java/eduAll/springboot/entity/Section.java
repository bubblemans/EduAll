package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import javax.persistence.Column;

@Entity
@Table(name = "section")
@IdClass(SectionId.class)
public class Section{

	@Id
	private long section_id;
	
	@Id
	private long course_id;

	@Id
	private String semester;

	@Id
	private String year;
	
	@Column(name = "timeslot")
	private String timeslot;
	
	@Column(name = "capacity")
	private int capacity;
	
	public Section() {
		
	}

	public Section(long section_id, long course_id, String semester, String year, String timeslot, int capacity) {
		super();
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
		this.timeslot = timeslot;
		this.capacity = capacity;
	}

	public long getSection_id() {
		return section_id;
	}

	public void setSection_id(long section_id) {
		this.section_id = section_id;
	}

	public long getCourse_id() {
		return course_id;
	}

	public void setCourse_id(long course_id) {
		this.course_id = course_id;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	
}
