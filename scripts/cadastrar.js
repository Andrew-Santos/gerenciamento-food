// Configuração do Supabase
const supabaseUrl = 'https://zbvirsjyvybhpusdnjxq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpidmlyc2p5dnliaHB1c2RuanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDI3OTcsImV4cCI6MjA2MDkxODc5N30.wTP6w7pyZNIWkhuvv2OMLx6kfnh5_-iice8q_141HUE'; // substitua pela sua chave
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Elementos
const modal = document.getElementById('category-modal');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.querySelector('.close-btn');
const addBtn = document.getElementById('add-category-btn');
const form = document.getElementById('category-form');
const inputId = document.getElementById('category-id');
const inputName = document.getElementById('category-name');
const inputStatus = document.getElementById('category-status');
const tbody = document.getElementById('categories-table-body');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Função para abrir modal
function openModal(editing = false, data = {}) {
  modalTitle.textContent = editing ? 'Editar Categoria' : 'Nova Categoria';
  inputId.value = data.id || '';
  inputName.value = data.categoria || '';
  inputStatus.value = data.pausar !== undefined ? data.pausar : 'false';
  modal.style.display = 'block';
}

// Fechar modal
closeModalBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

// Abrir modal novo
addBtn.onclick = () => openModal();

// Buscar e exibir categorias
async function loadCategories(filter = '') {
  const { data, error } = await supabase
    .from('categoria')
    .select('*')
    .order('id', { ascending: true });

  if (error) return console.error('Erro ao carregar categorias:', error);

  const filtered = data.filter(c =>
    c.categoria.toLowerCase().includes(filter.toLowerCase())
  );

  tbody.innerHTML = '';
  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.categoria}</td>
      <td>${c.pausar ? 'Pausado' : 'Ativo'}</td>
      <td>
        <button onclick='editCategory(${JSON.stringify(c)})'>✏️</button>
        <button onclick='deleteCategory(${c.id})'>🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Criar ou atualizar categoria
form.onsubmit = async e => {
  e.preventDefault();

  const categoria = inputName.value.trim();
  const pausar = inputStatus.value === 'true';
  const id = inputId.value;

  if (id) {
    await supabase.from('categoria').update({ categoria, pausar }).eq('id', id);
  } else {
    await supabase.from('categoria').insert([{ categoria, pausar }]);
  }

  modal.style.display = 'none';
  loadCategories();
};

// Editar
window.editCategory = (categoria) => openModal(true, categoria);

// Deletar
window.deleteCategory = async (id) => {
  const confirmDelete = confirm('Tem certeza que deseja excluir esta categoria?');
  if (!confirmDelete) return;
  await supabase.from('categoria').delete().eq('id', id);
  loadCategories();
};

// Pesquisar
searchBtn.onclick = () => loadCategories(searchInput.value);
searchInput.onkeyup = e => {
  if (e.key === 'Enter') loadCategories(searchInput.value);
};

// Inicializar
loadCategories();
