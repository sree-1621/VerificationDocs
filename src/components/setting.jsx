import Cookies from "js-cookie";
import Navbar from "./navbar";

const Settings = () => {

    const token = Cookies.get('token');

    return ( 
        <div className="setting">
            <Navbar/>
            <h1>Settings</h1>
        </div> 
    );
}
 
export default Settings;