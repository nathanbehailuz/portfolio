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

        // Get unique color for each project based on project name hash
        const projectColors = [
            { bg: 'bg-cyan-400/20', text: 'text-cyan-400', hover: 'rgba(34, 211, 238, 0.5)' },
            { bg: 'bg-emerald-400/20', text: 'text-emerald-400', hover: 'rgba(16, 185, 129, 0.5)' },
            { bg: 'bg-purple-400/20', text: 'text-purple-400', hover: 'rgba(168, 85, 247, 0.5)' },
            { bg: 'bg-pink-400/20', text: 'text-pink-400', hover: 'rgba(236, 72, 153, 0.5)' },
            { bg: 'bg-orange-400/20', text: 'text-orange-400', hover: 'rgba(251, 146, 60, 0.5)' },
            { bg: 'bg-indigo-400/20', text: 'text-indigo-400', hover: 'rgba(99, 102, 241, 0.5)' },
            { bg: 'bg-teal-400/20', text: 'text-teal-400', hover: 'rgba(45, 212, 191, 0.5)' },
            { bg: 'bg-rose-400/20', text: 'text-rose-400', hover: 'rgba(251, 113, 133, 0.5)' },
            { bg: 'bg-lime-400/20', text: 'text-lime-400', hover: 'rgba(163, 230, 53, 0.5)' },
            { bg: 'bg-violet-400/20', text: 'text-violet-400', hover: 'rgba(139, 92, 246, 0.5)' }
        ];

        // Generate consistent color based on project name
        let hash = 0;
        for (let i = 0; i < project.name.length; i++) {
            hash = ((hash << 5) - hash + project.name.charCodeAt(i)) & 0xffffffff;
        }
        const colorIndex = Math.abs(hash) % projectColors.length;
        const colors = projectColors[colorIndex];
        card.dataset.hoverColor = colors.hover;

        card.innerHTML = `
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-3">
                    <a href="#${project.id}" class="inline-flex items-center gap-3 no-underline ${project.titleColor} hover:underline">
                        <i class="${project.icon} ${project.iconColor} text-lg"></i>
                        <span>${project.name}</span>
                    </a>
                </h3>
                <ul class="text-[#A0A0A0] mb-4 leading-relaxed text-sm list-disc list-inside space-y-1">
                    ${project.description.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <div class="project-tags mb-4">
                    ${project.tools.map(tool => `<span class="project-tag ${colors.text}">${tool}</span>`).join('')}
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
            </div>
        `;

        // Add hover effect with unique color
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = colors.hover;
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
        });

        return card;
    }

    function scrollToProject(projectId, { forceScroll = false } = {}) {
        const card = document.getElementById(projectId);
        if (!card) {
            return false;
        }

        const highlightColor = card.dataset.hoverColor || 'rgba(34, 211, 238, 0.5)';
        card.classList.add('highlight');
        card.style.borderColor = highlightColor;
        card.style.boxShadow = `0 0 0 2px ${highlightColor}`;

        if (forceScroll) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (card.dataset.highlightTimeout) {
            clearTimeout(Number(card.dataset.highlightTimeout));
        }

        const timeoutId = window.setTimeout(() => {
            card.classList.remove('highlight');
            card.style.borderColor = '';
            card.style.boxShadow = '';
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
