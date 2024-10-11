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
        loadItems(projectsData.projects, '#projects', 3);
        loadItems(blogPostsData.blog, '#blog', 3);
    }).catch(error => {
        console.error('Error fetching data:', error);
        document.querySelectorAll('#projects, #blog').forEach(grid => {
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

            let tagClass = '';
            let tagPath = '';
            switch (item.tag) {
                case 'Finished':
                    tagClass = 'checkmark';
                    tagPath = 'assets/checkmark.png';
                    break;
                case 'Work in Progress':
                    tagClass = 'work-in-progress';
                    tagPath = 'assets/work-in-progress.png';
                    break;
                case 'Canceled':
                    tagClass = 'canceled';
                    tagPath = 'assets/canceled.png';
                    break;
            }

            itemElement.innerHTML = `
                <img src="${item.imagePath}" alt="${item.title}" class="image">
                <div class="content">
                    <h3>${item.title}</h3>
                    <div class="tag-container">
                        <span class="tag ${tagClass}">
                            <span class="tag-icon"><img src="${tagPath}" alt="${item.tag}" class="tag-icon-img"></span> ${item.tag}
                        </span>
                    </div>
                    <p>${item.description}</p>
                    <p class="published-date">Published on: ${item.publishedDate}</p>
                </div>
            `;

            container.appendChild(itemElement);
        });
    }
});
