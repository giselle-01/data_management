//We import a bookshop to use Toasts.
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


//We define the variables that we're gonna use.
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const categoryInput = document.getElementById("productCategory");
const code = document.getElementById("productCode")
const form = document.getElementById("productsInfo");
const table = document.getElementById("productsTable");
const button = document.getElementById("btnSend");


//We created an Object, a Set and the a Map with products inside, and its names, keys, categories and prices.
const products = {
  1: { id: 1, name: "Algodón", price: 4000},
  2: { id: 2, name: "Fresas", price: 6000},
  3: { id: 3, name: "Botella", price: 25000},
};

const setProducts = new Set(Object.values(products).map(product => product.name));

const mapProducts = new Map([
  ["Material", "Algodón"],
  ["Fruta", "Fresas"],
  ["Envase", "Botella"]
]);

//We valited the products' data, but first get its values from the variables' DOM.
form.addEventListener('submit', (e)=> {
  e.preventDefault();

  const name = form.nameInput.value.trim();
  const category = form.categoryInput.value.trim();

  const price = parseFloat(form.price.value);
  const code = parseInt(form.code.value);

  if (!name || !category || isNaN(price) || isNaN(code)) {
    alert("Ingrese los datos de los productos de manera correcta, por favor")
    return;
  }

  if (price <=0 || code <=0) {
    Toast.fire({
      icon: "Error",
      title: "El precio y el código deben ser números positivos"
    });
    return;
  } 
});

 const allProductInfo = { name, category, price, quantity };

  if (editIndex !== null) {
// Here we update products
    products[editIndex] = allProductInfo;
    editIndex = null;
  } else {
// Here we add new products
    products.push(allProductInfo);
  }

  renderProducts();{
  form.reset();
  form.querySelector('button[type="submit"]').textContent = "Actualizar Producto";
};


function renderProducts() {
  tableBody.innerHTML = '';

  products.forEach((product, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.code}</td>
      <td>
        <button class="action-btn edit" data-index="${index}">Edit</button>
        <button class="action-btn delete" data-index="${index}">Delete</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  // Here we appoint events to bottons
  document.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', onEditProduct);
  });

  document.querySelectorAll('.action-btn.delete').forEach(btn => {
    btn.addEventListener('click', onDeleteProduct);
    
    
  });
}

// Edit the product
function onEditProduct(e) {
  const index = e.target.dataset.index;
  const product = products[index];

  form.name.value = product.name;
  form.category.value = product.category;
  form.price.value = product.price;
  form.code.value = product.code;

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = "Actualizar Producto";
}

// Delete the product
function onDeleteProduct(e) {
  const index = e.target.dataset.index;
  if (confirm("Seguro que quieres eliminar este producto?")) {
    products.splice(index, 1);
// Cancele the action delete the product
    if (editIndex === parseInt(index)) {
      editIndex = null;
      form.reset();
      form.querySelector('button[type="submit"]').textContent = "Guardar Producto";
    }
    renderProducts();
  }
}

