// Devuelve true si se borró correctamente
async function deleteCarritoAux(id, contenedorCarritos) {
  if ((await contenedorCarritos.getById(id)) != null) {
    await contenedorCarritos.deleteById(id);
    return true;
  } else {
    return false;
  }
}

// Devuelve null en caso de no encontrar el carrito
async function getProductosAux(id, contenedorCarritos) {
  const carrito = await contenedorCarritos.getById(id);
  if (carrito != null) {
    return carrito.productos;
  } else {
    return null;
  }
}

async function postProductoAux(idCarrito, idProducto, contenedorCarritos) {
  const producto = await contenedorCarritos.productos.getById(idProducto);
  if (producto != null) {
    const viejoCarrito = await contenedorCarritos.getById(idCarrito);
    if (viejoCarrito != null) {
      await contenedorCarritos.updateById(
        { productos: [...viejoCarrito.productos, producto] },
        idCarrito
      );
      return true;
    }
  }
  return false;
}

module.exports = {postProductoAux,getProductosAux, deleteCarritoAux}
