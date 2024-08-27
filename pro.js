  // Guardar el valor actual
  const originalValue = this.value;

  // Expresión regular para encontrar caracteres especiales
  const specialCharMatch = /[^a-zA-Z0-9\s]$/g.exec(originalValue);
  if (specialCharMatch) {
      // Mostrar el carácter especial
      const specialChar = specialCharMatch[0];
      this.value = originalValue;
      
      // Resaltar el carácter especial brevemente
      setTimeout(() => {
          // Eliminar el carácter especial
          const cleanedText = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
          this.value = cleanedText;
      }, 500); // Tiempo en milisegundos para mostrar el carácter especial
  }