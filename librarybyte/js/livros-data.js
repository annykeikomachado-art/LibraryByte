const LIVROS = [
  {
    id: "javascript-good-parts",
    id_ebook: 2,
    capa: "../assets/img/capas/livro-02.jpg",
    titulo: "JavaScript: The Good Parts",
    publicacao: "2008",
    categoria: "Desenvolvimento de Software",
    resumo:
      "O livro destaca os recursos mais valiosos da linguagem JavaScript e ensina a evitar armadilhas comuns. É leitura fundamental para quem quer desenvolver código mais eficiente, limpo e compreensível em aplicações web modernas."
  },
  {
    id: "arquitetura-limpa",
    id_ebook: 3,
    capa: "../assets/img/capas/livro-03.jpg",
    titulo: "Arquitetura Limpa",
    publicacao: "2017",
    categoria: "Engenharia de Software I",
    resumo:
      "Explora princípios fundamentais para criar sistemas bem estruturados e fáceis de manter. Com foco em modularidade, desacoplamento e testes, o texto ajuda desenvolvedores a construir software que resiste ao crescimento e às mudanças de requisitos."
  },
  {
    id: "machine-learning-pragmatic",
    id_ebook: 4,
    capa: "../assets/img/capas/livro-04.jpg",
    titulo: "Machine Learning Prático",
    publicacao: "2016",
    categoria: "Aprendizado de Máquina",
    resumo:
      "Uma introdução acessível ao mundo do aprendizado de máquina, com aplicações reais e exemplos práticos. O livro combina teoria, ferramentas e técnicas que ajudam a entender como modelos são treinados, avaliados e utilizados em problemas do cotidiano tecnológico."
  },
  {
    id: "arquitetura-computadores-stallings-8",
    id_ebook: 5,
    capa: "../assets/img/capas/livro-05.jpg",
    titulo: "Arquitetura e Organização de Computadores (8ª edição)",
    publicacao: "2010",
    categoria: "Arquitetura e Organização de Computadores",
    resumo:
      "O livro aborda a estrutura e o funcionamento dos computadores, explicando como os componentes físicos trabalham em conjunto para executar instruções e processar informações. A arquitetura de computadores está relacionada às características que são visíveis para o programador, enquanto a organização envolve a implementação dos componentes e a maneira como eles se comunicam. Entre os principais assuntos estão o processador (CPU), a unidade de controle, a unidade lógica e aritmética (ULA), os sistemas de memória, os barramentos e os dispositivos de entrada e saída. A obra também trata do ciclo de execução das instruções, do armazenamento de dados e dos fatores que influenciam o desempenho de um computador."
  },
  {
    id: "organizacao-estruturada-computadores",
    id_ebook: 6,
    capa: "../assets/img/capas/livro-06.jpg",
    titulo: "Organização Estruturada de Computadores",
    publicacao: "2013",
    categoria: "Arquitetura e Organização de Computadores",
    resumo:
      "A obra apresenta a organização dos computadores a partir de diferentes níveis de abstração, demonstrando como os componentes eletrônicos se relacionam com as instruções de máquina e os programas. O conteúdo aborda a representação de informações em sistemas binários, a linguagem de máquina, o Assembly, o funcionamento do processador e a organização da memória. Também explica como os componentes de hardware se comunicam e como os sistemas computacionais executam operações. A abordagem por níveis permite compreender que o funcionamento de um computador depende da interação entre diferentes camadas, desde os circuitos digitais até os programas utilizados pelos usuários."
  },
  {
    id: "sistemas-digitais-principios-aplicacoes",
    id_ebook: 7,
    capa: "../assets/img/capas/livro-07.jpg",
    titulo: "Sistemas Digitais: Princípios e Aplicações",
    publicacao: "2019",
    categoria: "Arquitetura e Organização de Computadores",
    resumo:
      "O livro apresenta os fundamentos dos sistemas digitais, que utilizam sinais discretos para representar e processar informações. O conteúdo aborda os sistemas de numeração, especialmente o binário, e as conversões entre diferentes bases numéricas. Também explora a álgebra booleana e as portas lógicas AND, OR, NOT, NAND, NOR, XOR e XNOR, utilizadas na construção de circuitos digitais. A obra diferencia circuitos combinacionais, cujas saídas dependem das entradas atuais, de circuitos sequenciais, que também consideram estados anteriores. Outros assuntos relacionados são os flip-flops, registradores, contadores e circuitos utilizados no processamento e armazenamento de informações."
  },
  {
    id: "arquitetura-interface-hardware-software",
    id_ebook: 8,
    capa: "../assets/img/capas/livro-08.jpg",
    titulo: "Arquitetura e Organização de Computadores: A Interface entre Hardware e Software",
    publicacao: "2017",
    categoria: "Arquitetura e Organização de Computadores",
    resumo:
      "A obra estuda a relação entre hardware e software, explicando como a estrutura de um computador influencia a execução dos programas. Um dos conceitos centrais é o conjunto de instruções, que define as operações que o processador consegue realizar. O livro também aborda a representação das instruções em linguagem de máquina, a linguagem Assembly, a unidade de controle e o caminho de dados. Outros temas importantes são o pipeline, que permite sobrepor etapas de execução de instruções, a hierarquia de memória, as memórias cache e as técnicas de paralelismo. O conteúdo relaciona as decisões de projeto do processador ao desempenho dos programas e à eficiência do processamento."
  },
  {
    id: "arquitetura-computadores-stallings-10",
    id_ebook: 9,
    capa: "../assets/img/capas/livro-09.jpg",
    titulo: "Arquitetura e Organização de Computadores (10ª edição)",
    publicacao: "2016",
    categoria: "Arquitetura e Organização de Computadores",
    resumo:
      "Nesta edição, os fundamentos da arquitetura e da organização dos computadores são abordados a partir dos componentes responsáveis pelo processamento, armazenamento e comunicação de dados. O conteúdo envolve a estrutura da CPU, o funcionamento da unidade de controle e da unidade lógica e aritmética, além do ciclo de busca, decodificação e execução de instruções. A obra também trata dos diferentes níveis de memória, como registradores, memória cache, memória principal e armazenamento secundário. Outros assuntos incluem barramentos, dispositivos de entrada e saída e técnicas de melhoria de desempenho."
  },
  {
    id: "engenharia-software-sommerville-8",
    id_ebook: 10,
    capa: "../assets/img/capas/livro-10.jpg",
    titulo: "Engenharia de Software (8ª edição)",
    publicacao: "2007",
    categoria: "Engenharia de Software I",
    resumo:
      "O livro apresenta a engenharia de software como uma área que utiliza métodos, processos e ferramentas para desenvolver e manter sistemas com qualidade. A obra aborda as etapas envolvidas no desenvolvimento, desde a identificação das necessidades dos usuários até a manutenção do sistema após sua entrega. Entre os principais assuntos estão os processos de software, a especificação de requisitos, o projeto da arquitetura, a implementação, os testes e a evolução dos sistemas. Também são discutidos o gerenciamento de projetos, os custos, os prazos e os riscos associados ao desenvolvimento. A qualidade é tratada como um aspecto que deve ser considerado ao longo de todo o processo, garantindo que o produto atenda às necessidades estabelecidas e possa ser modificado quando necessário."
  },
  {
    id: "engenharia-software-pressman-6",
    id_ebook: 11,
    capa: "../assets/img/capas/livro-11.jpg",
    titulo: "Engenharia de Software (6ª edição)",
    publicacao: "2006",
    categoria: "Engenharia de Software I",
    resumo:
      "A obra apresenta princípios e práticas utilizados na construção de sistemas de software, destacando a importância de organizar o desenvolvimento por meio de atividades bem definidas. O conteúdo aborda a análise dos requisitos, a modelagem do sistema, o projeto da arquitetura, a implementação, os testes e a implantação. Também trata da garantia da qualidade, da documentação e do gerenciamento de riscos. A engenharia de software é apresentada como uma atividade que exige planejamento e acompanhamento, pois problemas de comunicação, alterações nos requisitos e falhas técnicas podem comprometer os resultados. O livro enfatiza a necessidade de verificar se o sistema atende às especificações e de adotar práticas que facilitem sua manutenção e evolução."
  },
  {
    id: "codigo-limpo",
    id_ebook: 12,
    capa: "../assets/img/capas/livro-12.jpg",
    titulo: "Código Limpo: Habilidades Práticas do Agile Software",
    publicacao: "2008",
    categoria: "Engenharia de Software I",
    resumo:
      "O livro aborda boas práticas de programação voltadas à criação de códigos legíveis, organizados e fáceis de manter. A principal ideia é que um programa não deve apenas produzir o resultado esperado, mas também apresentar uma estrutura que facilite sua compreensão e modificação. A obra discute a escolha de nomes significativos para variáveis e funções, a criação de funções pequenas, a definição de responsabilidades claras e a redução da duplicação de código. Também aborda o tratamento de erros, a utilização de comentários, os testes automatizados e a refatoração. A refatoração consiste em melhorar a estrutura interna do código sem alterar seu comportamento externo esperado. Essas práticas ajudam a reduzir a complexidade e tornam as alterações futuras menos propensas a introduzir novos problemas."
  },
  {
    id: "programador-pragmatico",
    id_ebook: 13,
    capa: "../assets/img/capas/livro-13.jpg",
    titulo: "O Programador Pragmático: De Aprendiz a Mestre",
    publicacao: "1999",
    categoria: "Engenharia de Software I",
    resumo:
      "A obra apresenta princípios relacionados à postura profissional, à resolução de problemas e ao aperfeiçoamento contínuo de quem desenvolve software. Os autores destacam a importância de assumir responsabilidades pelas decisões tomadas, buscar novos conhecimentos e escolher ferramentas adequadas para cada situação. O conteúdo valoriza a simplicidade, a automação de tarefas repetitivas, a reutilização de soluções e a organização do código. Também aborda a importância de investigar as causas dos erros, em vez de corrigir apenas seus efeitos, e de utilizar ferramentas de controle de versão para acompanhar as alterações realizadas nos programas. Outro aspecto importante é a flexibilidade, pois os sistemas precisam ser preparados para mudanças nos requisitos e nas tecnologias utilizadas."
  },
  {
    id: "engenharia-software-moderna",
    id_ebook: 14,
    capa: "../assets/img/capas/livro-14.jpg",
    titulo: "Engenharia de Software Moderna: Princípios e Práticas para Desenvolvimento de Software com Produtividade e Qualidade",
    publicacao: "2020",
    categoria: "Engenharia de Software I",
    resumo:
      "O livro apresenta princípios e práticas contemporâneas para desenvolver sistemas de software com qualidade e produtividade. A obra aborda os processos de desenvolvimento, a definição de requisitos, a arquitetura dos sistemas, os métodos ágeis, os testes e a manutenção. Também discute práticas de integração contínua, nas quais alterações de código são integradas frequentemente e verificadas por meio de procedimentos automatizados. A qualidade do software está relacionada a características como confiabilidade, facilidade de manutenção e atendimento aos requisitos. O conteúdo também considera a necessidade de adaptar os processos às características de cada projeto, buscando equilibrar velocidade de desenvolvimento, organização, qualidade técnica e capacidade de evolução."
  },
  {
    id: "projeto-algoritmos-ziviani",
    id_ebook: 15,
    capa: "../assets/img/capas/livro-15.jpg",
    titulo: "Projeto de Algoritmos com Implementações em Pascal e C",
    publicacao: "2004",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "A obra aborda a construção, a implementação e a análise de algoritmos utilizados na resolução de problemas computacionais. Um algoritmo consiste em uma sequência finita e organizada de instruções que transforma dados de entrada em resultados. O livro relaciona o desenvolvimento de algoritmos à utilização de estruturas de dados e à implementação em linguagens de programação, como Pascal e C. Entre os assuntos associados ao projeto de algoritmos estão os métodos de busca e ordenação, a recursividade e a análise de complexidade. A complexidade permite avaliar a quantidade de recursos, como tempo de processamento e memória, que uma solução pode exigir. Dessa forma, o projeto de algoritmos envolve tanto a correção dos resultados quanto a eficiência dos procedimentos utilizados."
  },
  {
    id: "logica-programacao-forbellone",
    id_ebook: 16,
    capa: "../assets/img/capas/livro-16.jpg",
    titulo: "Lógica de Programação: A Construção de Algoritmos e Estruturas de Dados",
    publicacao: "2005",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "O livro apresenta os fundamentos do raciocínio lógico aplicado à programação, mostrando como transformar um problema em uma sequência organizada de instruções. O conteúdo envolve variáveis, constantes, tipos de dados, operadores aritméticos, relacionais e lógicos, além das operações de entrada e saída. Também aborda as estruturas sequenciais, condicionais e de repetição, que controlam a ordem de execução das instruções. Outros conceitos importantes são os vetores, as matrizes, as funções e a modularização dos programas. A construção de algoritmos exige identificar os dados necessários, determinar as operações que devem ser realizadas e estabelecer como os resultados serão apresentados. A utilização de pseudocódigo e fluxogramas pode auxiliar na representação e na verificação das soluções antes da implementação em uma linguagem de programação."
  },
  {
    id: "fundamentos-programacao-ascencio",
    id_ebook: 17,
    capa: "../assets/img/capas/livro-17.jpg",
    titulo: "Fundamentos da Programação de Computadores: Algoritmos, Pascal, C/C++ e Java",
    publicacao: "2007",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "A obra relaciona os fundamentos da lógica de programação à implementação de algoritmos em diferentes linguagens. O conteúdo aborda variáveis, constantes, tipos de dados, operadores e estruturas de controle, além da organização de programas em funções e módulos. Também contempla estruturas de dados, como vetores e matrizes, utilizadas para armazenar e manipular conjuntos de informações. A utilização de linguagens como Pascal, C, C++ e Java permite observar como conceitos semelhantes podem ser implementados por meio de sintaxes diferentes. A elaboração de uma solução começa pela compreensão do problema e pela definição de um algoritmo, que posteriormente pode ser traduzido para a linguagem escolhida. A obra relaciona, assim, o raciocínio lógico à construção prática de programas."
  },
  {
    id: "algoritmos-logica-souza",
    id_ebook: 18,
    capa: "../assets/img/capas/livro-18.jpg",
    titulo: "Algoritmos e Lógica de Programação",
    publicacao: "2004",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "O livro está relacionado aos fundamentos da construção de algoritmos e ao desenvolvimento do raciocínio necessário para resolver problemas por meio da programação. A elaboração de uma solução computacional exige identificar o problema, reconhecer os dados disponíveis e estabelecer as etapas necessárias para alcançar o resultado esperado. Entre os conceitos fundamentais desse campo estão as variáveis, os tipos de dados, os operadores, as estruturas sequenciais, as condições e as estruturas de repetição. A lógica de programação também envolve a decomposição de problemas complexos em etapas menores, facilitando sua compreensão e implementação. A representação dos algoritmos permite organizar as instruções antes de transformá-las em código, enquanto os testes ajudam a verificar se a solução apresenta os resultados esperados."
  },
  {
    id: "algoritmos-fundamentos-pratica",
    id_ebook: 19,
    capa: "../assets/img/capas/livro-19.jpg",
    titulo: "Algoritmos: Fundamentos e Prática",
    publicacao: "2006",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "A referência está relacionada aos fundamentos teóricos e à aplicação prática dos algoritmos na resolução de problemas computacionais. O estudo de algoritmos envolve a definição clara do problema, a identificação das entradas e saídas e a elaboração de uma sequência de instruções capaz de produzir o resultado desejado. Entre os conceitos fundamentais desse campo estão as estruturas sequenciais, as condições e as repetições, que permitem controlar o fluxo de execução. A representação por pseudocódigo ou fluxogramas pode auxiliar na organização das etapas e na compreensão da lógica utilizada. Também é importante testar os algoritmos, acompanhar a execução das instruções e verificar se os resultados estão corretos. A combinação desses procedimentos permite construir soluções progressivamente mais complexas."
  },
  {
    id: "introducao-programacao-boratti",
    id_ebook: 20,
    capa: "../assets/img/capas/livro-20.jpg",
    titulo: "Introdução à Programação: Algoritmos",
    publicacao: "2007",
    categoria: "Algoritmos e Lógica de Programação",
    resumo:
      "A obra é identificada como uma introdução à programação com foco na construção de algoritmos. Esse campo estuda como representar soluções de maneira lógica e organizada, permitindo que um computador execute as instruções necessárias para resolver determinado problema. Os conceitos fundamentais relacionados ao tema incluem variáveis, constantes, tipos de dados, operadores e estruturas de controle. As estruturas sequenciais estabelecem a ordem das instruções, as condicionais permitem escolher entre diferentes caminhos e as estruturas de repetição executam operações várias vezes conforme uma condição. A construção de algoritmos também envolve a organização dos dados, a divisão do problema em etapas e a realização de testes para identificar erros lógicos. A partir desses fundamentos, é possível elaborar soluções para problemas de diferentes níveis de complexidade."
  },
  {
    id: "sistemas-operacionais-oliveira",
    id_ebook: 21,
    capa: "../assets/img/capas/livro-21.jpg",
    titulo: "Sistemas Operacionais (Livros Didáticos, volume 11)",
    publicacao: "2008",
    categoria: "Sistemas Operacionais",
    resumo:
      "O livro aborda os fundamentos dos sistemas operacionais e os mecanismos utilizados para administrar os recursos de um computador. O sistema operacional atua como intermediário entre o hardware e os programas, controlando o acesso ao processador, à memória, aos dispositivos e aos arquivos. Entre os principais conceitos da área estão os processos, que representam programas em execução, e as threads, que correspondem a unidades de execução associadas a um processo. O gerenciamento de memória organiza a utilização da memória disponível, enquanto o escalonamento determina como o tempo do processador será distribuído entre as tarefas. A obra também se relaciona aos sistemas de arquivos, à comunicação com dispositivos de entrada e saída, à concorrência e aos mecanismos de proteção dos recursos computacionais."
  },
  {
    id: "sistemas-operacionais-modernos-tanenbaum-2007",
    id_ebook: 22,
    capa: "../assets/img/capas/livro-22.jpg",
    titulo: "Sistemas Operacionais Modernos",
    publicacao: "2007",
    categoria: "Sistemas Operacionais",
    resumo:
      "A obra apresenta a estrutura e os mecanismos internos dos sistemas operacionais, explicando como eles coordenam a execução de programas e administram os recursos físicos do computador. O conteúdo aborda processos e threads, escalonamento, comunicação entre processos e sincronização. Esses mecanismos são necessários para organizar tarefas que podem ser executadas de maneira concorrente e que, em alguns casos, compartilham recursos. Outro assunto importante é o gerenciamento de memória, incluindo a memória virtual, que permite oferecer aos processos espaços de endereçamento próprios. O livro também trata de sistemas de arquivos, dispositivos de entrada e saída, segurança e proteção. Esses conceitos explicam como um sistema operacional mantém os programas organizados e controla o acesso aos recursos necessários para sua execução."
  },
  {
    id: "principios-sistemas-operacionais-stuart",
    id_ebook: 23,
    capa: "../assets/img/capas/livro-23.jpg",
    titulo: "Princípios de Sistemas Operacionais: Projetos e Aplicações",
    publicacao: "2011",
    categoria: "Sistemas Operacionais",
    resumo:
      "A referência aborda os princípios relacionados ao projeto e à aplicação dos sistemas operacionais. Esses sistemas precisam oferecer mecanismos para controlar os recursos computacionais e permitir que diferentes programas sejam executados de maneira organizada. Entre os temas fundamentais dessa área estão a abstração de recursos, o gerenciamento de processos, a sincronização, a administração da memória e a organização do armazenamento. A concorrência exige mecanismos que coordenem tarefas que acessam recursos compartilhados, evitando conflitos e inconsistências. A proteção também é necessária para controlar o acesso aos dados e impedir que um processo interfira indevidamente em outro. O estudo dos princípios de projeto permite compreender como as decisões de implementação influenciam o funcionamento, a segurança e o desempenho do sistema operacional."
  },
  {
    id: "sistemas-operacionais-java",
    id_ebook: 24,
    capa: "../assets/img/capas/livro-24.jpg",
    titulo: "Sistemas Operacionais com Java",
    publicacao: "2008",
    categoria: "Sistemas Operacionais",
    resumo:
      "A obra relaciona o estudo dos sistemas operacionais à linguagem Java, permitindo abordar conceitos de execução, gerenciamento de recursos e concorrência em conjunto com exemplos de programação. Entre os principais temas da área estão os processos, as threads, o escalonamento e a sincronização de tarefas. A execução concorrente exige atenção ao compartilhamento de recursos, pois duas ou mais tarefas podem tentar acessar os mesmos dados ao mesmo tempo. Mecanismos de exclusão mútua e sincronização são utilizados para controlar esses acessos e preservar a consistência das informações. O conteúdo também está relacionado ao gerenciamento de memória, aos sistemas de arquivos, à entrada e saída e à proteção dos recursos. A utilização de exemplos de programação permite observar como os conceitos de sistemas operacionais se relacionam com a execução de aplicações."
  },
  {
    id: "sistemas-operacionais-modernos-tanenbaum-2016",
    id_ebook: 25,
    capa: "../assets/img/capas/livro-25.jpg",
    titulo: "Sistemas Operacionais Modernos (4ª edição)",
    publicacao: "2016",
    categoria: "Sistemas Operacionais",
    resumo:
      "O livro aborda os mecanismos utilizados pelos sistemas operacionais modernos para gerenciar processadores, memória, arquivos e dispositivos. Entre os conceitos centrais estão os processos e as threads, que organizam a execução das tarefas, e o escalonamento, responsável por distribuir o tempo de processamento. A obra também se relaciona à sincronização de atividades concorrentes, à memória virtual e à organização dos sistemas de arquivos. Outros temas incluem a comunicação com dispositivos, a proteção dos recursos, a virtualização e os sistemas multiprocessadores. A virtualização permite criar ambientes computacionais isolados que compartilham os recursos de uma máquina física, enquanto os sistemas multiprocessadores possibilitam a execução de tarefas utilizando múltiplos núcleos ou processadores. O conjunto desses mecanismos busca garantir uma utilização organizada, eficiente e segura dos recursos computacionais."
  },
  {
    id: "sistemas-distribuidos-tanenbaum",
    id_ebook: 26,
    capa: "../assets/img/capas/livro-26.jpg",
    titulo: "Sistemas Distribuídos: Princípios e Paradigmas (2ª edição)",
    publicacao: "2007",
    categoria: "Sistemas Operacionais",
    resumo:
      "A obra trata dos sistemas distribuídos, formados por computadores independentes que se comunicam por meio de uma rede e cooperam para executar tarefas ou disponibilizar serviços. Diferentemente de um sistema concentrado em uma única máquina, um sistema distribuído depende da comunicação e da coordenação entre componentes que podem estar localizados em diferentes lugares. Entre os conceitos fundamentais estão a troca de mensagens, o middleware, a sincronização, a consistência dos dados e a tolerância a falhas. A escalabilidade também é importante, pois permite ampliar a capacidade do sistema conforme aumentam o número de usuários ou o volume de processamento. A obra aborda ainda aspectos de segurança e modelos de comunicação, como a arquitetura cliente-servidor, na qual clientes enviam solicitações e servidores oferecem os serviços correspondentes."
  }
];

const AUTORES = [
  { id_autor: 1, nome_autor: "Robert C. Martin" },
  { id_autor: 2, nome_autor: "Douglas Crockford" },
  { id_autor: 3, nome_autor: "Andreas C. Müller" },
  { id_autor: 4, nome_autor: "Sarah Guido" },
  { id_autor: 5, nome_autor: "William Stallings" },
  { id_autor: 6, nome_autor: "Andrew S. Tanenbaum" },
  { id_autor: 7, nome_autor: "Ronald J. Tocci" },
  { id_autor: 8, nome_autor: "Neal S. Widmer" },
  { id_autor: 9, nome_autor: "Gregory L. Moss" },
  { id_autor: 10, nome_autor: "David A. Patterson" },
  { id_autor: 11, nome_autor: "John L. Hennessy" },
  { id_autor: 12, nome_autor: "Ian Sommerville" },
  { id_autor: 13, nome_autor: "Roger S. Pressman" },
  { id_autor: 14, nome_autor: "Andrew Hunt" },
  { id_autor: 15, nome_autor: "David Thomas" },
  { id_autor: 16, nome_autor: "Marco Tulio Valente" },
  { id_autor: 17, nome_autor: "Nivio Ziviani" },
  { id_autor: 18, nome_autor: "L. V. Forbellone" },
  { id_autor: 19, nome_autor: "H. F. Eberspacher" },
  { id_autor: 20, nome_autor: "A. F. G. Ascencio" },
  { id_autor: 21, nome_autor: "E. A. V. Campos" },
  { id_autor: 22, nome_autor: "N. A. F. Souza" },
  { id_autor: 23, nome_autor: "M. M. Gomes" },
  { id_autor: 24, nome_autor: "M. V. Soares" },
  { id_autor: 25, nome_autor: "R. Concilio" },
  { id_autor: 26, nome_autor: "E. C. Araujo" },
  { id_autor: 27, nome_autor: "I. C. Boratti" },
  { id_autor: 28, nome_autor: "A. B. Oliveira" },
  { id_autor: 29, nome_autor: "R. S. Oliveira" },
  { id_autor: 30, nome_autor: "A. S. Carissimi" },
  { id_autor: 31, nome_autor: "S. S. Toscani" },
  { id_autor: 32, nome_autor: "B. L. Stuart" },
  { id_autor: 33, nome_autor: "A. Silberschatz" },
  { id_autor: 34, nome_autor: "P. B. Galvin" },
  { id_autor: 35, nome_autor: "G. Gagne" },
  { id_autor: 36, nome_autor: "Herbert Bos" },
  { id_autor: 37, nome_autor: "Maarten van Steen" }
];

const EBOOK_AUTORES = [
  { id_ebook: 1, id_autor: 1 },
  { id_ebook: 2, id_autor: 2 },
  { id_ebook: 3, id_autor: 1 },
  { id_ebook: 4, id_autor: 3 },
  { id_ebook: 4, id_autor: 4 },
  { id_ebook: 5, id_autor: 5 },
  { id_ebook: 6, id_autor: 6 },
  { id_ebook: 7, id_autor: 7 },
  { id_ebook: 7, id_autor: 8 },
  { id_ebook: 7, id_autor: 9 },
  { id_ebook: 8, id_autor: 10 },
  { id_ebook: 8, id_autor: 11 },
  { id_ebook: 9, id_autor: 5 },
  { id_ebook: 10, id_autor: 12 },
  { id_ebook: 11, id_autor: 13 },
  { id_ebook: 12, id_autor: 1 },
  { id_ebook: 13, id_autor: 14 },
  { id_ebook: 13, id_autor: 15 },
  { id_ebook: 14, id_autor: 16 },
  { id_ebook: 15, id_autor: 17 },
  { id_ebook: 16, id_autor: 18 },
  { id_ebook: 16, id_autor: 19 },
  { id_ebook: 17, id_autor: 20 },
  { id_ebook: 17, id_autor: 21 },
  { id_ebook: 18, id_autor: 22 },
  { id_ebook: 18, id_autor: 23 },
  { id_ebook: 18, id_autor: 24 },
  { id_ebook: 18, id_autor: 25 },
  { id_ebook: 19, id_autor: 26 },
  { id_ebook: 20, id_autor: 27 },
  { id_ebook: 20, id_autor: 28 },
  { id_ebook: 21, id_autor: 29 },
  { id_ebook: 21, id_autor: 30 },
  { id_ebook: 21, id_autor: 31 },
  { id_ebook: 22, id_autor: 6 },
  { id_ebook: 23, id_autor: 32 },
  { id_ebook: 24, id_autor: 33 },
  { id_ebook: 24, id_autor: 34 },
  { id_ebook: 24, id_autor: 35 },
  { id_ebook: 25, id_autor: 6 },
  { id_ebook: 25, id_autor: 36 },
  { id_ebook: 26, id_autor: 6 },
  { id_ebook: 26, id_autor: 37 }
];

function autoresDoLivro(livro) {
  const idsAutores = EBOOK_AUTORES
    .filter((relacao) => relacao.id_ebook === livro.id_ebook)
    .map((relacao) => relacao.id_autor);
  return AUTORES.filter((autor) => idsAutores.includes(autor.id_autor));
}

function buscarLivroPorId(id) {
  return LIVROS.find((livro) => livro.id === id) || null;
}
