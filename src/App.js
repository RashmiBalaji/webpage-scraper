import React, {useState} from 'react';
import './App.css';

//const load = require('./assets/Loader.gif')

function App() {
  const [input, setInput] = useState('');
  //const [html, setHTML] = useState('');
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

  function passURL (url) {
    console.log(JSON.stringify(url),"json stringify of input before post")
    fetch(`${baseURL}/url`, {
      method: 'POST',
     // mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(url)
    })
    // .then(response => {
    // response.json()
    //   .then(res => {
    //   console.log("back from server")
    //   console.log(res.rawHTML)
    //   setHTML(res.rawHTML)
    //  })
   
    // })
    .then(response => {
      response.json()
      .then(res =>{
        console.log("response from server")
        console.log(res)
        setTitle(res.title)
       setHeadings(res.Headings)
       setInternalLinks(res.InternalLinks)
       setExternalLinks(res.ExternalLinks)
        setInternalLinksC(res.Internal)
        setExternalLinksC(res.External)
        setInacess(res.Inaccessible)
        setForm(res.Form)
        
       
        
      } )
    })
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    
    console.log(input)
  }
  function handleSubmit (e) {
    e.preventDefault();
    passURL({input});
    setLoader(true);
    setTitle('')
    console.log("input is", input)
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
  return (
    <>
    <div class = "header" id="myHeader">
   
    <a href="https://fontmeme.com/fonts/aliandra-font/"><img src="https://fontmeme.com/permalink/201021/6ab07ccef3fa5cde287c0cf6424ea09c.png" alt="aliandra-font" border="0"/></a>  </div>
      <form id = "search" onSubmit={handleSubmit}>
    <input type="text" id = "input" placeholder="Enter your URL here" onChange={handleInputChange}></input>
        <button id= "submit" type="submit">Submit</button>
    </form>
    {/* {html.length > 0 && (
    <div className="html-content">
        <h3>HTML Content of entered URL</h3>
      {html}
    </div>
    )} */}
    {loader && !title && (
      <>
      <div className= "loading">
      <h3 className="loader">Fetching...</h3>
      {/*<img src={require('./assets/loader-image.png')} height = "100" width= "100" alt="loading.."/>*/}
      <i class="fa fa-spinner fa-spin fa-5x fa-fw" aria-hidden="true" height="100" width="100"></i>
      </div>
      </>
    )}
    {title && (
    <div className="output-content">
      <table>
        <tr>
          <th>Property</th>
          <th>Value from webpage</th>
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
 <button onClick= {showInternalLinks}>Show Links</button>
 </td> 
 </tr>
 <tr>
<td>External links on webpage</td>
 <td>{externalLinksC}
 <button onClick= {showExternalLinks}>Show Links</button>
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

    {showInt &&  title && (
      <div class = "links-display">
        List of Internal Links
       <ul>
        {internalLinks.map(el => {
          return (
            <li>{el}</li>

          )
        })}
        </ul>
      </div>
    )}
     {showExt &&  title && (
      <div class = "links-display">
        List of External Links
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
