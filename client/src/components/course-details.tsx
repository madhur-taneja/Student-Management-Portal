import React, { Component } from 'react';
import { FormGroup, Label, Col, Input, Button } from 'reactstrap';
import SubjectDetails from './course-subjects';

// TODO: Add Redux and Update Parent on every change in this Component and in any of it's children 
class CourseDetails extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            moderatorAccess: false,
            dropDownArray: [],

            courseDetails: {
                courseName: 'B.E.',
                subjects: [{
                    id: 0,
                    subjectName: 'Select a Subject',
                    grade: 0
                }]
            }
        };

        // Input Change 
        this.handleCourseDetailsChange = this.handleCourseDetailsChange.bind(this);

        // Handle Subjects 
        this.addDropDown = this.addDropDown.bind(this);
        this.getSubjectData = this.getSubjectData.bind(this);
        this.addNewSubject = this.addNewSubject.bind(this);
    }

    componentDidMount() {
        this.setState({ moderatorAccess: this.props.moderatorAccess, courseDetails: this.props.courseDetails });
        this.state.courseDetails.subjects.forEach(() => {
            this.addDropDown();
        });
    }

    componentDidUpdate(prevProps: any) {
        // Typical usage (don't forget to compare props):
        if (this.props.courseDetails.courseName !== prevProps.courseDetails.courseName) {
            this.setState({ courseName: this.props.courseDetails.courseName });
        }

        this.props.courseDetails && prevProps.courseDetails && this.props.courseDetails.subjects.forEach((subject, index) => {
            console.log(subject, prevProps.courseDetails.subjects[index])
            if (subject && prevProps.courseDetails.subjects[index] && 
                (subject.subjectName !== prevProps.courseDetails.subjects[index].subjectName || 
                subject.grade !== prevProps.courseDetails.subjects[index].grade)) {
                this.setState({dropDownArray: []});
                this.setState({ courseDetails: this.props.courseDetails });
                this.props.courseDetails.subjects.forEach((subject, index) => {
                    subject.id = index;
                    this.addDropDown();
                });
            }
        });
    }

    // Function to Handle Changes in Course Name 
    handleCourseDetailsChange(event) {
        const courseDetails = { ...this.state.courseDetails };
        const currentState = courseDetails;
        const { name, value } = event.target;
        currentState[name] = value;

        this.setState({ courseDetails: currentState });
        // this.props.sendCourseData(currentState);
    }

    // Function to Add New Subject  
    addNewSubject() {
        const newSubject = { id: this.state.dropDownArray.length, subjectName: 'Select a Subject', grade: 0 };
        let courseDetails = { ...this.state.courseDetails }
        courseDetails.subjects = [...this.state.courseDetails.subjects, newSubject];
        this.setState({ courseDetails });
        this.addDropDown();
        // this.props.sendCourseData(courseDetails);
    }

    addDropDown() {
        let copy = [...this.state.dropDownArray];
        copy.push(<SubjectDetails />);
        this.setState({
            dropDownArray: copy
        });
    }

    // Get Data From Child 
    getSubjectData(id: any, subjectName: any, grade: any) {

        const newSubject = { id, subjectName, grade };
        const courseDetails = { ...this.state.courseDetails }

        const elementsIndex = courseDetails.subjects.findIndex(subject => subject.id === id);

        if (elementsIndex !== -1) {
            // Update existing value to the array
            let newArray = [...this.state.courseDetails.subjects];
            newArray[elementsIndex] = newSubject;
            courseDetails.subjects = newArray;
        }
        // else {
        //     // Add new value to the array 
        //     courseDetails.subjects = [...this.state.courseDetails.subjects, newSubject];
        // }
        this.setState({ courseDetails });
        // this.props.sendCourseData(courseDetails);

    }

    // Send Data to Parent 
    sendCourseData() {
        this.props.sendData(this.state.courseDetails);
    }

    render() {
        return (
            <div className="row row-content d-flex justify-content-center border border-dark rounded m-5 p-2">
                <div className="col-12 text-center">
                    <h3>Course Details</h3>
                </div>
                <div className="col-12 col-md-9">
                    <FormGroup row>
                        <Label htmlFor="courseName" md={2}>Course:</Label>
                        <Col md={{ size: 3 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="courseName" value="B.E."
                                        checked={this.state.courseDetails.courseName === "B.E."}
                                        onChange={this.handleCourseDetailsChange}
                                        disabled={!this.state.moderatorAccess} required />{' '}
                                        B.E.
                                    </Label>
                            </FormGroup>
                        </Col>
                        <Col md={{ size: 3 }}>
                            <FormGroup check>
                                <Label >
                                    <Input type="radio" name="courseName" value="B.Sc."
                                        checked={this.state.courseDetails.courseName === "B.Sc."}
                                        onChange={this.handleCourseDetailsChange}
                                        disabled={!this.state.moderatorAccess} required />{' '}
                                        B.Sc.
                                    </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="subjects" md={2}>Subjects:</Label>
                        <Col md={{ size: 9 }}>
                            {
                                this.state.dropDownArray.map((dropDown: any, index: number) =>
                                    <SubjectDetails key={index} id={index}
                                        moderatorAccess={this.state.moderatorAccess}
                                        subjectName={this.state.courseDetails.subjects[index].subjectName}
                                        grade={this.state.courseDetails.subjects[index].grade}
                                        sendSubjectData={this.getSubjectData} />
                                )
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        {this.state.moderatorAccess && (<Col md={{ size: 3 }}>
                            <Button onClick={() => this.addNewSubject()}>Add Subject</Button>
                        </Col>)}
                    </FormGroup>
                    {this.state.moderatorAccess && (<FormGroup row>
                        <Col md={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </FormGroup>)}
                </div>
            </div>
        )
    }

}

export default CourseDetails;