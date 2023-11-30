import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import Panlite from './PAN/PANLIte';
import DinVerify from './DIN/dinverify';
import Pagenotfound from './pagenotfound';
import LeftDashboard from './leftdashboard';
import Navbar from './navbar';
import Footer from './footer';
import PassportVerify from './Passport/passportverify';
import VoterVerify from './Voter/voterverify';
import LicenseVerify from './License/license';
import ITRCompliance from './ITRCompliance/compliancecheck';
import AadharVerify from './Aadhar/aadharverify';

const Router = () => {
    return ( 
        <div className='router'>
            <Navbar/>
            <div style={{ display: "flex", height: "100vh" }}>
                <LeftDashboard/>  
                <section style={{padding: '20px', width:'100%'}}>
                    <Routes>
                        <Route path='/home' element={<Home/>} />
                        <Route path='/' element={<Navigate to='/documentverify/home'/>} />
                        <Route path='/panlite' element={<Panlite/>} />
                        <Route path='/dinlite' element={<DinVerify/>} />
                        <Route path='/passportlite' element={<PassportVerify/>} />
                        <Route path='/voterlite' element={<VoterVerify/>} />
                        <Route path='/licenselite' element={<LicenseVerify/>} />
                        <Route path='/itrcompliance' element={<ITRCompliance/>}/>
                        <Route path='/aadharlite' element={<AadharVerify/>}/>
                        <Route path='/*' element={<Pagenotfound/>} />
                    </Routes>
                </section>
            </div>
            <Footer/>
        </div>
     );
}
 
export default Router;


{/* <div style={{ display: "flex", height: "100vh" }}>
        <LeftDashboard/>  
        <section style={{padding: '20px', width:'100%'}}>       
          <Router/>
        </section>
      </div> */}