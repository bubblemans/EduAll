package com.example.springBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springBoot.entity.User;

@Repository // Annotating so that Spring would scan the interface below as spring bean during component scanning
public interface UserRepository extends JpaRepository<User, Long> {
// This repository will provide CRUD data operations for the User entity

    @Query("SELECT u FROM User u WHERE u.Token LIKE :Token")
    User searchByToken(@Param("Token") String Token);

    @Query("SELECT u FROM User u where u.email = ?1")
    User findByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.email LIKE :email AND u.Password LIKE :Password")
    User searchByEmailAndPWD(@Param("email") String email, @Param("Password") String Password);

}
