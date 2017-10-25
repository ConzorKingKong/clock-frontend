onmessage = e => {
  const times = e.data;
  const date = new Date();
  if (times.length === 0) {
    postMessage({date});
    return;
  }
  times.forEach(time => {
    const {
      hours,
      minutes,
      seconds,
      days,
      ampm
    } = time;
    let hoursParsed = parseInt(hours, 10);
    const minutesParsed = parseInt(minutes, 10);
    const secondsParsed = parseInt(seconds, 10);
    if (ampm === 'PM' && hoursParsed !== 12) hoursParsed += 12;
    if (ampm === 'AM' && hoursParsed === 12) hoursParsed = 0;
    if (hoursParsed !== date.getHours() ||
    minutesParsed !== date.getMinutes() ||
    secondsParsed !== date.getSeconds()) {
      postMessage({date});
      return;
    }
    days.forEach(day => {
      if (day !== date.getDay()) {
        postMessage({date});
        return;
      }
      postMessage({time, day, date});
    });
  });
};

onerror = e => console.log('error inside service worker', e);
