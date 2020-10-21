This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was created using React for the front-end and Express for the back-end server. The server module has been included to handle the CORS aspect of the project. Libraries as Cheerio and Axios have been used to do the DOM manipulation of the fecthed HTML source code and for fetching data from the links (on the scraped webpage) respectively.


# Running the application

After cloning the repository/ downloading the project files, move to src folder of the project and run npm i to install all dependencies. 

Move to src folder of the project on terminal or on code editor and run npm start to start the web application. 
This automatically loads the app on the localhost. In case of any issues, open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

Enter the URL in the input field on the browser (without the protocol part of URL for convenience purpose. Pls Note: sub-domain name, if any (i.e 'www.') needs to be included in the input query. The following results about the webpage corresponding to the input URL can be obtained.

   * HTML version of webpage
   * Title of scraped webpage
   * Headings by level
   * Internal links on webpage -- Also, can be listed and accessed 
   * External links on webpage -- Also, can be listed and acesssed
   * Inaccessible links on webpage
   * Presence of forms on webpage

The link tags included in the head section of HTML, which is used to include external resources into the document have not been treated to be links in the above counts. Only <a> tags with href, which direct to another page on same domain website or resource is considered as link. 







