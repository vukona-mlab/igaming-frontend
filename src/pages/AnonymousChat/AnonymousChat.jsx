import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import "./AnonymousChat.css"; // 👈 import plain CSS
import { auth, db } from "../../config/firebase";
import NavBar from "../../components/Common/Navbar/navbar";

export default function AnonymousChat() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatID, setChatID] = useState(null)
    // 👤 Sign in anonymously
    useEffect(() => {
        signInAnonymously(auth).catch(console.error);

        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) setUser(u);
        });

        return () => unsub();
    }, []);

    // 💬 Subscribe to messages
    useEffect(() => {
        if (!chatID) return
        const messagesRef = collection(db, "achats", chatID, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });

        return () => unsub();
    }, [chatID]);

    // ✍️ Send message
    const handleSend = async () => {
        console.log(!input.trim());
        console.log({ input: input.trim() });

        if (!input.trim()) return;
        try {
            if (!chatID) {
                const roomsRef = collection(db, "achats")
                const roomDocRef = await addDoc(roomsRef, {
                    active: true
                })
                setChatID(roomDocRef.id)
            }

            const messagesRef = collection(db, "achats", chatID, "messages");
            await addDoc(messagesRef, {
                text: input,
                sender: user?.uid || "anon",
                timestamp: serverTimestamp(),
            });
            setInput("");
        } catch (error) {
            console.error(error)
        }

    };
    const handleKeyDown = (e) => {
        console.log({ action: e.key });

        if (e.key === "Enter") {
            handleSend()
        }
    }
    return (
        <div className="chat-container">
            <NavBar />
            {/* Header */}
            <div className="chat-header">Anonymous Chat</div>

            {/* Messages */}
            <div className="chat-messages">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`chat-message ${m.sender === user?.uid ? "own-message" : "other-message"
                            }`}
                    >
                        <div className="chat-sender">{m.sender === user?.uid ? "You": "Admin"}</div>
                        <div>{m.text}</div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend} className="chat-button">
                    Send
                </button>
            </div>
        </div>
    );
}
