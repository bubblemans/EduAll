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
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "sex")
	private char sex;
	
	@Column(name = "age")
	private int age;
	
	@Column(name = "year")
	private int year;
	
	@Column(name = "department")
	private String department;
	
	public Instructor() {
		
	}
	
	public Instructor(String name, char sex, int age, int year, String department) {
		super();
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.year = year;
		this.department = department;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public char getSex() {
		return sex;
	}
	public void setSex(char sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
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
