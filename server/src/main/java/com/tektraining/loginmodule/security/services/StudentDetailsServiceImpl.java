package com.tektraining.loginmodule.security.services;

import java.util.Optional;

import com.tektraining.loginmodule.models.student.Student;
import com.tektraining.loginmodule.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsServiceImpl {
    @Autowired
    StudentRepository studentRepository;

    // Create Operation
    public Student createStudentDetails(Student studentDetails) {
        return studentRepository.save(studentDetails);
    }

    // Read Operation
    public Optional<Student> readStudentDetails(String id) {
        System.out.println("id in service is " + id);
        Optional<Student> studentDetails = studentRepository.findByStudentId(id);
        System.out.println("details in service is " + studentDetails);
        return studentDetails;
    }
}