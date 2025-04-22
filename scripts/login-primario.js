import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zbvirsjyvybhpusdnjxq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpidmlyc2p5dnliaHB1c2RuanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDI3OTcsImV4cCI6MjA2MDkxODc5N30.wTP6w7pyZNIWkhuvv2OMLx6kfnh5_-iice8q_141HUE';  // Substitua com a chave correta.
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Utilizando a autenticação do Supabase
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        document.getElementById("emailError").innerText = error.message;
    } else {
        alert("Login bem-sucedido!");
        // Aqui você pode redirecionar o usuário ou exibir informações adicionais
        console.log(user);  // Aqui você pode verificar o usuário logado
    }
});
