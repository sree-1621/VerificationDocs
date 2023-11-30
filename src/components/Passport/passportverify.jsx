import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const PassportVerify = () => {

    const token = Cookies.get('token');
    let passportResponse;
    let [passport,setPassport] = useState('');
    let [passportdob,setPassportdob] = useState('');
    const [pdflink, setPdfLink] = useState('');
    const [showMyComponent, setShowMyComponent] = useState(false);

    let passInput = ((e) => {
        setPassport(e.target.value);
        setShowMyComponent(false);
    });
    
    let passdobInput = ((e) => {
        setPassportdob(e.target.value);
        setShowMyComponent(false);
    });

    let downloadPassword = () => {
        let resHeaders = passportResponse.headers.response_token;
        axios.get(`/PassportDetailsPDF/${resHeaders}`,
        {
            headers: {
                    'Content-Type':'application/pdf',
                    'Authorization':`Bearer ${token}`,
                    },
            responseType: 'blob',
        }).then(response => {
            // console.log(response);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            setPdfLink(url);
            setShowMyComponent(true);
        })
    }

    let verifyPassport = async(e) => {
        e.preventDefault();
        let number = {"id_number": passport, "dob": passportdob};
        await axios.post('/Passport-Details', number,
        {
            headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                    }
        }).then(data => {
            console.log(data);
            if(data.status == 200){
                if(data.data.status_code == 200){
                    passportResponse = data;
                    Swal.fire({
                        icon: 'success',
                        title: 'Passport Verified!',
                        text: `This Passport belongs to ${passportResponse.data.data.full_name}`,
                        showCancelButton: true,                    
                        confirmButtonText : "Preview",   
                        cancelButtonText: "Close",
                        confirmButtonColor: '#B2BABB'
                    }).then(function(value){
                        if(value.isConfirmed == true){
                            downloadPassword();
                        }
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid',
                        text: 'Passport does not Exists!',
                      })
                }
            }            
        }).catch(error =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong.',
              })
        })
    }

    return ( 
        <div className="passportverify">
            <div className="passporttop mb-4">
                <h2>Passport Verification</h2>
                 <div className="row g-3 mt-5">
                    <div className="col-6">
                        <input type="text" className="form-control" placeholder="Enter Passport Number" aria-label="Recipient's username" 
                        aria-describedby="basic-addon2" id='passportinput' value={passport} onChange={passInput}/>
                    </div>
                    <div className="input-group col g-3">
                        <div className="input-group-text">Date of Birth</div>
                        <input type="date" className="form-control" placeholder="Enter Date of Birth" aria-label="Recipient's username" 
                        aria-describedby="basic-addon2" id='passportdob' value={passportdob} onChange={passdobInput}/>
                        <div className="input-group-append col-2">
                            <button className="btn btn-outline-secondary" type="submit" id='passportverifybutton' onClick={verifyPassport}>Verify</button>
                        </div>
                    </div>                   
                </div>
            </div>
            {showMyComponent &&
                <div id="bottompass">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default PassportVerify;