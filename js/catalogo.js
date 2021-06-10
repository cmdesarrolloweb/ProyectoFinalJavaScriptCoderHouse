//Agrego los productos en la página catalogo.html
for (const producto of listaProductos) {
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "col-12 col-sm-4 mb-1 mb-md-4");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `
                        <div class="card rounded-4" id="producto${producto.id}">
                            <div class="card-body text-center d-flex
                                d-md-block">
                                <div class="col-2 col-md-12">
                                    <a href="images/productos/${producto.imagen}" data-lightbox="producto${producto.id}"><img
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
                                    <a onclick="agregarAListaCarrito()" data-bs-toggle=""
                                        data-bs-target=""
                                        class="agregar-carrito d-flex d-md-block
                                        card-link btn btn-primario
                                        col-12 mx-auto" data-id="producto${producto.id}">
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
