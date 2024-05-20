console.log("Test if setupProxy.js is loaded");
const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
module.exports = function (app) {
  console.log("Setting the Proxy Middleware....");
   
  let targetUrl="";
  const production = false;
  const semiprod   = true;
  const local      = false;

  //  Local Development
  if (local === true && semiprod === false && production === false){
    targetUrl = 'http://51.222.43.180:8901';
  }

  //  Semi Production
  else if(semiprod === true && local === false && production === false){
    targetUrl = 'http://verificationsemiapi.astiinfotech.com';
  }

  // Production URL
  else if(production === true && local === false && semiprod === false){
    targetUrl = 'https://verificationapi.astiinfotech.com';
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