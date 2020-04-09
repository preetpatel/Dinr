// import fetch from 'cross-fetch';
// import express from 'express';

const express = require('express');
const fetch = require('cross-fetch');

let router = express.Router();
const baseAddress = "https://developers.zomato.com/api/v2.1";


router.get(`/restaurant/:restaurantID`, (req: { params: { restaurantID: any; }; }, res: { json: (arg0: any) => void; }) => {
    console.log("server here")
    
    fetch(`${baseAddress}/restaurant?res_id=${req.params.restaurantID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user-key": "98334e87fff8e40beb83e1609e380766"
        }
    })
    .then((data: any) => {
        res.json(data);
        console.log(data);
        console.log("yep");
    });

});


router.get(`/cuisines/:cityID/:lat/:lon`, (req: { params: { cityID: any; lat: any; lon: any; }; }, res: { json: (arg0: any) => any; }) => {

    fetch(`${baseAddress}/cuisines?city_id=${req.params.cityID}&lat=${req.params.lat}&lon=${req.params.lon}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user-key": "98334e87fff8e40beb83e1609e380766"
        }
    })
    .then((data: any) => res.json(data));

});

 export = router;

