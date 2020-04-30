package com.tektraining.loginmodule.models;

import javax.validation.constraints.Max;

public class Subject {

    @Max(10)
    private int grade;

    public Subject() {
    }

    public Subject(int grade) {
        this.setGrade(grade);
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