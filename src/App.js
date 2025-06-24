// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./UserAuth/AuthContext";
import { useLocation } from 'react-router-dom';

// Main Components
import Header from "./Components/header";
import Footer from "./Components/Footer";
import Carosal1 from "./MainContent/Carosal1";
import Carosal2 from "./MainContent/Carosal2";
import Services from "./MainContent/Services/Services";
import Gallery from "./MainContent/Gallery/Gallery";
import GalleryInfo from "./GalleryInfo/GalleryInfo";
import Review from "./MainContent/Review";
import FAQ from "./MainContent/FAQ";
import Blog from "./Blogs/Blog";

// Family Events
import FamilyIndex from "./Events/FamEvents/FamilyIndex";
import Wedding from "./Events/FamEvents/Wedding";
import Anniversary from "./Events/FamEvents/Anniversary";
import BabyShower from "./Events/FamEvents/BabyShower";
import Birthday from "./Events/FamEvents/Birthday";
import HouseWarming from "./Events/FamEvents/HouseWarming";
import FamilyUnion from "./Events/FamEvents/FamilyUnion";
import FestiveGather from "./Events/FamEvents/FestiveGather";
import Retirement from "./Events/FamEvents/Retirement";
import CulturalEvent from "./Events/FamEvents/CulturalEvent";

// Corporate Events
import CorporateIndex from "./Events/CorporateEvents/CorporateIndex";
import AGM from "./Events/CorporateEvents/AGM";
import Award from "./Events/CorporateEvents/Award";
import BoardMeeting from "./Events/CorporateEvents/BoardMeeting";
import CorporateRetreat from "./Events/CorporateEvents/CorporateRetreat";
import NetworkingEvent from "./Events/CorporateEvents/NetworkingEvent";
import Seminar from "./Events/CorporateEvents/Seminar";
import TBA from "./Events/CorporateEvents/TBA";
import Training from "./Events/CorporateEvents/Training";

// Musical Events
import MusicIndex from "./Events/MusicalEvents/MusicIndex";
import AlbumRelease from "./Events/MusicalEvents/AlbumRelease";
import Concert from "./Events/MusicalEvents/Concert";
import DJ from "./Events/MusicalEvents/DJ";
import BandEvent from "./Events/MusicalEvents/BandEvent";
import BollywoodDanceEvent from "./Events/MusicalEvents/BollywoodDanceEvent";
import ClassicalDance from "./Events/MusicalEvents/ClassicalDance";
import ClassicalMusic from "./Events/MusicalEvents/ClassicalMusic";
import Kpop from "./Events/MusicalEvents/Kpop";
import MusicFestival from "./Events/MusicalEvents/MusicFestival";
import Orchestra from "./Events/MusicalEvents/Orchestra";

// Wedding Types
import WeddingIndex from "./WedCard/WeddingIndex";
import DestinationWed from "./WedCard/DestinationWed";
import BeachWed from "./WedCard/BeachWed";
import TempleWed from "./WedCard/TempleWed";
import TraditionalWed from "./WedCard/TraditionalWed";
import LuxuryWed from "./WedCard/LuxuryWed";
import PalaceWed from "./WedCard/PalaceWed";

// Wedding Descriptions
import Beachdes from "./WeddingDescription/Beachdes";
import Destinationdes from "./WeddingDescription/Destinationdes";
import Luxurydes from "./WeddingDescription/Luxurydes";
import Palacedes from "./WeddingDescription/Palacedes";
import Traditionaldes from "./WeddingDescription/Traditionaldes";
import Templedes from "./WeddingDescription/Templedes";

// Auth Components
import UserSignIn from "./UserAuth/UserSignIn";
import UserSignUp from "./UserAuth/UserSignUp";
import Dashboard from "./UserAuth/Dashboard";
import MyEvents from "./UserAuth/MyEvents";
import Profile from "./UserAuth/Profile";

// Forms and Payments
import WeddingForm from "./WeddingForm/WeddingForm";
import Payments from "./Payments";
import EventBookingForm from "./FamEvent/EventBookingForm";

// Sports Events
import SportsIndex from './Events/Sports/SportsIndex';
import Cricket from './Events/Sports/Cricket';
import Athletics from './Events/Sports/Athletics';
import Badminton from './Events/Sports/Badminton';
import Chess from './Events/Sports/Chess';

// Marketing Events
import MarketingIndex from './Events/Marketing/MarketingIndex';
import FundRaising from './Events/FundRaising/FundRaising';
import MusicalForm from './Musical_Forms/MusicalForm';

import BookingConfirmation from './API/BookingConfirmation';

// API
import { testConnection } from "./API/api";
import DebugInfo from "./API/DebugInfo";
import EventOrganizerDashboard from './EventOrganizer/EventOrganizerDashboard';
import DashboardBookings from "./UserAuth/DashboardBookings";




const HomePage = () => (
  <>
    <Carosal1 />
    <Carosal2 />
    <Services />
    <Gallery />
    <Review />
    <FAQ />
    <DebugInfo />
  </>
);

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();  // Get the current location using the hook
  
  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  
  return currentUser ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

const App = () => {
  

  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery-info" element={<GalleryInfo />} />
            <Route path="/review" element={<Review />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/eventbookingform" element={<EventBookingForm />} />
            <Route path="/UserAuth/Profile" element={<Profile />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/myevents" element={
              <PrivateRoute>
                <MyEvents />
              </PrivateRoute>
            } />
            <Route path="/weddingform" element={
              <PrivateRoute>
                <WeddingForm />
              </PrivateRoute>
            } />
            <Route path="/payments" element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            } />
            <Route path="/dashboard/bookings" element={
  <PrivateRoute>
    <DashboardBookings />
  </PrivateRoute>
} />
           
           <Route 
  path="/musical-events/booking" 
  element={
    <PrivateRoute>
      <MusicalForm />
    </PrivateRoute>
  } 
/>

            {/* Family Events */}
            <Route path="/events" element={<FamilyIndex />} />
            <Route path="/events/wedding" element={<Wedding />} />
            <Route path="/events/wedding-options" element={<WeddingIndex />} />
            <Route path="/events/anniversary" element={<Anniversary />} />
            <Route path="/events/baby-shower" element={<BabyShower />} />
            <Route path="/events/birthday" element={<Birthday />} />
            <Route path="/events/house-warming" element={<HouseWarming />} />
            <Route path="/events/family-union" element={<FamilyUnion />} />
            <Route path="/events/festive-gather" element={<FestiveGather />} />
            <Route path="/events/retirement" element={<Retirement />} />
            <Route path="/events/cultural-event" element={<CulturalEvent />} />

            {/* Corporate Events */}
            <Route path="/corporate-events" element={<CorporateIndex />} />
            <Route path="/corporate-events/agm" element={<AGM />} />
            <Route path="/corporate-events/award" element={<Award />} />
            <Route path="/corporate-events/board-meeting" element={<BoardMeeting />} />
            <Route path="/corporate-events/retreat" element={<CorporateRetreat />} />
            <Route path="/corporate-events/networking" element={<NetworkingEvent />} />
            <Route path="/corporate-events/seminar" element={<Seminar />} />
            <Route path="/corporate-events/tba" element={<TBA />} />
            <Route path="/corporate-events/training" element={<Training />} />

            {/* Musical Events */}
            <Route path="/musical-events" element={<MusicIndex />} />
            <Route path="/musical-events/album-release" element={<AlbumRelease />} />
            <Route path="/musical-events/concert" element={<Concert />} />
            <Route path="/musical-events/dj" element={<DJ />} />
            <Route path="/musical-events/band" element={<BandEvent />} />
            <Route path="/musical-events/bollywood-dance" element={<BollywoodDanceEvent />} />
            <Route path="/musical-events/classical-dance" element={<ClassicalDance />} />
            <Route path="/musical-events/classical-music" element={<ClassicalMusic />} />
            <Route path="/musical-events/kpop" element={<Kpop />} />
            <Route path="/musical-events/music-festival" element={<MusicFestival />} />
            <Route path="/musical-events/orchestra" element={<Orchestra />} />

            {/* Wedding Types */}
            <Route path="/events/wedding-options/destination-wedding" element={<DestinationWed />} />
            <Route path="/events/wedding-options/beach-wedding" element={<BeachWed />} />
            <Route path="/events/wedding-options/temple-wedding" element={<TempleWed />} />
            <Route path="/events/wedding-options/traditional-wedding" element={<TraditionalWed />} />
            <Route path="/events/wedding-options/luxury-wedding" element={<LuxuryWed />} />
            <Route path="/events/wedding-options/palace-wedding" element={<PalaceWed />} />
            <Route path="/events/wedding-options/beachdes" element={<Beachdes />} />
            <Route path="/events/wedding-options/destinationdes" element={<Destinationdes />} />
            <Route path="/events/wedding-options/luxurydes" element={<Luxurydes />} />
            <Route path="/events/wedding-options/palacedes" element={<Palacedes />} />
            <Route path="/events/wedding-options/traditionaldes" element={<Traditionaldes />} />
            <Route path="/events/wedding-options/templedes" element={<Templedes />} />

            {/* Sports Events */}
            <Route path="/sports" element={<SportsIndex />} />
            <Route path="/events/cricket" element={<Cricket />} />
            <Route path="/events/athletics" element={<Athletics />} />
            <Route path="/events/badminton" element={<Badminton />} />
            <Route path="/events/chess" element={<Chess />} />

            {/* Marketing Events */}
            <Route path="/marketing-events" element={<MarketingIndex />} />
            <Route path="/fundraising-events" element={<FundRaising />} />
             <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
              <Route path="/organizer-dashboard" element={<EventOrganizerDashboard />} />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;