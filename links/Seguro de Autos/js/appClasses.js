// Cotizador constructor 

class Seguro {
    constructor(marca, anio, tipo ) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;

    }

    cotizarSeguro() {
        /*
            1 = Americano 1.15
            2 = asitico 1.05
            3 = europeo 1.35
        */
    
        let cantidad;
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                    break;
        }
         // leer el año 
         const diferencia = new Date().getFullYear() - this.anio;
         // Cada año de diferencia hay que reducir 3% el valor del seguro
         cantidad -= ((diferencia *3) * cantidad) / 100;
         /*
                 Si el seguro es basico se multiplica por 30% más
                 Si el seguro es completo 50% más
         */
         if(this.tipo === 'basico'){
             cantidad *= 1.30;
         }else {
             cantidad *= 1.50;
         }
         return cantidad.toFixed(2);
        
    }
    
}

// Interfaz del usuario
class Interfaz {
    // Mensaje que se imprime en el HTML
    mostrarError( mensaje , tipo) {
        const div = document.createElement('div');
    
         if(tipo === 'error') {
              div.classList.add('mensaje','error');
         } else {
              div.classList.add('mensaje','correcto');
         }
         div.innerHTML = `${mensaje}`;
         formulario.insertBefore(div, document.querySelector('.form-group'));
    
         setTimeout(function() {
              document.querySelector('.mensaje').remove();
         }, 3000);
    }
    // Imprime el resultado de la cotización
    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1':
                marca= 'Americana';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        // Crear un div
        const div = document.createElement('div');
        // Insertar la información 
        div.innerHTML = `
        <p class="header">Tu resumen:</p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${seguro.tipo} </p>
        <p>Total: $ ${total} </p>
        `;
        
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
       
    }

}
// Eventlistener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    // leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no estén vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
        // Interfaz imprimendo un error
        interfaz.mostrarError('Faltan datos revisar el formulario y prueba de nuevo', 'error');
    } else {
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }
        // Instanciar seguro mostrar infaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        // Mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarError('Cotizando...', 'correcto');
    }

});

// Seleccionamos el año actual 
const max = new Date().getFullYear(),
      // Restamos 20 años al año actual
      min = max -20;

      // Seleccionando el id en HTML
const selectAnios = document.getElementById('anio');

// Hacemos un for para escribir desde el año actual - 20 en HTML
for(let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}