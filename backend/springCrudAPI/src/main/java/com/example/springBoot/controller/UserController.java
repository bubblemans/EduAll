package com.example.springBoot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.springBoot.repository.UserRepository;
import com.example.springBoot.entity.User;
import com.example.springBoot.exception.ResourceNotFoundException;

import java.util.List;

@RestController  //annotation for creating rest API
@RequestMapping("/api/users") //The path for all the rest APIs
public class UserController {
	
	@Autowired //Injected user repository annotation
	private UserRepository userRepository; //using all the CRUD database operations from userRepository interface
	
	// The followings are the rest APIs that we will be creating next
	
	//Get all users
	@GetMapping
	public List<User> getAllUsers(){ //This API returns a list of all users
		return this.userRepository.findAll();
	}
	//Get all users by ID
	@GetMapping("/{id}")
	public User getUserByID(@PathVariable(value = "id") long userId) { 
//The path variable gets it from database
		System.out.println("From get method" + userId);
		
		//User user = new User();
		
		//return  user;
	
		return this.userRepository.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));
		
	}
	//Create user
	@PostMapping
	public User createUser(@RequestBody User user) {
		return this.userRepository.save(user);
		
	}
	//Update user
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User user, @PathVariable("id") long userId) {
		User existingUserObj =  this.userRepository.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));
		
		existingUserObj.setFirstName(user.getFirstName());
		existingUserObj.setLastName(user.getLastName());
		existingUserObj.setEmail(user.getEmail());
		existingUserObj.setToken(user.getToken());
		existingUserObj.setPwd(user.getPwd());
		existingUserObj.setRole(user.getRole());
		
		return this.userRepository.save(existingUserObj);	
		
	}
	//Delete user by ID 
	@DeleteMapping("/{id}/")
	public ResponseEntity<User> deleteUser(@PathVariable("id") long userId){
		User existingUserObj =  this.userRepository.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));
		this.userRepository.delete(existingUserObj);
		return ResponseEntity.ok().build();
	}
}
