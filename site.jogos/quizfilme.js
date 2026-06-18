const cenas = [
    {
      imagem: "https://cdn.jornaldaparaiba.com.br/img/inline/170000/1400x667/Meninas-Malvadas-confira-curiosidades-e-fatos-sobr0017571800202410030808/scaleDownOutsideFillBackground-1.webp?fallback=https%3A%2F%2Fcdn.jornaldaparaiba.com.br%2Fimg%2Finline%2F170000%2FMeninas-Malvadas-confira-curiosidades-e-fatos-sobr0017571800202410030808.png%3Fxid%3D1072898&xid=1072898",
      pergunta: "De qual filme é esta cena?",
      opcoes: ["Banco Central sob Ataque", "Meninas Malvadas", "Berlim", "Lupin"],
      correta: 1
    },
    {
      imagem: "https://noticiasdatv.uol.com.br/media/_versions/artigos/amy-adams-encantada-reproducao-disney-min_fixed_large.jpg",
      pergunta: "Esta cena pertence a qual filme?",
      opcoes: ["Encantada", "Frozen", "Cinderela", "A Bela e a Fera"],
      correta: 0
    },
    {
      imagem: "https://media.gazetadopovo.com.br/2012/07/43665ada6bc4084b328cb1ec8390b4bd-gpMedium.jpg",
      pergunta: "Qual é o filme desta imagem?",
      opcoes: ["Enrolados", "Valente", "Moana", "Rapunzel e o Príncipe"],
      correta: 1
    },
    {
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BRq9HtzWB6577OZZ-Z74KO7TLXOhZSjtj-GWyRFDQUZHgoU-UzAPfC-50ZlLXB_7omY&usqp=CAU",
      pergunta: "A cena abaixo é de qual filme?",
      opcoes: ["Gente Grande", "Click", "Cada um tem a Gêmea que Merece", "O Paizão"],
      correta: 3
    },
    {
      imagem: "https://pt.quizur.com/_image?href=https%3A%2F%2Fdev-beta.quizur.com%2Fstorage%2Fv1%2Fobject%2Fpublic%2F%2Fimagens%2F%2F20418154%2F9ef202ba-0f39-482e-a080-b1261b0dd7e6.png&w=400&h=400&f=webp",
      pergunta: "Qual filme tem esta cena?",
      opcoes: ["A Princesa e o Sapo", "Frozen", "Mulan", "Valente"],
      correta: 0
    },
    {
      imagem: "https://assets.papelpop.com/wp-content/uploads/2020/12/sid.png",
      pergunta: "De qual animação é essa cena?",
      opcoes: ["Toy Story", "Carros", "Divertida Mente", "Vida de Inseto"],
      correta: 0
    },
    {
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9zKhSoBprOVOdQ_Az6skJncXe6nMQ9jrTaQ&s",
      pergunta: "Essa cena famosa é de qual filme?",
      opcoes: ["Titanic", "Avatar", "O Segredo de Brokeback Mountain", "Diário de uma Paixão"],
      correta: 3
    },
    {
      imagem: "https://uploads.jovemnerd.com.br/wp-content/uploads/2025/02/capitao_america_4_cena_pos_creditos__1r5kq1h.jpg",
      pergunta: "Reconhece o filme dessa cena?",
      opcoes: ["Homem-Aranha", "Hulk Vermelho", "Capitão América", "Thor"],
      correta: 2
    },
    {
      imagem: "https://recreio.com.br/wp-content/uploads/filmes/percy_jackson_3_capa.jpg",
      pergunta: "Essa cena vem de qual filme?",
      opcoes: ["Harry Potter e a Pedra Filosofal", "Percy Jackson", "O Hobbit", "Crepúsculo"],
      correta: 1
    },
    {
      imagem: "https://www.planocritico.com/wp-content/uploads/2015/07/homem-formiga-entenda-melhor-im-des.jpg",
      pergunta: "De qual filme de super-herói é essa cena?",
      opcoes: ["Os Vingadores", "Guardiões da Galáxia", "Pantera Negra", "Homem-Formiga"],
      correta: 3
    }
  ];

  let atual = 0;
  let pontos = 0;
  let melhorPontuacao = Number(localStorage.getItem('quizFilme')) || 0;

  const gameBox = document.getElementById('gameBox');

  function carregarCena() {
    const c = cenas[atual];
  
    gameBox.innerHTML = `
      <p style="font-weight:600; font-size:1.2rem;">
        ${atual + 1}. ${c.pergunta}
      </p>
  
      <img src="${c.imagem}" alt="Cena do filme">
  
      <div class="score-display">
        🎯 Pontos: ${pontos} / ${cenas.length}<br>
        🏆 Melhor pontuação: ${melhorPontuacao}
      </div>
  
      <div class="options">
        ${c.opcoes.map((op, i) =>
          `<button onclick="verificar(${i})">${op}</button>`
        ).join('')}
      </div>
  
      <p>${atual + 1} de ${cenas.length}</p>
    `;
  }

  function verificar(opcaoSelecionada) {
    const c = cenas[atual];
    const buttons = gameBox.querySelectorAll('.options button');
    
    // 1. Desabilita todos os botões para evitar cliques duplicados
    buttons.forEach(btn => btn.disabled = true);
    
    // 2. Aplica feedback visual
    if (opcaoSelecionada === c.correta) {
      pontos++;

if (pontos > melhorPontuacao) {
  melhorPontuacao = pontos;
  localStorage.setItem('quizFilme', melhorPontuacao);
}
      buttons[opcaoSelecionada].classList.add('correct');
    } else {
      buttons[opcaoSelecionada].classList.add('wrong');
      // Mostra o botão correto em verde (melhora o feedback)
      buttons[c.correta].classList.add('correct'); 
    }

    // 3. Adiciona um pequeno atraso (1.2s) antes de carregar a próxima cena ou mostrar o resultado
    setTimeout(() => {
      atual++;
      if (atual < cenas.length) {
        carregarCena();
      } else {
        mostrarResultado();
      }
    }, 1200); 
  }

  function mostrarResultado() {
    const modalEl = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');
    resultText.textContent = `Você acertou ${pontos} de ${cenas.length} cenas!`;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
  
  // Função para reiniciar o jogo
  function recomecarJogo() {
    atual = 0;
    pontos = 0;
    carregarCena();
  }

  // Inicia o jogo
  carregarCena();