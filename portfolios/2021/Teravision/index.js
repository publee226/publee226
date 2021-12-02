// var tl = new TimelineMax();

TweenMax.to(".box", 1, {
  y: "-100%",
  ease: "Expo.easeInOut",
  delay: .5
})

TweenMax.to(".loading-bg", 1, {
  autoAlpha: 1,
  ease: "Expo.easeInOut",
  delay: 1.5
})

TweenMax.to(".animation", 2, {
  top: "-100%",
  ease: "Expo.easeInOut",
  delay: 3.5
})