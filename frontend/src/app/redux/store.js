// app/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import normal slice reducers, NOT RTK Query APIs
import adminReducer from './slices/adminslice/AdminAuthSlice';      // your normal slice (async thunk)
import visitorReducer from './slices/visitorSlice/VisitorAuth';     // normal slice
import otpReducer from './slices/getOtp/GetOtp';                    // normal slice
import architectAuthReducer from './slices/architectSlice/ArchitectAuth'; // normal slice
import architectReducer from './slices/architectSlice/ArchitectSlice';    // normal slice
import contactReducer from './slices/contactSlice/ContactSlice';          // normal slice
import projectReducer from './slices/projectSlice/ProjectSlice';          // normal slice
import ticketReducer from './slices/ticketSlice/TicketSlice'; // ✅ update path as needed
import feedbackReducer from './slices/feedbackSlice/FeedbackSlice'
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    visitor: visitorReducer,
    otp: otpReducer,
    architectAuth: architectAuthReducer,
    architect: architectReducer,
    contact: contactReducer,
    project: projectReducer,
    ticket: ticketReducer,
    feedback:feedbackReducer
  },
  // middleware: getDefaultMiddleware includes thunk by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
