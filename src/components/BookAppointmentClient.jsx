import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../redux/actions/appointmentActions";

function BookAppointmentClient({ docInfo, closeMenu }) {
  const dispatch = useDispatch();
  const [day, setDay] = useState(docInfo?.days[0]);
  const { userInfo } = useSelector((state) => state.userAuth);
  const { loading, error, success } = useSelector((state) => state.appointment);

  const handleAppointment = async () => {
    try {
      await dispatch(
        bookAppointment({
          doctor: docInfo._id,
          patient: userInfo?._id,
          day: day,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="animate-form bg-gray-100 rounded-lg outline outline-1 outline-green-600 flex flex-col p-4 min-w-[360px] w-full gap-4">
      <button className="self-end" onClick={() => closeMenu(false)}>
        <CancelIcon sx={{ size: "30px" }} />
      </button>
      <div className="text-start flex flex-col gap-4">
        <h2 className="font-bold text-3xl">Choose your slot</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="selectDay" className="text-sm">
            Select a day
          </label>
          <select
            defaultValue={docInfo?.days[0]}
            onChange={(e) => setDay(e.target.value)}
            name="selectDay"
            id="selectDay"
            className="border-2 border-gray-300 p-2 rounded-lg"
          >
            {docInfo?.days?.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAppointment}
          className="p-2 hover:bg-green-600 border border-green-600 rounded hover:text-white transition-all text-green-600"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
        {(error || success) && (
          <p className={error ? "text-red-600" : "text-green-600"}>
            {error ? error : "Appointment Confirmed"}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookAppointmentClient;
