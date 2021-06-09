const carro = new Carrito();
const carrito = document.getElementById('shopModal');
let productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito div');

cargarEventos();

function cargarEventos(){
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});
}