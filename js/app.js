// VARIABLES
const carrito = document.querySelector("#carrito");
const listaFrutas = document.querySelector("#lista-frutas");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];



cargarEventListeners();
// EVENTLISTENERS

function cargarEventListeners() {
     listaFrutas.addEventListener("click", agregarFrutas);
     carrito.addEventListener("click", eliminarFrutas);
     vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}


// Funciones
// ----------------------------Función que añade el curso al carrito------------------------------------------------
function agregarFrutas(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if (e.target.classList.contains('agregar-carrito')) {
          const fruta = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosFrutas(fruta);
     }
}

// --------------------------------------------------------------------------------------------------------------

//----------------------------------------- Lee los datos del curso---------------------------------------------
function leerDatosFrutas(frutas) {
     const infoFrutas = {
          imagen: frutas.querySelector('img').src,
          titulo: frutas.querySelector('h4').textContent,
          precio: frutas.querySelector('.precio span').textContent,
          id: frutas.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     if (articulosCarrito.some(frutas => frutas.id === infoFrutas.id)) {
          const frutas = articulosCarrito.map(frutas => {
               if (frutas.id === infoFrutas.id) {
                    frutas.cantidad++;
                    return frutas;
               } else {
                    return frutas;
               }
          })
          articulosCarrito = [...frutas];
     } else {
          articulosCarrito = [...articulosCarrito, infoFrutas];
     }
     carritoHTML();
}

// ----------------------------------------------------------------------------------------------------------------

// -------------------------------Elimina el curso del carrito en el DOM--------------------------------------------
function eliminarFrutas(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-frutas')) {
          // e.target.parentElement.parentElement.remove();
          const frutaId = e.target.getAttribute('data-id')

          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(frutas => frutas.id !== frutaId);

          carritoHTML();
     }
}

//-------------------------------------- Muestra el curso seleccionado en el Carrito--------------------------------
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(frutas => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>  
                   <img src="${frutas.imagen}" width=100>
              </td>
              <td>${frutas.titulo}</td>
              <td>${frutas.precio}</td>
              <td>${frutas.cantidad} </td>
              <td>
                   <a href="#" class="borrar-frutas" data-id="${frutas.id}">X</a>
              </td>
         `;
          contenedorCarrito.appendChild(row);
     });
}
// ------------------------------------------------------------------------------------------------------------------

// ------------------------------------------Elimina los cursos del carrito en el DOM-----------------------------
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';

     // forma rapida (recomendada)
     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
// -----------------------------------------------------------------------------------------------------------------







