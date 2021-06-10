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

const listaDeCarrito = [];

function agregarAListaCarrito() {
    listaDeCarrito.push(producto);
}

function verListaCarrito() {
    let total = 0;
    for (producto of listaDeCarrito) {
        console.log("ID: " + producto.id + " " + producto.nombre);
        total += producto.precio;
        //tambien se puede utilizar asi:
        //total = total + producto.precio;
    }
    console.log("Son " + listaDeCarrito.length + " productos\n Total de la compra: $" + total);
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