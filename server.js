const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("weather", { serveroutput: "" });
});

app.post("/", (req, res) => {
    let cityName = req.body.loc;
    
    let url = `http://api.weatherapi.com/v1/current.json?key=d6131e2cbd854f2ba8962714242207&q=${cityName}&aqi=no`;

    axios
        .get(url)
        .then((response) => {
            const temperature = response.data.current.temp_c;
            res.render("weather", {
                serveroutput: `Current temperature in ${cityName}: ${temperature}°C`,
            });
        })
        .catch((error) => {
            console.error("Error fetching data from API:", error.message);
            res.render("weather", {
                serveroutput: "Error fetching data from API",
            });
        });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
