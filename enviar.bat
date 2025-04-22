@echo off
:: Define o diretório onde está o seu projeto (caminho fornecido por você)
cd /d C:\Users\andre\Programação\gerenciamento

:: Inicializa o repositório Git, caso ainda não tenha sido inicializado
git init

:: Adiciona o repositório remoto do GitHub (isso vincula seu repositório local ao remoto)
git remote add origin https://github.com/Andrew-Santos/gerenciamento-food.git

:: Adiciona todos os arquivos ao staging do Git
git add .

:: Faz o commit com uma mensagem
git commit -m "Substituindo todos os arquivos com a versão mais recente"

:: Envia as alterações para o repositório no GitHub, forçando a substituição dos arquivos existentes
git push -u origin master --force

:: Pausa para que você possa ver o resultado
pause
