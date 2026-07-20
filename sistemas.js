let alunos = [];

function buscarAluno(nome) {
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) {
      return alunos[i];
    }
  }

  return undefined;
}

function calcularMedia(aluno) {
  if (aluno.notas.length === 0) {
    return 0;
  }

  let soma = 0;

  for (let i = 0; i < aluno.notas.length; i++) {
    soma += aluno.notas[i];
  }

  return soma / aluno.notas.length;
}

function situacao(media) {
  if (media >= 6) {
    return "APROVADO";
  } else if (media >= 4) {
    return "RECUPERACAO";
  } else {
    return "REPROVADO";
  }
}

function cadastrarAluno() {
  let nome = prompt("Digite o nome do aluno:");

  if (buscarAluno(nome)) {
    alert("Aluno já cadastrado!");
    return;
  }

  alunos.push({
    nome: nome,
    notas: []
  });

  alert("Aluno cadastrado com sucesso!");
}

function listarAlunos() {
  if (alunos.length === 0) {
    alert("Nenhum aluno cadastrado");
    return;
  }

  let texto = "";

  for (let i = 0; i < alunos.length; i++) {
    texto += alunos[i].nome + "\n";
  }

  alert(texto);
}

function removerAluno() {
  let nome = prompt("Digite o nome do aluno:");

  let aluno = buscarAluno(nome);

  if (!aluno) {
    alert("Aluno não encontrado!");
    return;
  }

  let posicao = alunos.indexOf(aluno);

  alunos.splice(posicao, 1);

  alert("Aluno removido com sucesso!");
}

function lancarNota() {
  let nome = prompt("Digite o nome do aluno:");

  let aluno = buscarAluno(nome);

  if (!aluno) {
    alert("Aluno não encontrado!");
    return;
  }

  let nota = Number(prompt("Digite a nota:"));

  if (nota < 0 || nota > 10) {
    alert("Nota inválida!");
    return;
  }

  aluno.notas.push(nota);

  alert("Nota lançada com sucesso!");
}

function verBoletim() {
  let nome = prompt("Digite o nome do aluno:");

  let aluno = buscarAluno(nome);

  if (!aluno) {
    alert("Aluno não encontrado!");
    return;
  }

  let media = calcularMedia(aluno);
  let resultado = situacao(media);

  alert(
    "Nome: " + aluno.nome +
    "\nNotas: " + aluno.notas.join(", ") +
    "\nMédia: " + media.toFixed(2) +
    "\nSituação: " + resultado
  );
}

function totalDeAlunos() {
  alert("Total de alunos: " + alunos.length);
}

function mediaGeralDaTurma() {
  if (alunos.length === 0) {
    alert("Nenhum aluno cadastrado.");
    return;
  }

  let soma = 0;

  for (let i = 0; i < alunos.length; i++) {
    soma += calcularMedia(alunos[i]);
  }

  let media = soma / alunos.length;

  alert("Média geral da turma: " + media.toFixed(2));
}

function listarAprovados() {
  let texto = "";
  let encontrou = false;

  for (let i = 0; i < alunos.length; i++) {
    let media = calcularMedia(alunos[i]);

    if (situacao(media) === "APROVADO") {
      texto += alunos[i].nome + " - Média: " + media.toFixed(2) + "\n";
      encontrou = true;
    }
  }

  if (!encontrou) {
    alert("Ainda não há aprovados.");
    return;
  }

  alert(texto);
}

function submenuCadastro() {
  let opcao;

  do {
    opcao = Number(prompt(
      "=== Cadastro ===\n" +
      "1 - Cadastrar aluno\n" +
      "2 - Listar alunos\n" +
      "3 - Remover aluno\n" +
      "0 - Voltar"
    ));

    switch (opcao) {
      case 1:
        cadastrarAluno();
        break;
      case 2:
        listarAlunos();
        break;
      case 3:
        removerAluno();
        break;
      case 0:
        break;
      default:
        alert("Opcao invalida!");
    }
  } while (opcao !== 0);
}

function submenuNotas() {
  let opcao;

  do {
    opcao = Number(prompt(
      "=== Notas ===\n" +
      "1 - Lancar nota\n" +
      "2 - Ver boletim do aluno\n" +
      "0 - Voltar"
    ));

    switch (opcao) {
      case 1:
        lancarNota();
        break;
      case 2:
        verBoletim();
        break;
      case 0:
        break;
      default:
        alert("Opcao invalida!");
    }
  } while (opcao !== 0);
}

function submenuRelatorios() {
  let opcao;

  do {
    opcao = Number(prompt(
      "=== Relatórios ===\n" +
      "1 - Total de alunos\n" +
      "2 - Média geral da turma\n" +
      "3 - Listar aprovados\n" +
      "0 - Voltar"
    ));

    switch (opcao) {
      case 1:
        totalDeAlunos();
        break;
      case 2:
        mediaGeralDaTurma();
        break;
      case 3:
        listarAprovados();
        break;
      case 0:
        break;
      default:
        alert("Opcao invalida!");
    }
  } while (opcao !== 0);
}

function menuPrincipal() {
  let opcao;

  do {
    opcao = Number(prompt(
      "=== Sistema de Alunos ===\n" +
      "1 - Cadastro\n" +
      "2 - Notas\n" +
      "3 - Relatorios\n" +
      "0 - Sair"
    ));

    switch (opcao) {
      case 1:
        submenuCadastro();
        break;
      case 2:
        submenuNotas();
        break;
      case 3:
        submenuRelatorios();
        break;
      case 0:
        alert("Encerrando o sistema...");
        break;
      default:
        alert("Opcao invalida!");
    }
  } while (opcao !== 0);
}

menuPrincipal();