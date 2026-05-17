

import { useState } from "react"; 
import Form from '../components/sharedComponents/formShared/Form';
import type { Field } from '../components/sharedComponents/interfaces/form';
import { useNavigate } from "react-router-dom";

// function to handle login form submission and connect with Laravel backend
export default function Login() {
    const navigate = useNavigate(); 

    //hook to manage popup state for showing success or error messages after login attempt
    const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false,
        type: "success",
        message: ""
    });

    const loginFields: Field[] = [
        { name: "email", type: "email", placeholder: "Enter your Email" },
        { name: "password", type: "password", placeholder: "Enter your Password" },
    ];

    // connecting the login form with the Laravel backend API
    const handleLoginSubmit = async (data: Record<string, string>) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data), 
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Successful LogIn ", result);
                
                // put token and user data in localStorage for later use
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));

                // show success popup message
                setPopup({ show: true, type: "success", message: "Login Successful! Redirecting..." });

                // after a short delay to let the user see the success message, navigate to the home page
                setTimeout(() => {
                    setPopup(prev => ({ ...prev, show: false }));
                    navigate("/dashboard"); 
                }, 2000);
                
            } else {
                console.error("Login failed:", result.message);
                
                // show error popup message with the reason for login failure
                setPopup({ 
                    show: true, 
                    type: "error", 
                    message: result.message || "Invalid email or password. Please try again." 
                });
            }
        } catch (error) {
            console.error("Server is not working or there is a network issue:", error);
            
            setPopup({ show: true, type: "error", message: "Network error. Please check your backend server." });
        }
    };

    return (
        <>
            <Form
                title="Login"
                description="Welcome back! Please log in to access your account."
                fields={loginFields}
                submitText="Login"
                secondaryText="Sign Up"
                onSubmit={handleLoginSubmit} 
            />

            
            {popup.show && (
                <div className="mh-popup-overlay">
                    <div className={`mh-popup-card ${popup.type}`}>
                        <h3>{popup.type === "success" ? "Success!" : "Oops!"}</h3>
                        <p>{popup.message}</p>
                        
                        
                        {popup.type === "error" && (
                            <button className="mh-popup-close-btn" onClick={() => setPopup(prev => ({ ...prev, show: false }))}>
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}







