"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("consoles");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patqFokG70q7pDgwS.0fc5dc294c5f6fae8ffd8d3a67bfe3cfbbe65a0c8b912d655e96751fdd3a3017`,
    },
  };
  const url = "https://api.airtable.com/v0/appict1RQ6xrDiRP5/Table%201";

  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear consoles

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let image = data.records[i].fields["image"];
        let name = data.records[i].fields["name"];
        let company = data.records[i].fields["company"];

        newHtml += `
        
        <div class="card domine-information" style="width: 18rem">
          <img src="${image[0].url}" class="card-img-top" alt="${name}" />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${company}</p>
            <a href="details.html?id=${data.records[i].id}" class="btn btn-primary">More Details</a>
          </div>
        </div>


        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// getAllRecords();

// function for our detail view
async function getOneRecord(id) {
  let resultElement = document.getElementById("consoles");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patqFokG70q7pDgwS.0fc5dc294c5f6fae8ffd8d3a67bfe3cfbbe65a0c8b912d655e96751fdd3a3017`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appict1RQ6xrDiRP5/Table%201/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let name = data.fields["name"];
      let company = data.fields["company"];
      let releaseDate = data.fields["releaseDate"];
      let description = data.fields["description"];
      let source = data.fields["source"];
      let unitsSold = data.fields["unitsSold"];
      let image = data.fields["image"];
      let url = "";
      if (image && Array.isArray(image)) {
        url = image[0].url;
      }

      let newHtml = `
      
      <div class="container text-center">
          <div class="row">
            <div class="col">
                <img src="${url}">
            </div>
            <div class="col">
                <h3>Name: ${name}</h3>
                <p>Company: ${company}</p>
            </div>
            <div class="col">
                <p>Release Date: ${releaseDate}</p>
                <p>Units Sold: ${unitsSold}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Description: ${description}</p>
            </div>
            <div class="col>
              <p>Source: ${source}</p>
            </div>
          </div>
      </div>
      
      `;

      resultElement.innerHTML = newHtml;
    });
}

function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); //
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }
}

main();
