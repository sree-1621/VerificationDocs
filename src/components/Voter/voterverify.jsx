import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';
import PdfViewer from '../pdfViewer';

const VoterVerify = () => {

    const token = Cookies.get('token')
    const [showMyComponent, setShowMyComponent] = useState(false);
    const [pdflink, setPdfLink] = useState('');
    let [voter, setVoter] = useState('');
    let voterresponse;

    let voteript = ((e) => {
        let val = e.target.value.toUpperCase()
        setVoter(val);
        setShowMyComponent(false);
    });

    let downloadVoter = () => {
        let resheaders = voterresponse.headers.response_token;
        axios.get(`/voterId/VoterPdf/${resheaders}`,
        {
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
            }
            else{
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

    let verifyVoter = async(e) => {
        e.preventDefault();
        let number = {'id_number' : voter};
        await axios.post('/voterId/voterIdVerification', number,
        {
            headers : {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${token}`,
                    }
        }).then(data => {
            if(data.data.status_code == 200){
                voterresponse = data;
                Swal.fire({
                    icon: 'success',
                    title: 'Voter ID Verified!',
                    text: `This Voter ID belongs to ${voterresponse.data.data.name}`,
                    showCancelButton: true,                    
                    confirmButtonText : "Preview",   
                    cancelButtonText: "Close",
                    confirmButtonColor: '#B2BABB'
                }).then(function(value){
                    if(value.isConfirmed == true){
                        downloadVoter();
                    }
                }) 
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid',
                    text: 'Voter ID does not Exists!',
                });
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        })
    }

    return ( 
        <div className="voterverify">
            <div className="votertop">
                <h2>Voter ID Verification</h2>
                <div className="input-group mb-3 mt-5">
                    <input type="text" className="form-control" placeholder="Enter Voter ID" aria-label="Recipient's username" 
                    aria-describedby="basic-addon2" id='voterinput' value={voter} onChange={voteript}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id='panverifybutton' onClick={verifyVoter}>Verify</button>
                    </div>
                </div>
            </div>
            {showMyComponent &&
                <div id="bottomvoter">
                    <PdfViewer data={pdflink} />
                </div>
            }
        </div>
     );
}
 
export default VoterVerify;