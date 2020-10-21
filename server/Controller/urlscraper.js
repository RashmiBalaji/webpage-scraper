'use strict';

const fetch = require("node-fetch");
const cheerio = require('cheerio');
const axios = require('axios');
const isRelativeUrl = require('is-relative-url');

//Function to receive input URL from front end and get the source code of the same using fetch npm package, which is a 
//promise, which further chained to grab the essential details using library Cheerio
function getSourceCode (req,res) {
const {input} = req.body;

fetch('https://' + input)
.then(response => response.text())
.then(function(html) {
    //To grab HTML version of scraped webpage
     let htmldeclaration = html.substr(0, html.indexOf('>'))
     let version = '';
     if (htmldeclaration.slice(0,9).trim() === '<!DOCTYPE') {
         if (htmldeclaration.trim() === '<!DOCTYPE html') {
          version += 'HTML 5'
     } else {
         var inner = htmldeclaration.substr(htmldeclaration.indexOf('"')).search('HTML')
         version += htmldeclaration.substr(inner, 8)
     }
     } else {
         if (htmldeclaration.slice(0,5).trim() === '<?xml') {
             version += 'XHTML'
         } else {
             version += 'In Quirks mode'
         }
     }
     
    const $ = cheerio.load(html);

    //To get the title of the scraped webpage 
   const title =  $('title').text()

   //To get the number of headings by level
   const h1selector = $('h1')
   const h2selector = $('h2')
   const h3selector = $('h3')
   const h4selector = $('h4')
   const h5selector = $('h5')
   const h6selector = $('h6')
   const headings = {h1: h1selector.length, h2: h2selector.length,h3: h3selector.length,
    h4: h4selector.length,h5: h5selector.length,h6: h6selector.length}
    
    let href;
    let inlink = 0, exlink =0 ;
    const links = $('a') 
    var linksList = [];
    var inlinksList = []
    var exlinksList = []
    $('a').each((i,link) => {
        if (link.attribs.href && link.attribs.href.slice(8) !== input + '/') {
        linksList.push(link);
        href = link.attribs.href;
      //Using three conditions to identify internal links-- first where the domain name is same as the input url
      //second case, which is to identify internal navigation links and third one, internal links with additional sub-domain name cases 
        if ((href.slice(8,(8+input.length)) === input) || (href.slice(0,4)!== 'http') || (href.slice(12,(12+input.length))=== input)) {
            if (href.slice(8,(8+input.length)) === input) {
                inlinksList.push(href);
            } else if (href.slice(0,4)!== 'http') {
                inlinksList.push('https://' + input + href);
            } else if (href.slice(12, (12+input.length)) === input) {
                inlinksList.push(href);
            }
            inlink++;
        } else {
           exlinksList.push(href);
           exlink++;
        }
    } 
    })


    //To check if there is a form tag on the source code
    const form = $('form')
    var formStatus = 'No';
    if (form.length > 0) {
        formStatus = 'Yes';
    } 
  
    //To check for links which are inaccessible
    let accessibleLinks = 0;
    let inaccessibleLinks = 0;
    let finalResponse = {}
        async function checkLinks(links) {
            for (let link of links) {
                try {
                    let resp = {};
                    if (isRelativeUrl($(link).attr('href'))) {
                        if ($(link).attr("href").slice(0,1) === '/') {
                            resp = await axios.get('https://' + input + $(link).attr("href"));
                        } else {
                            resp = await axios.get('https://' + input + '/'+ $(link).attr("href"));
                        }
                        accessibleLinks++;
                    } else {
                        resp = await axios.get($(link).attr("href"));
                        accessibleLinks++;
                    }
                        console.log("Valid Url: " + $(link).attr("href")+ " returned status: " + resp.status);
                    } catch (err) {
                        inaccessibleLinks++;
                        console.log("Not a valid URL: " + 'http://' + input + '/'+ $(link).attr("href"));
                    }
            }            
       
        //Populating the response object with the grabbed data from the scraped webpage, which is send to front-end for rendering
        finalResponse.Version = version;
        finalResponse.title = title;
        finalResponse.Headings = headings;
        finalResponse.Internal = inlink;
        finalResponse.External = exlink;
        finalResponse.Inaccessible = inaccessibleLinks;
        finalResponse.Form = formStatus;
        finalResponse.InternalLinks = inlinksList;
        finalResponse.ExternalLinks = exlinksList;
  
        res.send(finalResponse)
        }

    checkLinks(linksList);
})
}

module.exports = {getSourceCode};
