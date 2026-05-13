
import { Link, Outlet } from 'react-router-dom';
const Home = () => {
    return (
        <>
        
        <main>
            <Outlet/>
            hello
            <button>
                <Link to="/login">Log In</Link>
            </button>
        </main>
        </>
    )
}

export default Home
