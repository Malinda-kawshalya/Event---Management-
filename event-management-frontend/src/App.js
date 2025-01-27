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
const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar displayed on all pages */}
        <Navbar />

        {/* Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/eventcreation" element={<EventCreation />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/myevents" element={<Myevents />} />
          <Route path="/manageevents" element={<ManageEventsPage />} />
          <Route path="/orgdashboard" element={<OrgDashboard />} />
          <Route path="/organalytics" element={<Analytics />} />
          <Route path="/useraccount" element={<UserAccount />} />
          <Route path="/orgregister" element={<OrganizerRegister />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/category" element={<CategoryEvents />} />
          <Route path="/eventdetails/:eventId" element={<EventDetails />} />
          


        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
