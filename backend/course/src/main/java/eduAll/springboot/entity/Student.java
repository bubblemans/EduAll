package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
@Table(name = "student")

public class Student {
	
	@Id // match with user id
	private long id;
	
	@Column(name = "year")
	private int year;
	
	@Column(name = "major")
	private String major;
	
	public Student() {
		
	}
	
	public Student(long id, int year, String major) {
		super();
		this.id = id;
		this.year = year;
		this.major = major;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}
}
