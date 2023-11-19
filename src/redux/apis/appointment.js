import axios from "../../axios/axiosInstance";


const options = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export const getAppointment = async (appointment) => {
   const res = await axios.post('/appointments/add',appointment,options);
    console.log(res.data);
    return res.data;
}

export const getAppointmentsByRole = async (role,id) => {
    const res = await axios.get(`/appointments/${role}/${id}`);
    console.log(res.data);
    return res.data;
} 