//Validacion formulario
// Ejemplo de JavaScript de inicio para deshabilitar el envío de formularios si hay campos no válidos
(function () {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    // Bucle sobre ellos y evitar el submit
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Obtenemos los elementos por ID y lo asignamos a una constante
const itemsCarrito = document.getElementById('itemsCarrito')
const footer = document.getElementById('footer')

//Obtenemos el template que pegamos en el HTML mediante su ID. Los template no los lee el HTML por lo que podemos dejarlos pegados en cualquier parte de nuestro HTMl
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment()
const procesarCompraBtn = document.getElementById('procesar-compra')
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const localidad = document  .getElementById('localidad')
const provincia = document.getElementById('provincia')

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        renderizaCarritoCompra()
    }
})
itemsCarrito.addEventListener('click', e => { btnEliminarProducto(e) })
//cuando se selecciona procesar Compra
procesarCompraBtn.addEventListener('click', procesarCompra);

function procesarCompra() {
    //Valudamos que el carrito sea igual a cero, si cumple,
    //levanta un alert diciendo que no hay productos y redirecciona al index o al catalogo
    if (Object.keys(carrito).length === 0 ) {
        Swal.fire({
            type: 'error',
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2500
        }).then(function () {
            window.location = "index.html";
        })
    //si no entra al if anterior, pasa por acá a validar los campos del formulario.
    }else if (nombre.value === '' || apellido.value === '' || correo.value === '' || localidad.value === '' || provincia.value === '') {
        Swal.fire({
            type: 'error',
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son requeridos. Por favor Ingréselos.',
            showConfirmButton: false,
            timer: 2500
        })
    //Por último, simulamos un envío. Estoy viendo la forma de implementar emailJS
    }else {
        
       const cargandoGif = document.querySelector('#cargando')
       cargandoGif.style.display = 'block'

       const enviado = document.createElement('img')
       enviado.src = 'images/mail.gif'
       enviado.style.display = 'block'
       enviado.style.width = '150px'

       setTimeout(() => {
        cargandoGif.style.display = 'none'
        document.querySelector('#loaders').appendChild(enviado)
       }, 3000)

    }
}

const renderizaCarritoCompra = () => {
    itemsCarrito.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('span.id-producto').textContent = producto.id
        templateCarrito.querySelector('h5.cart-item-name').textContent = producto.nombre
        templateCarrito.querySelector('img.img-product').setAttribute("src", producto.imagen)
        templateCarrito.querySelector('img.img-product').setAttribute("title", producto.nombre)
        templateCarrito.querySelector('span.cantidad-number').textContent = producto.cantidad
        templateCarrito.querySelector('span.price-number').textContent = (producto.cantidad * producto.precio).toFixed(2)
        templateCarrito.querySelector('.btn-eliminar-producto').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCarrito.appendChild(fragment)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderizarFooter()
}

const renderizarContadorCarrito = () => {
    mostrarItemsCarrito.innerHTML = ''
    
    // sumar cantidad 
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)

    const clone = templateMostrarItemsCarrito.cloneNode(true)
    fragment.appendChild(clone)
    mostrarItemsCarrito.appendChild(fragment)

}

const renderizarFooter = () => {
    footer.innerHTML = ''

    // sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    const iva = nPrecio * 0.21
    const totalMasIva = nPrecio + iva
    templateFooter.querySelector('span.cantidad').textContent = "(" + nCantidad + ")"
    templateFooter.querySelector('span.total').textContent = nPrecio.toFixed(2)
    templateFooter.querySelector('span.iva').textContent = iva.toFixed(2)
    templateFooter.querySelector('span.totalmasiva').textContent = totalMasIva.toFixed(2)


    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
}

//Función para que al precionar el otón eliminar de un producto en el carrito, se elimine del mismo
const btnEliminarProducto = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-eliminar-producto')) {
        //console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        delete carrito[e.target.dataset.id]
        renderizaCarritoCompra()
    }
}