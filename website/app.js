/* Global Variables */
// Personal API key for OpenWeatherMap API
const apiKey = ",us&appid=168236975dd7baaa315a5efdefc5c2f6&units=imperial";
// The URL to get the information from API
const api = "https://api.openweathermap.org/data/2.5/weather?zip=";
// User entered Zipcode
const zip = document.querySelector("#zip");
// User entered feelings
const feelings = document.querySelector("#feelings");
// The div to post the temperature to 
const tempreture = document.getElementById("temp");
// The button to generate the data on click
const button = document.querySelector("button");
let url;
let dataf;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//to fetch the url to get the tempreture 
const getTemp = async (url) => {
  const req = await fetch(url);
  try {
    const data = await req.json();
    const temp = data["main"]["temp"];
    const feel = feelings.value;
    newDate = newDate;
    // To save all the data in one variable
    dataf = {
      temp,
      content: feel,
      date: newDate,
    };
    await postData(dataf, "/postData");
    return dataf;
  } catch (error) {
    console.log("error");
    alert("invalid zip");
  }
};
// To post the data to my server
const postData = async (data, url) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    res.json().then(() => retrieveData());
  } catch (error) {
    console.log("error");
    alert("invalid zip");
  }
};
// To get all the data from my server
const retrieveData = async () => {
  const request = await fetch("/getAll");
  try {
    // Transform into JSON
    request.json().then((data) => {
      // To print the data on the website
      document.getElementById("temp").innerHTML = Math.round(data.temp) + "degrees";
      document.getElementById("content").innerHTML = data.content;
      document.getElementById("date").innerHTML = data.date;
    });
    // appropriately handle the error
  } catch (error) {
    console.log("error");
    alert("invalid zip");
  }
};
// To get the url upon clicking the generate button
button.addEventListener("click", () => {
  url = `${api}${zip.value}${apiKey}`;
  getTemp(url);
});