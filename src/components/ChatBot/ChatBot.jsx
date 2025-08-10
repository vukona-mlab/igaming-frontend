import { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

const ChatBot = () => {
    const [chatBotOpen, setChatBotOpen] = useState(false);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showContactSupport, setShowContactSupport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('unknown');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [personalizedGreeting, setPersonalizedGreeting] = useState("");
    const [guestInfo, setGuestInfo] = useState({
        sessionId: null,
        guestId: null,
        name: '',
        email: '',
        phone: ''
    });
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        bio: "",
        email: "",
        displayName: "",
        phone: "",
        dateOfBirth: "",
        categories: [],
        jobTitle: "",
        speciality: ""
    });
    const [sessionContext, setSessionContext] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const [isEscalated, setIsEscalated] = useState(false);
    const [questionsLoaded, setQuestionsLoaded] = useState(false);
    // Track a reset counter to force rerender on restart
    const [resetCounter, setResetCounter] = useState(0);

    const chatbotRef = useRef(null);
    const messagesEndRef = useRef(null);
    
    const BACKEND_URL = import.meta.env?.VITE_API_URL;
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem("token") : null;
    const uid = typeof localStorage !== 'undefined' ? localStorage.getItem("uid") : null;

    // Smooth scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (chatHistory.length > 0) {
            setTimeout(scrollToBottom, 100);
        }
    }, [chatHistory, isTyping]);

    // Close chatbot when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target) && chatBotOpen) {
                setChatBotOpen(false);
            }
        };

        if (chatBotOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [chatBotOpen]);

    // Generate or retrieve guest session ID and guest ID
    const getGuestSessionId = () => {
        if (typeof localStorage === 'undefined') return 'demo_session';
        
        let sessionId = localStorage.getItem('chatbot_guest_session');
        if (!sessionId) {
            sessionId = `guest_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chatbot_guest_session', sessionId);
        }
        return sessionId;
    };

    const getGuestId = () => {
        if (typeof localStorage === 'undefined') return 'demo_guest';
        
        let guestId = localStorage.getItem('chatbot_guest_id');
        if (!guestId) {
            guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chatbot_guest_id', guestId);
        }
        return guestId;
    };

    // Initialize user type and session
    useEffect(() => {
        if (token && uid) {
            setUserType('authenticated');
            getProfile();
        } else {
            setUserType('guest');
            const sessionId = getGuestSessionId();
            const guestId = getGuestId();
            setGuestInfo(prev => ({ ...prev, sessionId, guestId }));
            
            if (typeof localStorage !== 'undefined') {
                const savedGuestInfo = localStorage.getItem('chatbot_guest_info');
                if (savedGuestInfo) {
                    try {
                        const parsed = JSON.parse(savedGuestInfo);
                        setGuestInfo(prev => ({ ...prev, ...parsed, sessionId, guestId }));
                    } catch (e) {
                        console.warn('Failed to parse saved guest info:', e);
                    }
                }
            }
        }
    }, []);

    // Save guest info to localStorage
    useEffect(() => {
        if (typeof localStorage !== 'undefined' && userType === 'guest' && guestInfo.sessionId) {
            localStorage.setItem('chatbot_guest_info', JSON.stringify(guestInfo));
        }
    }, [guestInfo, userType]);

    const getProfile = async () => {
        if (!uid || !token) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/users/${uid}`, {
                method: "GET",
                headers: {
                    'Authorization': token, // Token already has Bearer prefix
                    'Content-Type': 'application/json'
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    name: data.user?.name || "",
                    surname: data.user?.surname || "",
                    bio: data.user?.bio || "",
                    email: data.user?.email || "",
                    displayName: data.user?.displayName || "",
                    phone: data.user?.phoneNumber || "",
                    dateOfBirth: data.user?.dateOfBirth || "",
                    categories: data.user?.categories || [],
                    jobTitle: data.user?.jobTitle || "",
                    speciality: data.user?.specialities?.[0] || ""
                });
                setError(null);
            } else {
                console.warn(`Profile fetch failed: ${response.status}`);
                setError(null);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load user profile');
        } finally {
            setLoading(false);
        }
    };

    // Transform API questions to component format
    const transformApiQuestions = (apiQuestions) => {
        if (!Array.isArray(apiQuestions)) {
            console.warn('API questions is not an array:', apiQuestions);
            return [];
        }
        
        return apiQuestions.map(question => ({
            ...question,
            question: question.text || question.question,
            options: Array.isArray(question.options) ? question.options.map(option => ({
                ...option,
                text: option.label || option.text,
                value: option.value || option.text,
                icon: getIconForOption(option.value || option.text)
            })) : []
        }));
    };

    const getIconForOption = (value) => {
        if (!value) return '•';
        
        const iconMap = {
            'technical': '🔧',
            'billing': '💳',
            'product': '📱',
            'general': '❓',
            'account': '👤',
            'bug': '🐛',
            'feature': '✨',
            'low': '🟢',
            'medium': '🟡',
            'high': '🔴',
            'urgent': '🚨',
            'login_issue': '🔐',
            'performance_issue': '⚡',
            'feature_not_working': '❌',
            'error_messages': '⚠️',
            'integration_issue': '🔗',
            'login_problem': '🚪',
            'password_reset': '🔑',
            'account_locked': '🔒',
            'profile_update': '📝',
            'security_concern': '🛡️',
            'data_privacy': '🔍',
            'other': '❓',
            'default': '•' 

        };
        
        const lowerValue = value.toLowerCase();
        for (const [key, icon] of Object.entries(iconMap)) {
            if (lowerValue.includes(key)) {
                return icon;
            }
        }
        
        return '•';
    };

    // Get intelligent questions from backend
    const getQuestions = async (previousAnswers = []) => {
        console.log('🔄 Getting questions with previous answers:', previousAnswers);
        setLoading(true);
        setError(null);
        setQuestionsLoaded(false);
        
        try {
            const userContext = getUserContext();
            // Only add greeting if this is a true reset (not a follow-up fetch)
            const isInitial = chatHistory.length === 0 && userAnswers.length === 0 && previousAnswers.length === 0;

            // Match backend controller expected structure - SIMPLIFIED FORMAT
            const requestBody = {
                userId: userType === 'authenticated' ? uid : guestInfo.guestId,
                userType,
                sessionId: userType === 'authenticated' ? uid : guestInfo.sessionId,
                previousAnswers: previousAnswers.map(answer => ({
                    sessionId: answer.sessionId,
                    id: answer.id,
                    answer: answer.answer
                })),
                userContext,
                chatHistory: chatHistory || []
            };

            console.log('📤 Requesting questions with:', requestBody);

            const response = await fetch(`${BACKEND_URL}/api/chatbot/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': token }) // Add auth header if available
                },
                body: JSON.stringify(requestBody)
            });

            console.log('📥 Response status:', response.status);

            // Check if we need to use guest endpoint (401 Unauthorized or no token)
            if (response.status === 401 || (!token && userType === 'guest')) {
                console.log('🔄 Using guest endpoint...');
                const guestResponse = await fetch(`${BACKEND_URL}/api/chatbot/guest/questions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...requestBody,
                        guestId: guestInfo.guestId,
                        sessionId: guestInfo.sessionId
                    })
                });

                if (!guestResponse.ok) {
                    const errorText = await guestResponse.text();
                    console.error('❌ Guest API Error Response:', errorText);
                    throw new Error(`Guest API request failed: ${guestResponse.status} - ${errorText}`);
                }

                const guestData = await guestResponse.json();
                console.log('✅ Guest API Response:', guestData);

                if (!guestData.success) {
                    throw new Error(guestData.error || 'Guest API returned unsuccessful response');
                }

                // Process guest response
                if (!guestData.questions || !Array.isArray(guestData.questions)) {
                    console.warn('⚠️ No questions array in guest response:', guestData);
                    throw new Error('Invalid guest response format: missing questions array');
                }

                const transformedQuestions = transformApiQuestions(guestData.questions);
                console.log('🔄 Transformed guest questions:', transformedQuestions);
                // Set questions and mark as loaded BEFORE adding messages
                setCurrentQuestions(transformedQuestions);
                setPersonalizedGreeting(guestData.greeting || "Hello! How can I help you today?");
                setSessionContext(guestData.sessionContext || null);
                setCurrentQuestionIndex(0);
                setQuestionsLoaded(true);
                // Only add greeting if this is a true reset and not already in chatHistory
                if (isInitial && guestData.greeting) {
                    const alreadyHasGreeting = chatHistory.some(
                        m => m.type === 'bot' && m.content === guestData.greeting
                    );
                    if (!alreadyHasGreeting) {
                        addMessage({
                            type: 'bot',
                            content: guestData.greeting,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        });
                    }
                }
                return; // Exit early after successful guest handling
            }

            // Handle other non-ok responses
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error Response:', errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            // Handle successful authenticated response
            const data = await response.json();
            console.log('✅ API Response:', data);

            if (!data.success) {
                throw new Error(data.error || 'API returned unsuccessful response');
            }

            if (!data.questions || !Array.isArray(data.questions)) {
                console.warn('⚠️ No questions array in response:', data);
                throw new Error('Invalid response format: missing questions array');
            }

            const transformedQuestions = transformApiQuestions(data.questions);
            console.log('🔄 Transformed questions:', transformedQuestions);
            // Set questions and mark as loaded BEFORE adding messages
            setCurrentQuestions(transformedQuestions);
            setPersonalizedGreeting(data.greeting || "Hello! How can I help you today?");
            setSessionContext(data.sessionContext || null);
            setCurrentQuestionIndex(0);
            setQuestionsLoaded(true);
            // Only add greeting if this is a true reset and not already in chatHistory
            if (isInitial && data.greeting) {
                const alreadyHasGreeting = chatHistory.some(
                    m => m.type === 'bot' && m.content === data.greeting
                );
                if (!alreadyHasGreeting) {
                    addMessage({
                        type: 'bot',
                        content: data.greeting,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                }
            }
        } catch (error) {
            console.error('❌ Error getting questions:', error);
            setError(error.message);
            
            // Fallback questions
            const fallbackQuestions = [
                {
                    id: "default_1",
                    question: "What type of issue are you experiencing?",
                    text: "What type of issue are you experiencing?",
                    type: "single_choice",
                    options: [
                        { text: "Technical Issue", value: "technical", label: "Technical Issue", icon: "🔧" },
                        { text: "Billing Question", value: "billing", label: "Billing Question", icon: "💳" },
                        { text: "Product Information", value: "product", label: "Product Information", icon: "📱" },
                        { text: "General Support", value: "general", label: "General Support", icon: "❓" },
                        { text: "Account Issues", value: "account", label: "Account Issues", icon: "👤" },
                        { text: "Bug Report", value: "bug", label: "Bug Report", icon: "🐛" }
                    ]
                }
            ];
            
            // CRITICAL FIX: Set fallback questions and mark as loaded
            setCurrentQuestions(fallbackQuestions);
            setPersonalizedGreeting("I'm having trouble connecting to our support system, but I can still help you!");
            setQuestionsLoaded(true);
            
            addMessage({
                type: 'bot',
                content: "I'm having trouble connecting to our support system, but I can still help you! Please select your issue type:",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            
        } finally {
            setLoading(false);
        }
    };

    const getUserName = () => {
        if (userType === 'authenticated') {
            return formData.displayName || formData.name || 'User';
        }
        return guestInfo.name || 'Guest';
    };

    const getIntelligentResponse = async (userAnswer, questionId) => {
        setLoading(true);
        setError(null);
        
        try {
            // Match backend controller expected structure - SIMPLIFIED FORMAT
            const requestBody = {
                userId: userType === 'authenticated' ? uid : null,
                userType,
                sessionId: userType === 'authenticated' ? uid : guestInfo.sessionId,
                questionId,
                answer: userAnswer.answer,
                chatHistory: chatHistory || [],
                userAnswers: userAnswers || [],
                userContext: getUserContext()
            };

            console.log('Getting response for:', requestBody);

            const response = await fetch(`${BACKEND_URL}/api/chatbot/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': token })
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response API status:', response.status);

            // Check if we need to use guest endpoint
            if (response.status === 401 || (!token && userType === 'guest')) {
                console.log('Using guest response endpoint...');
                
                const guestResponse = await fetch(`${BACKEND_URL}/api/chatbot/guest/response`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...requestBody,
                        guestId: guestInfo.guestId,
                        sessionId: guestInfo.sessionId
                    })
                });

                if (!guestResponse.ok) {
                    const errorText = await guestResponse.text();
                    console.error('Guest Response API Error:', errorText);
                    throw new Error(`Guest Response API failed: ${guestResponse.status} - ${errorText}`);
                }

                const guestData = await guestResponse.json();
                console.log('Guest Response API data:', guestData);
                
                if (!guestData.success) {
                    throw new Error(guestData.error || 'Guest API returned unsuccessful response');
                }
                
                return {
                    text: guestData.response || "Thank you for that information. Let me help you further.",
                    escalationRecommended: guestData.escalate || false,
                    nextActions: guestData.nextActions || [],
                    followUpQuestions: guestData.followUpQuestions || []
                };
            }

            // Handle other non-ok responses
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response API Error:', errorText);
                throw new Error(`Response API failed: ${response.status} - ${errorText}`);
            }

            // Handle successful authenticated response
            const data = await response.json();
            console.log('Response API data:', data);
            
            if (!data.success) {
                throw new Error(data.error || 'API returned unsuccessful response');
            }
            
            return {
                text: data.response || "Thank you for that information. Let me help you further.",
                escalationRecommended: data.escalate || false,
                nextActions: data.nextActions || [],
                followUpQuestions: data.followUpQuestions || []
            };
            
        } catch (error) {
            console.error('Error getting response:', error);
            setError(`Response error: ${error.message}`);
            
            // Provide contextual fallback responses
            const fallbackResponses = {
                'technical': "I understand you're having a technical issue. Let me connect you with our technical support team who can help resolve this.",
                'billing': "I see you have a billing question. Our billing specialists will be able to help you with account and payment related inquiries.",
                'bug': "Thank you for reporting this bug. I'll make sure our development team gets this information to investigate the issue.",
                'general': "Thank you for your inquiry. Let me connect you with a support agent who can provide you with detailed assistance.",
                'account': "I can help with account-related issues. Let me connect you with our account specialists.",
                'product': "I'd be happy to help with product information. Let me get you connected with the right team."
            };
            
            const responseText = fallbackResponses[userAnswer.answer] || 
                "Thank you for that information. I'm having trouble processing your request right now, but I'll connect you with a human agent who can help.";
            
            return {
                text: responseText,
                escalationRecommended: true,
                nextActions: [],
                followUpQuestions: []
            };
        } finally {
            setLoading(false);
        }
    };

    const getUserContext = () => {
        if (userType === 'authenticated') {
            return {
                name: formData.displayName || formData.name || 'User',
                email: formData.email,
                phone: formData.phone,
                categories: formData.categories || [],
                jobTitle: formData.jobTitle || '',
                sessionId: uid
            };
        } else {
            return {
                name: guestInfo.name || 'there',
                email: guestInfo.email || null,
                phone: guestInfo.phone || null,
                sessionId: guestInfo.sessionId
            };
        }
    };

    const saveChatSession = async (sessionData = {}) => {
        try {
            // Match backend controller expected structure
            const chatSession = {
                sessionId: userType === 'authenticated' ? uid : guestInfo.sessionId,
                userType,
                userId: userType === 'authenticated' ? uid : null,
                guestId: userType === 'guest' ? guestInfo.guestId : null,
                userContext: getUserContext(),
                chatHistory: chatHistory || [],
                userAnswers: userAnswers || [],
                status: showContactSupport || isEscalated ? 'escalated' : 'active',
                ...sessionData
            };

            console.log('Saving session:', chatSession);

            const response = await fetch(`${BACKEND_URL}/api/chatbot/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': token }) 
                },
                body: JSON.stringify(chatSession)
            });

            // Check if we need to use guest endpoint
            if (response.status === 401 || (!token && userType === 'guest')) {
                console.log('Using guest session endpoint...');
                
                const guestResponse = await fetch(`${BACKEND_URL}/api/chatbot/guest/sessions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...chatSession,
                        guestId: guestInfo.guestId,
                        sessionId: guestInfo.sessionId
                    })
                });

                if (!guestResponse.ok) {
                    const errorText = await guestResponse.text();
                    console.error('Failed to save guest session:', errorText);
                } else {
                    const guestData = await guestResponse.json();
                    console.log('Guest session saved successfully:', guestData);
                }
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to save session:', errorText);
            } else {
                const data = await response.json();
                console.log('Session saved successfully:', data);
            }
        } catch (error) {
            console.error('Error saving session:', error);
        }
    };

    const toggleChatBot = async () => {
        setChatBotOpen((prev) => {
            const opening = !prev;
            if (opening) {
                // Reset all state and force rerender
                setChatHistory([]);
                setUserAnswers([]);
                setShowContactSupport(false);
                setIsEscalated(false);
                setCurrentQuestionIndex(0);
                setError(null);
                setQuestionsLoaded(false);
                setCurrentQuestions([]);
                setPersonalizedGreeting("");
                setIsTyping(false);
                setLoading(false);
                setResetCounter((c) => c + 1); // force rerender
                // Do NOT call getQuestions here; let useEffect handle it
            }
            return opening;
        });
    };

    const addMessage = (message) => {
        const newMessage = {
            ...message,
            id: Date.now() + Math.random(),
            timestamp: message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatHistory(prev => {
            const updated = [...prev, newMessage];
            console.log('💬 Chat history updated:', updated);
            return updated;
        });
    };

    const handleOptionSelect = async (option, questionId) => {
        if (!option || !questionId) {
            console.error('Invalid option or questionId:', { option, questionId });
            return;
        }
        
        const currentQuestion = currentQuestions[currentQuestionIndex];
        if (!currentQuestion) {
            console.error('No current question found');
            return;
        }
        
        // Match backend controller expected answer structure - SIMPLIFIED FORMAT
        const newAnswer = {
            sessionId: userType === 'authenticated' ? uid : guestInfo.sessionId,
            id: questionId,
            answer: option.value || option.text
        };

        console.log('Processing answer:', newAnswer);

        setUserAnswers(prev => {
            const updated = [...prev, newAnswer];
            console.log('User answers updated:', updated);
            return updated;
        });

        // Add user message
        addMessage({
            type: 'user',
            content: option.text,
            icon: option.icon,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // Show typing indicator
        setIsTyping(true);

        // Add a small delay for better UX
        setTimeout(async () => {
            try {
                // Get AI response from backend
                const intelligentResponse = await getIntelligentResponse(newAnswer, questionId);
                setIsTyping(false);

                // Only add bot response ONCE
                addMessage({
                    type: 'bot',
                    content: intelligentResponse.text,
                    escalationRecommended: intelligentResponse.escalationRecommended,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });

                // Handle escalation: do not add another bot message, just set state and show contact support
                if (intelligentResponse.escalationRecommended) {
                    console.log('🚨 ESCALATION DETECTED - Saving session as escalated');
                    setIsEscalated(true);
                    // Save session with escalated status IMMEDIATELY
                    await saveChatSession({
                        status: 'escalated',
                        chatHistory: [...chatHistory, {
                            type: 'user',
                            content: option.text,
                            timestamp: new Date().toISOString()
                        }, {
                            type: 'bot',
                            content: intelligentResponse.text,
                            timestamp: new Date().toISOString()
                        }],
                        userAnswers: [...userAnswers, newAnswer]
                    });
                    // Show contact support after short delay (no extra bot message)
                    setTimeout(() => {
                        setShowContactSupport(true);
                    }, 1500);
                    return; // Don't continue with normal flow
                }

                // Normal flow - save session periodically
                await saveChatSession();

                // Handle next steps for non-escalated responses
                if (intelligentResponse.nextActions && intelligentResponse.nextActions.length > 0) {
                    const nextQuestions = transformApiQuestions(intelligentResponse.nextActions);
                    if (nextQuestions.length > 0) {
                        setCurrentQuestions(nextQuestions);
                        setCurrentQuestionIndex(0);
                        setQuestionsLoaded(true);
                    } else {
                        // Get follow-up questions based on current answers
                        await getQuestions([...userAnswers, newAnswer]);
                    }
                } else if (intelligentResponse.followUpQuestions && intelligentResponse.followUpQuestions.length > 0) {
                    const followUpQuestions = transformApiQuestions(intelligentResponse.followUpQuestions);
                    if (followUpQuestions.length > 0) {
                        setCurrentQuestions(followUpQuestions);
                        setCurrentQuestionIndex(0);
                        setQuestionsLoaded(true);
                    } else {
                        // Get follow-up questions based on current answers
                        await getQuestions([...userAnswers, newAnswer]);
                    }
                } else {
                    // Try to get follow-up questions based on current answers
                    await getQuestions([...userAnswers, newAnswer]);
                }
            } catch (error) {
                console.error('Error in handleOptionSelect:', error);
                setIsTyping(false);
                addMessage({
                    type: 'bot',
                    content: "I'm sorry, I'm having trouble processing your request. Let me connect you with a support agent.",
                    isError: true,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                // Auto-escalate on error
                setIsEscalated(true);
                await saveChatSession({ status: 'escalated' });
                setTimeout(() => setShowContactSupport(true), 1500);
            }
        }, 800);
    };

    const handleContactSupport = async () => {
        if (userType === 'guest' && (!guestInfo.name || !guestInfo.email)) {
            // Show guest form
            setCurrentQuestions([{
                id: "guest_form",
                question: "Please provide your contact information so we can assist you better",
                type: "form",
                fields: [
                    { name: "name", label: "Your Name", type: "text", required: true },
                    { name: "email", label: "Email Address", type: "email", required: true },
                    { name: "phone", label: "Phone Number (optional)", type: "tel" }
                ]
            }]);
            setCurrentQuestionIndex(0);
            setQuestionsLoaded(true);
            return;
        }

        // Final save with escalated status
        await saveChatSession({ status: 'escalated' });
        
        const contactInfo = userType === 'authenticated' ? formData.email : guestInfo.email;
        const sessionId = userType === 'authenticated' ? uid : guestInfo.sessionId;
        
        addMessage({
            type: 'bot',
            content: `Perfect! A support specialist will reach out to you at ${contactInfo} within the next few hours. Your session ID is ${sessionId} for reference.`,
            isSuccess: true
        });
        
        setShowContactSupport(false);
    };

    const restartChat = async () => {
        // Reset all state and force rerender
        setChatHistory([]);
        setUserAnswers([]);
        setShowContactSupport(false);
        setIsEscalated(false);
        setCurrentQuestionIndex(0);
        setError(null);
        setQuestionsLoaded(false);
        setCurrentQuestions([]);
        setPersonalizedGreeting("");
        setIsTyping(false);
        setLoading(false);
        setResetCounter((c) => c + 1); // force rerender
        // Do NOT call getQuestions here; let useEffect handle it
    };
    // Only call getQuestions when chatBotOpen is true and resetCounter changes (i.e., on open/reset)
    useEffect(() => {
        if (chatBotOpen) {
            getQuestions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatBotOpen, resetCounter]);

    const renderCurrentQuestion = () => {
        // Always check for loading first
        if (loading && !questionsLoaded) {
            return (
                <div className="question-container">
                    <div className="options-container">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p className="loading-text">Loading support options...</p>
                    </div>
                </div>
            );
        }

        // Error state with retry
        if (error && !questionsLoaded) {
            return (
                <div className="question-container">
                    <div className="error-container">
                        <p className="error-text">Connection issue: {error}</p>
                        <button className="btn-primary" onClick={() => { setError(null); setLoading(false); setQuestionsLoaded(false); getQuestions(); }}>
                            Retry Connection
                        </button>
                    </div>
                </div>
            );
        }

        // Show contact support actions
        if (showContactSupport) {
            return (
                <div className="question-container">
                    <div className="support-actions">
                        <button className="btn-primary" onClick={handleContactSupport}>
                            📞 Contact Support Agent
                        </button>
                        <button className="btn-outline-secondary" onClick={restartChat}>
                            🔄 Start New Conversation
                        </button>
                        {isEscalated && (
                            <div className="escalation-notice">
                                <p className="escalation-text">
                                    🚨 Your issue has been escalated to our support team for immediate attention.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // If questions are loaded, render the current question if available
        if (questionsLoaded && currentQuestions && currentQuestions.length > 0 && currentQuestionIndex < currentQuestions.length) {
            const currentQuestion = currentQuestions[currentQuestionIndex];
            if (!currentQuestion) return null;

            // Text input question
            if (currentQuestion.type === 'text_input') {
                return (
                    <div className="question-container">
                        <div className="text-input-container">
                            <p className="question-text">{currentQuestion.text}</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const textInput = formData.get('textInput');
                                if (textInput?.trim()) {
                                    const textOption = {
                                        text: textInput.trim(),
                                        value: textInput.trim(),
                                        label: textInput.trim(),
                                        icon: '💬'
                                    };
                                    handleOptionSelect(textOption, currentQuestion.id);
                                }
                            }}>
                                <div className="options-container">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="textInput"
                                            placeholder="Type your response here..."
                                            required
                                            disabled={loading || isEscalated}
                                            autoFocus
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn-primary"
                                        disabled={loading || isEscalated}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }

            // Form question
            if (currentQuestion.type === 'form') {
                return (
                    <div className="question-container">
                        <div className="form-container">
                            <p className="form-title">{currentQuestion.question}</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const newGuestInfo = {
                                    name: formData.get('name') || '',
                                    email: formData.get('email') || '',
                                    phone: formData.get('phone') || ''
                                };
                                setGuestInfo(prev => ({ ...prev, ...newGuestInfo }));
                                handleContactSupport();
                            }}>
                                <div className="options-container">
                                    {currentQuestion.fields?.map((field, index) => (
                                        <div key={index} className="input-group">
                                            <label>{field.label}</label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required={field.required}
                                                placeholder={field.label}
                                                defaultValue={
                                                    field.name === 'name' ? guestInfo.name :
                                                    field.name === 'email' ? guestInfo.email :
                                                    field.name === 'phone' ? guestInfo.phone : ''
                                                }
                                            />
                                        </div>
                                    ))}
                                    <button type="submit" className="btn-primary">
                                        Submit Information
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }

            // Single choice or default question
            if (!Array.isArray(currentQuestion.options) || currentQuestion.options.length === 0) {
                // If no options, show contact support fallback
                return (
                    <div className="question-container">
                        <div className="error-container">
                            <p className="error-text">No response options available</p>
                            <button className="btn-primary" onClick={() => setShowContactSupport(true)}>
                                Contact Support
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div className="question-container">
                    <div className="options-container">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleOptionSelect(option, currentQuestion.id)}
                                disabled={loading || isEscalated}
                            >
                                {option.icon && <span style={{ marginRight: '8px' }}>{option.icon}</span>}
                                {option.text || option.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // If no questions, not loading, and not escalated, show contact support
        if (!loading && questionsLoaded && (!currentQuestions || currentQuestions.length === 0) && !showContactSupport && !isEscalated) {
            setTimeout(() => setShowContactSupport(true), 100);
        }

        // Default: nothing to render
        return null;
    };

    return (
        <div className="chatbot-wrapper">
            {chatBotOpen ? (
                <div ref={chatbotRef} className="chatbot-container">
                    <div className="chatbot-header">
                        {/* {sessionContext && (
                            <div className="session-info">
                                <small>
                                    {userType === 'authenticated' ? '🔐 Authenticated' : '👤 Guest'}
                                </small>
                            </div>
                        )} */}
                        <h5 className="chatbot-title">Support Assistant {userType === 'authenticated' ? '🔐' : '👤'}</h5>

                        {error && (
                            <div className="connection-status error">
                                ⚠️ Connection Issue
                            </div>
                        )}
                        {isEscalated && (
                            <div className="connection-status escalated">
                                🚨 Escalated to Support Team
                            </div>
                        )}
                        <button 
                            onClick={toggleChatBot} 
                            className="btn-close-white"
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="chatbot-body">
                        <div className="chat-history">
                            {chatHistory.map((message) => (
                                <div key={message.id} className={`message-container ${message.type}`}>
                                    <div className={`message-bubble ${message.type} ${
                                        message.escalationRecommended ? 'urgent' : ''
                                    } ${
                                        message.isError ? 'error' : ''
                                    } ${
                                        message.isSuccess ? 'success' : ''
                                    } ${
                                        message.isEscalation ? 'escalation' : ''
                                    }`}>
                                        {message.icon && <span style={{ marginRight: '8px' }}>{message.icon}</span>}
                                        <p>{message.content}</p>
                                        <span className="timestamp">{message.timestamp}</span>
                                        {message.escalationRecommended && (
                                            <div className="escalation-indicator">
                                                🚨 High Priority
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="message-container bot">
                                    <div className="message-bubble bot">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <p>Support agent is typing...</p>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>
                        
                        {renderCurrentQuestion()}
                    </div>
                </div>
            ) : (
                <button 
                    onClick={toggleChatBot} 
                    className="chatbot-button"
                    aria-label="Open chat support"
                >
                    💬
                    {sessionContext?.unreadMessages > 0 && (
                        <span className="notification-badge">{sessionContext.unreadMessages}</span>
                    )}
                </button>
            )}
        </div>
    );
};

export default ChatBot;