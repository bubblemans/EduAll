package com.example.springBoot.entity;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity //JPA
@Table(name = "users")
public class User { // Creating a user GP entity that is mapped to the table specified above
	
	@Id   // Primary key
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long ID;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "Password")
	private String Password;
	
	@Column(name = "Role")
	private String Role;
		
	@Column(name = "Token")
	private String Token;
	

	public User() {
		
	}
		
	public User(String firstName, String lastName, String email, String Password, String Role, String Token){
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.Password = Password;
		this.Role = Role;
		this.Token = generateToken(this.ID);
		
	}
	
	public long getID() {
		return ID;
	}
	public void setID(long iD) {
		ID = iD;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPwd() {
		return Password;
	}
	public void setPwd(String Password) {
		this.Password = Password;
	}
	public String getRole() {
		return Role;
	}
	public void setRole(String Role) {
		this.Role = Role;
	}
	public String getToken() {	
		return Token;
	}
	public void setToken(String token) {
		this.Token = token;
	}
	
	public String generateToken(long id) {
		
		String token = Long.toString(id);
		
		try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(token.getBytes());
            byte[] bytes = md.digest();
            // This bytes[] has bytes in decimal format;
            // Converting to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for(int i=0; i< bytes.length ;i++)
            {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            // Token hashed in hex format
            token = sb.toString();
        } 
        catch (NoSuchAlgorithmException e) 
        {
            e.printStackTrace();
        }		
		return token;
	}
}