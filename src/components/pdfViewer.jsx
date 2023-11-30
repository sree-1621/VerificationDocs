// import { OpenFile, Viewer  } from "@react-pdf-viewer/core";
// import { getFilePlugin } from '@react-pdf-viewer/get-file';

const PdfViewer = (props) => {
    
    var pdf = props.data;

    return ( 
        <div className="pdf">

            <object width="100%" height="500" data={pdf} type="application/pdf" >
                <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </object>

        </div>
     );
}
 
export default PdfViewer;