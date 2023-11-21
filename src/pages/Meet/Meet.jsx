import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Meet() {
  const socket = useSocket();
  const { userInfo } = useSelector((state) => state.userAuth);
  const { roomId } = useParams();

  socket.emit("join-room", { roomId, username: userInfo?.username });

  return (
    <div className="bg-black/90 p-8 pt-16 h-screen flex flex-col items-center">
      <div className="flex gap-8 flex-wrap">
        {
          <div className="w-[700px] rounded-[20px] overflow-hidden relative">
            <video
              className="w-full object-cover"
              style={{ aspectRatio: 16 / 9 }}
              id="localVideo"
              autoPlay
              muted
              playsInline
              ref={null}
            ></video>
            <p className="absolute bottom-4 right-4 text-white">Coming Soon</p>
          </div>
        }
        {
          <div className="w-[700px] rounded-[20px] overflow-hidden relative">
            <video
              className="w-full object-cover"
              style={{ aspectRatio: 16 / 9 }}
              id="localVideo"
              autoPlay
              muted
              playsInline
              ref={null}
            ></video>
            <p className="absolute bottom-4 right-4 text-white">Coming Soon</p>
          </div>
        }
      </div>
      <div></div>
    </div>
  );
}

export default Meet;

// import React from "react";

// const Meet = () => {
//   return <div>Meet</div>;
// };

// export default Meet;
