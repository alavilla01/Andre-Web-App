"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patqFokG70q7pDgwS.0fc5dc294c5f6fae8ffd8d3a67bfe3cfbbe65a0c8b912d655e96751fdd3a3017`,
    },
  };
  const url =
    "https://api.airtable.com/v0/appict1RQ6xrDiRP5/Table%201?maxRecords=3&view=Grid%20view";

  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array
    });
}

getAllRecords();
