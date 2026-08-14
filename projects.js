// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let projects = [];
    let currentFilter = null;
    const filterMapping = {
        'websites': 'Web',
        'ml': 'ML',
        'mobile': 'Mobile',
        'finance': 'Finance'
    };
    let pendingHashNavigation = null;

    const inactiveBtnClasses = ['border-outline-variant', 'text-on-surface-variant'];
    const activeBtnClasses = ['border-primary', 'text-primary'];

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

    function renderProjects() {
        let filteredProjects = projects;

        if (currentFilter) {
            const targetTag = filterMapping[currentFilter];
            if (targetTag) {
                filteredProjects = projects.filter(project =>
                    project.tags.includes(targetTag)
                );
            }
        }

        projectsGrid.innerHTML = '';

        filteredProjects.forEach((project) => {
            projectsGrid.appendChild(createProjectCard(project));
        });

        if (pendingHashNavigation) {
            const navigated = scrollToProject(pendingHashNavigation, { forceScroll: true });
            if (navigated) {
                pendingHashNavigation = null;
            }
        }
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.id = project.id;
        card.setAttribute('data-accent', project.titleColor || 'text-primary');

        card.innerHTML = `
            <div class="flex-1 min-w-0">
                <h3 class="font-body-md text-body-md font-semibold mb-3">
                    <a href="#${project.id}" class="project-title-link inline-flex items-center gap-3 ${project.titleColor || 'text-primary'}">
                        <i class="${project.icon} text-lg ${project.iconColor || ''}"></i>
                        <span>${project.name}</span>
                    </a>
                </h3>
                <ul class="text-on-surface-variant mb-4 leading-relaxed font-body-sm text-body-sm list-disc list-inside space-y-1">
                    ${project.description.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <div class="project-tags">
                    ${project.tools.map(tool => `<span class="project-tag">${tool}</span>`).join('')}
                </div>
            </div>
            <div class="project-actions">
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

    function setFilterButtonState(button, isActive) {
        inactiveBtnClasses.forEach((cls) => button.classList.remove(cls));
        activeBtnClasses.forEach((cls) => button.classList.remove(cls));
        button.classList.toggle('active', isActive);

        if (isActive) {
            activeBtnClasses.forEach((cls) => button.classList.add(cls));
        } else {
            inactiveBtnClasses.forEach((cls) => button.classList.add(cls));
        }

        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    function updateFilterButtons() {
        filterButtons.forEach((button) => {
            setFilterButtonState(button, button.dataset.filter === currentFilter);
        });
    }

    function setFilter(filterValue) {
        currentFilter = currentFilter === filterValue ? null : filterValue;
        updateFilterButtons();
        renderProjects();
    }

    function clearFilter() {
        currentFilter = null;
        updateFilterButtons();
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
            if (currentFilter) {
                clearFilter();
            } else {
                renderProjects();
            }
        } else {
            pendingHashNavigation = null;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setFilter(button.dataset.filter);
        });
    });

    loadProjects();
    window.addEventListener('hashchange', () => handleHashNavigation({ forceScroll: true }));
});
