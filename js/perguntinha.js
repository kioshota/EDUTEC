const questions = [
  {
    q: "O que significa a sigla EdTech?",
    options: ["Educational Technology", "Electronic Teaching", "Enhanced Digital Training", "Education Extension"],
    correct: 0,
    feedback: "EdTech é a abreviação de Educational Technology, termo que reúne todas as ferramentas digitais e metodologias tecnológicas aplicadas à educação."
  },
  {
    q: "Qual plataforma é um exemplo clássico de LMS (Learning Management System)?",
    options: ["Instagram", "Moodle", "Spotify", "Notion"],
    correct: 1,
    feedback: "O Moodle é um dos sistemas de gestão de aprendizagem mais utilizados no mundo, amplamente adotado por universidades e escolas para organizar conteúdos e avaliações."
  },
  {
    q: "Segundo pesquisas, quanto o aprendizado adaptativo digital pode reduzir no tempo de estudo?",
    options: ["10%", "25%", "40%", "60%"],
    correct: 2,
    feedback: "Estudos indicam que métodos de aprendizado adaptativo digital podem reduzir em até 40% o tempo necessário para dominar um conteúdo em comparação com métodos tradicionais."
  },
  {
    q: "O que é 'gamificação' no contexto educacional?",
    options: [
      "Substituir aulas por videogames",
      "Usar mecânicas de jogo para tornar o aprendizado mais engajante",
      "Criar jogos educativos do zero",
      "Usar apenas aplicativos móveis para ensinar"
    ],
    correct: 1,
    feedback: "Gamificação é a aplicação de elementos de jogos — como pontos, conquistas e rankings — em contextos de aprendizagem para aumentar o engajamento sem reduzir o rigor pedagógico."
  },
  {
    q: "Qual é o principal risco de implementar tecnologia na educação sem planejamento adequado?",
    options: [
      "Aulas ficam mais rápidas",
      "Estudantes aprendem mais",
      "A tecnologia vira distração em vez de ferramenta de aprendizagem",
      "Os professores ficam desempregados imediatamente"
    ],
    correct: 2,
    feedback: "Sem formação pedagógica e planejamento claro, dispositivos e plataformas digitais podem se tornar fontes de distração em vez de potencializadores do aprendizado."
  },
  {
    q: "O que são MOOCs?",
    options: [
      "Modelos de Organização para Currículos",
      "Métodos de Observação de Comportamento",
      "Cursos online abertos para um grande número de participantes",
      "Módulos Objetivos de Controle Curricular"
    ],
    correct: 2,
    feedback: "MOOCs (Massive Open Online Courses) são cursos online abertos e escaláveis, oferecidos por plataformas como Coursera e edX, que democratizaram o acesso ao ensino superior de qualidade."
  },
  {
    q: "De acordo com o World Economic Forum, qual porcentagem dos empregos do futuro ainda não existem?",
    options: ["30%", "45%", "55%", "65%"],
    correct: 3,
    feedback: "O World Economic Forum estima que 65% dos empregos que existirão em 2035 ainda não foram criados, reforçando a necessidade de uma educação focada em competências e adaptabilidade."
  },
  {
    q: "Qual ferramenta é um exemplo de laboratório virtual para experimentos científicos?",
    options: ["Kahoot", "PhET Simulations", "Duolingo", "Canva"],
    correct: 1,
    feedback: "PhET Simulations, desenvolvido pela Universidade do Colorado, oferece simulações interativas de física, química e biologia — democratizando experimentos científicos sem equipamentos físicos."
  },
  {
    q: "No contexto da IA na educação, o que faz um 'sistema de tutoria inteligente'?",
    options: [
      "Substitui completamente o professor na sala de aula",
      "Identifica lacunas no conhecimento do estudante e adapta os exercícios em tempo real",
      "Cria provas automaticamente para todos os alunos da mesma forma",
      "Monitora o tempo de tela dos alunos"
    ],
    correct: 1,
    feedback: "Sistemas de tutoria inteligente utilizam IA para identificar onde cada estudante tem dificuldade e propõem exercícios específicos para preencher essas lacunas — de forma personalizada e em tempo real."
  },
  {
    q: "O que é o modelo pedagógico 'sala de aula invertida' (flipped classroom)?",
    options: [
      "Os alunos ficam de pé durante a aula",
      "O professor aprende com os alunos",
      "Os alunos assistem ao conteúdo em casa e praticam na escola",
      "As aulas acontecem no período inverso ao habitual"
    ],
    correct: 2,
    feedback: "Na sala de aula invertida, os alunos assistem às aulas teóricas em vídeo por conta própria e utilizam o tempo em sala para praticar, discutir e tirar dúvidas com o professor — maximizando o valor do contato presencial."
  }
];

let current = 0;
let score = 0;
let answered = false;

const startEl    = document.getElementById('quizStart');
const activeEl   = document.getElementById('quizActive');
const resultEl   = document.getElementById('quizResult');
const btnStart   = document.getElementById('btnStart');
const btnNext    = document.getElementById('btnNext');
const btnRestart = document.getElementById('btnRestart');
const progressBar   = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const questionNum   = document.getElementById('questionNum');
const questionText  = document.getElementById('questionText');
const questionOpts  = document.getElementById('questionOptions');
const feedback      = document.getElementById('questionFeedback');

function showQuestion() {
  answered = false;
  btnNext.style.display = 'none';
  feedback.classList.remove('show', 'qq-feedback-correct', 'qq-feedback-wrong');
  feedback.textContent = '';

  const q = questions[current];
  const pct = (current / questions.length) * 100;
  progressBar.style.width = pct + '%';
  progressLabel.textContent = (current + 1) + ' / ' + questions.length;
  questionNum.textContent = 'Questão ' + String(current + 1).padStart(2, '0');
  questionText.textContent = q.q;

  questionOpts.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'qq-option';
    btn.innerHTML = `<span class="qq-opt-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    questionOpts.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const allOpts = questionOpts.querySelectorAll('.qq-option');
  allOpts.forEach(o => o.disabled = true);

  if (index === q.correct) {
    btn.classList.add('correct');
    score++;
    feedback.textContent = 'Correto! ' + q.feedback;
    feedback.classList.add('qq-feedback-correct');
  } else {
    btn.classList.add('wrong');
    allOpts[q.correct].classList.add('correct');
    feedback.textContent = 'Incorreto. ' + q.feedback;
    feedback.classList.add('qq-feedback-wrong');
  }
  feedback.classList.add('show');

  if (current < questions.length - 1) {
    btnNext.style.display = 'inline-flex';
    btnNext.textContent = 'Próxima questão';
  } else {
    btnNext.style.display = 'inline-flex';
    btnNext.textContent = 'Ver resultado';
  }
}

function showResult() {
  activeEl.style.display = 'none';
  resultEl.style.display = 'block';

  document.getElementById('resultScore').textContent = score;
  document.getElementById('resultOf').textContent = 'de ' + questions.length + ' questões corretas';

  const badgeEl = document.getElementById('resultBadge');
  const msgEl   = document.getElementById('resultMsg');
  const pct = (score / questions.length) * 100;

  if (pct === 100) {
    badgeEl.className = 'result-badge rb-excelente';
    badgeEl.textContent = 'Excelente';
    msgEl.textContent = 'Desempenho perfeito! Você demonstra domínio sólido sobre tecnologia na educação. Continue se aprofundando no tema.';
  } else if (pct >= 70) {
    badgeEl.className = 'result-badge rb-otimo';
    badgeEl.textContent = 'Ótimo';
    msgEl.textContent = 'Ótimo resultado! Você tem uma compreensão bem fundamentada sobre EdTech. Algumas revisões no conteúdo podem ajudar a preencher as lacunas restantes.';
  } else if (pct >= 50) {
    badgeEl.className = 'result-badge rb-bom';
    badgeEl.textContent = 'Bom';
    msgEl.textContent = 'Resultado razoável! Você conhece o básico, mas vale revisar o conteúdo para aprofundar os temas em que errou.';
  } else {
    badgeEl.className = 'result-badge rb-regular';
    badgeEl.textContent = 'Precisa revisar';
    msgEl.textContent = 'Recomendamos revisitar o conteúdo educacional antes de tentar novamente. O material foi elaborado especialmente para ajudar na compreensão desses temas.';
  }
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  resultEl.style.display = 'none';
  activeEl.style.display = 'block';
  showQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

btnStart.addEventListener('click', () => {
  startEl.style.display = 'none';
  activeEl.style.display = 'block';
  showQuestion();
});

btnNext.addEventListener('click', () => {
  current++;
  if (current >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});

btnRestart.addEventListener('click', restartQuiz);
