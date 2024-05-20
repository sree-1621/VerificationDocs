import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const DinVerify = () => {
    
    const token = Cookies.get('token');
    let DINresponse;
    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');
    let [din,setDin] = useState('');
    let dinIpt = ((e) => {
        let val = e.target.value.toUpperCase();
        setDin(val);
        setShowMyComponent(false)
    })

    let downloadDin = () => {
        let resHeaders = DINresponse.headers.response_token;
        axios.get(`/DinPdf/${resHeaders}`,
        {
            headers:{
                'Content-Type':'application/pdf',
                'Authorization':`Bearer ${token}`,
            },
            responseType: 'blob',
        }).then(response => {
            if(response.status == 200){
                let dinnumber = DINresponse.data.data.din_number;
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

    let verifyDin = async(e) => {
        e.preventDefault();
        let number = {'id_number' : din};
        await axios.post(`/getDINDetails`, number,{
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,}
        })
        .then(data => {
            if(data.status == 200){
                if(data.data.status_code == 200){
                    DINresponse = data;
                    console.log(data);
                    Swal.fire({
                        icon: 'success',
                        title: 'DIN Verified!',
                        text: `This DIN belongs to ${DINresponse.data.data.full_name}`,
                        showCancelButton: true,                    
                        confirmButtonText : "Preview",   
                        cancelButtonText: "Close",
                        confirmButtonColor: '#B2BABB'
                    }).then(function(value){
                        if(value.isConfirmed == true){
                            downloadDin();
                        }
                    })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid',
                        text: 'DIN does not Exists!',
                      })
                }
            }
        })
        .catch(error => 
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid...',
                    text: 'Please enter 8 digit valid DIN number!',
                  })
            })
    }
    
    return ( 
        <div className="dinlite">
            <div className="dintop">
                <h2>Director Identification Number (DIN) Verification</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter DIN Number" value={din} onChange={dinIpt} aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='dininput' />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id='dinverifybutton' onClick={verifyDin}>Verify</button>
                    </div>
                </div>
            </div>
            {showMyComponent &&
                <div id="bottomdin">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default DinVerify;