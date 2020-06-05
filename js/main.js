$(function () {
    $('[data-toggle="tooltip"]').each(function () {
        $(this).tooltip();
    });

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

    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        $("body").addClass("dark-mode");
    
    // Best Wishes for YOU
    console.log("---\nMay the grace of the Lord Jesus Christ, and the love of God,\nand the fellowship of the Holy Spirit be with you all.\n(2 Corinthians 13:14, New International Version)\n---")
});

function toggleDarkLight() {
    $("body").toggleClass("dark-mode");
}

function cancelOpacityAndRunScale(element) {
    // Find Old element and remove it
    var logoStr = document.getElementById("logoStr");
    logoStr && element.removeChild(logoStr);

    // Create New Logo String
    var logoStrDiv = document.createElement('div');
    logoStrDiv.setAttribute("id", "logoStr");
    logoStrDiv.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2F9BD6;font-weight:700">GAME</span><span style="color:#EF8218;font-weight:700">SOFa</span>';
    element.appendChild(logoStrDiv);

    // Update Logo Opacity
    element.style.opacity = 1;
    // Add runScale css
    $(element).addClass('runScale');

    // Animation End Callback
    element.addEventListener('animationend', function () {
        // Reset Opacity
        element.style.opacity = 0.25;
        // Remove runScale css
        $(element).removeClass('runScale')
        // Remove New Logo String
        var logoStr = document.getElementById("logoStr");
        logoStr && element.removeChild(logoStr);
        // Hide tooltip
        $('#gamesofaLogo').tooltip('hide');
    });
}
