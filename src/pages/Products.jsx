//Lista de productos

/*Tareas que debes hacer:

Obtener lista de productos con api.get('/inventory/products/')
Mostrar en tabla o cards
Botones para: Crear, Editar, Eliminar
Formulario modal para crear/editar
*/

const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  const response = await api.get('/inventory/products/');
  setProducts(response.data.results);
};

const deleteProduct = async (id) => {
  await api.delete(`/inventory/products/${id}/`);
  fetchProducts(); // Recargar lista
};