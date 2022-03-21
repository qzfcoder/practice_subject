function throttle(fn, interval, option={
  leading=true,trialing=false
}) {
  let {leading, trialing} = option
  let timer;
  let lastTime = 0
  return function(...args) {
    let nowTime = new Date().getTime()
    if(lastTime==0 && !leading) lastTime = nowTime
    let remainTime = interval - (nowTime-lastTime)
    if(remainTime <= 0) {
      clearTimeout(timer)
      timer = null
      fn.apply(this, args)
      lastTime = nowTime
      return
    }
    if(trialing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = !leading ? 0 : new Date().getTime()
        fn.apply(this, args)
      }, remainTime);
    }
  }
}