package com.tektraining.loginmodule.controllers;

import java.util.Optional;

import javax.validation.Valid;

import com.tektraining.loginmodule.models.student.Student;
import com.tektraining.loginmodule.payload.response.MessageResponse;
import com.tektraining.loginmodule.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentRepository studentRepository;

    @GetMapping()
    @PreAuthorize("hasRole('STUDENT')")
    public Optional<Student> getDetails(String id) {
        return studentRepository.findById(id);
    }

    @PostMapping("/save-details")
    @PreAuthorize("hasRole('STUDENT')")
    public  ResponseEntity<?> SaveDetails(@Valid @RequestBody Student studentDetails) {
        studentRepository.save(studentDetails);
        return ResponseEntity.ok(new MessageResponse("Student Details Saved Successfully!"));
    }
}
