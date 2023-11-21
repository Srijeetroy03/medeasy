import {
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  GET_DOCTOR_DETAILS_FAIL,
  GET_DOCTOR_DETAILS_REQUEST,
  GET_DOCTOR_DETAILS_SUCCESS,
  UPDATE_DOCTOR_DETAILS_FAIL,
  UPDATE_DOCTOR_DETAILS_REQUEST,
  UPDATE_DOCTOR_DETAILS_SUCCESS,
} from "../constants/doctor";

const initialState = {
  doctors: [],
  loading: false,
  error: null,

  doctorInfo: null,
  doctorInfoLoading: false,
  doctorInfoError: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DOCTOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.payload,
      };
    case DOCTOR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_DOCTOR_DETAILS_REQUEST:
      return {
        ...state,
        doctorInfoLoading: true,
      };
    case GET_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        doctorInfoLoading: false,
        doctorInfo: action.payload,
      };
    case GET_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        doctorInfoLoading: false,
        doctorInfoError: action.payload,
      };
    case UPDATE_DOCTOR_DETAILS_REQUEST:
      return {
        ...state,
        doctorInfoLoading: true,
      };
    case UPDATE_DOCTOR_DETAILS_SUCCESS:
      return {
        ...state,
        doctorInfoLoading: false,
        doctorInfo: action.payload,
      };
    case UPDATE_DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        doctorInfoLoading: false,
        doctorInfoError: action.payload,
      };
    default:
      return state;
  }
};

export default doctorReducer;
