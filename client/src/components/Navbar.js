import { Link } from 'react-router-dom';
import './Navbar.css';
export const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/'><img src="https://www.losalamosnm.us/files/sharedassets/public/v/1/departments/police/images/crime-statistics-image.jpeg?w=1200" alt="Crime-Stastics" /></Link>
            <div className='links-container'>
                <Link to='/police'>Police-Killing</Link>
                <Link to='/nyCrimes'>New York Shooting</Link>
                <Link to='/laCrimes'>Los Angeles Crime</Link>
                

            </div>
        </div>

    );

};