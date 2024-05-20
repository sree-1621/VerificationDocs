import '../../styles/tokenpage.css';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Tokenpage = () => {

    let [token, setToken] = useState('');
    let tkn = ((e) => setToken(e.target.value));
    let navigate = useNavigate();

    let tokenlogin = (e) => {
        e.preventDefault();
        var t = token;
        if(t == undefined || t == '' || t == null){
            alert('Invalid Entry..!');
            return;
        }
        Cookies.set('token',t,{expires: 1,})
        Cookies.set('url','http://51.222.43.180:8901',{expires: 1,})
        Cookies.set('darkMode', false);    
        Cookies.set('mode', 'light') 
        navigate('/documentverify/');
    }

    return ( 
        <div className="tokenpage pt-5">
            <div className="bckgrnd pt-5">
                <h1 style={{color:'#CAFC81', backgroundColor:'#2c2b2b', textAlign:'center'}}>Document Verify</h1>
                <img src="images/bgOriginal.png" alt=""/>
            </div>
            <div className="inputboxx">
                <div className="form-floating mt-5" id='formfloating'>
                        <textarea className="form-control" onChange={tkn} value={token} id="floatingTextarea"></textarea>
                        <label htmlFor="floatingTextarea">Paste token here..</label>
                </div>
                <div className='submitbutton mt-5 ml-2'>
                    <button type="submit" className="btn btn-light btn-lg" onClick={tokenlogin} id='tokenpagebutton'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default Tokenpage;