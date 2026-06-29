import { projects } from "../data/projects.js";

const grid = document.getElementById("projects-grid");

projects.forEach((project) => {
	const card = document.createElement("article");
	card.className = "project-card";

	card.innerHTML = `
        <div class="project-frame">
            <div class="project-image">
                <a href="${project.live}" target="_blank" rel="noopener">
             <img
               src="${project.image}"
               alt="Screenshot of ${project.title}"
               loading="lazy"
            /></a>
            </div>
        </div>

        <div class="project-body">
           <p class="project-label">FIG. 0${project.label}</p>
           <h3>${project.title}</h3>
           <p class="project-desc">${project.description}</p>

         <div class="project-bottom">
            <ul class="project-tag tag-list tag-list-sm">
            ${project.tech.map((tech) => `<li>${tech}</li>`).join("")}
            </ul>

            <div class="project-links">
            <a href="${project.live}" target="_blank" rel="noopener noreferrer">Live ↗</a>
            <a href="${project.code}" target="_blank" rel="noopener noreferrer">Code ↗</a>
            </div>
        </div>
    </div>
    `;

	grid.appendChild(card);
});
