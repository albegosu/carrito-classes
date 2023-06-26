export class Carrito {
    #nombre;
    productos;
    unidades;
    totalPrice;

    constructor(nombre) {
        this.#nombre = nombre;
        this.productos = [];
        this.unidades = 0;
        this.totalPrice = 0;
    }
  
    actualizarUnidades() {
        let sum = 0;
        this.productos.forEach(producto => {
          sum += parseFloat(producto.cantidad);
        });
        this.unidades = sum;
    }

    sumaTotal() {
        let sumTotal = 0;
        this.productos.forEach(producto => {
            sumTotal += parseFloat(producto.cantidad) * parseFloat(producto.price);
        });
        this.totalPrice = sumTotal.toFixed(2);
    }
  
    obtenerCarrito() {
        const carritoDetallado = [];
      
        this.productos.forEach(producto => {
          if (producto.cantidad >= 1) {
            const { title, cantidad, price } = producto;
            const subtotal = cantidad * price;
            carritoDetallado.push({ title, cantidad, price, subtotal });
          }
        });
      
        const total = carritoDetallado.reduce((acc, { cantidad, price }) => acc + cantidad * price, 0);
      
        return {
          total: total.toFixed(2),
          carritoDetallado
        };
      }
  }