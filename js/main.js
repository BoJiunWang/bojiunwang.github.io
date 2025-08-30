/**
 * Initializes the application functionality after the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeTooltips();
    initializeTypewriter();
    initializeNaughtyBug();
});

/**
 * Initializes all Bootstrap tooltips on the page.
 */
function initializeTooltips() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Sets up and runs the typewriter effect for the designated element.
 */
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const text = typewriterElement?.getAttribute('data-text');

    if (!typewriterElement || !text) {
        return;
    }

    // This regex tokenizes the string into an array of HTML tags and individual characters.
    const tokens = text.match(/<[^>]+>|./g) || [];
    const typingSpeed = 60;
    const deletingSpeed = 30;
    const pauseDuration = 2500;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const runTypewriter = async () => {
        // Infinite loop to keep the effect running
        while (true) {
            // Typing phase
            for (let i = 0; i < tokens.length; i++) {
                typewriterElement.innerHTML = tokens.slice(0, i + 1).join('');
                await sleep(typingSpeed);
            }
            await sleep(pauseDuration);

            // Deleting phase
            for (let i = tokens.length; i > 0; i--) {
                typewriterElement.innerHTML = tokens.slice(0, i - 1).join('');
                await sleep(deletingSpeed);
            }
            await sleep(pauseDuration / 2);
        }
    };

    runTypewriter();
}

/**
 * Initializes the interactive "naughty bug" feature.
 */
function initializeNaughtyBug() {
    const bug = document.getElementById('naughty-bug');
    const bugIcon = document.getElementById('bug');

    if (!bug || !bugIcon) {
        return;
    }

    let hoverCount = 0;
    const maxHovers = 3;
    const animationDuration = 500; // Should match the CSS transition duration

    const moveBug = () => {
        const vh = window.innerHeight - bug.offsetHeight;
        const vw = window.innerWidth - bug.offsetWidth;

        const newTop = Math.floor(Math.random() * vh);
        const newLeft = Math.floor(Math.random() * vw);
        const rotation = Math.floor(Math.random() * 720) - 360;
        const scale = 0.8 + Math.random() * 0.7;
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 31);
        const lightness = 50 + Math.floor(Math.random() * 21);
        const blur = Math.random() * 2;
        const opacity = 0.7 + Math.random() * 0.3;

        bug.style.top = `${newTop}px`;
        bug.style.left = `${newLeft}px`;
        bug.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        bug.style.filter = `blur(${blur}px)`;
        bug.style.opacity = opacity;
        bugIcon.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const handleBugHover = () => {
        bug.removeEventListener('mouseover', handleBugHover);
        hoverCount++;

        if (hoverCount < maxHovers) {
            moveBug();
            setTimeout(() => {
                bug.addEventListener('mouseover', handleBugHover);
            }, animationDuration);
        } else {
            bug.classList.add('bug-poof');
            setTimeout(() => {
                const tooltipInstance = bootstrap.Tooltip.getInstance(bugIcon);
                tooltipInstance?.hide();
                bug.remove();
            }, animationDuration);
        }
    };

    bug.style.display = 'block';
    setTimeout(() => {
        moveBug();
        bug.addEventListener('mouseover', handleBugHover);
    }, 10);
}
/**
 * Toggles the website's theme between light and dark modes.
 * This function is intended to be called from an `onclick` attribute in the HTML.
 */
function toggleDarkLight() {
    const htmlElement = document.documentElement;
    const toggleButton = document.getElementById('toggleDarkLight');

    if (!toggleButton) {
        console.error("Theme toggle button with id 'toggleDarkLight' not found.");
        return;
    }

    const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    const newIcon = isDark ? 'fa-moon' : 'fa-sun';
    const oldIcon = isDark ? 'fa-sun' : 'fa-moon';
    const newTooltipText = isDark ? 'Dark Mode' : 'Light Mode';

    htmlElement.setAttribute('data-bs-theme', newTheme);

    const buttonIcon = toggleButton.firstElementChild;
    if (buttonIcon) {
        buttonIcon.classList.remove(oldIcon);
        buttonIcon.classList.add(newIcon);
    }

    const tooltip = bootstrap.Tooltip.getInstance(toggleButton);
    if (tooltip) {
        tooltip.setContent({ '.tooltip-inner': newTooltipText });
    }
}