import { Carrito } from "./carrito.js";

document.addEventListener('DOMContentLoaded', () => {
    
  const carrito = new Carrito('AgoodShop Carrito');

  fetch('https://jsonblob.com/api/jsonBlob/1122506093036322816')
    .then(response => response.json())
    .then(data => {
      carrito.productos = data.products;
      
      crearCarrito(carrito);
    });

  function crearCarrito(carrito) {
    const listadoCarrito = document.getElementById('carrito');
  
    const table = document.createElement('table');
    table.classList.add('table');
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.classList.add('table__head');
    headerRow.innerHTML = `
    <th class="table__head--title">Producto</th>
    <th class="table__head--title">Cantidad</th>
    <th class="table__head--title">Unidad</th>
    <th class="table__head--title">Total</th>
    `;

    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    tbody.classList.add('table__body')
    
    carrito.productos.forEach(producto => {
      producto.cantidad = 0;
      const row = document.createElement('tr');
      row.classList.add('table__body--row')
      row.innerHTML = `
        <td><span class="table__productTitle">${producto.title}</span><br><span class="table__productRef">Ref: ${producto.SKU}</span></td>
        <td class="input">
          <div class="quantity">
            <button class="quantity__button minus">-</button>
            <input type="number" min="0" value="0" data-sku="${producto.SKU}" class="quantity__value" placeholder="Ud.">
            <button class="quantity__button plus">+</button>
          </div>
        </td>
        <td class="price">${producto.price}€</td>
        <td class="totalPrice" id="total-${producto.SKU}">0.00€</td>
      `;

      const inputNum = row.querySelector('input');
      const minusButton = row.querySelector('.minus');
      const plusButton = row.querySelector('.plus');
  
      minusButton.addEventListener('click', () => {
        const currentValue = parseInt(inputNum.value);
        if (currentValue > 0) {
          inputNum.value = currentValue - 1;

          const quantityNow = inputNum.value;
          actualizarTotal(quantityNow, producto);
        } 
      })
      
      plusButton.addEventListener('click', () => {
        const currentValue = parseInt(inputNum.value);
        inputNum.value = currentValue + 1;

        const quantityNow = inputNum.value;
        actualizarTotal(quantityNow, producto);
      })
      
      inputNum.addEventListener('input', () => {
        let quantityNow = parseInt(inputNum.value);
        if (isNaN(quantityNow)) {
          quantityNow = 0;
        }
        actualizarTotal(quantityNow, producto);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    listadoCarrito.appendChild(table);
  }
  
  function actualizarTotal(quantityNow, producto) {
    const price = parseFloat(producto.price);
    const total = quantityNow * price;
  
    const totalProducto = document.getElementById(`total-${producto.SKU}`);
    totalProducto.innerText = `${total.toFixed(2)}€`;
    
    producto.cantidad = quantityNow;

    //METODOS CARRITO
    carrito.actualizarUnidades();
    carrito.sumaTotal();

    imprimirCarrito();

    // CONSULTA CARRITO:
    // console.log(carrito);
  }

  function imprimirCarrito() {
    const totalCarrito = document.getElementById('total');
    const resumenCarrito = document.getElementById('resumen');
  
    const { total, carritoDetallado } = carrito.obtenerCarrito();

    resumenCarrito.innerHTML = '';
  
    carritoDetallado.forEach(producto => {
      const productoGroup = document.createElement('article');
      productoGroup.classList.add('resumen__producto');

      const productoElement = document.createElement('p');
      productoElement.innerText = producto.title;

      const productoPrecio = document.createElement('p');
      productoPrecio.innerText = `${producto.subtotal.toFixed(2)} €`;

      productoGroup.appendChild(productoElement);
      productoGroup.appendChild(productoPrecio);
      resumenCarrito.appendChild(productoGroup);
    });

    totalCarrito.innerHTML = `<span class="totalAll">TOTAL</span><span class="blackPrice">${total} €</span>`;
  }

  imprimirCarrito();
})