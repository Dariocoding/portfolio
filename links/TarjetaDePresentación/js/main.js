$(document).ready(function(){

	// Objeto del Banner
	var banner = {
		padre: $('#banner'),
		numeroSlides: $('#banner').children('.slide').length,
		posicion: 1
    };
    
    var info = {
		padre: $('#info'),
		numeroSlides: $('#info').children('.slide').length,
		posicion: 1
	};

	// Establecemos que el primer slide aparecera desplazado
	banner.padre.children('.slide').first().css({
		'left': 0
    });

    info.padre.children('.slide').first().css({
		'left': 0
    });
    
    
    // Calculamos el tamaño del banner con el metodo .outerHeight();
    var altoBanner = function(){
        var alto = banner.padre.children('.slide').outerHeight();

    // Lo incluimos el css
        banner.padre.css({
            'height': alto + 'px'
        });
    }

    var altoInfo = function(){
        var alto = info.padre.children('.active').outerHeight();

        info.padre.animate({
            'height': alto + 'px'
        });
    }

    var altoContenedor = function(){
        var altoVentana = $(window).height();

        if(altoVentana <= $('#contenedor').outerHeight() + + 200) {
            $('#contenedor').css ({
                'height': ''
            });

        } else {
            $('#contenedor').css ({
                'height': altoVentana + 'px'

            });
        }
    }


    // Cada que inicie la pagina iniciará la función
    altoBanner();
    altoInfo();

    // Cada, que la ventana, la imagen cambie de tamaño 
    // tambien cambiará de tamaño el banner
    $(window).resize(function(){
        altoBanner();
        altoInfo();
    });

    $('#info').children('.slide').each(function(){
        $('#botones').append('<span>');
    });

    $('#botones').children('span').first().addClass('active');

                     // BANNER
    // Boton siguiente
    $('#banner-next').on('click', function(e){
        e.preventDefault();

        banner.padre.children().not('.active').css({
            'left': '100%'

        });

        if(banner.posicion < banner.numeroSlides){

            // Todos los elementos hijos de nuestra propiedad que no tengan la propiead active les cambie el estilo css
            banner.padre.children().not('.active').css({
                'left': '100%'
            });
    
             // Removemos la clase active y se la añadimos a la siguiente
        $('#banner .active').removeClass('active').next().addClass('active').animate({
            'left': 0
        });

        // Hacer la animación completa para la izquierda
        $('#banner .active').prev().animate({
            'left': "-100%"

        });

        // Incrementa hasta llegar a cuatro y en el else se reinicia
        banner.posicion = banner.posicion + 1
        } else {
            //  Mover la imagen para la izquierda
            $('#banner .active').animate({
                'left': '-100%'

            });

            // Le decimos que a nuestra propiedad padre hijos remueva la ultima clase y añada la clase active para repetir el proceso
            $('banner .active').removeClass('active');
            banner.padre.children('.slide').first().addClass('active').animate({
                'left': 0
            });

            // La posición vuelve a ser uno
            banner.posicion = 1;
        }

    });

    // Boton Anterior
    $('#banner-prev').on('click', function(e){
        e.preventDefault();

        if(banner.posicion > 1){

				// Nos asegramos de todos los elementos hijos (que no sean) .active
				// se posicionen a la izquierda
            banner.padre.children().not('.active').css({
                'left': '-100%'
            });
            // Deslpazamos el slide activo de izquierda a derecha
            $('#banner .active').animate({
                'left': '100%'
            });

            // Eliminamos la clase active y se la ponemos al slide anterior.
				// Y lo animamos
            $('#banner .active').removeClass('active').prev().addClass('active').animate({
                'left': 0
            })

            // Reiniciamos la posicion a 1
            banner.posicion = banner.posicion -1 ;

        } else {
            banner.padre.children().not('.active').css({
                'left': '-100%'
            });
            // Animamos el slide activo hacia la derecha
            $('#banner .active').animate({
                'left': '100%'
            });

				// Eliminamos la clase active y se la ponemos al primer elemento.
				// Despues lo animamos.
            $('#banner .active').removeClass('active');
            banner.padre.children().last().addClass('active').animate({
                'left': 0
            });
            
				// Reseteamos la posicion a 1
            banner.posicion = banner.numeroSlides;
        }

    });

                 // INFO
    // Boton siguiente
    $('#info-next').on('click', function(e){
        e.preventDefault();

        info.padre.children().not('.active').css({
            'left': '100%'

        });

        if(info.posicion < info.numeroSlides){

            // Todos los elementos hijos de nuestra propiedad que no tengan la propiead active les cambie el estilo css
            info.padre.children().not('.active').css({
                'left': '100%'
            });
    
             // Removemos la clase active y se la añadimos a la siguiente
        $('#info .active').removeClass('active').next().addClass('active').animate({
            'left': 0
        });

        // Hacer la animación completa para la izquierda
        $('#info .active').prev().animate({
            'left': "-100%"

        });

        $('#botones').children('.active').removeClass('active').next().addClass('active');

        // Incrementa hasta llegar a cuatro y en el else se reinicia
        info.posicion = info.posicion + 1
        } else {
            //  Mover la imagen para la izquierda
            $('#info .active').animate({
                'left': '-100%'

            });

            // Le decimos que a nuestra propiedad padre hijos remueva la ultima clase y añada la clase active para repetir el proceso
            $('info .active').removeClass('active');
            info.padre.children('.slide').first().addClass('active').animate({
                'left': 0
            });

            $('#botones').children('.active').removeClass('active');
            $('#botones').children('span').first().addClass('active');

            // La posición vuelve a ser uno
            info.posicion = 1;
        }
        altoInfo();

    });

    // Boton Anterior
    $('#info-prev').on('click', function(e){
        e.preventDefault();

        if(info.posicion > 1){

				// Nos asegramos de todos los elementos hijos (que no sean) .active
				// se posicionen a la izquierda
            info.padre.children().not('.active').css({
                'left': '-100%'
            });
            // Deslpazamos el slide activo de izquierda a derecha
            $('#info .active').animate({
                'left': '100%'
            });

            // Eliminamos la clase active y se la ponemos al slide anterior.
				// Y lo animamos
            $('#info .active').removeClass('active').prev().addClass('active').animate({
                'left': 0
            })

            $('#botones').children('.active').removeClass('active').prev().addClass('active');

            // Reiniciamos la posicion a 1
            info.posicion = info.posicion -1 ;

        } else {
            info.padre.children().not('.active').css({
                'left': '-100%'
            });
            // Animamos el slide activo hacia la derecha
            $('#info .active').animate({
                'left': '100%'
            });

				// Eliminamos la clase active y se la ponemos al primer elemento.
				// Despues lo animamos.
            $('#info .active').removeClass('active');
            info.padre.children().last().addClass('active').animate({
                'left': 0
            });

            $('#botones').children('.active').removeClass('active');
            $('#botones').children('span').last().addClass('active');
				// Reseteamos la posicion a 1
            info.posicion = info.numeroSlides;
        }
        altoInfo();

    });
});