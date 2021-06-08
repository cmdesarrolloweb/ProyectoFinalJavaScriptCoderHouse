// Simulador carrito de pedido/futuro carro de compras.
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }
    
}
const prod1 = new Producto("Yerba Mañanita", "125");
const prod2 = new Producto("Azúcar Chango", "100");
const prod3 = new Producto("Café Dolca", "200");
const prod4 = new Producto("Galletitas Pepitos", "80");

//Array
const listaProductos = [];
listaProductos.push(prod1);
listaProductos.push(prod2);
listaProductos.push(prod3);
listaProductos.push(prod4);

function verListaProductos() {
    let total = 0;
    for (elemento of listaProductos) {
        console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
        //total = total + elemento.precio;
        total += elemento.precio;
    }
    console.log("Son " + listaProductos.length + " productos\n  Total de la compra: $" + total);
}

//Ordeno por precio de Menor a mayor
function ordenarPorPrecioAsc() {
    for (elemento of listaProductos.sort((a, b) => a.precio - b.precio)) {
        console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
    }
}

//Ordeno por precio de Mayor a menor
function ordenarPorPrecioDesc() {
    for (elemento of listaProductos.sort((a, b) => b.precio - a.precio)) {
        console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
    }
}

//Ordeno alfabéticamente Ascendente
function ordenarAlfabetAz() {
    for (elemento of listaProductos.sort((a, b) =>
    a.nombre.toUpperCase() > b.nombre.toUpperCase() ? 1 :
    a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1:
    0
  )) {
        console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
    }
}

//Ordeno alfabéticamente Descendente
function ordenarAlfabetZa() {
    for (elemento of listaProductos.reverse((a, b) =>
    a.nombre.toUpperCase() > b.nombre.toUpperCase() ? 1 :
    a.nombre.toUpperCase() < b.nombre.toUpperCase() ? -1:
    0
  )) {
        console.log("Nombre: " + elemento.nombre + " Precio: " + elemento.precio);
    }
}

//Función subTotal()
function sumaProductos(item1, item2, item3, item4){
    var montoTotal = item1 + item2 + item3 + item4;
    return montoTotal;   
}
function calculaIva(subTotal) {
    totalConIva = subTotal * 0.21;
    return totalConIva;
}

var subTotal = sumaProductos(prod1.precio, prod2.precio, prod3.precio, prod4.precio);
console.log(subTotal);

var iva = calculaIva(subTotal);
console.log(iva);

var total = subTotal + iva;

//FUNCION FLECHA
var finalizarCompra = () => {
let nombre = prompt("Ingresa nombre:");
let apellido = prompt("Ingresa apellido:");
console.log("Hola " + nombre + " " + apellido + " has seleccionado 4 productos " 
    + "\n"
    + prod1.nombre + " $"+prod1.precio + "\n"
    + prod2.nombre + " $"+prod2.precio + "\n"
    + prod3.nombre + " $"+prod3.precio + "\n"
    + prod4.nombre + " $"+prod4.precio + "\n"
    + "------------------------" + "\n"
    + "Subtotal: " + "$"+subTotal + "\n"
    + "------------------------" + "\n"
    + "IVA: " + "$"+iva + "\n"
    + "------------------------" + "\n"
    + "Total: " + "$"+total);
}