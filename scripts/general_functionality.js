import { populateProjects } from "./projects.js";

// -------------------------------------------------------------------------- //
// -------------------- navbar functionality -------------------------------- //
// -------------------------------------------------------------------------- //

document.querySelectorAll(".nav-item a").forEach((anchor) => {
  // keep resume popout functionality as normal;
  if (anchor.id != "resume-link") {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));
      window.scrollTo({
        top:
          targetSection.offsetTop - document.documentElement.clientHeight * 0.2, // accounting for the navbar
        behavior: "smooth",
      });
    });
  }
});

// NOTE: this was for the solar system navbar
// function createNavbarCircles() {
//   // Array of colors to apply to each circle
//   const colors = ["#c051ff", "#39beff", "#404be3", "#ff5733"];

//   const navItems = document.querySelectorAll(".nav-item");
//   navItems.forEach((item, index) => {
//     const anchor = item.querySelector("a");
//     const anchorWidth = anchor.getBoundingClientRect().width;

//     // create a div to serve as the circle background
//     const circle = document.createElement("div");
//     circle.classList.add("circle-background");

//     // size the circle based on anchor width (add padding for space)
//     const circleSize = anchorWidth + 40; // adding 40px for padding
//     circle.style.width = `${circleSize}px`;
//     circle.style.height = `${circleSize}px`;

//     // set the background color for the circle
//     circle.style.backgroundColor = colors[index % colors.length];

//     // position the circle behind the text
//     circle.style.position = "absolute";
//     circle.style.top = "50%";
//     circle.style.left = "50%";
//     circle.style.transform = "translate(-50%, -50%)";
//     circle.style.borderRadius = "50%";
//     circle.style.zIndex = "-1"; // ensure the circle is behind the text

//     // add the circle as a child of the nav item
//     item.style.position = "relative"; // Required to position the circle correctly
//     item.appendChild(circle);
//   });
// }

// -------------------------------------------------------------------------- //
// ----------------------- Star Functionality ------------------------------- //
// -------------------------------------------------------------------------- //

// Function to generate random stars
function createStars(numStars) {
  const starField = document.getElementById("star-field");

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // random position within the viewport
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    // random size between 0px and 5px
    const randomSize = Math.random() * 5;

    // random delay for twinkling
    const twinkleDelayMilli = (Math.random() * 9 + 1) * 1000;

    // set star styles
    star.style.width = `${randomSize}px`;
    star.style.height = `${randomSize}px`;
    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;

    // set star animation
    star.animate(
      {
        offset: [0, 0.5, 1],
        opacity: [1, 0.5, 1],
        scale: ["150%", "50%", "100%"], // to erase popping effect, just make start and end 100%
      },
      {
        delay: twinkleDelayMilli,
        duration: 5000, // milliseconds
        iterations: Infinity,
      }
    );

    starField.appendChild(star);
  }
}

function moveStars() {
  Array.from(document.getElementsByClassName("star")).forEach((star) => {
    // get random position within the new viewport size
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    // re-position the star
    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;
  });
}

window.addEventListener("load", () => {
  // createNavbarCircles();
  createStars(500);
  populateProjects();
});

window.addEventListener("resize", () => {
  moveStars();
});
