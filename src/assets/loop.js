onmessage = e => {
  const times = e.data;
  const date = new Date();
  if (times.length === 0) {
    postMessage({date});
    return;
  }
  times.forEach(time => {
    const {
      minutes,
      seconds,
      days,
      ampm
    } = time;
    let {hours} = time;
    if (ampm === 1 && hours !== 12) hours += 12;
    if (ampm === 0 && hours === 12) hours = 0;
    if (hours !== date.getHours() ||
    minutes !== date.getMinutes() ||
    seconds !== date.getSeconds()) {
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

onerror = e => console.log('error inside service worker', e); // eslint-disable-line no-restricted-globals
