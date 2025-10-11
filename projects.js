// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let projects = [];
    let currentFilter = 'all';

    // Load projects from JSON
    async function loadProjects() {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            projects = data.projects;
            renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    // Render projects based on current filter
    function renderProjects() {
        let filteredProjects = projects;

        // Apply category filter
        if (currentFilter !== 'all') {
            // Map filter values to project tags
            const filterMapping = {
                'websites': 'Web',
                'ml': 'ML',
                'mobile': 'Mobile',
                'finance': 'Finance'
            };
            
            const targetTag = filterMapping[currentFilter];
            if (targetTag) {
                filteredProjects = filteredProjects.filter(project => 
                    project.tags.includes(targetTag)
                );
            }
        }

        // Clear grid
        projectsGrid.innerHTML = '';

        // Render filtered projects
        filteredProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    }

    // Create project card element
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Debug: Log project info
        console.log(`Project: ${project.name}, Tags: ${JSON.stringify(project.tags)}, Has Web tag: ${project.tags.includes('Web')}`);

        // Get color for category based on primary tag
        const categoryColors = {
            'Mobile': 'cyan',
            'Web': 'emerald',
            'ML': 'purple',
            'Finance': 'pink'
        };
        const primaryTag = project.tags[0]; // Use first tag for color
        const borderColor = categoryColors[primaryTag] || 'emerald';

        card.innerHTML = `
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-3 flex items-center">
                    <i class="${project.icon} ${project.iconColor} mr-3 text-lg"></i>
                    <span class="${project.titleColor}">${project.name}</span>
                </h3>
                <p class="text-[#A0A0A0] mb-4 leading-relaxed text-sm">${project.description}</p>
                <div class="project-tags mb-4">
                    ${project.tools.map(tool => `<span class="project-tag bg-${borderColor}-400/20 text-${borderColor}-400">${tool}</span>`).join('')}
                </div>
            </div>
            <div class="project-actions flex flex-col gap-3">
                <a href="${project.github_link}" class="project-action github" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i>
                    <span>Code</span>
                </a>
                <a href="${project.demo_link}" class="project-action demo" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-play"></i>
                    <span>Demo</span>
                </a>
                ${project.tags.includes('Web') ? `
                <a href="${project.try_it_link}" class="project-action try-it" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Try It</span>
                </a>
                ` : ''}
                <!-- Debug: Project tags are ${JSON.stringify(project.tags)} -->
            </div>
        `;

        // Add hover effect based on category
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = `rgb(var(--${borderColor}-400) / 0.5)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
        });

        return card;
    }

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            renderProjects();
        });
    });

    // Initialize
    loadProjects();
});
