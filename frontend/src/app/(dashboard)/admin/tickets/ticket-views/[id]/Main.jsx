"use client";
import {
  addReply,
  getArchitectTicketsWithReplies,
} from "@/app/redux/slices/ticketSlice/TicketSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User2, Paperclip } from "lucide-react";
import toast from "react-hot-toast";
const TicketView = () => {
  const params = useParams();
  // console.log(params?.id);
  const [openIndex, setOpenIndex] = useState(null); // Track which reply form is open
  const admin = useSelector((state) => state?.admin?.admin);
  const [ticket_id, setticket_id] = useState();
  const [data, setData] = useState();
  const [reply, setreply] = useState({
    sender_role: admin?.designation || "",
    sender_id: admin?.uuid || "",
    message: "",
    attach: "",
  });
  const dispatch = useDispatch();

  const hanbdleSubmit = async () => {
    try {
      console.log(reply, ticket_id);

      const res = await dispatch(
        addReply({
          message: reply,
          sender_role: admin?.designation,
          sender_id: admin?.uuid,
          ticket_id,
        })
      );

      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success("Replied successfully!");
        setreply({
          sender_role: "",  // or admin?.designation if you want to keep it
          sender_id: "",    // or admin?.uuid if you want to keep it
          message: "",
          attach: "",
        });
        setOpenIndex(0)
      } else {
        toast.error("Failed to send reply.");
      }

      console.log(res);
    } catch (error) {
      console.error("Error while submitting reply:", error);
      toast.error("An error occurred. Please try again.");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getArchitectTicketsWithReplies(params?.id));
        // console.log(res,"||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
        if (res?.meta?.requestStatus === "fulfilled") {
          setData(res?.payload);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // console.log(data);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Ticket Closed Notice */}
      <div className="bg-gray-100 border border-gray-300 text-center text-gray-700 text-sm py-2 rounded">
        This ticket is closed. You may reply to this ticket to reopen it.
      </div>

      {data?.tickets?.map((ele, index) => {
        const createdAt = new Date(ele.created_at);
        const formattedDate = createdAt.toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const formattedTime = createdAt.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        // console.log(ele?.replies[0]?.message,"++++++++++++++++++++++++++++++++++++++");
        const isOpen = openIndex === index;
        return (
          <div>
            <div key={index} className="mx-auto border rounded bg-white my-4">
              {ele?.replies?.length > 0 ? (
                <>
                  <div className="flex justify-between items-center">
                    <button className="flex items-center px-3 text-white text-sm rounded hover:bg-blue-700">
                      <span className="ml-1"></span>
                    </button>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center text-sm px-2 m-1 justify-center text-lg font-semibold bg-red-400 border text-white border-gray-300 rounded hover:bg-gray-200"
                    >
                      Replied
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <button className="flex items-center px-3 text-white text-sm rounded hover:bg-blue-700">
                      <span className="ml-1"></span>
                    </button>
                    <button
                      onClick={() => {
                        setOpenIndex(isOpen ? null : index);
                        setticket_id(ele?.uuid);
                      }}
                      className="mt-2 px-4 cursor-pointer  bg-green-600 text-white rounded hover:bg-blue-700"
                    >
                      {isOpen ? "Close" : "Reply"}
                    </button>
                  </div>
                  {/* Accordion Form */}
                  {isOpen && (
                    <div className="border rounded bg-white p-4 shadow transform origin-top animate-curtain">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            // onChange={(e)=>{setreply((ele)=>({...ele, name:e.target.value}))}}
                            type="text"
                            value={`${admin?.first_name} ${admin?.last_name}`}
                            className="mt-1 block w-full border border-gray-400 rounded px-3  focus:border-blue-500 focus:ring focus:ring-blue-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            value={admin?.email}
                            // onChange={(e)=>{setreply((ele)=>({...ele, email:e.target.value}))}}
                            type="email"
                            className="mt-1 block w-full border border-gray-400 rounded px-3  focus:border-blue-500 focus:ring focus:ring-blue-200"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          rows={5}
                          onChange={(e) => {
                            setreply((ele) => ({
                              ...ele,
                              message: e.target.value,
                            }));
                          }}
                          className="mt-1 block w-full border border-gray-400 rounded px-3  focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Attachments
                        </label>
                        <input
                          type="file"
                          className="mt-1 block w-full text-sm text-gray-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Allowed File Extensions: .jpg, .gif, .jpeg, .png
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={hanbdleSubmit}
                          className="px-4 cursor-pointer py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setOpenIndex(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer text-sm rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Header */}
              {ele.replies.length > 0 ? (
                <>
                  <div
                    key={index}
                    className="mx-auto border rounded bg-white my-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 rounded-full p-2">
                          <User2 className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Shadab</div>
                          <div className="text-sm text-gray-500">Admin</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        {new Date(ele?.replies[0]?.created_at).toLocaleString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="p-4 space-y-3">
                      {/* <p>Dear Team,</p> */}
                      <p className="text-sm">{ele?.replies[0]?.message}</p>
                      {/* <p>Best regards,<br />{data.first_name}</p> */}
                    </div>

                    {/* Attachments (dummy - render if available later) */}
                    <div className="border-t p-4 bg-gray-50">
                      <p>Billing Team,</p>
                      <p>Search Architect</p>
                      <a className="text-blue-700" href="">
                        www.searcharchitect.com
                      </a>
                      <p>Sales: +91 54879879865</p>
                      <p>Support: +91 54879879865</p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 rounded-full p-2">
                    <User2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {data.first_name} {data.last_name}
                    </div>
                    <div className="text-sm text-gray-500">Client</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formattedDate} ({formattedTime})
                </div>
              </div>

              {/* Message */}
              <div className="p-4 space-y-3">
                {/* <p>Dear Team,</p> */}
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: ele.message }}
                ></p>
                {/* <p>Best regards,<br />{data.first_name}</p> */}
              </div>

              {/* Attachments (dummy - render if available later) */}
              <div className="border-t p-4 bg-gray-50">
                <div className="font-semibold mb-2">Attachments (0)</div>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  Screenshot_2025-05-29_130918.png
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketView;
