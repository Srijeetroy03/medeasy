import {
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  GET_DOCTOR_DETAILS_FAIL,
  GET_DOCTOR_DETAILS_REQUEST,
  GET_DOCTOR_DETAILS_SUCCESS,
  UPDATE_DOCTOR_DETAILS_REQUEST,
  UPDATE_DOCTOR_DETAILS_SUCCESS,
} from "../constants/doctor";
import axios from "../../axios/axiosInstance";
import { getDoctorsBySpecialityApi } from "../apis/registerUser";

export const doctorListRequest = () => {
  return {
    type: DOCTOR_LIST_REQUEST,
  };
};

export const doctorListSuccess = (payload) => {
  return {
    type: DOCTOR_LIST_SUCCESS,
    payload,
  };
};

export const doctorListFail = (payload) => {
  return {
    type: DOCTOR_LIST_FAIL,
    payload,
  };
};

export const getDoctors = (speciality) => async (dispatch) => {
  try {
    dispatch(doctorListRequest());
    const res = await getDoctorsBySpecialityApi(speciality);
    console.log("res: ", res);
    dispatch(doctorListSuccess(res));
  } catch (error) {
    dispatch(doctorListFail(error));
  }
};

export const getDoctorDetailsRequest = () => {
  return {
    type: GET_DOCTOR_DETAILS_REQUEST,
  };
};

export const getDoctorDetailsSuccess = (payload) => {
  return {
    type: GET_DOCTOR_DETAILS_SUCCESS,
    payload,
  };
};

export const getDoctorDetailsFail = (payload) => {
  return {
    type: GET_DOCTOR_DETAILS_FAIL,
    payload,
  };
};

export const getDoctorInfo = (id) => async (dispatch) => {
  try {
    dispatch(getDoctorDetailsRequest());
    const res = await axios.get(`/users/doctor/${id}`);
    dispatch(getDoctorDetailsSuccess(res.data[0]));
  } catch (error) {
    dispatch(getDoctorDetailsFail(error));
  }
};

export const updateDoctorDetailsRequest = () => {
  return {
    type: UPDATE_DOCTOR_DETAILS_REQUEST,
  };
};

export const updateDoctorDetailsSuccess = (payload) => {
  return {
    type: UPDATE_DOCTOR_DETAILS_SUCCESS,
    payload,
  };
};

export const updateDoctorDetailsFail = (payload) => {
  return {
    type: USER_UPDATE_FAILED,
    payload,
  };
};

export const updateDoctorDetails = (doctorInfo) => async (dispatch) => {
  dispatch(updateDoctorDetailsRequest());
  try {
    dispatch(updateDoctorDetailsSuccess(doctorInfo));
  } catch (error) {
    dispatch(updateDoctorDetailsFail(error.message));
  }
};
