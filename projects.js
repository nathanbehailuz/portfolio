// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let projects = [];
    let currentFilter = 'all';
    const filterMapping = {
        'websites': 'Web',
        'ml': 'ML',
        'mobile': 'Mobile',
        'finance': 'Finance'
    };
    let pendingHashNavigation = null;

    // Load projects from JSON
    async function loadProjects() {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            projects = data.projects;
            renderProjects();
            handleHashNavigation({ forceScroll: true });
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    // Render projects based on current filter
    function renderProjects() {
        let filteredProjects = projects;

        // Apply category filter
        if (currentFilter !== 'all') {
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

        if (pendingHashNavigation) {
            const navigated = scrollToProject(pendingHashNavigation, { forceScroll: true });
            if (navigated) {
                pendingHashNavigation = null;
            }
        }
    }

    // Create project card element
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.id = project.id;

        card.innerHTML = `
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-3">
                    <a href="#${project.id}" class="project-title-link inline-flex items-center gap-3">
                        <i class="${project.icon} text-lg"></i>
                        <span>${project.name}</span>
                    </a>
                </h3>
                <ul class="text-[#A0A0A0] mb-4 leading-relaxed text-sm list-disc list-inside space-y-1">
                    ${project.description.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <div class="project-tags mb-4">
                    ${project.tools.map(tool => `<span class="project-tag">${tool}</span>`).join('')}
                </div>
            </div>
            <div class="project-actions flex flex-col gap-3">
                <a href="${project.github_link}" class="project-action" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i>
                    <span>Code</span>
                </a>
                <a href="${project.demo_link}" class="project-action" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-play"></i>
                    <span>Demo</span>
                </a>
                ${project.tags.includes('Web') ? `
                <a href="${project.try_it_link}" class="project-action" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Try It</span>
                </a>
                ` : ''}
            </div>
        `;

        return card;
    }

    function scrollToProject(projectId, { forceScroll = false } = {}) {
        const card = document.getElementById(projectId);
        if (!card) {
            return false;
        }

        card.classList.add('highlight');

        if (forceScroll) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (card.dataset.highlightTimeout) {
            clearTimeout(Number(card.dataset.highlightTimeout));
        }

        const timeoutId = window.setTimeout(() => {
            card.classList.remove('highlight');
            delete card.dataset.highlightTimeout;
        }, 2000);
        card.dataset.highlightTimeout = String(timeoutId);

        return true;
    }

    function setFilter(filterValue) {
        currentFilter = filterValue;
        filterButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === filterValue;
            btn.classList.toggle('active', isActive);
        });
        renderProjects();
    }

    function handleHashNavigation({ forceScroll = false } = {}) {
        const hash = window.location.hash.slice(1);
        if (!hash) {
            return;
        }

        const projectExists = projects.some(project => project.id === hash);
        if (!projectExists) {
            return;
        }

        const navigated = scrollToProject(hash, { forceScroll });
        if (!navigated) {
            pendingHashNavigation = hash;
            if (currentFilter !== 'all') {
                setFilter('all');
            } else {
                renderProjects();
            }
        } else {
            pendingHashNavigation = null;
        }
    }

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            setFilter(filterValue);
        });
    });

    // Initialize
    loadProjects();
    window.addEventListener('hashchange', () => handleHashNavigation({ forceScroll: true }));
});
