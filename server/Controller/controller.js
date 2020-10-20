'use strict';

const fetch = require("node-fetch");
const cheerio = require('cheerio');
const axios = require('axios');
const isRelativeUrl = require('is-relative-url');
function getSourceCode (req,res) {
//try {
console.log(req.body)
const {input} = req.body;
console.log(input, "input from front end on server")
//res.send("response from server on res.send")
fetch('https://' + input).then(response => response.text())
//.then(data => res.send(data));
        // The API call was successful!
//}
//console.log(data,"data")
//res.send(data,"data")
//  .then(function (html) {

// //         // Convert the HTML string into a document object
//         var DomParser = require('dom-parser');
//         var parser = new DomParser();
//         var doc = parser.parseFromString(html, 'text/html');
//          console.log("inside server side fetch")
//         console.log(doc);
//          res.send(doc)
// }).catch(function (err) {
//         // There was an error
//         console.warn('Something went wrong.', err);
// })
// } catch (e) {
//     console.log('Error', e); //eslint-disable-line no-console
//     res.sendStatus(500);

.then(function(html) {
    var DomParser = require('dom-parser');
            var parser = new DomParser();
     var doc = parser.parseFromString(html, 'text/html');
    const $ = cheerio.load(html)
    let main = $('main')
    let fel = main.children().first()
    console.log("first element of doc", fel)
    //console.log(doc)

    //To get the title of the webpage whose URL is entered as input
   const title =  $('title').text()
   const meta = $('meta[name="description"]').val()
   console.log(title, "this is the title");
   console.log(meta, "this is the meta content");

   //To get the number of headings by level
   const h1selector = $('h1')
   const h2selector = $('h2')
   const h3selector = $('h3')
   const h4selector = $('h4')
   const h5selector = $('h5')
   const h6selector = $('h6')
   const headings = {h1: h1selector.length, h2: h2selector.length,h3: h3selector.length,
    h4: h4selector.length,h5: h5selector.length,h6: h6selector.length}
    console.log(headings);
var href;
var inlink = 0, exlink =0 ;
const links = $('a');
var linksList = [];
var inlinksList = []
var exlinksList = []
    $('a').each((i,link) => {
        if (link.attribs.href && link.attribs.href.slice(8) !== input) {
        linksList.push(link);
        href = link.attribs.href;
       // if (href.slice(0,4) === 'http') {
        console.log(i,href,href.slice(8,(8+input.length)))
      //Using two conditions to identify internal links-- first where the domain name is same as the input url
      //second case, which is to identify the navigation links   
        if ((href.slice(8,(8+input.length)) === input) || (href.slice(0,4)!== 'http')) {
            inlinksList.push(href);
            inlink++;
        } else {
           exlinksList.push(href);
           exlink++;
        }
    }
    //}
    })
    console.log("links", links.length)
    // console.log("internal links", inlink, inlinksList)
    // console.log("external links", exlink, exlinksList)
    console.log("internal links", inlink, inlinksList)
    console.log("external links", exlink, exlinksList)

    //To check if there is a form tag on the source code
    const form = $('form')
    var formStatus = 'No';
    if (form.length > 0) {
        formStatus = 'Yes';
        console.log("there is a form on this page")
    } else {
        console.log("there is no form on this page")

    }
  
    //To check for links which are inaccessible
var accessibleLinks = 0;
var inaccessibleLinks = 0;
var value;
var finalResponse = {}
   async function checkLinks(links) {
       for (let link of links) {
           try {
               let resp = {};
               if (isRelativeUrl($(link).attr('href'))) {
                   resp = await axios.get('https://' + input + '/'+ $(link).attr("href"));
                   accessibleLinks++;
                   //console.log(accessibleLinks,inaccessibleLinks)
               } else {
                   resp = await axios.get($(link).attr("href"));
                   accessibleLinks++;
                   //console.log(accessibleLinks,inaccessibleLinks)
               }

               console.log(
                   "Valid Url: " + $(link).attr("href")+ " returned status: " + resp.status
               );
           } catch (err) {
               inaccessibleLinks++;
               console.log("Not a valid URL: " + 'http://' + input + '/'+ $(link).attr("href"));
           }
       }
       console.log(accessibleLinks,"accessible",inaccessibleLinks)
       //value =  inaccessibleLinks;
      // console.log("value of return from function of inaccessible links", value)
      finalResponse.title = title;
      finalResponse.Headings = headings;
      finalResponse.Internal = inlink;
      finalResponse.External = exlink;
      finalResponse.Inaccessible = inaccessibleLinks;
      finalResponse.Form = formStatus;
      finalResponse.InternalLinks = inlinksList;
      finalResponse.ExternalLinks = exlinksList;
      
//       {
//         "title": title,
//         "Headings": headings,
//         "Internal": inlink,
//         "External": exlink,
//         "Inaccessible" : inaccessibleLinks,
//         "Form": formStatus
//    }
  
  res.send(finalResponse)
}
checkLinks(linksList);

   //Creating a response object that can be sent to front end for the display of the results of the scraped URL

//    linksList.map(async function (link) {
//        try {
//            if (isRelativeUrl($(link).attr('href'))) {
//         resp = await axios.get('https://' + input + '/'+ $(link).attr("href"));
//         accessibleLinks++;
//             }  else {
//                                   resp = await axios.get($(link).attr("href"));
//                                     accessibleLinks++;   
//          }
//          console.log(
//                        "Valid Url: " + $(link).attr("href")+ " returned status: " + resp.status
//                           );
//        }
//             catch (err) {
//                 inaccessibleLinks++;
//            console.log("Not a valid URL: " + 'http://' + input + '/'+ $(link).attr("href"));
//             } 
//    })
//    .then(function (inaccessibleLinks) {
//      finalResponse = {
//         "title": title,
//         "Headings": headings,
//         "Internal": inlink,
//         "External": exlink,
//         "Inaccessible" : value,
//         "Form": formStatus
//     }
//    })
 
//  console.log(finalResponse)
//    res.send(finalResponse)
})


//})

}

module.exports = {getSourceCode};
