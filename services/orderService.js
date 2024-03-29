const { ordenes } = require("../daos/index");
const { sendEmail } = require("../helpers/mail");

const newOrder = async (email, state) => {
  const order = await ordenes.newOrder(email, state);

  const { nroOrden, items } = order;

  const msg = `Nuevo pedido de ${email}`;
  const htmlList = items.map(
    (item) =>
      `<li>
    <h2>Nombre: </h2><p>${item.producto.nombre}</p>
    <h2>Descripción: </h2><p>${item.producto.descripcion}</p>
    <h2>Código: </h2><p>${item.producto.codigo}</p>
    <h2>Precio: </h2><p>${item.producto.precio}</p>
    <h2>Stock: </h2><p>${item.producto.stock}</p>
    <h2>Foto: </h2><img src="${item.producto.foto}">
    <h2>Id: </h2><p>${item.producto._id}</p>
    <h2>Cantidad: </h2><p>${item.cantidad}</p>
    </li>`
  );
  const html =
    `<h1>Número de orden: ${nroOrden}</h1><ul>` + htmlList.join(" ") + "</ul>";
  sendEmail(msg, html);

  return order;
};

module.exports = { newOrder };
