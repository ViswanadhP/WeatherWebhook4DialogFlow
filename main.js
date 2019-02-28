"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//Weather Function calls
var apiKey = '180aefc3fc3f2e65cb6f727f23b64f0d';
var result;

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/weather", function(req, res) {
  console.log('recieved a post request for weather');
  var city =
  req.body.result &&
  req.body.result.parameters &&
  req.body.result.parameters.cityName
    ? req.body.result.parameters.cityName
    : "Delhi";
  if (!req.body) 
      return res.sendStatus(400);
  res.setHeader('Content-Type','application/json');
  console.log("Geocity input recieved:"+city);   
  if (!req.body) 
      return res.sendStatus(400);
  res.setHeader('Content-Type','application/json');       
      var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apiKey;
      console.log('The Url is '+url);
      var w='';
      request(url,function cb(err, response, body){
        if(err){
          console.log('cb error:', error);
        } else {
          let weather = JSON.parse(body)
          let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          console.log('cb:'+message);
          console.log('cb weather:'+weather.main.temp);
          //console.log('cb response:'+response);
          console.log('cb body:'+body);     
          w= message;
      
      /*
          //var w = getWeather(city);
      console.log('w: '+weather.main.temp);
      let response = ""; //Default response from webhook to show its working
    
      let responseObj = {
          "fulfillmentText":response
          ,"fulfillmentMessages":[{"text":{"text": [w] }}]
          ,"source":""
      };
  return res.json(responseObj);  
  */
  return res.json({
    speech: w,
    displayText: w,
    source: "webhook-weather-sample"
  });
  
}
});
  /*
  //new code
  const request = require('request');
const argv = require('yargs').argv;
let apiKey = '*****************************';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
  });
  */

    
});

/*
function cb(err, response, body){
            if(err){
                        console.log('error:',err);
            }
            var weather = JSON.parse(body);
            console.log('weather Json '+weather)
            if(weather.message === 'city not found')
            {
                        result = 'Unable to get weather '+ weather.weather.description;
            }
            else{
                        result = 'Right now its '+ weather.description + ' degree with ';
            }
}
*/


//*Get Weather*//
function getWeather(city){
  //var response = undefined;
  let response ='hello';
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apiKey;
  console.log('In getWeather function and the Url is '+url);
  
  request(url,function cb(err, response, body){
    if(err){
      console.log('cb error:', error);
    } else {
      let weather = JSON.parse(body)
      let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      console.log('cb:'+message);
      console.log('cb weather:'+weather.main.temp);
      console.log('cb response:'+response);
      console.log('cb body:'+body);     
      return weather.main.temp; 
    }
  });
  /*while(response ===undefined){
              require('deasync').runLoopOnce();
              console.log('In getWeather function while loop ');
              }
              */
  console.log('In getWeather function before return ');
  console.log('in getweather return result :'+ response);
  
} 

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
