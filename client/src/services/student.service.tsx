import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/student/';

class StudentService {

    fetchUserBystudentId(studentId) {
        return axios.get(API_URL + `get-details/${studentId}`, { headers: authHeader() });
    }

    saveStudentDetails(studentDetails) {
        return axios.post(API_URL + `save-details`, studentDetails, { headers: authHeader() });
    }

    sendUpdatedStudentDetails(studentId, payload) {
        return axios.put(API_URL + `update-details/${studentId}`, payload, { headers: authHeader() });
    }
}

export default new StudentService();