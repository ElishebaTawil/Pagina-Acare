

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