document.addEventListener('DOMContentLoaded', () => {
    // Fetch projects and blog posts
    Promise.all([
        fetch('projects.json').then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for projects');
            }
            return response.json();
        }),
        fetch('blog.json').then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for blog posts');
            }
            return response.json();
        })
    ]).then(([projectsData, blogPostsData]) => {
        loadItems(projectsData.projects, '.grid', 3);
        loadItems(blogPostsData.blogPosts, '.item', 3);
    }).catch(error => {
        console.error('Error fetching data:', error);
        document.querySelectorAll('.grid').forEach(grid => {
            grid.innerHTML = '<p>Failed to load data. Please try again later.</p>';
        });
    });

    function loadItems(items, containerSelector, maxItems) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';

        if (!items || items.length === 0) {
            container.innerHTML = '<p>No items available at the moment.</p>';
            return;
        }

        const limitedItems = items.slice(0, maxItems);

        limitedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            if (containerSelector === '.grid') {
                // Handle projects-specific rendering
                let tagClass = '';
                switch (item.tag) {
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

                itemElement.innerHTML = `
                    <img src="${item.imagePath}" alt="${item.title}" class="image">
                    <div class="content">
                        <h3>${item.title}</h3>
                        <div class="tag-container">
                            <span class="tag ${tagClass}">
                                <span class="tag-icon"><img src="assets/${tagClass}.png" alt="${item.tag}" class="tag-icon-img"></span> ${item.tag}
                            </span>
                        </div>
                        <p>${item.description}</p>
                        <p class="published-date">Published on: ${item.publishedDate}</p>
                    </div>
                `;
            } else if (containerSelector === '.blog-posts') {
                // Handle blog posts-specific rendering
                itemElement.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.shortDescription}</p>
                    <a href="${item.link}">Read more...</a>
                `;
            }

            container.appendChild(itemElement);
        });
    }
});