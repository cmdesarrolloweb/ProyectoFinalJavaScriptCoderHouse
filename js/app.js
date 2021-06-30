//LOAD CON JQUERY
$(window).on('load', function() {
    console.log("El sitio ya se cargó completo (las imágenes también)");
});

$(document).ready(function() {
    $(".btn-eliminar").click(function(e) {
        //Obtenemos hijos del padre <div> desde el target
        let hijos = $(e.target).parent().children();
        //Primer input, valor de ID oculto
        console.log(hijos[0].value);
        //Animaciòn de respuesta de compra
        $(e.target).parent().slideUp("slow");
    });
});

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

document.addEventListener('DOMContentLoaded', () => {
    fetchProductos()
})

cards.addEventListener('click', e => {
    agregarCarrito(e)
})

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
        templateCard.querySelector('p.precio').textContent = producto.precio
        templateCard.querySelector('img.imagen-producto').setAttribute("src", producto.imagen)
        templateCard.querySelector('img.imagen-producto').setAttribute("title", producto.nombre)
        templateCard.querySelector('a.link-imagen').setAttribute("href", producto.imagen)
        templateCard.querySelector('a.link-imagen').setAttribute("data-lightbox", "producto-"+producto.id)
        templateCard.querySelector('a.link-imagen').setAttribute("alt", producto.nombre)
        templateCard.querySelector('button.btn-agregar').setAttribute("id", "btnAgregar")
        templateCard.querySelector('button.btn-agregar').textContent = "AGREGAR"
        templateCard.querySelector('button.btn-agregar').dataset.id = producto.id


        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        
    })
    cards.appendChild(fragment)
}

const agregarCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('agregar-carrito'))
    //Accedemos a parentElement del boton para llevarnos toda la info de la card que es la info de un producto en si, mediante el click en el botón Agregar.
    if(e.target.classList.contains('agregar-carrito')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation() //Sirve para detener cualquier otro evento que se pueda generar en cards
}

const setCarrito = objeto => {
    // console.log(objeto)
    
    const producto = {
        id: objeto.querySelector('button.btn-agregar').dataset.id,
        nombre: objeto.querySelector('h5.card-title').textContent,
        precio: objeto.querySelector('p.precio').textContent,
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
    // console.log(carrito)
    itemsCarrito.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('span.d-none').textContent = producto.id
        templateCarrito.querySelector('h5.item-nombre-producto').textContent = producto.nombre
        templateCarrito.querySelector('img').setAttribute("src", producto.imagen)
        templateCarrito.querySelector('img').setAttribute("title", producto.nombre)
        templateCarrito.querySelector('span.cantidad').textContent = producto.cantidad
        templateCarrito.querySelector('button.btn-plus').dataset.id = producto.id
        templateCarrito.querySelector('button.btn-less').dataset.id = producto.id
        templateCarrito.querySelector('button.btn-eliminar').textContent = "ELIMINAR"
        templateCarrito.querySelector('h5.precio-numero').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCarrito.appendChild(fragment)

    renderizarContadorCarrito()
    renderizarFooter()
}

const renderizarContadorCarrito = () => {
    mostrarItemsCarrito.innerHTML = ''
    
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    
    
    templateMostrarItemsCarrito.querySelector('span#cantidad').textContent = nCantidad

    const clone = templateMostrarItemsCarrito.cloneNode(true)
    fragment.appendChild(clone)
    mostrarItemsCarrito.appendChild(fragment)

}

const renderizarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).leght === 0) {
        footer.innerHTML = `
        <div class="no-cart-products-msg-container">
            <h2 class="text-center">El carro está vacío</h2>
            <img src="images/carro/empty_cart.svg" class="no-cart-products-img">
            <button type="button" name="button" class="vs-component vs-button rs-button vs-button-primary vs-button-filled" style="text-align: center;">
            <span class="vs-button-backgroundx vs-button--background" style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s;">
            </span>
            <span class="vs-button-text vs-button--text">Ir al catálogo</span>
            <span class="vs-button-linex" style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%);"></span>
            </button>
        </div>
        `
        return
    }

    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.querySelector('span#precioTotal').textContent = nPrecio.toFixed(2)
    

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('btnVaciarCarrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        renderizaCarrito()
    })
}

//ScrollToTop
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