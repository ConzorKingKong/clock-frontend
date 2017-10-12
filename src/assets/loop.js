onmessage = function(e) {
  const times = e.data
  const date = new Date()
  if (times.length === 0) {
    self.postMessage({date})
    return
  }
  times.forEach((time, timeIndex) => {
    const {hours, minutes, seconds, days, ampm} = time
    let hoursParsed = parseInt(hours)
    const minutesParsed = parseInt(minutes)
    const secondsParsed = parseInt(seconds)
    if (ampm === "pm" && hoursParsed !== 12) hoursParsed = hoursParsed + 12
    if (ampm === "am" && hoursParsed === 12) hoursParsed = 0
    if (hoursParsed !== date.getHours() || minutesParsed !== date.getMinutes() || secondsParsed !== date.getSeconds()) {
      postMessage({date})
      return
    }
    days.forEach(day => {
      if (day !== date.getDay()) {
        postMessage({date})
        return
      }
      postMessage({time, day, date})
    })
  })
}

onerror = function (e) {
  console.log("inside service worker error", e)
}