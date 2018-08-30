const expect = require('expect')
const fs = require('fs')
const jsdom = require('jsdom')
const path = require('path');

const dummyData = [{"temperature":79.34,"time":1532037600},{"temperature":78.49,"time":1532041200},{"temperature":77.12,"time":1532044800},{"temperature":75.1,"time":1532048400},{"temperature":73.15,"time":1532052000},{"temperature":71.66,"time":1532055600},{"temperature":70.72,"time":1532059200},{"temperature":70.25,"time":1532062800},{"temperature":69.88,"time":1532066400},{"temperature":69.27,"time":1532070000},{"temperature":68.51,"time":1532073600},{"temperature":68.06,"time":1532077200},{"temperature":68.13,"time":1532080800},{"temperature":69.71,"time":1532084400},{"temperature":73.01,"time":1532088000},{"temperature":75.06,"time":1532091600},{"temperature":77.22,"time":1532095200},{"temperature":79.22,"time":1532098800},{"temperature":80.87,"time":1532102400},{"temperature":82.03,"time":1532106000},{"temperature":82.65,"time":1532109600},{"temperature":82.28,"time":1532113200},{"temperature":81.5,"time":1532116800},{"temperature":80.22,"time":1532120400},{"temperature":78.84,"time":1532124000},{"temperature":77.52,"time":1532127600},{"temperature":76.15,"time":1532131200},{"temperature":74.67,"time":1532134800},{"temperature":73.06,"time":1532138400},{"temperature":71.76,"time":1532142000},{"temperature":70.76,"time":1532145600},{"temperature":70,"time":1532149200},{"temperature":69.32,"time":1532152800},{"temperature":68.32,"time":1532156400},{"temperature":67.49,"time":1532160000},{"temperature":66.97,"time":1532163600},{"temperature":67.32,"time":1532167200},{"temperature":68.74,"time":1532170800},{"temperature":70.67,"time":1532174400},{"temperature":72.03,"time":1532178000},{"temperature":73.8,"time":1532181600},{"temperature":75.12,"time":1532185200},{"temperature":76.76,"time":1532188800},{"temperature":78.14,"time":1532192400},{"temperature":78.74,"time":1532196000},{"temperature":77.78,"time":1532199600},{"temperature":76.43,"time":1532203200},{"temperature":74.64,"time":1532206800},{"temperature":73.57,"time":1532210400}]


describe('weatherChart', () => {
  before(done => {
    const html = path.resolve(__dirname, '..', 'index.html')
    const weatherChart = path.resolve(__dirname, '../js', 'weatherChart.js')
    const init = path.resolve(__dirname, '../js', 'init.js')

    jsdom.env(html, [weatherChart, init], (err, window) => {
      if (err) {
        return done(err)
      }
      Object.keys(window).forEach(key => {
        global[key] = window[key]
      })

      done()
    })
  })

  describe("weatherChart", function(){
    // The array we want to get all of our info from is located in `dummyData.hourly_forecast`
    it("returns a list of Fahrenheit temperatures", () => {
      expect(getFahrenheit(dummyData)).toEqual([79.34,78.49,77.12,
        75.1,73.15,71.66,70.72,70.25,69.88,69.27,68.51,68.06,68.13,
        69.71,73.01,75.06,77.22,79.22,80.87,82.03,82.65,82.28,81.5,
        80.22,78.84,77.52,76.15,74.67,73.06,71.76,70.76,70,69.32,
        68.32,67.49,66.97,67.32,68.74,70.67,72.03,73.8,75.12,76.76,
        78.14,78.74,77.78,76.43,74.64,73.57]);
    });

    it("returns a list of hours", () => {
      expect(getHour(dummyData)).toEqual([18,19,20,21,22,23,0,1,2,3
        ,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,
        2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
    });
  })

  describe('fetch', function(){

    let fetchSpy;
    before(() => {
      window.fetch = require('node-fetch')
    })

    beforeEach(() => {
      fetchSpy = expect.spyOn(window, "fetch").andReturn(new Promise(() => {}))
    })

    afterEach(() => {
      fetchSpy.restore()
    })

    it('fetches the create fork api', () => {
      const ctx = document.getElementById("NYCWeatherChart").getContext("2d");
      var API_KEY = "Go get an API key";
      const CORS_WRAPPER = "https://cors-anywhere.herokuapp.com/"
      const URL = CORS_WRAPPER + "https://api.darksky.net/forecast/" + API_KEY + "/40.7127,-74.0059?exclude=currently,minutely,daily";

      makeRequest(URL, ctx)
      const url = fetchSpy.calls[0].arguments[0]
      expect(url).toMatch(/api.darksky.net/)
    })
  })

})
