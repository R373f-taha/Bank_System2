import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import type { NavItem } from "../interfaces/NavBar";
import logoImg from '../../../images/homeImages/Logo.png'; 
import menuIcon from '../../../images/homeImages/Mobile Icon.png';
//footer
import Footer from "../footer/Footer";
//footerImages
import mailIcon from "../../../images/homeImages/Email.png";
import phoneIcon from "../../../images/homeImages/Phone.png";
import locationIcon from "../../../images/homeImages/Location.png";
import facebookIcon from "../../../images/homeImages/Facebook.png";
import twitterIcon from "../../../images/homeImages/Twitter.png";
import linkedInIcon from "../../../images/homeImages/LinkedIn.png";
//contactData
const contactData = [
        { icon: mailIcon, content: "hello@skillbridge.com" },
        { icon: phoneIcon, content: "+91 91813 23 2309" },
        { icon: locationIcon, content: "Somewhere in the World" }
    ];
//SocialMediaData
const socialIcons = [
        { content: facebookIcon, href: "https://facebook.com" },
        { content: twitterIcon, href: "https://x.com" },
        { content: linkedInIcon, href: "https://linkedin.com" }
    ];
const RootLayout = () => {
    
    const navItems: NavItem[] = [
        { content: "Home", href: "/" },
        { content: "Dashboard", href: "/dashboard" },
        { content: "Admine Dashboard", href: "admin/dashboard" },
    ];

    
    const authButtons: NavItem[] = [
        { content: "Login", href: "/login" },
        { content: "Create Account", href: "/signup" }
    ];

    return (
        <div className="root-layout">
            <NavBar 
                logo={logoImg}
                items={navItems} 
                btn={authButtons} 
                smallBtn={menuIcon}
            />
            
            <main>
                
                <Outlet /> 
            </main>

            <footer>
                <Footer 
                logo={logoImg}
                items={navItems} 
                contact={contactData}
                icons={socialIcons}
                rights="© 2026 YourBank. All Rights Reserved"
                p="Privacy Policy"
                s="Terms of Service"
            />
            </footer>
            
        </div>
    );
}

export default RootLayout;