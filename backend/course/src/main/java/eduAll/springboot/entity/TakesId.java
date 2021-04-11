package eduAll.springboot.entity;

import java.io.Serializable;
import java.util.Objects;

public class TakesId implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long id;
	private long student_id;
	
	public TakesId() {}
	
	public TakesId(long id, long student_id) {
		super();
		this.id = id;
		this.student_id = student_id;
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

	@Override
	public boolean equals(Object o) {
		if (o == this)
	        return true;
		if (!(o instanceof TakesId)) return false;
		TakesId that = (TakesId) o;
		return Objects.equals(getStudent_id(), that.getStudent_id())&&
				Objects.equals(getId(), that.getId());
	}
	
	@Override
	public final int hashCode() {
		return Objects.hash(getId(), getStudent_id());
	}
	
}
