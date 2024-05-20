# Document Verify

This project is the User interface which is implemented for the project Document Verify with intergrating the APIs from [Asti-Document-Verification]

### Learn More

`Token Page` : Very first page when the page gets load [Landing Page](src\components\login\tokenpage.jsx)
enter a valid token so that it will gets logged into the Main Landing Page.

`Home Page` : Once after login with token, the landing page will be Home page [Home]

`Router` : All the internal components are imported in this page [Router](src\components\router.jsx)

`App` : The whole application components are inported here [App](src\App.js)

### How to get the corresponding file

The routing part is defined in the router.jsx [Router](src\components\router.jsx)

Copy and paste the path that you need to find after pressing  [ctrl+F] , You'll find the corresponding component for the same

### How to integrate new backend service

1. First create a proxy in the setupProxy.js file for replacing the server url with service url [proxy](src\setupProxy.js)
2. In the setup file till the mentioned part of the api, the proxy will replace and use that end point and add the rest of the api to the request in the corresponding API.