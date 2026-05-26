import { useState } from "react"; 
import Form from '../components/sharedComponents/formShared/Form';
import type { Field } from '../components/sharedComponents/interfaces/form';
import { useNavigate } from "react-router-dom"; 

export default function CreatAccount() {
    const navigate = useNavigate(); 

    // state to control the visibility and content of the popup message
    const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false,
        type: "success",
        message: ""
    });

    // defining the fields for the sign-up form, 
    // including new fields for address, marital status, identity number,
    //  date of birth, occupation, and deposit amount
    const signUpFields: Field[] = [
        { name: "name", type: "text", placeholder: "Enter your Full Name" }, 
        { name: "email", type: "email", placeholder: "Enter your Email" },
        { name: "password", type: "password", placeholder: "Create a Password" }, 
        { 
            name: "gender", 
            type: "select", 
            placeholder: "Select Gender",
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" }
            ]
        },
        { name: "address", type: "text", placeholder: "Enter your Address" },
        { 
            name: "marital_status", 
            type: "select", 
            placeholder: "Select Marital Status",
            options: [
                { label: "Single", value: "single" },
                { label: "Married", value: "married" }
            ]
        },
        { name: "identity_number", type: "text", placeholder: "Enter Identity Number" },
        { name: "date_of_birth", type: "date", placeholder: "Date of Birth" },
        { name: "occupation", type: "text", placeholder: "Enter your Occupation" },
        { name: "deposit_amount", type: "number", placeholder: "Enter Deposit Amount" },
    ];

    // function to handle form submission for sign-up
    const handleSignUpSubmit = async (data: Record<string, string>) => {
        try {
            // transform date from arabic to english
            const formattedData = { ...data };
            if (formattedData.date_of_birth) {
                formattedData.date_of_birth = formattedData.date_of_birth.replace(/[٠-٩]/g, (d) => 
                    String.fromCharCode(d.charCodeAt(0) - 1632)
                ).replace(/[۰-۹]/g, (d) => 
                    String.fromCharCode(d.charCodeAt(0) - 1776)
                );
            }

            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formattedData), 
            });

            // parsing the response from the server to check for success or error messages
            const result = await response.json();

            if (response.status === 201 || response.ok) {
                console.log("Account request created successfully", result);
                // showing a success popup message and redirecting to the home page after a short delay
                setPopup({ 
                    show: true, 
                    type: "success", 
                    message: "Your bank account request has been submitted successfully! Redirecting..." 
                });
                // redirecting to home page after 2.5 seconds to allow users to read the success message
                setTimeout(() => {
                    setPopup(prev => ({ ...prev, show: false }));
                    navigate("/verify-account", { state: { email: formattedData.email } });
                }, 2500);
                
            } 
            // handling validation errors or other issues by showing an error popup message
            else {
                console.error("Validation Errors:", result.errors || result.message);
                
                // extract error details
                let customErrorMessage = result.message || "Failed to submit request.";
                if (result.errors) {
                    const firstKey = Object.keys(result.errors)[0];
                    customErrorMessage = result.errors[firstKey][0]; 
                }

                setPopup({ 
                    show: true, 
                    type: "error", 
                    message: customErrorMessage
                });
            }
        } catch (error) {
            console.error("problem in connection with server", error);
            setPopup({ show: true, type: "error", message: "Network error. Please check your backend server." });
        }
    };

    return (
        <>
            <Form
                title="Create Bank Account"
                description="Please fill in your authentic details below to submit an official bank account opening request."
                submitText="Submit Request"
                secondaryText="Login"
                fields={signUpFields} 
                onSubmit={handleSignUpSubmit} 
            />
            
            {popup.show && (
                <div className="mh-popup-overlay">
                    <div className={`mh-popup-card ${popup.type}`}>
                        <h3>{popup.type === "success" ? "Submitted!" : "Oops!"}</h3>
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