package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.Column;

@Entity
@Table(name = "section")
public class Section{

	@Id // token
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private long section_id;
	
	private long course_id;
	
	private String semester;

	private int year;
	
	private String course_name;
	
	@Column(name = "timeslot")
	private String timeslot;
	
	@Column(name = "capacity")
	private int capacity;


	@Column(name = "days")
	private String days;
	
	
	public Section() {
		
	}
	
	public Section(long section_id, long course_id, String semester, int year, String course_name, String timeslot,
			int capacity, String days) {
		super();
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
		this.course_name = course_name;
		this.timeslot = timeslot;
		this.capacity = capacity;
		this.days = days;
	}

	public long getId() {
		return id;
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

	public int getYear() {
		return year;
	}

	public String getdays() {
		return days;
	}


	public void setYear(int year) {
		this.year = year;
	}

	public String getCourse_name() {
		return course_name;
	}

	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}
	public String setDays(String Days) {
		return days;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	
}
