import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const AadharOTPverify = () => {
    const token = Cookies.get('token');
    let AdharResponse;
    let [clientID, setClientID] = useState('');
    let [adhar, setAdhar] = useState('');
    const [pdflink, setPdfLink] = useState('');
    const [showMyComponent, setShowMyComponent] = useState(false);
    let adharinput = ((e) => {
        setAdhar(e.target.value);
        setShowMyComponent(false);
    })

    let [showotptab, setShowotptab] = useState(false);
    let generateOtp = (e) => {
        e.preventDefault();
        debugger;
        let number = {"id_number" : adhar}
        axios.post('/Verification/aadharOtpGenerator', number, {
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,}
        }).then(data => {
            console.log(data);
            if(data.data.status_code == 200){
                setClientID(data.data.data.client_id);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent!',
                    text: `OTP sent to the mobile number linked to this Aadhar`,
                    showCancelButton: true,                    
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                })
                setShowotptab(true);                
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid',
                    text: 'Aadhar Number does not Exists!',
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

    let [otp, setOtp] = useState('');
    let otpinput = ((e) => {
        setOtp(e.target.value);
        setShowMyComponent(false)
    })

    let downloadAadhar = () => {
        let resHeaders = AdharResponse.headers.response_token;
        axios.get(`/Verification/AadhaarOtpVerificationPdf/${resHeaders}`, {
            headers:{
                'Content-Type':'application/pdf',
                'Authorization':`Bearer ${token}`,
            },
            responseType: 'blob',
        }).then(response => {
            console.log(response);
            if(response.status == 200){
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                setPdfLink(url);
                setShowMyComponent(true);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        })
    }

    let verifyOTP = async(e) => {
        debugger;
        e.preventDefault();
        let number2 = {"otp" : otp, "client_id" : clientID};
        await axios.post('/Verification/aadharOtpVerification', number2, {
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,}
        }).then(data => {
            AdharResponse = data;
            Swal.fire({
                icon: 'success',
                title: 'Valid!',
                text: `This Aadhar belongs to ${data.data.data.full_name}`,
                showCancelButton: true,                    
                confirmButtonText : "Preview",   
                cancelButtonText: "Close",
                confirmButtonColor: '#B2BABB'
            }).then(function(value){
                if(value.isConfirmed == true){
                    downloadAadhar();
                }
            })
        })
    }

    return ( 
        <div className='adharotp'>
            {!showotptab && <div className="adharotptop">
                <h2>Aadhar OTP Validation</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter Aadhar (UID) Number" aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='adharinput' value={adhar} onChange={adharinput}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id='aadhargenotp' onClick={generateOtp}>Generate OTP</button>
                    </div>
                </div>
            </div>}
            {showotptab && <div className='adharotptop'>
                <h2>Aadhar OTP Validation</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter OTP sent to your number" aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='adharinput2' value={otp} onChange={otpinput}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id='aadharsubmitotp' onClick={verifyOTP}>Verify OTP</button>
                    </div>
                </div>
            </div>}
            {showMyComponent &&
                <div id="bottomadharotp">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default AadharOTPverify;