package eduAll.springboot.entity;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name = "instructor")

public class Instructor {
	
	@Id // token
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "year")
	private int year;
	
	@Column(name = "department")
	private String department;
	
	public Instructor() {
		
	}
	
	public Instructor(int year, String department) {
		super();
		this.year = year;
		this.department = department;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	
}
