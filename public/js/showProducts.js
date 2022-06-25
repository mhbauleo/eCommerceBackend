(async function () {
  const idCarrito = getCookie('idCarrito');
  console.log(idCarrito);
  let response = await fetch("/api/productos");
  let productos = await response.json();
  renderProductos(productos);

  document.querySelectorAll(".product").forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(item.id);
      fetch(`/api/carrito/${idCarrito}/productos/${item.id}`, {
        method: "POST",
      })
    });
  });
})();

function renderProductos(data) {
  const htmlList = data.map((producto) => {
    return `<tr id=${producto._id} class="product">
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td><img src=${producto.foto} alt=${producto.nombre}></td>
                </tr>`;
  });

  htmlList.unshift(`<tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Foto</th>
                        </tr>`);

  const html = htmlList.join(" ");
  document.getElementById("vistaProductos").innerHTML = html;
}

function getCookie(cookie_name) {
    let c_name = cookie_name + "=";
    let cookie_decoded = decodeURIComponent(document.cookie);
    let cookie_parts = cookie_decoded.split(';');
    
    for(let i = 0; i <cookie_parts.length; i++) {
        let c = cookie_parts[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(c_name) == 0) {
            return c.substring(c_name.length, c.length);
        }
    }
    return "";
}