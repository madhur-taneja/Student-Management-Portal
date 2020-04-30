package com.tektraining.loginmodule.models;

import java.util.List;

public class Course {

    private List<Subject> subjects;

    public Course() {
        
    }

    public Course(List<Subject> subjects) {
        this.setSubjects(subjects);
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