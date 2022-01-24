"use strict";
/*-------------------------------------------------------------------------------*/
/* @script        - googleBooks.js                                               */
/* @date          - 22-JAN-2021                                                  */
/* @author        - David B. Mitchell                                            */
/* @description   - Performs book title search via the Google Books API.         */
/*-------------------------------------------------------------------------------*/
const googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const googleLogoUrl = "https://blog.bladecreativebranding.com/wp-content/uploads/2015/09/2015-4-Colour-Google-G-Thumbnail-300x300.png 4x";

let timer;

window.onload = function()
{
   document.querySelector("img").srcset = googleLogoUrl;
   console.clear();
}

function changeHandler(event)
{
  let { name, value } = document.querySelector("input");
  
  if (name === "searchKey")
  {
    if (value)
    {
      let query = value;
      window.clearTimeout(timer);
      timer = setTimeout
      (
        () => {
          findBooks(query);
        },
        (0.75 * 1000)
      );
    }
  }
}

function findBooks(query)
{
  let url = googleApiUrl + query.trim();

  fetch(url)
  .then(response => response.json()
  .then(data     => show(data)))
 .catch(error    => show(error));
}

function reset()
{
  document.querySelector("input").value = null;
  document.querySelector("textarea").value = null;
  document.querySelector("button").disabled = true;
}

function show(data)
{
  document.querySelector("textarea").value = JSON.stringify(data, null, 2);
  document.querySelector("textarea").scrollTop = 0;
  document.querySelector("button").disabled = false;
  log(data);
}

function log(message)
{
  let messageType = Object.prototype.toString.call(message);

  switch (messageType.toLowerCase())
  {
    case "[object string]":
      console.log(message);
      break;
    case "[object array]":
      console.info(message);
      break;
    case "[object object]":
      console.info(message);
      break;
    case "[object error]":
      console.error(message);
      break;
    default:
      console.warn(messageType, message);
  }
}
