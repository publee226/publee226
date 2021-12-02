const tl = gsap.timeline();

tl.fromTo(".title, .logos, .btns, .copyright",{
  y: "25%",
  opacity: 0
},{
  y: "0%",
  opacity: 1,
  duration: .35,
  stagger: 0.35,
  delay: .5
})