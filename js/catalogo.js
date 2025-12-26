let productosData = [];

fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {
    productosData = data;
    mostrarProductos(productosData);
  });



// Selección de botones de categoría
const botonesCategoria = document.querySelectorAll(".btn-categoria");

botonesCategoria.forEach(btn => {
  btn.addEventListener("click", () => {
    const categoria = btn.dataset.categoria;

    // Actualizar clases activas
    botonesCategoria.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Filtrar productos
    const filtrados = categoria === "todos"
      ? productosData
      : productosData.filter(p => p.categoria === categoria);

    mostrarProductos(filtrados);
  });
});


const contenedor = document.getElementById("productos");
const inputBuscar = document.getElementById("buscador");

function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="assets/img/${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <a href="https://wa.me/3023461106?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(p.whatsapp)}"
         target="_blank"
         class="btn-whatsapp">
         Comprar por WhatsApp
      </a>
    `;

    contenedor.appendChild(div);
  });
}

// Buscador
inputBuscar.addEventListener("keyup", () => {
  const texto = inputBuscar.value.toLowerCase();
  const filtrados = productosData.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
});
