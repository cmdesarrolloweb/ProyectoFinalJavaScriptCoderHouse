// Simulador carrito de pedido/futuro carro de compras.
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.imagen = imagen;
    }
    
}

const producto1 = new Producto(1, "Aceite de Oliva Extra Virgen Cocinero 250cc", 199.78, "Aceite-de-Oliva-extra-virgen-Cocinero-250cc.jpg" );
const producto2 = new Producto(2, "Aceite de Oliva Natura Clasico 500cc", 180.89, "Aceite-Oliva-Natura-clasico-500cc.jpg" );
const producto3 = new Producto(3, "Café Dolca Clásico 100g", 414.85, "Cafe-Dolca-100-g.jpg" );
const producto4 = new Producto(4, "Café Dolca Suave 50g", 175.30, "Cafe-Dolca-Suave-50-g.jpg" );
const producto5 = new Producto(5, "Yerba Sinceridad 1kg", 399.85, "Yerba-Sinceridad-1-kg.jpg" );
const producto6 = new Producto(6, "Azúcar Ledesma 1kg", 83.25, "Azucar-Ledesma-1-kg.jpg" );

const listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6];

const carroDeCompras = [];

const contenedorProductos = document.getElementById('listar-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

//Agrego los productos en la página catalogo.html
for (const producto of listaProductos) {
    let contenedorProductos = document.createElement("div");
    contenedorProductos.setAttribute("class", "col-12 col-sm-4 mb-1 mb-md-4");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedorProductos.innerHTML = `
                        <div class="card rounded-4" id="producto${producto.id}">
                            <div class="card-body text-center d-flex
                                d-md-block">
                                <div class="col-2 col-md-12">
                                    <a href="images/productos/${producto.imagen}" data-lightbox="producto${producto.id}">
                                    <img src="images/productos/${producto.imagen}" alt="Imagen Producto01" width="100%"></a>
                                </div>
                                <div class="col-6 col-md-12">
                                    <h5 class="card-title fw-6 mt-1
                                        mb-1 mt-lg-3 mb-lg-3 ps-2 px-lg-3
                                        text-start text-md-center">${producto.nombre}</h5>
                                </div>
                                <div class="col-4 col-md-12">
                                    <p class="card-text mb-1 mb-lg-4
                                        fw-9">$ ${producto.precio}</p>
                                    <a onclick="agregarAListaCarrito()" data-bs-toggle=""
                                        data-bs-target=""
                                        class="agregar-carrito d-flex d-md-block
                                        card-link btn btn-primario
                                        col-12 mx-auto" id="boton${producto.id}">
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
                        document.getElementById("listar-productos").appendChild(contenedorProductos);
                        let boton = document.getElementById(`boton${producto.id}`) // tomo todo dentro de boton para que sea unico
                        
                        boton.addEventListener('click', ()=>{
                            agregarAlCarrito(producto.id)
                         });
}

function agregarAListaCarrito(id) {
    let productoAgregar = listaProductos.filter((el) => el.id == id)[0]
    carroDeCompras.push(productoAgregar)
    actualizarCarrito() // ver esta funcion a lo ultimo 
    

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
        carritoDeCompras = carritoDeCompras.filter((el) => el.id != productoAgregar.id)      
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


//Array
// const listaProductos = [];
// listaProductos.push(prod1);
// listaProductos.push(prod2);
// listaProductos.push(prod3);
// listaProductos.push(prod4);

// function verListaProductos() {
//     let total = 0;
//     for (elemento of productos) {
//         console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
//         //total = total + elemento.precio;
//         total += elemento.precio;
//     }
//     console.log("Son " + productos.length + " productos\n  Total de la compra: $" + total);
// }

// //Ordeno por precio de Menor a mayor
// function ordenarPorPrecioAsc() {
//     for (elemento of productos.sort((a, b) => a.precio - b.precio)) {
//         console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
//     }
// }

// //Ordeno por precio de Mayor a menor
// function ordenarPorPrecioDesc() {
//     for (elemento of productos.sort((a, b) => b.precio - a.precio)) {
//         console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
//     }
// }

// //Ordeno alfabéticamente Ascendente
// function ordenarAlfabetAz() {
//     for (elemento of productos.sort((a, b) =>
//     a.nombre.toUpperCase() > b.nombre.toUpperCase() ? 1 :
//     a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1:
//     0
//   )) {
//         console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
//     }
// }

// //Ordeno alfabéticamente Descendente
// function ordenarAlfabetZa() {
//     for (elemento of productos.reverse((a, b) =>
//     a.nombre.toUpperCase() > b.nombre.toUpperCase() ? 1 :
//     a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1:
//     0
//   )) {
//         console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
//     }
// }

// //Función subTotal()
// function sumaProductos(item1, item2, item3, item4){
//     var montoTotal = item1 + item2 + item3 + item4;
//     return montoTotal;   
// }
// function calculaIva(subTotal) {
//     totalConIva = subTotal * 0.21;
//     return totalConIva;
// }

// var subTotal = sumaProductos(prod1.precio, prod2.precio, prod3.precio, prod4.precio);
// console.log(subTotal);

// var iva = calculaIva(subTotal);
// console.log(iva);

// var total = subTotal + iva;

// //FUNCION FLECHA
// var finalizarCompra = () => {
// let nombre = prompt("Ingresa nombre:");
// let apellido = prompt("Ingresa apellido:");
// console.log("Hola " + nombre + " " + apellido + " has seleccionado 4 productos " 
//     + "\n"
//     + prod1.nombre + " $"+prod1.precio + "\n"
//     + prod2.nombre + " $"+prod2.precio + "\n"
//     + prod3.nombre + " $"+prod3.precio + "\n"
//     + prod4.nombre + " $"+prod4.precio + "\n"
//     + "------------------------" + "\n"
//     + "Subtotal: " + "$"+subTotal + "\n"
//     + "------------------------" + "\n"
//     + "IVA: " + "$"+iva + "\n"
//     + "------------------------" + "\n"
//     + "Total: " + "$"+total);
// }