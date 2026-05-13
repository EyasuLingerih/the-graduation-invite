/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import Countdown from "./components/Countdown";
import RSVPForm from "./components/RSVPForm";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { motion, useScroll, useSpring } from "motion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="selection:bg-accent/30 selection:text-primary">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Action Button (Always available RSVP) */}
      <motion.a
        href="#rsvp"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 bg-primary text-white px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold shadow-2xl transition-shadow hover:shadow-accent/20 border border-white/10 hidden md:flex"
      >
        RSVP Now
      </motion.a>

      <main className="relative z-0">
        <Hero />
        
        <div className="space-y-40">
          <EventDetails />
          <Countdown />
<RSVPForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

