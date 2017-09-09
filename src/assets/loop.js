onmessage = function(e) {
  const times = e.data
  if (times.length === 0) {
    // window.requestAnimationFrame(this.timeLoop)
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
      setTimeout(postMessage, 500, null)
      return
    }
    if (minutesParsed !== new Date().getMinutes()) {
      setTimeout(postMessage, 500, null)      
      return
    }
    if (secondsParsed !== new Date().getSeconds()) {
      setTimeout(postMessage, 500, null)      
      return
    }
    days.forEach(day => {
      if (day !== new Date().getDay()) {
        setTimeout(postMessage, 500, null)        
        return
      }
      setTimeout(postMessage, 500, {time, day})
    })
  })
}