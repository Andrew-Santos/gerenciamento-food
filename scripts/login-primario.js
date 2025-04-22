// Configurações do Supabase
const supabaseUrl = 'https://fllwirmxntjrxvoqlrgv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbHdpcm14bnRqcnh2b3Fscmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzYwNDksImV4cCI6MjA2MDkxMjA0OX0.LFZPcjA9XNCeUkJlULM7OhButuPziwz29DZaUwbuHzc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Função para lidar com o envio do formulário de login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = emailInput.value;
    const password = passwordInput.value;

    // Limpa mensagens de erro anteriores
    emailError.textContent = '';
    passwordError.textContent = '';

    // Tenta fazer o login com o Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Se houver um erro de autenticação
        if (error.message.includes('Invalid credentials')) {
            emailError.textContent = 'E-mail ou senha incorretos.';
            passwordError.textContent = 'E-mail ou senha incorretos.';
        } else {
            // Outros erros de login
            alert(`Ocorreu um erro ao fazer login: ${error.message}`);
        }
    } else {
        // Login bem-sucedido, redireciona para a página principal
        window.location.href = '/home/index.html';
    }
});

