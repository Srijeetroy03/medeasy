import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppointmentCard from "../../components/AppointmentCard";
import { getUserAppointment } from "../../redux/actions/appointmentActions";
import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";

function Appointment() {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { appointments, loading, error } = useSelector(
    (state) => state.appointment
  );
  const dispatch = useDispatch();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const sortByDays = (appointments) => {
    return appointments.sort((a, b) => {
      const dayA = days.indexOf(a.day);
      const dayB = days.indexOf(b.day);
      return dayA - dayB;
    });
  };

  useEffect(() => {
    userInfo &&
      dispatch(getUserAppointment({ role: userInfo?.role, id: userInfo?._id }));
  }, [userInfo, dispatch]);
  console.log("appointments: ", appointments);
  return (
    <div className="font-poppins flex flex-col gap-4 py-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Your Appointments For This Week</h1>
        {/* {userInfo?.role==='Doctor' && <Link title='Your Meet' to={`/meet/${userInfo?.roomId}`}><VideoChatOutlinedIcon/></Link>} */}
      </div>
      {loading && <p>Hang On! Loading your appointments...</p>}
      {!loading && appointments?.length === 0 && (
        <p>You don't have any appointments for this week.</p>
      )}

      {appointments &&
        days.map((day) => {
          if (
            sortByDays(appointments).filter(
              (appointment) => appointment?.day?.trim() === day
            ).length > 0
          ) {
            return (
              <div key={day} className="flex flex-col gap-2">
                <h1 className="font-bold text-xl">{day}</h1>
                <div className="flex flex-row flex-wrap gap-4">
                  {sortByDays(appointments)
                    .filter((appointment) => appointment?.day?.trim() === day)
                    .sort((a, b) => {
                      return a?.timing?.timeFrom - b?.timing?.timeFrom;
                    })
                    ?.map((appointment, index) => (
                      <AppointmentCard key={index} appointment={appointment} />
                    ))}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}

export default Appointment;
