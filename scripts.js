// // Fetch GitHub projects data when the page loads
// window.addEventListener('load', () => {
// fetch('https://api.github.com/user/repos', {
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

// test event listener for on window load
window.addEventListener("load", () => {
  console.log("page loaded!");
});

// Display projects when user clicks the Projects link or scrolls to Projects section
document.getElementById("projects-link").addEventListener("click", () => {
  console.log("projects link clicked!");
});

window.addEventListener("scroll", () => {
  const projectsSection = document.getElementById("projects");
  if (window.scrollY + window.innerHeight >= projectsSection.offsetTop) {
    // populateProjects();
    console.log("scrolled to projects section");
  }
});

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
