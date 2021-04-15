package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "takes")
@IdClass(TakesId.class)
public class Takes {
	
	@Id // primary key of section
	private long id;
	
	@Id
	private long student_id;
	
	private long section_id; // just a section number  (CS160 section 1)
	
	private long course_id;
	
	private String course_name;
	
	private String semester;

	private int year;
	
	private String grade;
	
	public Takes() {
		
	}

	public Takes(long id, long student_id, long section_id, long course_id, String course_name, String semester,
			int year, String grade) {
		super();
		this.id = id;
		this.student_id = student_id;
		this.section_id = section_id;
		this.course_id = course_id;
		this.course_name = course_name;
		this.semester = semester;
		this.year = year;
		this.grade = grade;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getStudent_id() {
		return student_id;
	}

	public void setStudent_id(long student_id) {
		this.student_id = student_id;
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

	public String getCourse_name() {
		return course_name;
	}

	public void setCourse_name(String course_name) {
		this.course_name = course_name;
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

	public void setYear(int year) {
		this.year = year;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	
}