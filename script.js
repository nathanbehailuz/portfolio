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
        themeIcon.className = 'fas fa-moon text-blue-600';
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            // Switch to dark mode
            body.classList.remove('light-mode');
            themeIcon.className = 'fas fa-sun text-yellow-400';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            body.classList.add('light-mode');
            themeIcon.className = 'fas fa-moon text-blue-600';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Rotating text animation
    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        const roles = [
            { text: 'CS Student', color: 'text-cyan-400' },
            { text: 'AI Researcher', color: 'text-emerald-400' },
            { text: 'Software Engineer', color: 'text-amber-400' }
        ];
        
        let currentIndex = 0;
        
        function updateText() {
            const currentRole = roles[currentIndex];
            rotatingText.textContent = currentRole.text;
            rotatingText.className = `inline-block transition-all duration-500 ease-in-out ${currentRole.color}`;
            currentIndex = (currentIndex + 1) % roles.length;
        }
        
        // Start the animation
        updateText();
        setInterval(updateText, 2000); // Change every 2 seconds
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