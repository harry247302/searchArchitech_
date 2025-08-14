"use client"
import React, { useState } from 'react';
import { mockFeedbacks } from '../data/demo';
import { Star, MessageCircle, Calendar, TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const Feedback = () => {
  const [feedbacks] = useState(mockFeedbacks);
  const [filter, setFilter] = useState('all');
  const feedback = useSelector(state => state?.feedback?.fetchFeedback?.feedback)
  // console.log(feedback, "::::::::::::::::::::::::::");






  // const filteredFeedbacks =
  //   filter === 'all'
  //     ? feedbacks
  //     : feedbacks.filter(feedback => feedback.rating >= parseInt(filter));

  const total = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
  const average = total / feedbacks.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = feedbacks.filter(f => f.rating === rating).length;
    return {
      rating,
      count,
      percentage: (count / feedbacks.length) * 100,
    };
  });


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Feedback & Ratings</h1>
            <p className="text-gray-600 mt-1">Monitor your client satisfaction and reviews</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filter by rating:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star size={24} className="text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{average.toFixed(2)}</p>
              {/* <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{feedback?.length}</p>
              <p className="text-sm text-green-600 mt-1">+2 this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100
                )}

                %
              </p>
              <p className="text-sm text-green-600 mt-1">4+ star reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      {/* <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Rating Distribution</h2>
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center">
              <div className="flex items-center w-16">
                <span className="text-sm font-medium text-gray-700">{rating}</span>
                <Star size={16} className="text-yellow-400 fill-current ml-1" />
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm text-gray-600">{count} reviews</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback?.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
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
                    <h3 className="font-medium text-gray-900">{feedback.visitor_name}</h3>
                    {/* <p className="text-sm text-gray-500">Project: {feedback.comment}</p> */}
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                  <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Was this helpful?</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Reply</button>
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

      {/* {filteredFeedbacks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-gray-500 text-lg">No feedback found</div>
          <p className="text-gray-400 mt-2">
            Client reviews will appear here after project completion
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Feedback;
