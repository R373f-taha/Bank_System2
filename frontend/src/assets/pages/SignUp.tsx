
import { useState } from "react"; 
import Form from '../components/sharedComponents/formShared/Form';
import type { Field } from '../components/sharedComponents/interfaces/form';
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
    const navigate = useNavigate(); 

    // state to control the visibility and content of the popup message
    const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false,
        type: "success",
        message: ""
    });

    const signUpFields: Field[] = [
        { name: "name", type: "text", placeholder: "Enter your Full Name" },
        { name: "email", type: "email", placeholder: "Enter your Email" },
        { name: "password", type: "password", placeholder: "Enter your Password" },
    ];

    const handleSignUpSubmit = async (data: Record<string, string>) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("your Account created successfully", result);

                // save the token in localStorage for future authenticated requests
                localStorage.setItem("token", result.token);

                // save the new user's data in localStorage
                localStorage.setItem("user", JSON.stringify(result.user));

                // in success case, show the success popup message instead of alert
                setPopup({ show: true, type: "success", message: "Account created successfully! Redirecting..." });
                
                // alert for two seconds 
                setTimeout(() => {
                    setPopup(prev => ({ ...prev, show: false }));
                    navigate("/dashboard"); // after successful registration, navigate to the dashboard or home page 
                }, 2000);
                
            } else {
                console.error("أخطاء الـ Validation:", result.errors || result.message);
                
                // show error 
                setPopup({ 
                    show: true, 
                    type: "error", 
                    message: result.message || "Please check your inputs, the email might be already taken." 
                });
            }
        } catch (error) {
            console.error("problem in connection with server", error);
            // deal with network error by showing a generic error message
            setPopup({ show: true, type: "error", message: "Network error. Please check your backend server." });
        }
    };

    return (
        <>
            <Form
                title="Sign Up"
                description="Join our community today! Create an account to unlock exclusive features and personalized experiences."
                submitText="Sign Up"
                secondaryText="Login"
                fields={signUpFields} 
                onSubmit={handleSignUpSubmit} 
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
