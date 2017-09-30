onmessage = function(e) {
  const times = e.data
  if (times.length === 0) {
    self.postMessage({date: new Date()})
    return
  }
  times.forEach((time, timeIndex) => {
    const {hours, minutes, seconds, days, ampm} = time
    let hoursParsed = parseInt(hours)
    const minutesParsed = parseInt(minutes)
    const secondsParsed = parseInt(seconds)
    if (ampm === "pm" && hoursParsed !== 12) hoursParsed = hoursParsed + 12
    if (ampm === "am" && hoursParsed === 12) hoursParsed = 0
    if (hoursParsed !== new Date().getHours()) {
      postMessage({date: new Date()})
      return
    }
    if (minutesParsed !== new Date().getMinutes()) {
      postMessage({date: new Date()})
      return
    }
    if (secondsParsed !== new Date().getSeconds()) {
      postMessage({date: new Date()})
      return
    }
    days.forEach(day => {
      if (day !== new Date().getDay()) {
        postMessage({date: new Date()})
        return
      }
      postMessage({time, day, date: new Date()})
    })
  })
}