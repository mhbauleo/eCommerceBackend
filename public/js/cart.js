/*=========================================*/
/*=                 CART                  =*/
/*=========================================*/

let productos;

(async function () {
  const idCarrito = getCookie("idCarrito");
  console.log(idCarrito);

  await renderCarrito(idCarrito);

  document.getElementById("comprar").addEventListener("click", (event) => {
    console.log(productos);
    const payload = { productos };
    console.log(payload);
    fetch("/carrito/comprar", {
      method: "POST",
      body: JSON.stringify(productos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
  });
})();

async function renderCarrito(idCarrito) {
  const cartList = document.querySelector("#cartList");
  const response = await fetch(`/api/carrito/${idCarrito}/productos`);
  productos = await response.json();

  const htmlList = productos.map((producto) => {
    return `<tr id="${producto._id}" class="cartProduct">
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
  cartList.innerHTML = html;

  document.querySelectorAll(".cartProduct").forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(item.id);
      fetch(`/api/carrito/${idCarrito}/productos/${item.id}`, {
        method: "DELETE",
      }).then((res) => renderCarrito(idCarrito));
    });
  });
}

function getCookie(cookie_name) {
  let c_name = cookie_name + "=";
  let cookie_decoded = decodeURIComponent(document.cookie);
  let cookie_parts = cookie_decoded.split(";");

  for (let i = 0; i < cookie_parts.length; i++) {
    let c = cookie_parts[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(c_name) == 0) {
      return c.substring(c_name.length, c.length);
    }
  }
  return "";
}
