const prompt = require('prompt-sync')();

// Armazenamento inicial
let alunos = [
  { nome: "Ana", notas: [8, 7, 9] },
  { nome: "Bruno", notas: [6, 8, 7] },
  { nome: "Carla", notas: [9, 10, 9] },
  { nome: "Diego", notas: [5, 7, 6] }
];

// ==========================================
// PARTE 1 & 2 — Funções Base e Auxiliares
// ==========================================

// Passo 1 — buscarAluno(nome)
// Retorna o OBJETO do aluno se encontrar, ou NULL se não encontrar
function buscarAluno(nomeBusca) {
  if (!nomeBusca) return null;
  
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome.toLowerCase() === nomeBusca.toLowerCase().trim()) {
      return alunos[i];
    }
  }
  return null;
}

// Passo 2 — calcularMedia(aluno)
function calcularMedia(aluno) {
  if (!aluno || !aluno.notas || aluno.notas.length === 0) {
    return 0;
  }

  let soma = 0;
  for (let i = 0; i < aluno.notas.length; i++) {
    soma += aluno.notas[i];
  }

  return soma / aluno.notas.length;
}

// Passo 3 — situacao(media)
function situacao(media) {
  if (media >= 6) {
    return "APROVADO";
  } else if (media >= 4) {
    return "RECUPERACAO";
  } else {
    return "REPROVADO";
  }
}

// Passo 4 — cadastrarAluno()
function cadastrarAluno() {
  console.log("\n=== 1. CADASTRAR NOVO ALUNO ===");
  let nome = prompt("Digite o nome do NOVO aluno a cadastrar: ");

  if (!nome || nome.trim() === "") {
    console.log("Nome inválido!");
    return;
  }

  let alunoEncontrado = buscarAluno(nome);

  if (alunoEncontrado !== null) {
    console.log("Esse aluno já está cadastrado.");
    return;
  }

  alunos.push({
    nome: nome.trim(),
    notas: []
  });

  console.log("Aluno cadastrado com sucesso.");
}

// Passo 5 — listarAlunos()
function listarAlunos() {
  console.log("\n=== LISTA COMPLETA DE ALUNOS ===");
  if (alunos.length === 0) {
    console.log("Nenhum aluno cadastrado.");
    return;
  }

  for (let i = 0; i < alunos.length; i++) {
    console.log("- " + alunos[i].nome);
  }
}

// Passo 6 — removerAluno()
function removerAluno() {
  console.log("\n=== REMOVER ALUNO ===");
  const nome = prompt("Digite o nome do aluno que você quer REMOVER: ");
  let alunoEncontrado = buscarAluno(nome);

  if (alunoEncontrado === null) {
    console.log("Aluno não encontrado!");
    return;
  }

  let posicao = alunos.indexOf(alunoEncontrado);
  alunos.splice(posicao, 1);
  console.log("Aluno removido com sucesso!");
}

// Passo 7 — lancarNota()
function lancarNota() {
  console.log("\n=== 2. LANÇAR NOTA ===");
  let nome = prompt("Digite o nome do aluno que vai RECEBER A NOTA: ");
  let aluno = buscarAluno(nome);

  if (aluno === null) {
    console.log("Aluno não encontrado!");
    return;
  }

  let notaInput = prompt("Digite a nota para adicionar (0 a 10): ");
  let nota = Number(notaInput);

  if (notaInput === "" || isNaN(nota) || nota < 0 || nota > 10) {
    console.log("Nota inválida!");
    return;
  }

  aluno.notas.push(nota);
  console.log("Nota lançada com sucesso!");
}

// Passo 8 — verBoletim()
function verBoletim() {
  console.log("\n=== 3. CONSULTAR BOLETIM ===");
  let nome = prompt("Digite o nome do aluno para VER O BOLETIM: ");
  let aluno = buscarAluno(nome);

  if (aluno === null) {
    console.log("Aluno não encontrado!");
    return;
  }

  let media = calcularMedia(aluno);
  let resultado = situacao(media);

  console.log("\n--- BOLETIM ---");
  console.log("Nome: " + aluno.nome);
  console.log("Notas: " + (aluno.notas.length > 0 ? aluno.notas.join(", ") : "Sem notas"));
  console.log("Média: " + media.toFixed(2));
  console.log("Situação: " + resultado);
}

// Passo 9 — totalDeAlunos()
function totalDeAlunos() {
  console.log("\n=== TOTAL DE ALUNOS ===");
  console.log("Total de alunos cadastrados: " + alunos.length);
}

// Passo 10 — mediaGeralDaTurma()
function mediaGeralDaTurma() {
  console.log("\n=== MÉDIA GERAL DA TURMA ===");
  if (alunos.length === 0) {
    console.log("A lista está vazia! Não tem como calcular a média.");
    return;
  }

  let soma = 0;
  for (let i = 0; i < alunos.length; i++) {
    soma += calcularMedia(alunos[i]);
  }

  let mediaGeral = soma / alunos.length;
  console.log("Média Geral: " + mediaGeral.toFixed(2));
}

// Passo 11 — listarAprovados()
function listarAprovados() {
  console.log("\n=== ALUNOS APROVADOS ===");
  let encontrou = false;

  for (let i = 0; i < alunos.length; i++) {
    let aluno = alunos[i];
    let media = calcularMedia(aluno);
    let status = situacao(media);

    if (status === "APROVADO") {
      console.log("- " + aluno.nome + " | Média: " + media.toFixed(2));
      encontrou = true;
    }
  }

  if (!encontrou) {
    console.log("Ainda não há alunos aprovados.");
  }
}

// ==========================================
// PARTE 5 — Os Menus (Flexíveis)
// ==========================================

// Passo 12 — submenuCadastro()
function submenuCadastro() {
  let opcao = "";

  do {
    console.log("\n--- MENU CADASTRO ---");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Listar alunos");
    console.log("3 - Remover aluno");
    console.log("0 - Voltar");

    let entrada = prompt("Escolha uma opção: ");
    opcao = entrada ? entrada.toLowerCase().trim() : "";

    switch (opcao) {
      case "1":
      case "cadastrar":
      case "cadastrar aluno":
        cadastrarAluno();
        break;
      case "2":
      case "listar":
      case "listar alunos":
        listarAlunos();
        break;
      case "3":
      case "remover":
      case "remover aluno":
        removerAluno();
        break;
      case "0":
      case "voltar":
        break;
      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0" && opcao !== "voltar");
}

// Passo 13 — submenuNotas()
function submenuNotas() {
  let opcao = "";

  do {
    console.log("\n--- MENU NOTAS ---");
    console.log("1 - Lançar nota");
    console.log("2 - Ver boletim do aluno");
    console.log("0 - Voltar");

    let entrada = prompt("Escolha uma opção: ");
    opcao = entrada ? entrada.toLowerCase().trim() : "";

    switch (opcao) {
      case "1":
      case "lancar":
      case "lançar":
      case "lancar nota":
      case "lançar nota":
        lancarNota();
        break;
      case "2":
      case "boletim":
      case "ver boletim":
      case "ver boletim do aluno":
        verBoletim();
        break;
      case "0":
      case "voltar":
        break;
      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0" && opcao !== "voltar");
}

// Passo 14 — submenuRelatorios()
function submenuRelatorios() {
  let opcao = "";

  do {
    console.log("\n--- MENU RELATÓRIOS ---");
    console.log("1 - Total de alunos");
    console.log("2 - Média geral da turma");
    console.log("3 - Listar aprovados");
    console.log("0 - Voltar");

    let entrada = prompt("Escolha uma opção: ");
    opcao = entrada ? entrada.toLowerCase().trim() : "";

    switch (opcao) {
      case "1":
      case "total":
      case "total de alunos":
        totalDeAlunos();
        break;
      case "2":
      case "media":
      case "média":
      case "media geral":
      case "média geral":
      case "media geral da turma":
      case "média geral da turma":
        mediaGeralDaTurma();
        break;
      case "3":
      case "aprovados":
      case "listar aprovados":
        listarAprovados();
        break;
      case "0":
      case "voltar":
        break;
      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0" && opcao !== "voltar");
}

// Passo 15 — menuPrincipal()
function menuPrincipal() {
  let opcao = "";

  do {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1 - Cadastro");
    console.log("2 - Notas");
    console.log("3 - Relatórios");
    console.log("0 - Sair");

    let entrada = prompt("Escolha uma opção: ");
    opcao = entrada ? entrada.toLowerCase().trim() : "";

    switch (opcao) {
      case "1":
      case "cadastro":
        submenuCadastro();
        break;
      case "2":
      case "notas":
        submenuNotas();
        break;
      case "3":
      case "relatorios":
      case "relatórios":
        submenuRelatorios();
        break;
      case "0":
      case "sair":
        console.log("Saindo do sistema... Até logo!");
        break;
      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0" && opcao !== "sair");
}

// Passo 16 — Iniciar o sistema
menuPrincipal();