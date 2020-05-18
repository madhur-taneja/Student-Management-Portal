import React, { Component } from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';


class SubjectDetails extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            moderatorAccess: false,
            id: null,
            subjectName: 'Select a Subject',
            grade: 0
        };
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }
    
    componentDidMount() {
        this.setState({moderatorAccess: this.props.moderatorAccess, id: this.props.id, 
            subjectName: this.props.subjectName, grade: this.props.grade});
            console.log('state in subject', this.state);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.id !== prevProps.id) {
            this.setState({id: this.props.id});
          }
        if (this.props.subjectName !== prevProps.subjectName) {
          this.setState({subjectName: this.props.subjectName});
        }
        if (this.props.grade !== prevProps.grade) {
            this.setState({grade: this.props.grade});
        }
    }

    // Function to Handle Changes in Form 
    handleSubjectChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.props.sendSubjectData(this.state.id, this.state.subjectName, this.state.grade);
    }

    render() {
        return (
            <FormGroup row>
                <Col md={{ size: 5 }}>
                    <FormGroup>
                        <Input type="select" id="subjectName" name="subjectName"
                            value={this.state.subjectName}
                            onChange={this.handleSubjectChange} 
                            disabled={!this.state.moderatorAccess} required >
                            <option disabled> Select a Subject </option>
                            <option>C/C++</option>
                            <option>Java</option>
                            <option>Operating Systems</option>
                            <option>Theory of Computation</option>
                            <option>Software Engineering</option>
                        </Input>
                    </FormGroup>
                    {/* <FormGroup>
                        <Input type="select" id="subjectName" name="subjectName"
                            value={this.state.subjectName}
                            onChange={this.handleSubjectChange} required>
                            <option disabled> Select a Subject </option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>Mathematics</option>
                            <option>Statistics</option>
                            <option>Zoology</option>
                        </Input>
                    </FormGroup> */}
                </Col>
                <Col md={{ size: 7 }} >
                    <FormGroup row>
                        <Label htmlFor="grade">Grade</Label>
                        <Col md={10}>
                            <Input type="number" id="grade" name="grade" min="0" max="10"
                                placeholder="Grade" value={this.state.grade}
                                onChange={this.handleSubjectChange} 
                                disabled={!this.state.moderatorAccess} required />
                        </Col>
                    </FormGroup>
                </Col>
            </FormGroup>
        );
    }
}

export default SubjectDetails;