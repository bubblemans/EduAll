package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table(name = "takes")
@IdClass(TakesId.class)
public class Takes {
	
	@Id
	private long student_id;
	
	@Id
	private long section_id;
	
	@Id
	private long course_id;
	
	@Id
	private String semester;
	
	@Id
	private String year;
	
	@Column(name = "grade")
	private String grade;
	
	public Takes() {
		
	}

	public Takes(long student_id, long section_id, long course_id, String semester, String year, String grade) {
		super();
		this.student_id = student_id;
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
		this.grade = grade;
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

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}
}