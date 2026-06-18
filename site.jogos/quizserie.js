
    const series = [
      {
        imagem: "https://cinepop.com.br/wp-content/uploads/wandinha-05.jpg",
        pergunta: "Qual série é esta cena?",
        opcoes: ["Wandinha", "Stranger Things", "The Umbrella Academy", "Chilling Adventures of Sabrina"],
        correta: 0
      },
      {
        imagem: "https://s2-techtudo.glbimg.com/PBPfMFqS6FqcLaTJWaqZ0ZupLmw=/0x0:1044x562/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/P/R/rUKVWXSDypvwL1fwM49A/outer-banks-imdb-techtudo.jpg",
        pergunta: "Qual série se passa nesta ilha?",
        opcoes: ["Outer Banks", "Riverdale", "Elite", "The 100"],
        correta: 0
      },
      {
        imagem: "https://wp.rotadeferias.com.br/wp-content/uploads/2020/10/6-9.jpg",
        pergunta: "Qual série tem esta personagem em Paris?",
        opcoes: ["Gossip Girl", "Emily em Paris", "Sex and the City", "The Bold Type"],
        correta: 1
      },
      {
        imagem: "https://recreio.com.br/wp-content/uploads/disney/hannah_montanaaaaaa_capa.jpg", // URL CORRIGIDA: Hannah Montana
        pergunta: "Qual série mostra um canal online?",
        opcoes: ["iCarly", "Drake & Josh", "Victorious", "Hannah Montana"],
        correta: 3
      },
      {
        imagem: "https://www.vigilianerd.com.br/wp-content/uploads/2020/06/dark_vigilia_nerd-9.jpg",
        pergunta: "Que série é esta?",
        opcoes: ["Stranger Things", "Dark", "Locke & Key", "The OA"],
        correta: 1
      },
      {
        imagem: "https://futaricombii.com/wp-content/uploads/2020/07/the-umbrella-academy-netflix-1024x576.jpg",
        pergunta: "Qual série mostra uma família de super-heróis adotados?",
        opcoes: ["The Umbrella Academy", "Titans", "Doom Patrol", "Legends of Tomorrow"],
        correta: 0
      },
      {
        imagem: "https://escutai.com/wp-content/uploads/2021/07/thats-so-raven-as-visoes-da-raven-curiosidades-segredos-escutai-disney-4-1024x685.jpg",
        pergunta: "Qual série tem a jovem tem visões",
        opcoes: ["Sabrina, Aprendiz de Feiticeira", "As Visões da Raven", "Wandinha", "The Secret Circle"],
        correta: 1
      },
      {
        imagem: "https://rollingstone.com.br/wp-content/uploads/gossip_girl_reboot_foto_divulgacao_hbo_max.jpg",
        pergunta: "Qual série mostra um grupo de adolescentes?",
        opcoes: ["Gossip Girl", "Emily em Paris", "Pretty Little Liars", "The Carrie Diaries"],
        correta: 0
      },
      {
        imagem: "https://recreio.com.br/wp-content/uploads/celebridades/dylan_e_cole_sprouse_capa.jpg",
        pergunta: "Qual série mostra irmãos gêmeos?",
        opcoes: ["Elite", "Riverdale", "Outer Banks", "Zack e Cody"],
        correta: 3
      },
      {
        imagem: "https://preview.redd.it/for-those-who-watched-jessie-who-did-you-prefer-jessie-with-v0-9m7nv3yrndre1.jpg?width=602&format=pjpg&auto=webp&s=8acb0e549e74fc02b8dd32dfbe050861a8caa79e",
        pergunta: "Qual série mostra a chance de uma jovem ter um emprego fixo?",
        opcoes: ["Riverdale", "Gossip Girl", "Jessie", "Nancy Drew"],
        correta: 2
      },
      {
        imagem: "https://thumbnails.cbsig.net/_x/w400/CBS_Production_Entertainment_VMS/2020/09/15/1789225027988/NLAS_VICTORIOUS_101_263556_1920x1080.jpg",
        pergunta: "Qual série mostra uma jovem deslocada e descobre seu talento em ser artista?",
        opcoes: ["The 100", "Meninas Malvadas", "Sam e Cat", "Brilhante Victoria"],
        correta: 3
      },
      {
        imagem: "https://cdn.mixdeseries.com.br/wp-content/uploads/2025/01/Uma-Mente-Excepcional-serie-Disney-episodios.jpg",
        pergunta: "Qual série envolve uma mãe com uma mente brilhante?",
        opcoes: ["Dark", "Stranger Things", "Uma Mente Excepcional", "Travelers"],
        correta: 2
      },
      {
        imagem: "https://www.planocritico.com/wp-content/uploads/2023/05/titas_4x12_titans_forever_plano_critico.jpg",
        pergunta: "Qual série mostra jovens super-heróis da DC?",
        opcoes: ["Titans", "The Umbrella Academy", "Legends of Tomorrow", "Doom Patrol"],
        correta: 0
      },
      {
        imagem: "https://s2-g1.glbimg.com/ef-QCBc9-wjZpZuMTGvHN6iZt8o=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/r/q/KMpQl7Q8qmh21loNw4FA/pretty-little-liars.jpg",
        pergunta: "Qual série mostra segredos entre amigas em Rosewood?",
        opcoes: ["Pretty Little Liars", "Gossip Girl", "Elite", "Riverdale"],
        correta: 0
      },
      {
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/ed13a8ddb86332bf8db39235ed662f5d12399ff0c98ad48d01564b5b7771a685._SX1080_FMjpg_.jpg",
        pergunta: "Qual série segue a jovem detetive?",
        opcoes: ["Enola Holmes", "Veronica Mars", "Nancy Drew", "The Hardy Boys"],
        correta: 2
      }
    ];

    let atual = 0;
    let pontos = 0;
    let melhorPontuacao = Number(localStorage.getItem('quizSerie')) || 0;
    const gameBox = document.getElementById('gameBox');

    // Função para reiniciar o jogo (Adicionada)
    function recomecarJogo() {
      atual = 0;
      pontos = 0;
      carregarCena();
    }

    function carregarCena() {
      const c = series[atual];
    
      gameBox.innerHTML = `
        <p style="font-weight:600; font-size:1.2rem;">
          ${atual + 1}. ${c.pergunta}
        </p>
    
        <img src="${c.imagem}" alt="Cena da série">
    
        <div class="score-display">
          Pontos: ${pontos} / ${series.length}<br>
          🏆 Melhor pontuação: ${melhorPontuacao}
        </div>
    
        <div class="options">
          ${c.opcoes.map((op, i) =>
            `<button onclick="verificar(${i})">${op}</button>`
          ).join('')}
        </div>
    
        <p>${atual + 1} de ${series.length}</p>
      `;
    }
  

    function verificar(opcaoSelecionada) {
      const c = series[atual];
      const buttons = gameBox.querySelectorAll('.options button');
      
      // 1. Desabilita todos os botões
      buttons.forEach(btn => btn.disabled = true);
      
      // 2. Aplica feedback visual
      if (opcaoSelecionada === c.correta) {
        pontos++;
        if (pontos > melhorPontuacao) {
          melhorPontuacao = pontos;
          localStorage.setItem('quizSerie', melhorPontuacao);
        }
        
        buttons[opcaoSelecionada].classList.add('correct');
      } else {
        buttons[opcaoSelecionada].classList.add('wrong');
        // Mostra o botão correto em verde
        buttons[c.correta].classList.add('correct'); 
      }

      // 3. Adiciona um atraso para o feedback
      setTimeout(() => {
        atual++;
        if (atual < series.length) {
          carregarCena();
        } else {
          mostrarResultado();
        }
      }, 1200); // 1.2 segundos de espera
    }

    function mostrarResultado() {
      const modalEl = document.getElementById('resultModal');
      const resultText = document.getElementById('resultText');
      resultText.textContent = `Você acertou ${pontos} de ${series.length} cenas!`;
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }

    carregarCena();
  