$(document).ready(function(){

    let links_object = {
        step: 0,
    }

    links_object = new Proxy(links_object, {
        set: function(target, prop, value) {
            // somefunc()
            return Reflect.set(target, prop, value);
        }
    });

    window.links_object = links_object

    $('[data-step="0"] button').click(function(){
        links_object.spep = 1
        Move()
    })
    $('[data-step="1"] button').click(function(){
        links_object.spep = 2
        Move()
    })
    $('[data-step="2"] button').click(function(){
        links_object.spep = 3
        Move()
    })
    $('[data-step="3"] button').click(function(){
        links_object.spep = 4
        Move()
    })
    $('[data-step="4"] button').click(function(){
        links_object.spep = 5
        Move()
    })

    let Move = () => {
        if (links_object.spep == 1) {
            $('[data-step="0"]').fadeOut(0)
            $('[data-step="quiz"]').css("display" , "flex")
            $('[data-step="1"]').css("display" , "flex")
            $('[data-step="2"]').fadeOut(0)
            $('[data-step="3"]').fadeOut(0)
            $('[data-step="4"]').fadeOut(0)
            $('[data-step="5"]').fadeOut(0)
            $('[data-el="nav"]').fadeOut(0)
        }
        if (links_object.spep == 2) {
            $('[data-step="0"]').fadeOut(0)
            $('[data-step="quiz"]').css("display" , "flex")
            $('[data-step="1"]').fadeOut(0)
            $('[data-step="2"]').css("display" , "flex")
            $('[data-step="3"]').fadeOut(0)
            $('[data-step="4"]').fadeOut(0)
            $('[data-step="5"]').fadeOut(0)
            $('[data-el="nav"]').fadeIn(300)
        }

        if (links_object.spep == 3) {
            $('[data-step="0"]').fadeOut(0)
            $('[data-step="quiz"]').css("display" , "flex")
            $('[data-step="1"]').fadeOut(0)
            $('[data-step="2"]').fadeOut(0)
            $('[data-step="3"]').css("display" , "flex")
            $('[data-step="4"]').fadeOut(0)
            $('[data-step="5"]').fadeOut(0)
            $('[data-el="nav"]').fadeIn(300)
        }
        if (links_object.spep == 4) {
            $('[data-step="0"]').fadeOut(0)
            $('[data-step="quiz"]').css("display" , "flex")
            $('[data-step="1"]').fadeOut(0)
            $('[data-step="2"]').fadeOut(0)
            $('[data-step="3"]').fadeOut(0)
            $('[data-step="4"]').css("display" , "flex")
            $('[data-step="5"]').fadeOut(0)
            $('[data-el="nav"]').fadeIn(300)
        }
        if (links_object.spep == 5) {
            $('[data-step="0"]').fadeOut(0)
            $('[data-step="quiz"]').css("display" , "flex")
            $('[data-step="1"]').fadeOut(0)
            $('[data-step="2"]').fadeOut(0)
            $('[data-step="3"]').fadeOut(0)
            $('[data-step="4"]').fadeOut(0)
            $('[data-step="5"]').css("display" , "flex")
            $('[data-el="nav"]').fadeOut(0)
        }
    }

    $(".styles_prev__dPaYf").click(function(){
        links_object.spep--
        Move()
    })

    $(".styles_next___Gqfa").click(function(){
        links_object.spep++
        Move()
    })


})