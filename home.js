let menu  = document.querySelector('#menu-icon');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
}

const sr = ScrollReveal ({
  distance:'65px',
  duration: 2600,
  delay: 450,
  reset: true
});

sr.reveal('.gotxt',{delay:200, origin:'top'})
sr.reveal('.goimg',{delay:500, origin:'top'})