import Cookies from 'js-cookie';
import '../../styles/panlite.css'
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const Panlite = () => {
    const token = Cookies.get('token')
    let [pan, setPan] = useState('');
    let panipt = ((e) => {
                            let val = e.target.value.toUpperCase();
                            setPan(val);
                            setShowMyComponent(false);
                        });
    let PANresponse;
    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');

    let downloadPan = async () => {
        // console.log("Clicked Confirm Button");
        let resheaders = PANresponse.headers.response_token;
        await axios.get('/Verification/PanPdf/'+resheaders, {
            headers:{
                'Content-Type':'application/pdf',
                'Authorization':`Bearer ${token}`,
            },
            responseType: 'blob',
        }).then(response => {
            // console.log(response.data);
            if(response.status == 200){
                let pannumber = PANresponse.data.data.pan_number;
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                // const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                setPdfLink(url);
                setShowMyComponent(true);
                // url.setAttribute('download', `pan${pannumber}.pdf`); //or any other extension
                // document.body.appendChild(link);
                // link.click();
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        }).catch(error =>{
            // console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        });
    }

    let verifyPAN = async (e) => {
            e.preventDefault();
            let number = {id_number:pan};
            await axios.post(`/Verification/Pan`, number,{
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,}
            })
            .then(data => {
                if(data.status == 200){
                PANresponse = data;
                if(PANresponse.data.message == "Invalid Data !"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid',
                        text: 'PAN Number does not Exists!',
                      })
                }
                else{
                Swal.fire({
                    icon: 'success',
                    title: 'PAN Verified!',
                    text: `This PAN belongs to ${PANresponse.data.data.full_name}`,
                    showCancelButton: true,                    
                    confirmButtonText : "Preview",   
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                }) .then(function(value){
                    if(value.isConfirmed == true){
                        downloadPan();
                    }
                }) 
                }} 
            })
            .catch(error => 
                {
                    // console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                });
    };
    

    return ( 
        <div className="panlite">
            <div className="pantop">
                <h2>Permanent Account Number (PAN) Verification</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter PAN Number" aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='paninput' value={pan} onChange={panipt} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id='panverifybutton' onClick={verifyPAN}>Verify</button>
                    </div>
                </div>
            </div>
            {showMyComponent &&
                <div id="bottompan">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default Panlite;