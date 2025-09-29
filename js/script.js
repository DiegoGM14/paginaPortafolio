document.addEventListener('DOMContentLoaded', () => {
    fetch('./projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            
             projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                const projectNameLink = document.createElement('a');
                projectNameLink.href = project.repoUrl; 
                projectNameLink.target = '_blank'; 

                const projectName = document.createElement('h3');
                projectName.textContent = project.name;

                projectNameLink.appendChild(projectName);

                const projectDesc = document.createElement('p');
                projectDesc.textContent = project.description;

                const projectLink = document.createElement('a');
                projectLink.href = project.readmeUrl;
                projectLink.target = '_blank';
                projectLink.textContent = 'Ver README';

                projectCard.appendChild(projectNameLink);
                projectCard.appendChild(projectDesc);
                projectCard.appendChild(projectLink);

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la operación de fetch:', error);
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '<p>No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.</p>';
        });
});