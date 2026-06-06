document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const header = document.getElementById('header');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.className = 'fas fa-moon';
    }
    
    // Fall-in animations removed
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            // Switch to dark mode
            body.classList.remove('light-mode');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            body.classList.add('light-mode');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Rotating text animation
    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        const roles = ['CS Student', 'AI Researcher', 'Software Engineer'];
        
        let currentIndex = 0;
        
        function updateText(fade = true) {
            if (fade) {
                rotatingText.style.opacity = '0';
                setTimeout(() => {
                    rotatingText.textContent = roles[currentIndex];
                    rotatingText.style.opacity = '1';
                    currentIndex = (currentIndex + 1) % roles.length;
                }, 250);
            } else {
                rotatingText.textContent = roles[currentIndex];
                currentIndex = (currentIndex + 1) % roles.length;
            }
        }
        
        updateText(false);
        setInterval(() => updateText(true), 2000);
    }
    
    // Project icon click animations
    const projectIcons = document.querySelectorAll('.project-icon');
    
    projectIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove any existing animation class
            this.classList.remove('animate');
            
            // Force reflow to ensure the class removal is processed
            this.offsetHeight;
            
            // Add the animation class
            this.classList.add('animate');
            
            // Remove the animation class after animation completes
            setTimeout(() => {
                this.classList.remove('animate');
            }, 2000); // Match the longest animation duration
        });
    });
});