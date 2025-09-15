import React, { useEffect, useState } from "react";
import "../client/MessagingPage/MessagingPageC.css";
// import Navbar from "../../../components/Common/Navbar/navbar";
// import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
// import SearchBar from "../../../components/SearchBar/SearchBar";
// import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
// import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
// import EscrowForm from "../../../components/Escrow/EscrowForm";
import io from "socket.io-client";
// import ZoomMeetingModal from "../../../components/Messaging/ZoomMeetingModal/ZoomMeetingModal";
// import SectionContainer from "../../../components/SectionContainer";
// import BACKEND_URL from "../../../config/backend-config";
import {
    BsCameraVideo,
    BsPersonCircle,
    BsThreeDotsVertical,
} from "react-icons/bs";
// import EmptyChatBox from "../../../components/Messaging/ChatBox/EmptyChatBox";
// import ProfileCompletionModal from "../../../components/Common/ProfileCompletionModal";
// import { useProfileCompletionContext } from "../../../components/Common/ProfileCompletionContext";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import { signInAnonymously } from "firebase/auth";
import NavBar from "../../components/Common/Navbar/navbar";
import SectionContainer from "../../components/SectionContainer";
import PeopleComponent from "../../components/Messaging/PeopleComponent/PeopleComponent";
import EmptyChatBox from "../../components/Messaging/ChatBox/EmptyChatBox";
import ChatBox from "../../components/Messaging/ChatBox/ChatBox";
import BACKEND_URL from "../../config/backend-config";

const AnonymousChat = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [currentFreelancerId, setCurrentFreelancerId] = useState("");
    const [currentFreelancerName, setCurrentFreelancerName] = useState("");
    const [showEscrowModal, setShowEscrowModal] = useState(false);
    const [escrowData, setEscrowData] = useState(null);
    const [showZoomModal, setShowZoomModal] = useState(false);
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [isInvitation, setIsInvitation] = useState(false);
    const [isReports, setIsReports] = useState(false);
    const [isAdmins, setIsAdmins] = useState(false);
    const [current, setCurrent] = useState("Chats");
    const [adminUsers, setAdminUsers] = useState([]);
    const [firstAdminChat, setFirstAdminChat] = useState(false);
    const blocked = false
    const token = localStorage.getItem("token");
    const url = BACKEND_URL;

    useEffect(() => {
        getAllChats();
    }, []);
    useEffect(() => {
        signInAnonymously(auth)
            .then(() => {
                console.log("Signed in anonymously!");
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    }, []);
    useEffect(() => {
        chats.map((chat) => {
            if (chat.tags && chat.tags.length > 0) {
                const tags = chat.tags;
                tags.map((tag) => {
                    if (tag == "report") {
                        setIsReports(true);
                    }
                    if (tag == "admin") {
                        setIsAdmins(true);
                    }
                });
            }
        });
    }, [chats]);
    useEffect(() => {
        const filteredChats =
            chats.length > 0 && current == "Chats"
                ? chats.filter((chat) => !chat.hasOwnProperty("tags"))
                : current == "Admin"
                    ? chats.filter(
                        (chat) => chat.tags && chat.tags.some((tag) => tag === "admin")
                    )
                    : chats.filter(
                        (chat) => chat.tags && chat.tags.some((tag) => tag === "report")
                    );
        setFilteredChats(filteredChats);

        // if (filteredChats.length > 0) {
        //   setFilteredChats(filteredChats);
        // } else {
        //   setFilteredChats(chats);
        // }
        console.log({ chats, filteredChats });
    }, [chats, current]);
    useEffect(() => {
        if (currentChatId && chats.length > 0) {
            const chat = chats.find((chat) => chat.id === currentChatId);
            setCurrentChat(chat);

            const freelancer = chat?.participants?.find(
                (part) => part.uid !== localStorage.getItem("uid")
            );

            if (freelancer) {
                setCurrentFreelancerName(freelancer.name || "");
                setCurrentFreelancerId(freelancer.uid || "");
            }
        }
    }, [currentChatId, chats, filteredChats]);

    useEffect(() => {
        // Request notification permission when component mounts
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        const socket = io(url);
        return () => socket.disconnect();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    return (
        <div className="MessagingPageC" style={{ position: "relative" }}>
            {/* Banner if profile is incomplete */}
            <NavBar />
            <SectionContainer>
                <div className="messagePageContainer">
                    <PeopleComponent
                        people={filteredChats}
                        setcurrentChatId={setCurrentChatId}
                        setCurrentClientId={setCurrentFreelancerId}
                        setCurrentClientName={setCurrentFreelancerName}
                        isReports={isReports}
                        isAdmins={isAdmins}
                        current={current}
                        setCurrent={setCurrent}
                        // handleAdminChat={handleAdminCha}
                    />
                    {filteredChats.length === 0 ? (
                        <EmptyChatBox />
                    ) : (
                        currentChatId && (
                            <ChatBox
                                chatId={currentChatId}
                                currentChat={currentChat}
                                currentClientId={currentFreelancerId}
                                currentClientName={currentFreelancerName}
                                onEscrowClick={handleEscrow}
                                disabled={blocked}
                            />
                        )
                    )}
                </div>
            </SectionContainer>
        </div>
    );
};

export default AnonymousChat;
