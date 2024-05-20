import '../styles/leftdashboard.css'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const LeftDashboard = () => {

    const [collapsed, setSidebarCollapsed] = useState(false);
    let collapsesidebar = function(){
        setSidebarCollapsed(!collapsed)
    }

    return ( 
        <div className="leftdashboard">
            <Sidebar className='sidebar' collapsed={collapsed} setCollapsed={setSidebarCollapsed}>
                <Menu>
                    <MenuItem id='collapseicon' icon={<MenuRoundedIcon onClick={collapsesidebar} /> } ></MenuItem>
                    <MenuItem component={<Link to="/documentverify/home" />} icon={<HomeIcon />}>Home</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/aadharlite" />}>Aadhar Verification</MenuItem>                    
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/dinlite" />}>DIN Verification</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/itrcompliance" />}>ITR Compliance Check</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/licenselite" />}>License Verification</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/panlite" />}>PAN Verification</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/passportlite" />}>Passport Verification</MenuItem>
                    <MenuItem icon={<FactCheckIcon/>} component={<Link to="/documentverify/voterlite" />}>Voter ID Verification</MenuItem>                   
                </Menu>            
            </Sidebar>
        </div>
     );
}
 
export default LeftDashboard;