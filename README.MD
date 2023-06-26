CÓDIGO CARRITO:<br>
- Class Carrito<br>
<br>
    Métodos: 
<br>
    1. actualizarUnidades() // Almacena las unidades totales agregadas al carrito<br>
    2. sumaTotal() // Cálculo del importe total de los productos agregados al carrito<br>
    3. obtenerCarrito() // Resumen de toda la información para poder acceder a ella e imprimarla en el resumen de compra<br>
<br>
CÓDIGO INDEX.JS:
<br>
- Importamos clase Carrito<br>
- Creamos nuevo carrito 'AgoodShop Carrito'<br>
- Hacemos la consulta a la API a través de un fetch <br>
- Almacenamos los datos en carrito.productos<br>
<br>
Funciones:
<br>
    1. creaCarrito(carrito) // Crea la tabla que contendrá la información y dentro de un forEach se asigna el contenido (producto.title,producto.price,producto.SKU)<br>
    2. actualizarTotal(quantityNow, producto) // Nos ayuda a actualizar los datos una vez el usuario interactúa con las cantidades de producto a través de botones +/- ó input.<br>
                                              // Esta función también llama a los métodos de carrito actualizarUnidades() y sumaTotal()<br>
                                              // Dentro tenemos comentado un Console Log que al descomentarlo nos muestra por consola el carrito actualizado a cada interacción<br>
    3. imprimirCarrito() // Nos permite visualizar el resumen de la compra seleccionada usando el método obtenerCarrito() y crear los elementos necesarios para la visualización.<br>
<br>

DATOS API:

id jsonblob: 1122506093036322816
CONSULTA API: url: https://jsonblob.com/api/jsonBlob/1122506093036322816
