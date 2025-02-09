import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import your Navbar component
import HomePage from "./components/HomePage"; // Home page component
import About from "./components/AboutUs"; // About page component
import ContactUs from "./components/ContactUs"; // Contact page component
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import EventCreation from "./components/EventCreation";
import AdminDashboard from "./components/AdminDashboard";
import Myevents from "./components/MyEvents";
import SignIn from "./components/SignIn";
import ManageEventsPage from "./components/ManageEventPage";
import OrgDashboard from "./components/OrgDashboard";
import Analytics from "./components/OrgAnalytics";
import SignUp from "./components/SignUp";
import UserAccount from "./components/UserAccount";
import OrganizerRegister from "./components/RegOrganizer";
import AllEvents from "./components/AllEvents";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQSection from "./components/FaqSection";
import CategoryEvents from "./components/CategoryEvents";
import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar displayed on all pages */}
        <Navbar />

        {/* Routing */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/category" element={<CategoryEvents />} />

          {/* Protected Routes */}
          <Route
            path="/eventdetails/:eventId"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <EventDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventcreation"
            element={
              <ProtectedRoute roles={["organizer", "admin"]}>
                <EventCreation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myevents"
            element={
              <ProtectedRoute roles={["user", "organizer"]}>
                <Myevents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageevents"
            element={
              <ProtectedRoute roles={["organizer", "admin"]}>
                <ManageEventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orgdashboard"
            element={
              <ProtectedRoute roles={["organizer"]}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organalytics"
            element={
              <ProtectedRoute roles={["organizer"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/useraccount"
            element={
              <ProtectedRoute roles={["user", "organizer", "admin"]}>
                <UserAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orgregister"
            element={
              <ProtectedRoute roles={["admin"]}>
                <OrganizerRegister />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;