$(function() {
    $('[data-toggle="tooltip"]').each(function(){
        $(this).tooltip();
    });

    var divSize = ((Math.random()*100) + 50).toFixed();
    var posX = (Math.random() * ($(document).width() - divSize)).toFixed();
    var posY = (Math.random() * ($(document).height() - divSize)).toFixed();

    var timer = window.setInterval(function(){
                    $('#bug').css({
                        'color':'#'+ Math.round(0xffffff * Math.random()).toString(16)
                    });
                }, 1000);

    $('#naughty-bug').css({
        'position': 'absolute',
        'left': posX+'px',
        'top': posY+'px',
    });
    
    $('#naughty-bug').fadeIn(1000).delay(8000).fadeOut(1000, function(){
        clearInterval(timer);
        $('#bug').tooltip('hide');
        $(this).remove();
    }); 
});