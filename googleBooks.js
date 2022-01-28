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

function changeHandler(s)
{
  let { name, value } = document.querySelector(s);

  if (name === "searchKey")
  {
    if (value)
    {
      let query = value.trim();
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
  let textArea =  document.querySelector("textarea");
  textArea.value = null;

  let spinner = document.querySelector(".loader");
  spinner.classList.add("spin");
  spinner.style.display = "flex";
  
  let url = googleApiUrl + query;

  fetch(url).then
  (
    (response) =>
    {
      response.json().then
      (
        (data) => {
          show(data);
        }
      ).catch
      (
        (error) => {
          show(error);
        }
      )
    }
  ).catch
  (
    (error) => {
      show(error)
    }
  );
}

function show(data)
{
  let spinner = document.querySelector(".loader");
  spinner.classList.remove("spin");
  spinner.style.display = "none";

  let textArea =  document.querySelector("textarea");
  textArea.scrollTop = 0;
  textArea.style.borderColor = "#cfd8dc";
  textArea.style.resize = "vertical";
  textArea.value = utils.stringify.pretty(data);

  let button =  document.querySelector("button");
  button.disabled = false;

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
    case "[object number]":
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

window.onclick = function(event)
{
  let { name, value } = event.target;

  if (name === "reset")
  {
    let input = document.querySelector("input");
    input.value = null;

    let textArea =  document.querySelector("textarea");
    textArea.style.borderColor = "#d3d3d3";
    textArea.style.height = "auto";
    textArea.style.resize = "none";
    textArea.value = null;

    let button = document.querySelector("button");
    button.disabled = true;

    console.clear();
  }
}

window.onunload = function() {
  timer = null;
}

const utils =
{
  base64:
  {
    encode: function(s) { 
      return ((s) ? btoa(unescape(encodeURIComponent(s))) : null);
    },
    decode: function(s) {
      return ((s) ? atob(s) : null);
    }
  },
  stringify:
  {
    plain: function(obj) {
      return ((obj) ? JSON.stringify(obj) : null);
    },
    pretty: function(obj) {
      return ((obj) ? JSON.stringify(obj, null, 2) : null);
    }
  }
};
