// -------------------------------------------------------------------------- //
// ---------------------- Projects Section Functionality -------------------- //
// -------------------------------------------------------------------------- //

// // Fetch GitHub projects data when the page loads
// window.addEventListener('load', () => {
// fetch('https://api.github.com/Jquinny/repos', {
//     method: 'GET', // or 'POST' depending on the API endpoint
//     headers: {
//     'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add auth token if required
//     'Content-Type': 'application/json'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     projectsData = data;
// })
// .catch(error => console.error('Error fetching project data:', error));
// });

const gitUser = "Jquinny";
const projectList = [
  "personal-website",
  "Vehicle-Analytics-App",
  "JournAI",
  "pythons-on-a-plane",
  "AutonomousFoosball",
];
let projectData = null;

// // Display projects when user clicks the Projects link or scrolls to Projects section
// document.getElementById("projects-link").addEventListener("click", () => {
//   console.log("projects link clicked!");
// });

// window.addEventListener("scroll", () => {
//   const projectsSection = document.getElementById("projects");
//   if (window.scrollY + window.innerHeight >= projectsSection.offsetTop) {
//     // populateProjects();
//     console.log("scrolled to projects section");
//   }
// });

// function populateProjects() {
//   if (
//     !projectsData ||
//     document.getElementById("projects").style.display === "block"
//   )
//     return;

//   const container = document.getElementById("projects-container");
//   projectsData.forEach((project) => {
//     const projectItem = document.createElement("div");
//     projectItem.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
//     container.appendChild(projectItem);
//   });

//   document.getElementById("projects").style.display = "block";
// }

// -------------------------------------------------------------------------- //
// -------------------- cleaner navbar navigation --------------------------- //
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

function deleteStars() {
  let stars = document.getElementsByClassName("star");
  while (stars.length > 0) {
    stars[0].parentNode.removeChild(stars[0]);
  }
}

// call this function to populate stars when the page loads
window.addEventListener("load", () => {
  createStars(500);
});

// we also want to reload the stars on resize so they don't look wonky and fill half the screen
// TODO: change number of stars based on size of viewport, or figure out more
// performant way of reallocating stars around the viewport so I'm not deleting and recreating
// them so much when resizing (it's super laggy rn)
window.addEventListener("resize", () => {
  deleteStars();
  createStars(500);
});
