This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was created using React for the front-end and Express for the back-end server. The server module has been included to handle the CORS aspect of the project. Cheerio and Axios libraries have been used to do the DOM manipulation of the fetched HTML source code and for fetching data from the links (on the scraped webpage) respectively.

## Project clips
<p align="center">
  <img src="src/assets/webpage scraper.gif"/>
  </p>


## Running the application

After cloning the repository/ downloading the project files, switch to `src` folder of the project and run npm i to install all dependencies. 
`cd src`
`npm i`

Switch to the project root directory and then to the `server` directory 
`cd server`

Start and run the server. The server is configured to run on `localhost:3001`
`node index.js`

On a different Terminal tab, switch to `src` folder and run npm start to start the React web application. 
`npm start`

This automatically loads the app on the localhost. In case of any issues, open http://localhost:3000 to view it in the browser.

Enter the URL in the input field on the browser **without** the http:// or https:// prefix. Please include 'www' prefix in the input query. Eg. www.gmail.com 

The following results about the webpage corresponding to the input URL can be obtained.

   * HTML version of webpage
   * Title of the webpage
   * Headings count by each level
   * Number of internal links on webpage -- Also, can be listed and accessed 
   * Number of external links on webpage -- Also, can be listed and acesssed
   * Number of inaccessible links on webpage
   * Presence of forms on webpage

The <link> tags included in the head section of HTML, which is used to include external resources into the document have not been treated to be links in the above counts. Only <a> tags with href, which direct to another page on same domain website or resource is considered as link. 







