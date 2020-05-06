package com.tektraining.loginmodule.repository;

import java.util.Optional;

import com.tektraining.loginmodule.models.student.Student;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    
    @Query("{'studentId': ?0}")
    Optional<Student> findByStudentId(String studentId);
}