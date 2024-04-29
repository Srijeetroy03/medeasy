import axios from "axios";
import clsx from "clsx";
import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import "../../styles/ChatBot.css";

const ChatBot = () => {
  const [chats, setChats] = useState([]);
  const [isChatBot, setisChatBot] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chartRef = useRef();
  const bottomRef = useRef();
  const chatsContainerRef = useRef();

  const scrollToBottom = () => {
    if (chatsContainerRef.current) {
      chatsContainerRef.current.scrollTop =
        chatsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePredict();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prompt]);

  const handlePredict = async () => {
    setChats((prevChats) => [
      ...prevChats,
      {
        type: "user",
        message: prompt,
      },
    ]);
    setPrompt("");
    setLoading(true);

    if (isChatBot) {
      await axios
        .post("https://mental-api.onrender.com/query_GPT", {
          Description_text:
            prompt || "I am feeling very low and I am not able to concentrate",
        })
        .then((res) => {
          setChats((prevChats) => [
            ...prevChats,
            {
              type: "melly",
              message: res?.data,
            },
          ]);

          setLoading(false);
        });

      return;
    }

    await axios
      .post("https://mental-api.onrender.com/predict_level", {
        Description_text:
          prompt || "I am feeling very low and I am not able to concentrate",
      })
      .then((res) => {
        const level = Number(res.data["Mental Health level from 0 - 9"]) + 1;

        axios
          .post(`https://mental-api.onrender.com/query_tips?level=${level}`)
          .then((res) => {
            setChats((prevChats) => [
              ...prevChats,
              {
                type: "melly",
                message: res?.data,
              },
            ]);

            var myChart = echarts.init(chartRef.current);

            myChart.setOption({
              series: [
                {
                  type: "gauge",
                  startAngle: 180,
                  endAngle: 0,
                  center: ["50%", "75%"],
                  radius: "90%",
                  min: 0,
                  max: 1,
                  splitNumber: 8,
                  axisLine: {
                    lineStyle: {
                      width: 6,
                      color: [
                        [0.25, "#7CFFB2"],
                        [0.5, "#58D9F9"],
                        [0.75, "#FDDD60"],
                        [1, "#FF6E76"],
                      ],
                    },
                  },
                  pointer: {
                    icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
                    length: "12%",
                    width: 20,
                    offsetCenter: [0, "-60%"],
                    itemStyle: {
                      color: "auto",
                    },
                  },
                  axisTick: {
                    length: 12,
                    lineStyle: {
                      color: "auto",
                      width: 2,
                    },
                  },
                  splitLine: {
                    length: 20,
                    lineStyle: {
                      color: "auto",
                      width: 5,
                    },
                  },
                  axisLabel: {
                    color: "#464646",
                    fontSize: 17,
                    fontFamily: "Poppins, sans-serif",
                    distance: -60,
                    rotate: "tangential",
                    formatter: function (value) {
                      if (value === 0.875) {
                        return "Worst";
                      } else if (value === 0.625) {
                        return "Bad";
                      } else if (value === 0.375) {
                        return "Medium";
                      } else if (value === 0.125) {
                        return "Good";
                      }
                      return "";
                    },
                  },
                  title: {
                    offsetCenter: [0, "-10%"],
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
                  },
                  detail: {
                    fontSize: 30,
                    fontFamily: "Poppins, sans-serif",
                    offsetCenter: [0, "-35%"],
                    valueAnimation: true,
                    formatter: function (value) {
                      return Math.round(value * 100) + "";
                    },
                    color: "inherit",
                  },
                  data: [
                    {
                      value: level / 10,
                      name: "Mental Health",
                    },
                  ],
                },
              ],
            });

            myChart.resize({ width: "600", height: "300" });
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-[85vh] max-h-[85vh] overflow-y-scroll pt-4 px-10 flex-col justify-between items-center flex relative">
      <div
        className={clsx(
          "w-full flex flex-col justify-start font-poppins",
          (chats?.length > 1 || (chats?.length > 0 && isChatBot)) && "hidden"
        )}
      >
        <h1 className=" justify-start w-fit font-bold flex items-center gap-10 text-5xl">
          <span className="text-[#16a34a] ">Hello.</span>

          <label
            className={clsx(
              "inline-flex items-center cursor-pointer",
              loading && "cursor-not-allowed brightness-75"
            )}
          >
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              disabled={loading}
              onChange={(e) => {
                if (e.target.checked) {
                  console.log("🚀 ~ ChatBot ~ e:", e);
                  toast.success("Switched to Chatbot");
                  setisChatBot(true);
                } else {
                  toast.success("Switched to Predictor");
                  setisChatBot(false);
                }
              }}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#16a34a] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#16a34a]"></div>
          </label>
        </h1>
        <h2 className="text-4xl opacity-80">How can I help you today?</h2>
      </div>

      <div
        ref={chartRef}
        style={{
          width: "200px",
          height: "200px",
        }}
        id="chart-container"
        className="min-w-fit "
      />

      <div
        className={clsx(
          " overflow-scroll flex flex-col gap-10 font-poppins mx-auto  w-[90%] pb-4",
          isChatBot && chats?.length > 0
            ? "min-h-[600px] max-h-[800px]"
            : "max-h-[320px]"
        )}
        id=" chatsContainer"
        ref={chatsContainerRef}
      >
        {chats?.map((item, index) => {
          return (
            <div key={index} className=" ">
              {item?.type === "user" ? (
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/a/default-user=s64-c"
                    alt=""
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <h1 className="text-base">
                    {item.message ||
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta distinctio error eaque laborum deleniti ipsum reprehenderit quas ea nihil illo."}{" "}
                  </h1>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGM8wnUnzLRIiqsXavc0DSFrkReQJGD-cqa_HR95hvYQ&s"
                    alt=""
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <h1 className="text-base">
                    {item.message
                      ? item.message.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index !== item.message.split("\n").length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta distinctio error eaque laborum deleniti ipsum reprehenderit quas ea nihil illo."}
                  </h1>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && (
        <iframe
          src="https://lottie.host/embed/5d3f718f-4bd2-41ea-b0bf-fae00f8db01e/rdlg62Xf8c.json"
          className="absolute bottom-0"
        ></iframe>
      )}

      <div className="flex justify-between items-center w-full border-solid border-[#16a34a] rounded-lg  p-2 border-[1px]">
        <input
          type="text"
          className=" text-sm w-[90%]"
          placeholder="So what's on your mind ?"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <IoIosSend
          className=" w-[26px] h-[26px] mr-4 cursor-pointer"
          onClick={() => {
            handlePredict();
          }}
        />
      </div>
    </div>
  );
};

export default ChatBot;
