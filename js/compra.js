//Validacion formulario
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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

let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        renderizaCarritoCompra()
    }
})
itemsCarrito.addEventListener('click', e => { btnEliminarProducto(e) })

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
    templateFooter.querySelector('span.cantidad').textContent = "(" + nCantidad + ")"
    templateFooter.querySelector('span.total').textContent = nPrecio.toFixed(2)


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