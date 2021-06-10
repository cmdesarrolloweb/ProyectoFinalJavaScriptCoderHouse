//Agrego los productos en la página catalogo.html
for (const producto of listaProductos) {
    let productosSlider = document.createElement("div");
    productosSlider.setAttribute("class", "item");
    //Definimos el innerHTML del elemento con una plantilla de texto
    productosSlider.innerHTML = `
                        <div class="item">
                            <div class="novedades__card shadow-sm bg-gradient rounded-4">
                                <div class="card-body text-center">
                                    <a href="images/productos/${producto.imagen}" data-lightbox="producto-${producto.id}"><img
                                    src="images/productos/${producto.imagen}" alt="Imagen Producto${producto.id}" width="100%"></a>
                                    <span class="product-label">
                                        <span class="label--nuevo">
                                            Nuevo
                                        </span>
                                        <span class="label--oferta">
                                            Oferta
                                        </span>
                                    </span>
                                    <h5 class="card-title fw-6 mt-3 mb-3">${producto.nombre}</h5>
                                    <p class="card-text">$ ${producto.precio}</p>
                                    <a href="#" data-bs-toggle="" data-bs-target="" class="card-link btn btn-primario col-12
                                            mx-auto data-id="${producto.id}"">AGREGAR</a>
                                </div>
                            </div>
                        </div>`;
    document.getElementById("carouselNovedades").appendChild(productosSlider);
    $(document)
}
