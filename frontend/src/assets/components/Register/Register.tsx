import './Register.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // الرابط هنا هو نفس الرابط الذي يعمل عليه السيرفر في صورتك الأخيرة
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            console.log("تم التسجيل بنجاح:", response.data);
            alert("تم إنشاء الحساب بنجاح!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('خطأ في التسجيل:', error.response?.data || error.message);
            } else {
                console.error('خطأ غير متوقع في التسجيل:', error);
            }
            alert('فشل التسجيل، يرجى التأكد من البيانات.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">إنشاء حساب جديد</h2>
                <form onSubmit={handleRegister} className="register-form">
                    <label className="register-label">
                        الاسم
                        <input
                            type="text"
                            placeholder="اكتب اسمك"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="register-input"
                            required
                        />
                    </label>
                    <label className="register-label">
                        الإيميل
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="register-input"
                            required
                        />
                    </label>
                    <label className="register-label">
                        كلمة السر
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="register-input"
                            required
                        />
                    </label>
                    <button type="submit" className="register-button">إنشاء حساب</button>
                    <div className="register-footer">
                        <span>لديك حساب؟</span>
                        <Link to="/login" className="register-login-link">تسجيل الدخول</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;