package com.tektraining.loginmodule.repository;

import com.tektraining.loginmodule.models.Student;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {

}