import { Octokit } from "https://esm.sh/octokit?dts";

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

// -------------------------------------------------------------------------- //
// -------------------- projects functionality ------------------------------ //
// -------------------------------------------------------------------------- //

const octokit = new Octokit({});

async function fetchProjectData() {
  const projectList = [
    "AutonomousFoosball",
    "Vehicle-Analytics-App",
    "JournAI",
    "pythons-on-a-plane",
  ];

  let projectData = {};

  // create an array of promises for each project API call
  const projectPromises = projectList.map(async (project) => {
    const repo = await octokit.request(`GET /repos/Jquinny/${project}`);
    const languages = await octokit.request(`GET ${repo.data.languages_url}`);

    // populate project with data from github
    projectData[project] = {
      url: repo.data.html_url,
      description: repo.data.description,
      languages: languages.data,
      created: repo.data.fork
        ? repo.data.parent.created_at
        : repo.data.created_at,
      updated: repo.data.fork
        ? repo.data.parent.updated_at
        : repo.data.updated_at,
    };
  });

  // this ensures we have all the project data populated before returning
  await Promise.all(projectPromises);

  // // for testing ..............................................................
  // projectData = {
  //   AutonomousFoosball: {
  //     url: "https://github.com/Jquinny/AutonomousFoosball",
  //     description: "test",
  //     languages: {
  //       Python: 0,
  //       "C++": 0,
  //     },
  //     created: "created",
  //     updated: "updated",
  //   },
  //   "pythons-on-a-plane": {
  //     url: "https://github.com/Jquinny/AutonomousFoosball",
  //     description: "test",
  //     languages: {
  //       Python: 0,
  //       "C++": 0,
  //     },
  //     created: "created",
  //     updated: "updated",
  //   },
  // };

  return projectData;
}

function formatCreatedDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "long" }; // long month format (e.g., November)
  return date.toLocaleDateString(undefined, options);
}

function calculateDaysAgo(isoDateString) {
  const date = new Date(isoDateString);
  const currentDate = new Date();

  // time difference in milliseconds
  const timeDifference = currentDate - date;

  // convert to days
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
}

function sortProjects(projectData) {
  // sort projects based on the created date (newest dates are first)
  const projects = Object.entries(projectData);
  projects.sort((a, b) => {
    const dateA = new Date(a[1].created);
    const dateB = new Date(b[1].created);
    return dateB - dateA; // for sorting in descending order
  });

  return projects;
}

async function populateProjects() {
  const container = document.getElementById("projects-container");
  const projectData = await fetchProjectData();

  // handler for failed github API requests
  if (!Object.keys(projectData).length) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectErrorDiv = document.createElement("div");

    const projectErrorHeader = document.createElement("h3");
    projectErrorHeader.textContent = "Whoops ...";

    const projectErrorMessage = document.createElement("p");
    projectErrorMessage.textContent =
      "Looks like the github API has failed me, and I am too lazy to write backup html for the projects list, so you are just gonna have to go visit my github yourself at the link below ... oopsy";

    const githubLink = document.createElement("a");
    githubLink.classList.add("github-link");
    githubLink.href = "https://github.com/Jquinny";
    githubLink.target = "_blank";
    githubLink.innerHTML = "Github";

    // add shit to DOM
    projectErrorDiv.appendChild(projectErrorHeader);
    projectErrorDiv.appendChild(projectErrorMessage);
    projectErrorDiv.appendChild(githubLink);
    projectItem.appendChild(projectErrorDiv);
    container.appendChild(projectItem);

    return;
  }

  const sortedProjectData = sortProjects(projectData);
  for (const [project, data] of sortedProjectData) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    // project thumbnail portion
    const thumbnail = document.createElement("img");
    thumbnail.src = `../assets/images/${project}.png`; //TODO: Fix this later to work with any image extension
    thumbnail.alt = `${project} thumbnail`;
    thumbnail.classList.add("project-thumbnail");

    // create the content section wrapper
    const projectContent = document.createElement("div");
    projectContent.classList.add("project-content");

    //-------------- content section heading info ------------------------------
    const projectContentHeader = document.createElement("div");

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project;

    const projectDescription = document.createElement("p");
    projectDescription.textContent = data.description;
    //--------------------------------------------------------------------------

    //------------------ content section body info -----------------------------
    const projectContentData = document.createElement("div");

    const projectLanguages = document.createElement("p");
    const languageDetails = Object.keys(data.languages).join(", ");
    projectLanguages.textContent = `Languages: ${languageDetails}`;

    const projectCreationDate = document.createElement("p");
    projectCreationDate.textContent = `Created ${formatCreatedDate(
      data.created
    )}`;

    const projectUpdatedDate = document.createElement("p");
    projectUpdatedDate.textContent = `Last updated ${calculateDaysAgo(
      data.updated
    )} days ago`;

    const viewOnGitHub = document.createElement("a");
    viewOnGitHub.classList.add("github-link");
    viewOnGitHub.href = data.url;
    viewOnGitHub.target = "_blank";
    viewOnGitHub.innerHTML = "View Source";
    //--------------------------------------------------------------------------

    // append content heading info to content wrapper
    projectContentHeader.appendChild(projectTitle);
    projectContentHeader.appendChild(projectDescription);
    projectContent.appendChild(projectContentHeader);

    // append content body info to content wrapper
    projectContentData.appendChild(projectLanguages);
    projectContentData.appendChild(projectCreationDate);
    projectContentData.appendChild(projectUpdatedDate);
    projectContentData.appendChild(viewOnGitHub);
    projectContent.appendChild(projectContentData);

    // append thumbnail and content to projectItem div
    projectItem.appendChild(thumbnail);
    projectItem.appendChild(projectContent);

    container.appendChild(projectItem);
  }
}

// -------------------------------------------------------------------------- //
// -------------------- general event listeners ----------------------------- //
// -------------------------------------------------------------------------- //

window.addEventListener("load", () => {
  // createNavbarCircles();
  createStars(500);
  populateProjects();
});

window.addEventListener("resize", () => {
  moveStars();
});
