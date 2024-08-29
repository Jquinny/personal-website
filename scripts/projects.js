import { Octokit } from "https://esm.sh/octokit?dts";

const octokit = new Octokit({});

function fetchProjectData() {
  const projectList = [
    "AutonomousFoosball",
    "Vehicle-Analytics-App",
    "JournAI",
    "pythons-on-a-plane",
  ];

  let projectData = {};

  //   projectList.forEach(async (project) => {
  //     const repo = await octokit.request(`GET /repos/Jquinny/${project}`);
  //     const languages = await octokit.request(`GET ${repo.data.languages_url}`);
  //     projectData[project] = {
  //       url: repo.data.html_url,
  //       description: repo.data.description,
  //       languages: languages.data,
  //       topics: repo.data.topics,
  //       created: repo.data.fork
  //         ? repo.data.parent.created_at
  //         : repo.data.created_at,
  //       updated: repo.data.fork
  //         ? repo.data.parent.updated_at
  //         : repo.data.updated_at,
  //     };
  //   });

  // for testing ..............................................................
  projectData = {
    AutonomousFoosball: {
      url: "https://github.com/Jquinny/AutonomousFoosball",
      description: "test",
      languages: {
        Python: 0,
        "C++": 0,
      },
      topics: ["topic1", "topic2"],
      created: "created",
      updated: "updated",
    },
    "pythons-on-a-plane": {
      url: "https://github.com/Jquinny/AutonomousFoosball",
      description: "test",
      languages: {
        Python: 0,
        "C++": 0,
      },
      topics: ["topic1", "topic2"],
      created: "created",
      updated: "updated",
    },
  };

  return projectData;
}

export function populateProjects() {
  const container = document.getElementById("projects-container");

  const projectData = fetchProjectData();
  console.log(projectData);
  // TODO: Need to populate with different content if github calls fail
  if (!projectData) {
    console.log("Failed to fetch project data!");
    return;
  }

  Object.entries(projectData).forEach(([project, data]) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    // Create the thumbnail section
    const thumbnail = document.createElement("img");
    thumbnail.src = `../assets/images/${project}.jpg`; //TODO: Fix this later
    thumbnail.alt = `${project} thumbnail`;
    thumbnail.classList.add("project-thumbnail");

    // Create the content section
    const projectContent = document.createElement("div");
    const projectContentHeader = document.createElement("div");
    const projectContentData = document.createElement("div");
    projectContent.classList.add("project-content");

    // Project Title
    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project;

    // Project Description
    const projectDescription = document.createElement("p");
    projectDescription.textContent = data.description;

    // Project Languages
    const projectLanguages = document.createElement("p");
    const languageDetails = Object.entries(data.languages)
      .map(([lang, bytes]) => `${lang}: ${bytes} bytes`)
      .join(", ");
    projectLanguages.textContent = `Languages: ${languageDetails}`;

    // Project Topics
    const projectTopics = document.createElement("p");
    projectTopics.textContent = `Topics: ${data.topics.join(", ")}`;

    // Project Dates
    const projectDates = document.createElement("p");
    projectDates.textContent = `Created: ${new Date(
      data.created
    ).toLocaleDateString()} | Last updated: ${new Date(
      data.updated
    ).toLocaleDateString()}`;

    // View on GitHub button
    const viewOnGitHub = document.createElement("a");
    viewOnGitHub.href = data.url;
    viewOnGitHub.target = "_blank";
    viewOnGitHub.innerHTML = "View Source";

    // Append content to projectContent div
    projectContentHeader.appendChild(projectTitle);
    projectContentHeader.appendChild(projectDescription);
    projectContent.appendChild(projectContentHeader);

    projectContentData.appendChild(projectLanguages);
    projectContentData.appendChild(projectTopics);
    projectContentData.appendChild(projectDates);
    projectContentData.appendChild(viewOnGitHub);
    projectContent.appendChild(projectContentData);

    // Append thumbnail and content to projectItem
    projectItem.appendChild(thumbnail);
    projectItem.appendChild(projectContent);

    container.appendChild(projectItem);
  });
}
