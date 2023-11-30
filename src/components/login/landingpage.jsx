import '../../styles/landingpage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css'
// import '../../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox}
        from 'mdb-react-ui-kit';

const Landingpage = () => {

    const [justifyActive, setJustifyActive] = useState('tab1');
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }  
      setJustifyActive(value);
    };


    let [username, setUsername] = useState('');
    let usr = ((e) => setUsername(e.target.value));
    let [password, setPassword] = useState('');
    let pwd = ((e) => setPassword(e.target.value));
    let navigate = useNavigate()
    
    let login = (e) => {
        e.preventDefault();
        let data = {username, password};
        console.log("Credentials : ", data);
        if(username == "admin@gmail.com" && password == "0000"){
            navigate('/urbanread/');
        }
        else{
            alert('Invalid Credentials....!');
        }
    }

    return ( 
        <div className="landingpage">
            <div className="leftlanding p-3 my-5 d-flex flex-column w-50">
                <div className="leftlanding1">
                        <h4>Hi there....</h4>
                        <h2>Welcome to UrbanRead</h2>
                    </div>
                    <div className="leftlanding2">
                    <img src="images/landingimage.jpg" alt=""/>
                </div>
            </div>
            {/* 
                <div className="rightlanding1">
                    <h4>Hi there....</h4>
                    <h2>Welcome to UrbanRead</h2>
                </div>
                <div className="rightlanding2">
                    <form action="">
                        <div className="userlanding">
                            <label htmlFor="username">Username</label><br />
                            <input type="text" placeholder='Enter Username' id='loginusername' /><br /><br />
                        </div>
                        <div className="passlanding">
                            <label htmlFor="password">Password</label><br />
                            <input type="password" placeholder='Enter Password' id='loginpassword'/>
                        </div>

                    </form>
                </div>
            </div> */}

        <div className="rightlanding">
            <MDBContainer className="p-3 my-5 d-flex flex-column">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                Login
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                Register
                </MDBTabsLink>
            </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

            <MDBTabsPane show={justifyActive === 'tab1'}>
        
                <form action="" >
                    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={usr} value={username}/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={pwd} value={password}/>

                    <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                    </div>

                    <MDBBtn className="mb-4 w-100" onClick={login}>Sign in</MDBBtn>
                    <p className="text-center">Not a member? <a href="#!">Register</a></p>
                </form>
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>

                <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

                <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                </div>

                <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

            </MDBTabsPane>

            </MDBTabsContent>

            </MDBContainer>
        </div>
</div>
     );
}
 
export default Landingpage;