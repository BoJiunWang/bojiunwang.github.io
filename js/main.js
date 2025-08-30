$(function () {
    // Initialize Bootstrap 5 tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    var divSize = ((Math.random() * 100) + 50).toFixed();
    var posX = (Math.random() * ($(document).width() - divSize)).toFixed();
    var posY = (Math.random() * ($(document).height() - divSize)).toFixed();

    var timer = window.setInterval(function () {
        $('#bug').css({
            'color': '#' + Math.round(0xffffff * Math.random()).toString(16)
        });
    }, 1000);

    $('#naughty-bug').css({
        'position': 'absolute',
        'left': posX + 'px',
        'top': posY + 'px'
    });

    $('#naughty-bug').fadeIn(1000).delay(8000).fadeOut(1000, function () {
        clearInterval(timer);
        $('#bug').tooltip('hide');
        $(this).remove();
    });

    /**
     * Bootstrap 5 Native Dark Mode Toggler
     */
    const themeManager = {
        getStoredTheme: () => localStorage.getItem('theme'),
        setStoredTheme: theme => localStorage.setItem('theme', theme),

        getPreferredTheme: () => {
            const storedTheme = themeManager.getStoredTheme();
            if (storedTheme) {
                return storedTheme;
            }
            // Fallback to system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        },

        setTheme: theme => {
            document.documentElement.setAttribute('data-bs-theme', theme);
            const icon = document.querySelector('#toggleDarkLight i');
            if (icon) {
                icon.classList.toggle('fa-sun', theme === 'dark');
                icon.classList.toggle('fa-moon', theme !== 'dark');
            }
        },

        init: () => {
            themeManager.setTheme(themeManager.getPreferredTheme());
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (!themeManager.getStoredTheme()) {
                    themeManager.setTheme(themeManager.getPreferredTheme());
                }
            });
        }
    };

    themeManager.init();

    // Initialize typewriter
    typewriterEffect();
});

function toggleDarkLight() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme); // Save user preference
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    const icon = document.querySelector('#toggleDarkLight i');
    if (icon) {
        icon.classList.toggle('fa-sun', newTheme === 'dark');
        icon.classList.toggle('fa-moon', newTheme !== 'dark');
    }
}

/**
 * JavaScript-based Typewriter Effect
 * This provides a more robust and flexible animation that handles text wrapping correctly.
 */
function typewriterEffect() {
    const el = $('#typewriter-text');
    if (!el.length) return;

    const fullText = el.data('text');
    if (!fullText) return;

    // Tokenize the string to handle HTML tags correctly.
    // This creates an array of single characters and full HTML tags.
    const tokens = fullText.match(/<[^>]+>|[^<]/g) || [];
    
    let i = 0;
    const typingSpeed = 60; // ms per character
    const deletingSpeed = 30; // ms per character
    const pauseDuration = 2500; // ms to wait before deleting/re-typing

    function type() {
        if (i < tokens.length) {
            el.html(tokens.slice(0, i + 1).join(''));
            i++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(deleteText, pauseDuration);
        }
    }

    function deleteText() {
        if (i > 0) {
            el.html(tokens.slice(0, i - 1).join(''));
            i--;
            setTimeout(deleteText, deletingSpeed);
        } else {
            setTimeout(type, pauseDuration / 2);
        }
    }

    type();
}