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
