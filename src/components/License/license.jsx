import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const LicenseVerify = () => {

    const token = Cookies.get('token');
    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');
    let licenseResponse;
    let [license,setLicense] = useState('');
    let [licenseDOB, setLicenseDOB] = useState('');
    let licenseipt = ((e) => {
                            let val = e.target.value.toUpperCase();
                            setLicense(val);
                            setShowMyComponent(false);
                            });
    let licensedobipt = ((e) => {
                                setLicenseDOB(e.target.value);
                                setShowMyComponent(false);
                                })

    let downloadLicense = () => {
        let resHeaders = licenseResponse.headers.response_token;
        axios.get(`/Verification/DLPdf/${resHeaders}`,
        {
            headers: {
                'Content-Type':'application/pdf',
                'Authorization':`Bearer ${token}`,
                },
            responseType: 'blob',
        }).then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                setPdfLink(url);
                setShowMyComponent(true);
            })
    }

    let verifyLicense = async(e) => {
        e.preventDefault();
        let number = {"id_number" : license, "dob" : licenseDOB}
        await axios.post('/Verification/DL', number, 
        {
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
                }
        }).then(data => {
            console.log(data);
            if(data.data.status_code == 200){
                licenseResponse = data;
                Swal.fire({
                    icon: 'success',
                    title: 'License Verified!',
                    text: `This License belongs to ${licenseResponse.data.data.name}`,
                    showCancelButton: true,                    
                    confirmButtonText : "Preview",   
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                }).then(function(value){
                    if(value.isConfirmed == true){
                        downloadLicense();
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid',
                    text: 'License does not Exists!',
                })
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong.',
            });
        })
    }

    return ( 
        <div className="license">
            <div className="licensetop mb-4">
                <h2>License Verification</h2>
                 <div className="row g-3 mt-5">
                    <div className="col-6">
                        <input type="text" className="form-control" placeholder="Enter License Number" aria-label="Recipient's username" 
                        aria-describedby="basic-addon2" id='licenseInput' value={license} onChange={licenseipt}/>
                    </div>
                    <div className="input-group col g-3">
                        <div className="input-group-text">Date of Birth</div>
                        <input type="date" className="form-control" placeholder="Enter Date of Birth" aria-label="Recipient's username" 
                        aria-describedby="basic-addon2" id='licensedob' value={licenseDOB} onChange={licensedobipt}/>
                        <div className="input-group-append col-2">
                            <button className="btn btn-outline-secondary" type="submit" id='licenseverifybutton' onClick={verifyLicense}>Verify</button>
                        </div>
                    </div>                   
                </div>
            </div>

            {showMyComponent &&
                <div id="bottomlicense">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default LicenseVerify;