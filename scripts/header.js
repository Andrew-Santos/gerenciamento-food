document.addEventListener('DOMContentLoaded', function() {
    // Encontra todos os headers com id="header"
    const headers = document.querySelectorAll('header#header');
    
    // Para cada header encontrado
    headers.forEach(header => {
      // Cria o novo conteúdo do header
      const newHeaderContent = `
        <div class="logo"><img src="" alt="" id="logo"></div>
        <div id="container-menu">
          <div class="menu">Pedidos</div>
          <div class="menu">Cadastrar Categoria</div>
          <div class="menu">Ajustar Loja</div>
          <div class="menu">Cadastrar Cliente</div>
        </div>
      `;
      
      // Substitui o conteúdo interno do header
      header.innerHTML = newHeaderContent;
      
      // Opcional: mantém quaisquer atributos do header original
      // exceto id (para evitar duplicatas)
      const attributes = header.attributes;
      for (let i = attributes.length - 1; i >= 0; i--) {
        if (attributes[i].name !== 'id') {
          header.setAttribute(attributes[i].name, attributes[i].value);
        }
      }
    });
  });