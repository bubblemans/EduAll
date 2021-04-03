package eduAll.springboot.entity;

import java.io.Serializable;
import java.util.Objects;

public class SectionId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long section_id;
	private long course_id;
	private String semester;
	private String year;
	
	public SectionId() {}
	
	public SectionId(long section_id, long course_id, String semester, String year) {
		super();
		this.section_id = section_id;
		this.course_id = course_id;
		this.semester = semester;
		this.year = year;
	}
	
	@Override
	public boolean equals(Object o) {
		if (o == this)
	        return true;
		if (!(o instanceof SectionId)) return false;
		SectionId that = (SectionId) o;
		return Objects.equals(getSection_id(), that.getSection_id()) &&
                Objects.equals(getCourse_id(), that.getCourse_id());
	}
	
	@Override
	public final int hashCode() {
		return Objects.hash(getSection_id(), getCourse_id());
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
