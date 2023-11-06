/*--------------carrito de compras--------------*/

const btnCart = document.querySelector('.btn-outline-dark2');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.gx-4');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('.ms-1');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

document.addEventListener('DOMContentLoaded', () => {
  const productsInStorage = localStorage.getItem('cartProducts');

  if (productsInStorage) {
    allProducts = JSON.parse(productsInStorage);
    showHTML();
  }
});


productsList.addEventListener('click', e => {
	if (e.target.classList.contains('mt-auto')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h5').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));

		showHTML();
	}
});
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		localStorage.setItem('cartProducts', JSON.stringify(allProducts));

		showHTML();
	}
});
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;

    // Verificar si se eliminaron todos los productos
    if (allProducts.length === 0) {
      cartEmpty.innerText = 'El carrito está vacío';
    } else {
      cartEmpty.innerText = ''; // Vaciar el texto del mensaje de carrito vacío
    }
  
};





function validateForm() {
  // Validar nombre (solo letras y números)
  var nameInput = document.getElementById("name");
  var nameError = document.getElementById("name-error");
  var namePattern = /^[a-zA-Z\s]+$/; // Expresión regular para validar solo letras
  if (namePattern.test(nameInput.value.trim())) {
    nameError.style.display = "none";
  } else {
    nameError.innerHTML = "Ingrese un nombre válido (solo letras)";
    nameError.style.display = "block";
    return false;
  }

  // Validar correo electrónico
  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("email-error");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo electrónico
  if (!emailPattern.test(emailInput.value)) {
    emailError.innerHTML = "Ingrese un correo electrónico válido";
    emailError.style.display = "block";
    return false;
  } else {
    emailError.style.display = "none";
  }

  // Validar mensaje (debe tener contenido)
  var messageInput = document.getElementById("message");
  var messageError = document.getElementById("message-error");
  if (messageInput.value.trim() === "") {
    messageError.innerHTML = "Ingrese un mensaje";
    messageError.style.display = "block";
    return false;
  } else {
    messageError.style.display = "none";
  }

  // Mostrar mensaje de confirmación
  var successMessage = document.getElementById("success-message");
  successMessage.innerHTML = "¡Sus datos han sido enviados correctamente!";
  successMessage.style.display = "block";

  // Restablecer formulario después de 3 segundos
  setTimeout(function() {
    document.getElementById("contact-form").reset();
    successMessage.style.display = "none";
  }, 3000);

  // Vaciar los campos del formulario
nameInput.value = "";
emailInput.value = "";
messageInput.value = "";

  return false;
}