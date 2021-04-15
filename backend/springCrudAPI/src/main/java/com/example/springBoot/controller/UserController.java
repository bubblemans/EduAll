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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.springBoot.repository.UserRepository;
import com.example.springBoot.entity.User;
import com.example.springBoot.exception.ResourceNotFoundException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController  //annotation for creating rest API
@RequestMapping("/api/users") //The path for all the rest APIs
public class UserController {

	@Autowired //Injected user repository annotation
	private UserRepository userRepository;
	private String response;

	//Get all users
	@GetMapping
	@CrossOrigin(origins = "*")
	public List<User> getAllUsers(){
		return this.userRepository.findAll();
	}

	//Get the user by ID
	@GetMapping("/{id}")
	@CrossOrigin(origins = "*")
	public User getUserByID(@PathVariable(value = "id") long userId) {

		if(this.userRepository.existsById(userId)) {
			//The path variable gets it from database
			return this.userRepository.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));
		}
		else {
			throw new ResourceNotFoundException("User not found with the ID: " + userId);
		}
	}

	@GetMapping("/{email}/{Password}")
	@CrossOrigin(origins = "*")
	public User getUserByEmailPassword(@PathVariable(value = "email") String email, @PathVariable(value = "Password") String Password) {
		return this.userRepository.searchByEmailAndPWD(email, Password);
	}

	//Create user
	@PostMapping
	@CrossOrigin(origins = "*")
	public User createUser(@RequestBody User user) {
		String tk = user.generateToken(user.getID());
		user.setToken(tk);
		return this.userRepository.save(user);

	}

	//Update user
	@PutMapping("/{id}")
	@CrossOrigin(origins = "*")
	public User updateUser(@RequestBody User user, @PathVariable("id") long userId) {

		if(this.userRepository.existsById(userId)) {
			User existingUserObj =  this.userRepository.findById(userId).
					orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));

			existingUserObj.setFirstName(user.getFirstName());
			existingUserObj.setLastName(user.getLastName());
			existingUserObj.setEmail(user.getEmail());
			existingUserObj.setPwd(user.getPwd());

			return this.userRepository.save(existingUserObj);

		}
		else {
			throw new ResourceNotFoundException("User not found with the ID: " + userId);
		}
	}

	//Delete user by ID
	@DeleteMapping("/{id}/")
	@CrossOrigin(origins = "*")
	public ResponseEntity<User> deleteUser(@PathVariable("id") long userId){

		if(this.userRepository.existsById(userId)) {
			User existingUserObj = this.userRepository.findById(userId).
					orElseThrow(() -> new ResourceNotFoundException("User not found with the ID: " + userId));
			this.userRepository.delete(existingUserObj);
			return ResponseEntity.ok().build();
		}
		else {
			throw new ResourceNotFoundException("User not found with the ID: " + userId);
		}
	}

	//Get userId by Token
	@GetMapping("/{id}/token")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public Map<String,Object> getIdByToken(@PathVariable("id") long id, @RequestParam("token") String token){
		String userId = "", jsId = "";
		Map<String, Object> js = new LinkedHashMap<>();

		try {
			User user2 = userRepository.searchByToken(token);
			userId = String.valueOf(user2.getID());
			js.put("userID", userId);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return js;
	}
}
