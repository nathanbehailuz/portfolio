async function loadIndexContent() {
    try {
        const response = await fetch('index.json');
        const data = await response.json();
        renderIntro(data.intro || []);
        renderSkills(data.skills || []);
    } catch (error) {
        console.error('Error loading index content:', error);
    }
}

function renderIntro(paragraphs) {
    const container = document.getElementById('intro-container');
    if (!container) return;

    container.innerHTML = '';

    paragraphs.forEach((paragraph) => {
        const p = document.createElement('p');
        const parts = Array.isArray(paragraph.parts) ? paragraph.parts : [{ text: paragraph }];

        parts.forEach((part) => {
            if (typeof part === 'string') {
                p.appendChild(document.createTextNode(part));
                return;
            }

            if (part.href) {
                const link = document.createElement('a');
                link.href = part.href;
                link.textContent = part.text;
                link.className = 'italic underline underline-offset-2 hover:text-primary transition-colors';
                p.appendChild(link);
                return;
            }

            if (part.highlight) {
                const highlight = document.createElement('span');
                highlight.textContent = part.text;
                highlight.style.color = part.color || 'blueviolet';
                p.appendChild(highlight);
                return;
            }

            p.appendChild(document.createTextNode(part.text || ''));
        });

        container.appendChild(p);
    });
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = '';

    skills.forEach((skill) => {
        const item = document.createElement('div');

        const title = document.createElement('h3');
        title.className = 'font-mono-label text-base font-bold text-primary mb-3 flex items-center gap-2';

        if (skill.icon) {
            const icon = document.createElement('span');
            icon.className = 'material-symbols-outlined text-[18px]';
            icon.textContent = skill.icon;
            title.appendChild(icon);
        }

        const label = document.createElement('span');
        label.textContent = skill.title;
        title.appendChild(label);

        const items = document.createElement('p');
        items.className = 'font-mono-sm text-[15px] text-on-surface-variant leading-relaxed';
        items.textContent = skill.items;

        item.appendChild(title);
        item.appendChild(items);
        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadIndexContent);
