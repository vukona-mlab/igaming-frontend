import React, { useEffect, useState } from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import "./LandingPage.css";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import About from "../../components/about/About";
import PopularServices from "../../components/Landing/PopularServices/PopularServices";
import Footer from "../footer/Footer";
import Showcase from "../../components/Landing/Showcase/Showcase";
import TopFreelancers from "../../components/Landing/TopFreelancers/TopFreelancers";
import MadeOnRI from "../../components/Landing/MadeOnRI/MadeOnRI";
import FAQSection from "../../components/Landing/FAQSection/FAQSection";
import SpeechBubble from "../../components/Landing/TestimonialsSection/SpeechBubble";
import TestimonialsSection from "../../components/Landing/TestimonialsSection/TestimonialsSection";
import GetStarted from "../../components/Landing/GetStartedSection/GetStarted";
import ContactPage from "../ContactPage/ContactPage";
import { Chat } from "react-bootstrap-icons";
import ChatBot from "../../components/ChatBot/ChatBot";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const handleQuerySubmit = async () => {
    try {

      const roomsRef = collection(db, "achats")
      const roomDocRef = await addDoc(roomsRef, {
        active: true,
        name: name,
        surname,
        phoneNumber,
        email,
        lastMessage: message,
        subject,
        createdAt: serverTimestamp()

      })
      const messagesRef = collection(db, "achats", roomDocRef.id, "messages");
      await addDoc(messagesRef, {
        text: message,
        sender: user?.uid || "anon",
        timestamp: serverTimestamp(),
      });
      navigate(`/anonymous-chat/${roomDocRef.id}`)


    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('on landing');
    signInAnonymously(auth).catch(console.error);

    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });

    return () => unsub();
  }, [])
  return (
    <>
      <NavBar />
      <SubNavBar />
      <Showcase />
      <About />
      <GetStarted />
      <PopularServices />
      <TopFreelancers />
      <MadeOnRI />
      <ContactPage setName={setName} setSurname={setSurname} setEmail={setEmail} setSubject={setSubject} setMessage={setMessage} handleQuerySubmit={handleQuerySubmit} setPhoneNumber={setPhoneNumber} />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <ChatBot />
    </>
  );
}

export default LandingPage;
