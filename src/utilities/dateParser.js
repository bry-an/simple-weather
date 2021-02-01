export const dateParser = ({ selectedDay, hourlyWeather }) => {
  if (!selectedDay || !hourlyWeather) return null
  // parse hourly weather into eight days
  const dateSelected = new Date(selectedDay.dt * 1000)
  const dateRightNow = new Date()
  // figure out where to start

  // assuming the selected day is the same as the day it is right now by default
  let x = 0

  // if not then finding where to start
  if (dateSelected.toString().slice(0, 15) !== dateRightNow.toString().slice(0, 15)) {
    const index = hourlyWeather.properties?.periods?.findIndex(
      (i) =>
        new Date(i.startTime).toString().slice(0, 15) ===
        dateSelected.toString().slice(0, 15)
    )
    x = index >= 0 ? index : NaN
  }
  return [0, 3, 6, 9, 12, 15, 18, 21].reduce(
    (accum, curr) => accum.concat(hourlyWeather.properties?.periods?.[x + curr]),
    []
  )
}

export const createChartData = (hourlyEightWeather) =>
  hourlyEightWeather.map((hour) => ({
    x: new Date(hour.startTime),
    y: hour.temperature
  }))
