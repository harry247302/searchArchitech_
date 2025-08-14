"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "@/app/redux/slices/contactSlice/ContactSlice";
import toast from "react-hot-toast";
import { fetchFeedbackByArchitect, getFeedback } from "../redux/slices/feedbackSlice/FeedbackSlice";
import { Calendar, MessageCircle, Star } from "lucide-react";
// import { fetchById } from "../redux/slices/architectSlice/ArchitectSlice";
// import Feedback from "../(dashboard)/architect/feedback/Feedback";

// const FeedBack = dynamic(() => import("@/app/web-pages/Feedback"), {
//   ssr: false,
// });

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function FeedBack({ architect }) {
  const dispatch = useDispatch();

  // feedback reviews

  const [feedbacks, setFeedbacks] = useState([]);



  useEffect(() => {
    const fetchFeedback = async (architect) => {
      try {
        const res = await dispatch(getFeedback(architect?.uuid));
        console.log(res, "feedbacks,*-*-*-*-*-*-*-*-*/*/*/*/*/*/*-*-*-*-*-**");

        if (res?.meta?.requestStatus === "fulfilled") {
          const feedbackList = res.payload?.feedback || []; // correct path!
          // console.log(feedbackList)//////
          setFeedbacks(feedbackList);
        } else {
          console.error("❌ Failed to fetch feedback:", res?.error || "Unknown error");
          setFeedbacks([]);
        }
      } catch (error) {
        console.error("❌ Exception while fetching feedback:", error);
        setFeedbacks([]);
      }
    };

    fetchFeedback(architect);
  }, [architect]);


  const visitor = useSelector((state) => state?.visitor?.visitorInfo);
  // console.log(architect, "::::::::::::::::::::::::");

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    if (currentValue === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    setLoading(true);

    let data = {
      rating: currentValue,
      comment: feedbackText,
      architech_id: architect.uuid,
      visitor_id: visitor?.visitoruuid,
    };

    try {
      const res = await dispatch(submitForm(data));
      console.log(res, "//////////////////////////////");
      if (res.payload?.message === "Feedback submitted") {
        toast.success(res.payload.message);
        // Clear fields
        setCurrentValue(0);
        setFeedbackText("");
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto">
        {/* <h2 className="text-2xl font-semibold text-center mb-4">
        Share Your Feedback
        </h2> */}

        <div className="flex justify-left mb-4">
          {stars.map((_, index) => (
            <FaStar
              key={index}
              size={28}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              className="cursor-pointer transition-transform hover:scale-110"
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-start w-full">
          <textarea
            className="w-full sm:w-auto flex-1 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What's your experience?"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`self-center sm:self-auto mt-2 sm:mt-0 bg-primary text-white font-bold py-5.5 px-4 rounded-md transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-950"
              }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600 text-center italic">
          “Great architecture begins with great understanding. Your feedback
          helps us design better, smarter, and more beautifully—one experience
          at a time.”
        </p>
      </div>
      {/* <Feedback /> */}
      {/* feedback section */}

      <div className="space-y-4">
        {feedbacks?.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-xl p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {feedback.visitor_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {feedback.visitor_name}
                    </h3>
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {feedback.date}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {feedback.comment}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Was this helpful?
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Reply
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
