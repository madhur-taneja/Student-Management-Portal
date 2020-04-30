package com.tektraining.loginmodule.models.student;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.tektraining.loginmodule.models.user.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student-details")
public class Student {

    private User user;

    @Id
    private String id;

    private String studentId;

    @NotBlank
    @Size(max = 20)
    private String name;

    private Contact contactDetails;

    private Course courseDetails;

    public Student() {

    }

    public Student(final User user, @NotBlank @Size(max = 20) final String name, final Contact contactDetails,
            final Course courseDetails) {
        this.setstudentId(user.getId());
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
    public void setUser(final User user) {
        this.user = user;
    }

    /**
     * @return String return the studentId
     */
    public String getstudentId() {
        return studentId;
    }

    /**
     * @param studentId the studentId to set
     */
    public void setstudentId(final String studentId) {
        this.studentId = studentId;
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
    public void setName(final String name) {
        this.name = name;
    }

    /**
     * @param contactDetails the ContactDetails to set
     */
    public void setContactDetails(final Contact contactDetails) {
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
    public void setCourseDetails(final Course courseDetails) {
        this.courseDetails = courseDetails;
    }

    /**
     * @return CourseDetails return the courseDetails
     */
    public Course getCourseDetails() {
        return courseDetails;
    }

}