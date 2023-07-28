// Algoritmo

// OK 1. Pegar os valores dos inputs;
// OK 2. Fazer o cálculo do IMC -> valorImc;
// OK 3. Gerar a classificação IMC -> classificacaoImc;
// OK 4. Organizar os dados do usuário para salvar na lista e gerar a data;
// OK 5. Inserir o usuário na lista (salvar no localStorage);
// OK 6. Função carregar os usuários (localStorage), chamar ao carregamento;
// OK 7. Renderizar o conteúdo da tabela com os usuários cadastrados;
// 8. Botão para limpar so registros (localStorage).

// Programação funcional

function calcular(event) {
    // PREVINE O RECARREGAR DA PAGINA
    event.preventDefault()

    console.log("Foi executada a função calcular.")

    // PASSO 1
    let usuario = receberValores()

    // PASSO 2
    let imcCalculado = calcularImc(usuario.altura, usuario.peso)

    // PASSO 3
    let classificacaoImc = classificarImc(imcCalculado)

    console.log(classificacaoImc)

    // PASSO 4
    usuario = organizarDados(usuario, imcCalculado, classificacaoImc)

    // PASSO 5
    cadastrarUsuario(usuario)
    // Atualização automática da página
    window.location.reload()

}

//1. Pegar os valores dos inputs;
function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value

    let dadosUsuario = {
        nome: nomeRecebido, 
        altura: alturaRecebida,
        peso: pesoRecebido   
    }

    console.log(nomeRecebido)
    console.log(alturaRecebida)
    console.log(pesoRecebido)

    console.log(dadosUsuario)

    return dadosUsuario
   
}

function calcularImc(altura, peso) {
    let imc = peso / (altura * altura)

    console.log(imc)

    return imc

}

function classificarImc(imc) {
    /*
    Resultado             Situação
    ABaixo de 18.5        Abaixo do peso
    Entre 18.5 e 24.99    Peso Normal
    Entre 25 e 29.99      Sobrepeso
    Acima de 30           Obesidade
    */

    if (imc < 18.5) {
        return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal"
    } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}

function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    // Pegar a dataHoraAtual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', {timeStyle: 'long', dateStyle: 'short'}).format(Date.now())

    console.log(dataHoraAtual)

    // ORGANIZANDO O OBJETO PARA SALVAR
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        // nome: dadosUsuario.nome,
        // peso: dadosUsuario.peso,
        // altura: dadosUsuario.altura,
        imc: valorImc.toFixed(2),
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

// 5. Inserir o usuário na lista (salvar no localStorage);
function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // SE HOUVER LISTA DE USUARIOS NO localStorage, CARREGAR ISSO PARA A VARIÁVEL 
    if(localStorage.getItem("usuariosCadastrados") != null) {
        // JSON.parse: converte de string para objeto.
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // ADICIONA O USUARIO NA LSITA DE USUARIOS
    listaUsuarios.push(dadosUsuario)

    // SALVA A listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
    // JSON.stringify: converte objeto para string.   
}

// 6. Função carregar os usuários (localStorage), chamar ao carregamento;
function carregarUsuarios(){
    let listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0) {
    // Se não tiver nenhum usuario cadastrado, mostrar mensagem.
        let tabela = document.getElementById("corpo-tabela")

                // HTML INTERNO
        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado 😒</td>
        </tr>`   

    } else {
        // Montar conteúdo da tabela e chamada da função montarTabela.
        montarTabela(listaCarregada)
    }
    
    console.log(listaCarregada)
}
// PASSO 6
window.addEventListener("DOMContentLoaded", () => carregarUsuarios())

// PASSO 7
// 7. Renderizar o conteúdo da tabela com os usuários cadastrados;
// Montar o conteúdo da tabela
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        // console.log("O usuário é: ", usuario)
        // template = tamplate +
        template += `<tr> 
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="altura">${usuario.altura}</td>
            <td data-cell="peso">${usuario.peso}</td>
            <td data-cell="valor do IMC">${usuario.imc}</td>
            <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        </tr>`
    })

    tabela.innerHTML = template;

}

// PASSO 8
// 8. Botão para limpar so registros (localStorage).

function deletarRegistro() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarregar a página
    window.location.reload()
}
