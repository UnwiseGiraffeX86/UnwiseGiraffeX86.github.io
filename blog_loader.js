document.addEventListener('DOMContentLoaded', () => {
    fetch('blog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const projectsGrid = document.querySelector('.grid');
            projectsGrid.innerHTML = '';
            
            if (!data.projects || data.projects.length === 0) {
                projectsGrid.innerHTML = '<p>No posts available at the moment.</p>';
                return;
            }
            
            const recentProjects = data.projects.slice(0, 3);
            
            recentProjects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.classList.add('item');
                
                let tagClass = '';
                switch (project.tag) {
                    case 'Finished':
                        tagClass = 'checkmark';
                        break;
                    case 'Work in Progress':
                        tagClass = 'work-in-progress';
                        break;
                    case 'Canceled':
                        tagClass = 'canceled';
                        break;
                }

                projectItem.innerHTML = `
                    <img src="${project.imagePath}" alt="${project.title}" class="image">
                    <div class="content">
                        <h3>${project.title}</h3>
                        <div class="tag-container">
                            <span class="tag ${tagClass}">
                                <span class="tag-icon"><img src="assets/${tagClass}.png" alt="${project.tag}" class="tag-icon-img"></span> ${project.tag}
                            </span>
                        </div>
                        <p>${project.description}</p>
                        <p class="published-date">Published on: ${project.publishedDate}</p>
                    </div>
                `;
                projectsGrid.appendChild(projectItem);
            });
        })
        .catch(error => {
            console.error('Error fetching project data:', error);
            const projectsGrid = document.querySelector('.grid');
            projectsGrid.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
        });
});