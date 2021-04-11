package eduAll.springboot.entity;

import java.io.Serializable;
import java.util.Objects;

public class TeachesId implements Serializable{

	private static final long serialVersionUID = 1L;

	private long id;
	private long section_id;
	private long course_id;
	private String semester;
	private int year;
	
	public TeachesId() {}
	
	public TeachesId(long id, long section_id, long course_id, String semester, int year) {
		super();
		this.id = id;
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
	}
	
	@Override
	public boolean equals(Object o) {
		if (o == this)
	        return true;
		if (!(o instanceof TeachesId)) return false;
		TeachesId that = (TeachesId) o;
		return Objects.equals(getId(), that.getId())&&
				Objects.equals(getSection_id(), that.getSection_id()) &&
                Objects.equals(getCourse_id(), that.getCourse_id());
	}
	
	@Override
	public final int hashCode() {
		return Objects.hash(getSection_id(), getCourse_id(), getId());
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
