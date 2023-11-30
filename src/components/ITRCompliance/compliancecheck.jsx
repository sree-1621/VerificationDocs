import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const ITRCompliance = () => {

    const token = Cookies.get('token');
    let ITRresponse;
    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');

    let [itr, setItr] = useState('');
    let itrIpt = ((e) => {
        setItr(e.target.value);
        setShowMyComponent(false);
    })

    let downloadITR = () => {
        let resHeaders = ITRresponse.headers.response_token;
        axios.get(`/Verification/ITRPdf/${resHeaders}`, {
            headers:{
                'Content-Type':'application/pdf',
                'Authorization':`Bearer ${token}`,
            },
            responseType: 'blob',
        }).then(response => {
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
        }).catch(error =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        });
    }

    let verifyITR = async(e) => {
        e.preventDefault();
        let number = {"pan_number" : itr};
        await axios.post('/Verification/ITR', number, {
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,}
        }).then(data => {
            console.log(data);
            if(data.data.status_code == 200){
                ITRresponse = data;
                Swal.fire({
                    icon: 'success',
                    title: 'Compliant!',
                    text: `The PAN and Aadhar is linked and is Compliant`,
                    showCancelButton: true,                    
                    confirmButtonText : "Preview",   
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                }).then(function(value){
                    if(value.isConfirmed == true){
                        downloadITR();
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid',
                    text: 'PAN does not exists!',
                  })
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Invalid...',
                text: 'Provide Valid PAN number!',
              })
        })
    }

    return ( 
        <div className="itrcompliance">
            <div className="itrtop">
                <h2>Income Tax Return (ITR) Compliance Check</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter PAN Number" value={itr} onChange={itrIpt} aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='itrinput' />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id='itrcheckbutton' onClick={verifyITR}>Verify</button>
                    </div>
                </div>
            </div>
            {showMyComponent &&
                <div id="bottomitr">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default ITRCompliance;