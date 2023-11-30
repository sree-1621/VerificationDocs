import { useState } from 'react';
import '../styles/home.css';

const Home = () => {
    return ( 
        <div className="home">
            <div className="intro">
                <h1>Welcome to Document Verify</h1><br />
                <p><b>Document verification</b> is simply the process of verifying whether a document
                     — such as a bank statement, employment record, business document, etc. — 
                     is authentic or not.  
                     Many businesses leverage document verification as a part of their broader identity verification
                      processes alongside other verification methods.<br /><br />
                    While document verification can occur in both physical and digital spaces, the term is most often used to
                     refer to online or digital document verification. In either case, document verification typically looks something like this:
                     <br /><br /></p>
                     <ul>
                        <li>The user supplies information about themselves as part of the account creation process. 
                            This information can vary from business to business but may include the individual’s name, 
                            address, date of birth, SSN, etc. 
                        </li>
                        <li>Where necessary, the user is then asked to provide one (or multiple) documents that 
                            can verify the information provided. For example, a piece of mail may be requested to 
                            verify the individual’s address, and a birth certificate may be requested to verify the 
                            individual’s age and date of birth.
                        </li>
                        <li>The provided document is verified to ensure that it is authentic and not forged.
                        </li>
                        <li>If the document is successfully verified, it can act as evidence that the information 
                            provided by the individual is truthful.
                        </li>
                     </ul>
            </div>
        </div>
     );
}
 
export default Home;