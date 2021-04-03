package eduAll.springboot.entity;

import java.io.Serializable;
import java.util.Objects;

public class TakesId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long student_id;
	private long section_id;
	private long course_id;
	private String semester;
	private String year;
	
	public TakesId() {}
	
	public TakesId(long student_id, long section_id, long course_id, String semester, String year) {
		super();
		this.student_id = student_id;
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
	}
	
	@Override
	public boolean equals(Object o) {
		if (o == this)
	        return true;
		if (!(o instanceof TakesId)) return false;
		TakesId that = (TakesId) o;
		return Objects.equals(getStudent_id(), that.getStudent_id())&&
				Objects.equals(getSection_id(), that.getSection_id()) &&
                Objects.equals(getCourse_id(), that.getCourse_id());
	}
	
	@Override
	public final int hashCode() {
		return Objects.hash(getSection_id(), getCourse_id(), getStudent_id());
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
}
