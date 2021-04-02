package com.example.springBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springBoot.entity.User;

@Repository //Annotating so that Spring would scan the interface below as spring bean during component scanning
public interface UserRepository extends JpaRepository<User, Long>{
//This repository will provide CRUD data operations for the User entity
	
	
	

}
