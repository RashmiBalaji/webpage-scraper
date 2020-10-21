import React, {useState} from 'react';
import './App.css';


function App() {
  const [input, setInput] = useState('');
  const [version, setVersion] = useState('');
  const [title, setTitle]= useState('');
  const [headings,setHeadings] = useState('');
  const [internalLinks, setInternalLinks] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [internalLinksC, setInternalLinksC] = useState('');
  const [externalLinksC, setExternalLinksC] = useState('');
  const [showInt, setShowInt] = useState(false)
  const [showExt, setShowExt] = useState(false)
  const [form, setForm] = useState('');
  const [inaccess, setInacess] = useState ('');
  const [loader, setLoader] = useState(false);
  const baseURL = 'http://localhost:3001';


  //Function that communicates to back-end server, where the entered URL is fetched and webpage scraped to get required details
  //Promise chained with then to receive the response object from server and grab the details for rendering
  function passURL (url) {
    fetch(`${baseURL}/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(url)
    })
    
    .then(response => {
      response.json()
        .then(res =>{
          setVersion(res.Version)
          setTitle(res.title)
          setHeadings(res.Headings)
          setInternalLinks(res.InternalLinks)
          setExternalLinks(res.ExternalLinks)
          setInternalLinksC(res.Internal)
          setExternalLinksC(res.External)
          setInacess(res.Inaccessible)
          setForm(res.Form)
        })
    })
  }

  //Function to handle an entry in the input field
  function handleInputChange(e) {
    setInput(e.target.value);
    setLoader(false);
  }

  //Function which is called on input form submit, which triggers passURL function to back-end fetch
  function handleSubmit (e) {
    e.preventDefault();
    passURL({input});
    setLoader(true);
    setTitle('')
    setInput('');
    setShowInt(false)
    setShowExt(false)
  }

  function showInternalLinks () {
   setShowInt(true)
  }

  function showExternalLinks () {
    setShowExt(true)
   }

   //Rendering of data on application
  return (
    <>
    <div class = "header" id="myHeader">
      <a href="https://fontmeme.com/fonts/aliandra-font/">
        <img src="https://fontmeme.com/permalink/201021/6ab07ccef3fa5cde287c0cf6424ea09c.png" alt="aliandra-font" border="0"/>
      </a>  
    </div>

    <div id = "search">
      <form onSubmit={handleSubmit}>
        <input type="text" id = "input" placeholder="Enter your URL here" onChange={handleInputChange}></input>
        <button id= "submit" type="submit">Submit</button>
      </form>
    </div>

   {/*To load fetcher icon during processing data */}
    {loader && !title && (
      <>
      <div className= "loading">
        <h3 className="loader">Fetching...</h3>
        <i class="fa fa-spinner fa-spin fa-5x fa-fw" aria-hidden="true" height="100" width="100"></i>
      </div>
      </>
    )}

    {/*Rendering of data in table format */}  
    {title && (
      <div className="output-content">
        <table>
          <tr>
            <th>Property</th>
            <th>Value from webpage</th>
          </tr>
          <tr>
            <td>HTML Version</td>
            <td>{version}</td> 
          </tr>
          <tr>
            <td>Title of webpage:</td>
            <td>{title}</td> 
          </tr>
          <tr>
            <td>Headings by level: </td>
              <td>
                <ul className = "heading-list">
                  {Object.keys(headings).map((key,value) => {
                    return (
                    <li>{key} : {headings[key]}</li>
                    )
                  })
                  }              
                </ul>
              </td>
          </tr>
          <tr>
            <td>Internal links on webpage </td>
            <td>{internalLinksC}
              <button onClick= {showInternalLinks}>Show</button>
            </td> 
          </tr>
          <tr>
            <td>External links on webpage</td>
            <td>{externalLinksC}
              <button onClick= {showExternalLinks}>Show</button>
            </td> 
          </tr>
          <tr>
            <td>Inaccessible links on webpage </td>
            <td>{inaccess}</td> 
          </tr>
          <tr>
            <td>Forms on page </td>
            <td>{form}</td> 
          </tr>
        </table>    
      </div>
    )}

  {/* To render list of internal and external links when user submits the show button*/}
    {showInt &&  title && (
      <div class = "links-display">
        <h3 style={{textDecoration:'underline'}}>List of Internal Links</h3>
        <ul>
        {internalLinks.map(el => {
          return (
            <li><a href={el}>{el}</a></li>
          )
        })}
        </ul>
      </div>
    )}

     {showExt &&  title && (
      <div class = "links-display">
        <h3 style={{textDecoration:'underline'}}>List of External Links</h3>
        <ul>
        {externalLinks.map(el => {
          return (
            <li><a href={el}>{el}</a></li>

          )
        })}
        </ul>
      </div>
    )}
    </>
  );
}

export default App;
