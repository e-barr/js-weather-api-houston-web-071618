function getFahrenheit(result){
  const tempList = []
  for (let i = 0; i < result.length; i++) {
    let newTemp = result[i].temperature
    tempList.push(newTemp)
  }
  return tempList
}

function getHour(result){
  return result.map(hour => {
    let newHour = new Date(hour.time * 1000).getHours()
    if (newHour + 1 === 24) {
      return 0
    } else {
      return (newHour + 1)
    }
  })
}

function generateDataSet(labels, data) {
  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: "NYC Weather Data",
          data: data,
          backgroundColor: "rgba(100,150,220,0.2)",
          borderColor: 'rgb(255, 99, 132)'
        }
      ]
    },
    options: {
      // additional configurations here
    }
  }
}

function makeRequest(endpoint, canvas) {
  return fetch(endpoint)
    .then(resp => resp.json())
    .then(json => {
      let hourlyData = json.hourly.data

      const tempChart = new Chart(canvas, generateDataSet(getHour(hourlyData), getFahrenheit(hourlyData)))

    })
  // Your code goes here

  // After your fetch works - use your json data with the line below :)
}
