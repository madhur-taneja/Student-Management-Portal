import React, { Component, createRef } from "react";
import AuthService from "../services/auth.service";
import StudentService from "../services/student.service";

import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import CourseDetails from "./course-details";

export default class SettingsStudent extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            // User Based States 
            currentUser: AuthService.getCurrentUser(),
            studentAccess: false,
            moderatorAccess: false,
            recordsExist: false,

            // Student Details States 
            name: '',
            contactDetails: {
                phoneNumber: '',
                address: ''
            },
            courseDetails: {
                courseName: 'B.E.',
                subjects: [{
                    id: 0,
                    subjectName: 'Select a Subject',
                    grade: 0
                }]
            },
            touched: {
                name: false,
                contactDetails: {
                    phoneNumber: false,
                    address: false
                }
            }
        };

        // API call to fetch User Data 
        this.loadUser = this.loadUser.bind(this);

        // Blur Change 
        this.handleBlur = this.handleBlur.bind(this);
        this.handleContactDetailsBlur = this.handleContactDetailsBlur.bind(this);

        // Input Change 
        this.handleContactDetailsChange = this.handleContactDetailsChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // Update child data 
        this.getCourseData = this.getCourseData.bind(this);
        this.triggerChildToSendData = this.triggerChildToSendData.bind(this);

        // Submit 
        this.handleSubmit = this.handleSubmit.bind(this);

        // API call to save User Data
        this.saveStudentDetails = this.saveStudentDetails.bind(this);
        this.updateStudentDetails = this.updateStudentDetails.bind(this);

    }

    // Creating Reference of Child Component 
    private child = createRef<CourseDetails>()

    componentDidMount() {
        if (this.state.currentUser) {
            const user = this.state.currentUser;
            this.setState({
                studentAccess: user.roles.includes("ROLE_STUDENT"),
                moderatorAccess: user.roles.includes("ROLE_MODERATOR")
            });
        }
        this.loadUser();
    }

    // API call to fetch student details 
    loadUser() {
        StudentService.fetchUserBystudentId(this.state.currentUser.id)
            .then((res) => {
                if (res.data !== null) {
                    let user = res.data;
                    this.setState({
                        recordsExist: true,
                        name: user.name,
                        contactDetails: user.contactDetails,
                        courseDetails: user.courseDetails
                    })
                }
            });
    }

    saveStudentDetails() {
        const studentDetails = {
            "studentId": this.state.currentUser.id,
            "name": this.state.name,
            "contactDetails": this.state.contactDetails,
            "courseDetails": this.state.courseDetails
        }
        StudentService.saveStudentDetails(studentDetails)
            .then((res) => {
                console.log("Hi from Save");
            });
    }

    updateStudentDetails() {
        const payload = {
            "studentId": this.state.currentUser.id,
            "name": this.state.name,
            "contactDetails": this.state.contactDetails,
            "courseDetails": this.state.courseDetails
        }
        StudentService.sendUpdatedStudentDetails(this.state.currentUser.id, payload)
            .then((res) => {
                console.log("Hi from Update");
            });
    }

    // Function to get Data from Child 
    getCourseData(courseDetails: any) {
        this.setState({courseDetails: courseDetails});
        console.log("Parent cd" + JSON.stringify(courseDetails));
    }

    triggerChildToSendData (){
        this.child.current!.sendCourseData();
    }

    // Functions to Handle Blur 
    handleContactDetailsBlur = field => event => {
        const contactDetails = { ...this.state.touched };
        const currentState = contactDetails;
        const { name } = event.target;
        currentState.contactDetails[name] = true;

        this.setState({ touched: currentState });
    }

    handleBlur = field => evt => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    // Functions to Handle Changes in Form 
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleContactDetailsChange(event) {
        const contactDetails = { ...this.state.contactDetails };
        const currentState = contactDetails;
        const { name, value } = event.target;
        currentState[name] = value;

        this.setState({ contactDetails: currentState });
    }

    // Functions to Handle Submit
    handleSubmit(event) {
        event.preventDefault();
        this.triggerChildToSendData();

        // TODO: Integrate Update Student Details API 
        if(this.state.recordsExist) this.updateStudentDetails();
        else this.saveStudentDetails();

        alert('Current State is: ' + JSON.stringify(this.state));
    }

    // Form Validation 
    validate(name, phoneNumber, address) {
        const errors = {
            name: '',
            contactDetails: {
                phoneNumber: '',
                address: ''
            }
        };

        if (this.state.touched.name) {
            if (name.length < 3) {
                errors.name = "Name should be >= 3 characters";
            } else if (name.length > 20) {
                errors.name = "Name should be <= 20 characters";
            }
        }

        const reg = /^\d+$/;
        if (this.state.touched.contactDetails.phoneNumber && !reg.test(phoneNumber)) {
            errors.contactDetails.phoneNumber = "Tel. Number should contain only numbers";
        }

        if (this.state.touched.contactDetails.address) {
            if (address.length < 10) {
                errors.contactDetails.address = "Address should be >= 10 characters";
            } else if (address.length > 30) {
                errors.contactDetails.address = "Address should be <= 30 characters";
            }
        }

        return errors;
    }

    render() {
        const errors = this.validate(this.state.name, this.state.contactDetails.phoneNumber, this.state.contactDetails.address);

        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="row row-content d-flex justify-content-center border border-dark rounded m-5 p-2">
                    <div className="col-12 text-center">
                        <h3>Personal Details</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <FormGroup row>
                            <Label htmlFor="name" md={2}>Name:</Label>
                            <Col md={10}>
                                <Input type="text" id="name" name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange={this.handleInputChange}
                                    disabled={this.state.moderatorAccess} required />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="phoneNumber" md={2}>Phone Number:</Label>
                            <Col md={10}>
                                <Input type="tel" id="phoneNumber" name="phoneNumber"
                                    placeholder="Tel. Number"
                                    value={this.state.contactDetails.phoneNumber}
                                    valid={errors.contactDetails.phoneNumber === ''}
                                    invalid={errors.contactDetails.phoneNumber !== ''}
                                    onBlur={this.handleContactDetailsBlur('phoneNumber')}
                                    onChange={this.handleContactDetailsChange}
                                    disabled={this.state.moderatorAccess} required />
                                <FormFeedback>{errors.contactDetails.phoneNumber}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="address" md={2}>Address:</Label>
                            <Col md={10}>
                                <Input type="text" id="address" name="address"
                                    placeholder="Address"
                                    value={this.state.contactDetails.address}
                                    valid={errors.contactDetails.address === ''}
                                    invalid={errors.contactDetails.address !== ''}
                                    onBlur={this.handleContactDetailsBlur('address')}
                                    onChange={this.handleContactDetailsChange}
                                    disabled={this.state.moderatorAccess} required />
                                <FormFeedback>{errors.contactDetails.address}</FormFeedback>
                            </Col>
                        </FormGroup>
                        {this.state.studentAccess && !this.state.moderatorAccess && (<FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </FormGroup>)}
                    </div>
                </div>
                <CourseDetails ref={this.child} courseDetails={this.state.courseDetails} 
                moderatorAccess={this.state.moderatorAccess} sendData={this.getCourseData} />
            </Form>
        );
    }
}