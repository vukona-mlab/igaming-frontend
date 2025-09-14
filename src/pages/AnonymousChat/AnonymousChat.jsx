import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import "./AnonymousChat.css"; // 👈 import plain CSS
import { auth, db } from "../../config/firebase";
import NavBar from "../../components/Common/Navbar/navbar";
import { useParams } from "react-router-dom";

export default function AnonymousChat() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [chatID, setChatID] = useState(null)
    const [active, setActive] = useState(null)
    const { id } = useParams()
    // 👤 Sign in anonymously
    useEffect(() => {
        signInAnonymously(auth).catch(console.error);

        const unsub = onAuthStateChanged(auth, (u) => {
            console.log({ uid: u.uid });

            if (u) setUser(u);
        });

        return () => unsub();
    }, []);

    // 💬 Subscribe to messages
    useEffect(() => {
        if (!id) return
        const messagesRef = collection(db, "achats", id, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });

        const docRef = doc(db, 'achats', id)

        const docUnsub = onSnapshot(docRef, snapshot => {
            const docData = snapshot.data()
            console.log({ active: docData.active });

            setActive(docData.active)
        })

        return () => {
            unsub();
            docUnsub()
        }
    }, [id]);

    // ✍️ Send message
    const handleSend = async () => {
        console.log(!input.trim());
        console.log({ input: input.trim() });

        if (!input.trim()) return;
        try {
            const roomsRef = collection(db, "achats", id)
            await updateDoc(roomsRef, {
                lastMessage: input,
                updatedAt: serverTimestamp()
            })
            const messagesRef = collection(db, "achats", id, "messages");
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
        <div className="achat-container">
            <NavBar />
            {/* Header */}
            <div className="achat-header">Anonymous Chat</div>

            {/* Messages */}
            <div className="achat-messages">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`achat-message ${m.sender === user?.uid ? "own-message" : "other-message"
                            }`}
                    >
                        <div className="achat-sender">{m.sender === user?.uid ? "You" : "Admin"}</div>
                        <div>{m.text}</div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="achat-input-container">
                <input
                    type="text"
                    className="achat-input"
                    value={active ? input : "Chat has been closed"}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                    disabled={!active}
                />
                <button onClick={handleSend} className="achat-button" disabled={!active}>
                    Send
                </button>
            </div>
        </div>
    );
}
