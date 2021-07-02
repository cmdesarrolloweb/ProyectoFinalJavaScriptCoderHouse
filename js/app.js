//LOAD CON JQUERY
$(window).on('load', function() {
    console.log("El sitio ya se cargó completo (las imágenes también)");
});
//Obtenemos los elementos por ID y lo asignamos a una constante
const cards = document.getElementById('cards')
const itemsCarrito = document.getElementById('itemsCarrito')
const footer = document.getElementById('footer')
const mostrarItemsCarrito = document.getElementById('mostrarItemsCarrito')

//Obtenemos el template que pegamos en el HTML mediante su ID. Los template no los lee el HTML por lo que podemos dejarlos pegados en cualquier parte de nuestro HTMl
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const templateMostrarItemsCarrito = document.getElementById('template-mostrar-items-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { 
    fetchProductos()
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        renderizaCarrito()
    }
})
cards.addEventListener('click', e => { agregarCarrito(e) })
itemsCarrito.addEventListener('click', e => { btnAccion(e) })
itemsCarrito.addEventListener('click', e => { btnEliminarProducto(e) })

// Traer productos
const fetchProductos = async () => {
    try {
        const res = await fetch('js/catalogoProductos.json')
        const productos = await res.json()
        // console.log(productos)
        renderizaCard(productos)
    } catch (error) {
        console.log(error)
    }
}

//Renderizamos todos los productos mediante el templateCard
const renderizaCard = productos => {
    // console.log(productos)
    productos.forEach(producto => {
        templateCard.querySelector('h5.card-title').textContent = producto.nombre
        templateCard.querySelector('span.precio').textContent = producto.precio
        templateCard.querySelector('img.imagen-producto').setAttribute("src", producto.imagen)
        templateCard.querySelector('img.imagen-producto').setAttribute("title", producto.nombre)
        // templateCard.querySelector('a.link-imagen').setAttribute("href", producto.imagen)
        // templateCard.querySelector('a.link-imagen').setAttribute("data-toggle", "lightbox")
        // templateCard.querySelector('a.link-imagen').setAttribute("alt", producto.nombre)
        templateCard.querySelector('button.btn-agregar').setAttribute("id", "btnAgregar")
        templateCard.querySelector('button.btn-agregar').textContent = "AGREGAR"
        templateCard.querySelector('button.btn-agregar').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

//Agregar al carrito
const agregarCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('agregar-carrito'))
    //Accedemos a parentElement del boton para llevarnos toda la info de la card que es la info de un producto en si, mediante el click en el botón Agregar.
    if(e.target.classList.contains('btn-agregar')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation() //Sirve para detener cualquier otro evento que se pueda generar en cards
}

const setCarrito = objeto => {
    // console.log(objeto)
    
    const producto = {
        id: objeto.querySelector('button.btn-agregar').dataset.id,
        nombre: objeto.querySelector('h5.card-title').textContent,
        precio: objeto.querySelector('span.precio').textContent,
        imagen: objeto.querySelector('img.imagen-producto').getAttribute("src"),
        cantidad: 1
    }

    //realizamos la operación para que cada vez que se presione el botón comprar de un mismo producto, aumente la cantidad.
    //El método hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada, en este caso el id de producto
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1 
    }

    carrito[producto.id] = {...producto}
    renderizaCarrito()
    
}

const renderizaCarrito = () => {
    itemsCarrito.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('span.id-producto').textContent = producto.id
        templateCarrito.querySelector('h5.cart-item-name').textContent = producto.nombre
        templateCarrito.querySelector('img.img-product').setAttribute("src", producto.imagen)
        templateCarrito.querySelector('img.img-product').setAttribute("title", producto.nombre)
        templateCarrito.querySelector('span.cantidad-number').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-plus').dataset.id = producto.id
        templateCarrito.querySelector('.btn-less').dataset.id = producto.id
        templateCarrito.querySelector('.btn-eliminar-producto').dataset.id = producto.id
        templateCarrito.querySelector('span.price-number').textContent = (producto.cantidad * producto.precio).toFixed(2)

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCarrito.appendChild(fragment)

    renderizarContadorCarrito()
    renderizarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const renderizarContadorCarrito = () => {
    mostrarItemsCarrito.innerHTML = ''
    
    // sumar cantidad 
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    templateMostrarItemsCarrito.querySelector('span#cantidad').textContent = nCantidad

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
    templateFooter.querySelectorAll('span.total')[0].textContent = nPrecio.toFixed(2)
    templateFooter.querySelectorAll('span.total')[1].textContent = nPrecio.toFixed(2)

    
    

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        renderizaCarrito()
        footer.innerHTML = `
        <div class="no-cart-products-msg-container">
            <h4 class="text-center">El carro está vacío</h4>
            <img src="https://rapisuper.com.ar/cdn/images/cart/empty_cart.svg" class="no-cart-products-img">
            <button type="button" name="button" title="" class="button rs-button btn-primario vs-button-filled" style="text-align: center;">
            <span class="button-backgroundx button--background" style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s;"></span>
            <span class="button-text button--text">Ir al catálogo</span>
            <span class="button-linex" style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%);"></span>
            </button>
        </div>
        `

    })
}

//Función para darle funcionalidad a los botones + y - que aparecen en el carrito
const btnAccion = e => {
    //  console.log(e.target)
    //Acción de Aumentar
    if (e.target.classList.contains('btn-plus')){
        // console.log(carrito[e.target.dataset.id])
        // carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        renderizaCarrito()
    }
    if (e.target.classList.contains('btn-less')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        //Al detectar que el valor es 0(cero), elimina el producto del carrito
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        renderizaCarrito()
    }
    e.stopPropagation()
}

//Función para que al precionar el otón eliminar de un producto en el carrito, se elimine del mismo
const btnEliminarProducto = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-eliminar-producto')) {
        //console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        delete carrito[e.target.dataset.id]
        renderizaCarrito()
    }
}

//Start::ScrollToTop
$('.ir-arriba').click(function(){
    $('body, html').animate({
        scrollTop: '0px'
    }, 300);
});

$(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
        $('.ir-arriba').slideDown(300);
    } else {
        $('.ir-arriba').slideUp(300);
    }
});
//End::ScrollToTop