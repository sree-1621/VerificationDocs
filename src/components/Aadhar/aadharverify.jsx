import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import { CCard, CCardHeader, CCardBody, CCardTitle, CCardText, CListGroup, CListGroupItem } from '@coreui/react'
import { Tab, Box} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AadharOTPverify from './aadharotpverify';

const AadharVerify = () => {

    let [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const token = Cookies.get('token');
    const [aadharresponse, setAadharResponse] = useState(null);

    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');
    let [aadhar, setAadhar] = useState('');
    let aadhaript = ((e) => {
        setAadhar(e.target.value);
        setShowMyComponent(false);
    })

    let verifyAadhar = async(e) => {
        e.preventDefault();
        setShowMyComponent(false);
        let number = {"id_number" : aadhar}
        await axios.post('/Validation/aadharValidation', number, {
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,}
        }).then(data => {
            if(data.data.status_code == 200){
                setAadharResponse(data.data.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Valid!',
                    text: `The provided Aadhar number is valid`,
                    showCancelButton: true,                    
                    confirmButtonText : "Preview",   
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                }).then(function(value){
                    if(value.isConfirmed == true){
                        setShowMyComponent(true);
                    }
                })
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Something went wrong!',
              })
        })
    }

    return ( 
        <div className="aadhar">

            <Box sx={{ width: '100%'}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="ID Validation" value="1" />
                            <Tab label="OTP Verification" value="2" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <div className="adhartop">
                            <h2>Aadhar (UID) Validation</h2>
                            <div className="input-group mb-3 mt-5">
                                <input type="text" className="form-control" placeholder="Enter Aadhar (UID) Number" aria-label="Recipient's username" 
                                aria-describedby="basic-addon2" id='aadharinput' value={aadhar} onChange={aadhaript}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit" id='aadharverifybutton' onClick={verifyAadhar}>Verify</button>
                                </div>
                            </div>
                        </div>
                        {showMyComponent &&
                            <div id="bottomadhar">
                                <CCard>
                                    <CCardHeader>Aadhar Details</CCardHeader>
                                    <CCardBody>
                                        <CCardText>Aadhar ID :  {aadharresponse.aadhaar_number}</CCardText>
                                        <CListGroup flush>
                                            <CListGroupItem>State :  {aadharresponse.state}</CListGroupItem>
                                            <CListGroupItem>Age range :  {aadharresponse.age_range}</CListGroupItem>
                                            <CListGroupItem>Gender :  {aadharresponse.gender === "F" ?"Female":"Men"}</CListGroupItem>
                                            <CListGroupItem>Is Mobile Linked :  {aadharresponse.is_mobile === true ?"Yes":"No"}</CListGroupItem>
                                            <CListGroupItem>Last 3 digits of mobile number :  {aadharresponse.last_digits}</CListGroupItem>
                                        </CListGroup>
                                    </CCardBody>
                                </CCard>
                            </div>
                        }
                    </TabPanel>

                    <TabPanel value="2">
                        <AadharOTPverify/>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
     );
}
 
export default AadharVerify;