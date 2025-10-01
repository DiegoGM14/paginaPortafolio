document.addEventListener('DOMContentLoaded', () => {
  // Cargar proyectos dinámicos
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
        projectCard.className = 'card scroll-fade'; // ← animación por scroll

        const projectImage = document.createElement('img');
        projectImage.src = project.image;
        projectImage.alt = project.name;

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.name;

        const projectDesc = document.createElement('p');
        projectDesc.textContent = project.description;

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const demoBtn = document.createElement('a');
        demoBtn.href = project.demoUrl;
        demoBtn.target = '_blank';
        demoBtn.textContent = 'Ver';
        demoBtn.className = 'btn';

        const repoBtn = document.createElement('a');
        repoBtn.href = project.repoUrl;
        repoBtn.target = '_blank';
        repoBtn.textContent = 'Readme';
        repoBtn.className = 'btn';

        buttonGroup.appendChild(demoBtn);
        buttonGroup.appendChild(repoBtn);

        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDesc);
        projectCard.appendChild(buttonGroup);

        projectsContainer.appendChild(projectCard);
      });

      // Activar animaciones por scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      });

      document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));
    })
    .catch(error => {
      console.error('Hubo un problema con la operación de fetch:', error);
      const projectsContainer = document.getElementById('projects-container');
      projectsContainer.innerHTML = '<p>No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.</p>';
    });
});

