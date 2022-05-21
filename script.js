let getAllFullPage = document.querySelectorAll(".event-triger");
let rocket = document.querySelector(".rocket");
let test = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        rocket.dataset.status = entry.target.classList[0];
        console.log(entry.target.classList[0]);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

// For Dev Only - To see Section Intersection 📐
// getAllFullPage.forEach((element) => {
//     element.style.backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
// });

getAllFullPage.forEach((el) => {
  test.observe(el);
});

let stars = document.getElementById("stars");
let sun = document.getElementById("sun");
let header = document.querySelector("header");

<<<<<<<< HEAD:script.js
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  stars.style.left = value * 0.15 + "px";
  sun.style.left = value * -0.2 + "px";
  header.style.top = value * 0.5 + "px";
});
========
    let stars = document.getElementById('stars');
    let sun = document.getElementById('sun');
    let text = document.getElementById('text');
    let header = document.querySelector('header');

    window.addEventListener('scroll', function(){
        let value = window.scrollY;
        stars.style.left = value * 0.15 + 'px';
        sun.style.left = value * -0.2 + 'px';
        text.style.marginTop = value * 0.1 + 'px';
        // header.style.top = value * 0.5 + 'px';
    })
>>>>>>>> main:landing/script.js
