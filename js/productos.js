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


const productos = [producto1, producto2, producto3, producto4, producto5, producto6];
                    

for (const producto of productos) {
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "col-12 col-sm-4 mb-1 mb-md-4");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `
                        <div class="card rounded-4" id="${producto.id}">
                            <div class="card-body text-center d-flex
                                d-md-block">
                                <div class="col-2 col-md-12">
                                    <a href="images/productos/${producto.imagen}" data-lightbox="producto-${producto.id}"><img
                                            src="images/productos/${producto.imagen}"
                                            alt="Imagen Producto01"
                                            width="100%"></a>
                                </div>
                                <div class="col-6 col-md-12">
                                    <h5 class="card-title fw-6 mt-1
                                        mb-1 mt-lg-3 mb-lg-3 ps-2 px-lg-3
                                        text-start text-md-center">${producto.nombre}</h5>
                                </div>
                                <div class="col-4 col-md-12">
                                    <p class="card-text mb-1 mb-lg-4
                                        fw-9">$ ${producto.precio}</p>
                                    <a href="#" data-bs-toggle=""
                                        data-bs-target=""
                                        class="agregar-carrito d-flex d-md-block
                                        card-link btn btn-primario
                                        col-12 mx-auto" data-id="${producto.id}">
                                        <span
                                            class="navbar-tool-icon
                                            shop-button
                                            material-icons
                                            align-middle">shopping_cart</span>&nbsp;<span
                                            class="align-middle">AGREGAR</span>
                                    </a>
                                </div>
                            </div>
                        </div>`;
    document.getElementById("listar-productos").appendChild(contenedor);
}