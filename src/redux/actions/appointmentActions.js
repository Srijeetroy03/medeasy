import { getAppointment, getAppointmentsByRole } from "../apis/appointment";
import { BOOK_APPOINTMENT_FAIL, BOOK_APPOINTMENT_REQUEST, BOOK_APPOINTMENT_SUCCESS, GET_APPOINTMENTS_FAIL, GET_APPOINTMENTS_REQUEST, GET_APPOINTMENTS_SUCCESS } from "../constants/appointment";

export const bookAppointmentRequest = () => {
    return {
        type: BOOK_APPOINTMENT_REQUEST
    }
}

export const bookAppointmentSuccess = (appointment) => {
    return {
        type: BOOK_APPOINTMENT_SUCCESS,
        payload: appointment
    }
}

export const bookAppointmentFail = (error) => {
    console.log('error failed: ',error);
    return {
        type: BOOK_APPOINTMENT_FAIL,
        payload: error
    }
}

export const bookAppointment = (appointment) => 
    async (dispatch) => {
        dispatch(bookAppointmentRequest());
        try {
            const res = await getAppointment(appointment);
            dispatch(bookAppointmentSuccess(res));
        } catch (error) {
            console.log('error: ',error);
            dispatch(bookAppointmentFail(error.response.data.message));
        }
}

export const getUserAppointmentRequest = () => {
    return {
        type: GET_APPOINTMENTS_REQUEST
    }
}

export const getUserAppointmentSuccess = (appointments) => {
    return {
        type: GET_APPOINTMENTS_SUCCESS,
        payload: appointments
    }
}

export const getUserAppointmentFail = (error) => {
    return {
        type: GET_APPOINTMENTS_FAIL,
        payload: error
    }
}

export const getUserAppointment = ({role,id}) => async (dispatch) => {
    dispatch(getUserAppointmentRequest());
    try{
        const res = await getAppointmentsByRole(role,id);
        console.log(res);
        dispatch(getUserAppointmentSuccess(res));
    }
    catch(err){
        dispatch(getUserAppointmentFail(err));
    }
}
    