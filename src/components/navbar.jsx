import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {

    let clearCookies = () => {
        Cookies.remove('token');
        Cookies.remove('mode');
        Cookies.remove('darkMode');
        Cookies.remove('url');
    }

    return ( 
        <div className="navbar">
            <div className="hiuser">
                <h1>Document Verify</h1>
            </div>
            <div className="toolbar">
                <div className="settings">
                    <Link to="/documentverify/settings">{<SettingsIcon style={{color: 'white'}}/>}</Link>
                </div>
                <div className="logout" onClick={clearCookies}>
                    <Link to='/'>{<LogoutRoundedIcon style={{color: 'white'}} />}</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;