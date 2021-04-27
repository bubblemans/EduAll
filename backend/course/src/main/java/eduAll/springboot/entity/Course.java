package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name = "course")

public class Course {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "credit")
	private int credit;
	
	@Column(name = "offer_season")
	private String season;
	
	@Column(name = "department")
	private String department;
	
	public Course() {
		
	}

	public Course(String name, String title, int credit, String season, String department) {
		super();
		this.name = name;
		this.title = title;
		this.credit = credit;
		this.season = season;
		this.department = department;
	}

	public long getCourse_id() {
		return id;
	}

	public void setCourse_id(long course_id) {
		this.id = course_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getCredit() {
		return credit;
	}

	public void setCredit(int credit) {
		this.credit = credit;
	}

	public String getSeason() {
		return season;
	}

	public void setSeason(String season) {
		this.season = season;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
}
