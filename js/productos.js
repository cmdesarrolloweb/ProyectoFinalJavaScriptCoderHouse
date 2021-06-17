const carroDeCompras = [];

const contenedorProductos = document.getElementById('listar-productos');
const contenedorCarrito = document.getElementById('productoEnCarrito');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

mostrarProductos(catalogoProductos);

//Agrego los productos en la página catalogo.html
    function mostrarProductos(array){
        contenedorProductos.innerHTML = ''
        array.forEach((productoNuevo)=>{
            let div = document.createElement('div')
            div.classList.add('items')
            div.setAttribute("class", "col-12 col-sm-4 mb-1 mb-md-4")
            div.innerHTML = `
                    <div class="card rounded-4" id="producto${productoNuevo.id}">
                        <div class="card-body text-center d-flex
                            d-md-block">
                            <div class="col-2 col-md-12">
                                <a href="images/productos/${productoNuevo.imagen}" data-lightbox="producto${productoNuevo.id}">
                                <img src="images/productos/${productoNuevo.imagen}" alt="Imagen Producto01" width="100%"></a>
                            </div>
                            <div class="col-6 col-md-12">
                                <h5 class="card-title fw-6 mt-1
                                    mb-1 mt-lg-3 mb-lg-3 ps-2 px-lg-3
                                    text-start text-md-center">${productoNuevo.nombre}</h5>
                            </div>
                            <div class="col-4 col-md-12">
                                <p class="card-text mb-1 mb-lg-4
                                    fw-9">$ ${productoNuevo.precio}</p>
                                <a class="agregar-carrito d-flex d-md-block
                                    card-link btn btn-primario
                                    col-12 mx-auto" id="boton${productoNuevo.id}">
                                    <span
                                        class="navbar-tool-icon
                                        shop-button
                                        material-icons
                                        align-middle">shopping_cart</span>&nbsp;<span
                                        class="align-middle">AGREGAR</span>
                                </a>
                            </div>
                        </div>
                    </div>`//el boton toma el id para hacer unico a ese boton, por eso se pone dentro del id y no fuera, no quiero tomar un dato para le html solo para hacer unico el boton.
            contenedorProductos.appendChild(div)
            
            let boton = document.getElementById(`boton${productoNuevo.id}`) // tomo todo dentro de boton para que sea unico
            
            boton.addEventListener('click', ()=>{
                agregarAlCarrito(productoNuevo.id)
             })
        })
    }


function agregarAlCarrito(id) {
    let productoAgregar = catalogoProductos.filter((el) => el.id == id)[0]
    carroDeCompras.push(productoAgregar)
    actualizarCarrito() // ver esta funcion a lo ultimo 
    
    contenedorCarrito.innerHTML = ''
    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <div class="item-lista-productos">
            <div class="item-lista-vista">
                <div class="item-carro-producto">
                    <h5 class="item-nombre-producto">${productoAgregar.nombre}</h5>
                    <div class="item-carro-detalle">
                        <div class="item-carro-detalle-left">
                            <div class="imgContenedor producto-img imgContenedor-hover">
                            <img src="images/productos/${productoAgregar.imagen}" alt="Imagen Producto" width="100%">
                            </div>
                            <div class="btn-eliminar-carro-item">
                                <button class="btn btn-eliminar font-semibold ml-2">ELIMINAR</button>
                            </div>
                        </div>
                        <div class="item-carro-detalle-right">
                            <div class="precio-contenedor">
                                <h5 class="precio-descriptcion">Subtotal:</h5>
                                <h5 class="precio-numero">$${productoAgregar.precio}</h5>
                            </div>
                            <div class="monto-input-contenedor">
                                <div>
                                    <p class="monto-texto">Cantidad</p>
                                    <div class="numero-input inline-flex">
                                        <button id="disminuir" type="button" onclick="disminuir()" class="btn-less input-number-button-less">
                                            <i class="vs-icon notranslate icon-scale material-icons null">remove</i>
                                        </button>
                                        <input id="cantidad" type="number" min="0" class="input-number-input" style="width: 9.1px;">
                                        <button id="aumentar" type="button" onclick="aumentar()" class="btn-plus input-number-button-plus">
                                            <i class="vs-icon notranslate icon-scale material-icons null">add</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>${productoAgregar.nombre}</p>
        <p>Precio: $${productoAgregar.precio}</p>
        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div)
    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()// es el parentElement porque tengo que eliminar el contendedor entero no solo el boton.
        carroDeCompras = carroDeCompras.filter((el) => el.id != productoAgregar.id)      
        actualizarCarrito()
    })
}

function actualizarCarrito() {
    contadorCarrito.innerText = carroDeCompras.length
    precioTotal.innerText = carroDeCompras.reduce((acc, el) => acc + el.precio, 0)
}

function verListaCarrito() {
    let total = 0;
    for (producto of carroDeCompras) {
        console.log("ID: " + producto.id + " " + producto.nombre);
        total += producto.precio;
        //tambien se puede utilizar asi:
        //total = total + producto.precio;
    }
    console.log("Son " + carroDeCompras.length + " productos\n Total de la compra: $" + total);
}

//Funciones para aumentar o disminuir productos
var inicio = 0; //se inicializa una variable en 0

function aumentar(){ // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar

var cantidad = document.getElementById('cantidad').value = ++inicio; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
}

function disminuir(){ // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id disminuir

var cantidad = document.getElementById('cantidad').value = --inicio; //se obtiene el valor del input, y se decrementa en 1 el valor que tenga.

if(cantidad > 0){

}
}