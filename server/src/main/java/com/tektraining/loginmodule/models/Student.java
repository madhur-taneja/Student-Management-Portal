package com.tektraining.loginmodule.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student-details")
public class Student {

    private User user;

    private String id;

    @NotBlank
    @Size(max = 20)
    private String name;

    private Contact contactDetails;

    private Course courseDetails;

    public Student() {

    }

    public Student(User user, @NotBlank @Size(max = 20) String name, 
    Contact contactDetails, Course courseDetails) {
        this.setId(user.getId());
        this.setName(name);
        this.setContactDetails(contactDetails);
        this.setCourseDetails(courseDetails);
    }

    /**
     * @return User return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @param contactDetails the ContactDetails to set
     */
    public void setContactDetails(Contact contactDetails) {
        this.contactDetails = contactDetails;
    }


    /**
     * @return ContactDetails return the contactDetails
     */
    public Contact getContactDetails() {
        return contactDetails;
    }

    /**
     * @param courseDetails the CourseDetails to set
     */
    public void setCourseDetails(Course courseDetails) {
        this.courseDetails = courseDetails;
    }

    /**
     * @return CourseDetails return the courseDetails
     */
    public Course getCourseDetails() {
        return courseDetails;
    }

}