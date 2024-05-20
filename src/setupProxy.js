console.log("Test if setupProxy.js is loaded");
const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
module.exports = function (app) {
  console.log("Setting the Proxy Middleware....");
   
  app.use(
    '/proxyforapi',
    createProxyMiddleware({
      target: 'proxy IP',
      changeOrigin: true,

// -------- NOTES ----------------- 
// For Spring Boot Backend
      // Example : Target API is : https://www.xyz/abc/proxyforapi
      //          Then Proxy IP will be '/proxyforapi'
      //          If local ip is 'http://10.10.10.4658:8081'

      //  So instead of calling the "http://10.10.10.4658:8081//proxyforapi"
      //  it will call "https://www.xyz/abc/proxyforapi"

      // This is basically for proxying the local ip with the server ip which we want to connect on
      //  For target URL -> Use Valid IP;
    }),
  )

  let targetUrl="";
  const production = false;
  const semiprod   = false;
  const local      = true;

  if(local == true && semiprod == false && production == false){
    targetUrl = 'local server IP';
  }
  else if(local == false && semiprod == true && production == false){
    targetUrl = 'Semi production Server IP';
  }
  else if(local == false && semiprod == false && production == true){
    targetUrl = 'Production Server IP';
  }

  // Proxy For PAN, License
  app.use(
    '/Verification',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    }),
  )
//------------------------------------------------------------
  
  // Proxy For DIN
  app.use(
    '/getDINDetails',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  );
  app.use(
    '/DinPdf',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  );
//------------------------------------------------------------  

  // Proxy for Passport
  app.use(
    '/Passport-Details',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  )
  app.use(
    '/PassportDetailsPDF',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  )
//------------------------------------------------------------ 

  // Proxy for Voter ID
  app.use(
    '/voterId',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  )
//------------------------------------------------------------  
  
  // Proxy For Aadhar
  app.use(
    '/Validation',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    }),
  )
}