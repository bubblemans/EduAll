package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity
@Table(name = "teaches")
@IdClass(TeachesId.class)
public class Teaches {
	
	@Id
	private long id;
	
	@Id
	private long section_id;
	
	@Id
	private long course_id;
	
	@Id
	private String semester;
	
	@Id
	private int year;
	
	public Teaches() {
		
	}

	public Teaches(long id, long section, long course, String semester, int year) {
		super();
		this.id = id;
		this.section_id = section;
		this.course_id = course;
		this.semester = semester;
		this.year = year;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public void setYear(int year) {
		this.year = year;
	}
}
