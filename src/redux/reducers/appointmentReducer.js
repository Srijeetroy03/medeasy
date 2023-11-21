import { BOOK_APPOINTMENT_FAIL, BOOK_APPOINTMENT_REQUEST, BOOK_APPOINTMENT_SUCCESS, GET_APPOINTMENTS_REQUEST, GET_APPOINTMENTS_FAIL, GET_APPOINTMENTS_SUCCESS } from "../constants/appointment";

export default function bookAppointmentReducer (state = {}, action) {
    switch (action.type) {
        case BOOK_APPOINTMENT_REQUEST:
        return { 
            loading: true,
            success: false
        };
        case BOOK_APPOINTMENT_SUCCESS:
        return { 
            loading: false,
            success: true 
        };
        case BOOK_APPOINTMENT_FAIL:
        return { 
            loading: false,
            error: action.payload,
            success: false
        };
        case GET_APPOINTMENTS_REQUEST:
        return {
            loading: true
        }
        case GET_APPOINTMENTS_SUCCESS:
        return {
            loading: false,
            appointments: action.payload
        }
        case GET_APPOINTMENTS_FAIL:
        return {
            loading: false,
            error: action.payload
        }
        default:
        return state;
    }
};
