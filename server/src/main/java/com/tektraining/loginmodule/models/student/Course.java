package com.tektraining.loginmodule.models.student;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Course {

    @NotBlank
    @Size(max = 20)
    private String courseName;

    private List<Subject> subjects;

    public Course() {
        
    }

    public Course(String courseName, List<Subject> subjects) {
        this.setCourseName(courseName);
        this.setSubjects(subjects);
    }

    /**
     * @return String return the courseName
     */
    public String getCourseName() {
        return courseName;
    }

    /**
     * @param courseName the courseName to set
     */
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    /**
     * @return List<Subject> return the subjects
     */
    public List<Subject> getSubjects() {
        return subjects;
    }

    /**
     * @param subjects the subjects to set
     */
    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

}