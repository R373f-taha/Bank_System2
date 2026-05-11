import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // الرابط المعتمد في مشروعك للـ Login
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            console.log("تم تسجيل الدخول:", response.data);

            // خطوة احترافية: حفظ التوكن في المتصفح ليبقى المستخدم مسجلاً
            localStorage.setItem('user_token', response.data.token);

            alert("أهلاً بكِ من جديد!");
            
            // التوجيه لصفحة الـ Dashboard أو الصفحة الرئيسية
            navigate('/dashboard'); 

        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "خطأ في البريد أو كلمة السر");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">تسجيل الدخول</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="email" 
                        placeholder="الإيميل" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="كلمة السر" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required 
                    />
                    <button type="submit" className="login-button">دخول</button>
                </form>
            </div>
        </div>
    );
};

export default Login;