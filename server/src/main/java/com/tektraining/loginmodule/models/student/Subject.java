package com.tektraining.loginmodule.models.student;

import javax.validation.constraints.Max;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;

public class Subject {

    @Id
    String id;

    @Size(max = 10)
    private String subjectName;

    @Max(10)
    private int grade;

    public Subject() {
    }

    public Subject(String id, String subjectName, int grade) {
        this.setId(id);
        this.setSubjectName(subjectName);
        this.setGrade(grade);
    }

    /**
     * @return String return the name
     */
    public String gerId() {
        return id;
    }

    /**
     * @param name the name to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the name
     */
    public String getSubjectName() {
        return subjectName;
    }

    /**
     * @param name the name to set
     */
    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    /**
     * @return int return the grade
     */
    public int getGrade() {
        return grade;
    }

    /**
     * @param grade the grade to set
     */
    public void setGrade(int grade) {
        this.grade = grade;
    }
}