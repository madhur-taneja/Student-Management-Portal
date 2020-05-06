package com.tektraining.loginmodule.controllers;

import java.util.Optional;

import javax.validation.Valid;

import com.tektraining.loginmodule.models.student.Student;
import com.tektraining.loginmodule.security.services.StudentDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentDetailsServiceImpl studentDetailsServiceImpl;

    @GetMapping("get-details/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('MODERATOR')")
    public Optional<Student> getDetails(@PathVariable("id") String id) {
        System.out.println("id is " + id);
        // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return studentDetailsServiceImpl.readStudentDetails(id);
    }

    @PostMapping("/save-details")
    @PreAuthorize("hasRole('STUDENT') or hasRole('MODERATOR')")
    public ResponseEntity<Student> SaveStudentDetails(@Valid @RequestBody Student studentDetails) {
        Student newStudentDetails = studentDetailsServiceImpl.createStudentDetails(studentDetails);
        return new ResponseEntity<>(newStudentDetails, HttpStatus.OK);
    }
}
