
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS g02_turma_aluno, g02_turma, g02_favoritos, g02_historico_acesso,
  g02_ebook_autor, g02_ebook, g02_aluno, g02_professor, g02_administrador,
  g02_autor, g02_area_estudo, g02_instituicao;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE g02_instituicao (
  id_instituicao INT NOT NULL AUTO_INCREMENT,
  nome_instituicao VARCHAR(50) NOT NULL,
  cidade VARCHAR(70) NULL,
  PRIMARY KEY (id_instituicao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_area_estudo (
  id_area INT NOT NULL AUTO_INCREMENT,
  nome_area VARCHAR(60) NOT NULL,
  descricao VARCHAR(200) NULL,
  PRIMARY KEY (id_area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_autor (
  id_autor INT NOT NULL AUTO_INCREMENT,
  nome_autor VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id_autor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_professor (
  id_professor INT NOT NULL AUTO_INCREMENT,
  id_instituicao INT NOT NULL,
  nome_completo VARCHAR(100) NOT NULL,
  email_institucional VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_professor),
  CONSTRAINT fk_professor_instituicao FOREIGN KEY (id_instituicao)
    REFERENCES g02_instituicao(id_instituicao) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_aluno (
  id_aluno INT NOT NULL AUTO_INCREMENT,
  id_instituicao INT NOT NULL,
  nome_completo VARCHAR(100) NOT NULL,
  email_institucional VARCHAR(100) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_aluno),
  CONSTRAINT fk_aluno_instituicao FOREIGN KEY (id_instituicao)
    REFERENCES g02_instituicao(id_instituicao) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_ebook (
  id_ebook INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  ano_publicacao INT NOT NULL,
  editora VARCHAR(80) NULL,
  id_area INT NOT NULL,
  PRIMARY KEY (id_ebook),
  CONSTRAINT fk_ebook_area FOREIGN KEY (id_area)
    REFERENCES g02_area_estudo(id_area) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_ebook_autor (
  id_ebook INT NOT NULL,
  id_autor INT NOT NULL,
  PRIMARY KEY (id_ebook, id_autor),
  CONSTRAINT fk_ea_ebook FOREIGN KEY (id_ebook)
    REFERENCES g02_ebook(id_ebook) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ea_autor FOREIGN KEY (id_autor)
    REFERENCES g02_autor(id_autor) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_historico_acesso (
  id_historico INT NOT NULL AUTO_INCREMENT,
  id_aluno INT NULL,
  id_professor INT NULL,
  id_ebook INT NOT NULL,
  data_acesso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_historico),
  CONSTRAINT fk_historico_aluno FOREIGN KEY (id_aluno)
    REFERENCES g02_aluno(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_historico_professor FOREIGN KEY (id_professor)
    REFERENCES g02_professor(id_professor) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_historico_ebook FOREIGN KEY (id_ebook)
    REFERENCES g02_ebook(id_ebook) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_favoritos (
  id_favorito INT NOT NULL AUTO_INCREMENT,
  id_aluno INT NULL,
  id_professor INT NULL,
  id_ebook INT NOT NULL,
  PRIMARY KEY (id_favorito),
  UNIQUE KEY uq_fav_aluno (id_aluno, id_ebook),
  UNIQUE KEY uq_fav_professor (id_professor, id_ebook),
  CONSTRAINT fk_favoritos_aluno FOREIGN KEY (id_aluno)
    REFERENCES g02_aluno(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_favoritos_professor FOREIGN KEY (id_professor)
    REFERENCES g02_professor(id_professor) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_favoritos_ebook FOREIGN KEY (id_ebook)
    REFERENCES g02_ebook(id_ebook) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_turma (
  id_turma INT NOT NULL AUTO_INCREMENT,
  id_professor INT NOT NULL,
  nome_turma VARCHAR(100) NOT NULL,
  codigo_acesso VARCHAR(10) NOT NULL UNIQUE,
  semestre VARCHAR(10) NOT NULL,
  PRIMARY KEY (id_turma),
  CONSTRAINT fk_turma_professor FOREIGN KEY (id_professor)
    REFERENCES g02_professor(id_professor) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE g02_turma_aluno (
  id_turma INT NOT NULL,
  id_aluno INT NOT NULL,
  data_ingresso DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_turma, id_aluno),
  CONSTRAINT fk_ta_turma FOREIGN KEY (id_turma)
    REFERENCES g02_turma(id_turma) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ta_aluno FOREIGN KEY (id_aluno)
    REFERENCES g02_aluno(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO g02_instituicao (id_instituicao, nome_instituicao, cidade) VALUES
(1, 'Universidade de São Caetano do Sul', 'São Caetano do Sul');

INSERT INTO g02_area_estudo (id_area, nome_area) VALUES
(1, 'Desenvolvimento de Software'),
(2, 'Engenharia de Software I'),
(3, 'Aprendizado de Máquina'),
(4, 'Arquitetura e Organização de Computadores'),
(5, 'Algoritmos e Lógica de Programação'),
(6, 'Sistemas Operacionais');

INSERT INTO g02_autor (id_autor, nome_autor) VALUES
(1, 'Robert C. Martin'),
(2, 'Douglas Crockford'),
(3, 'Andreas C. Müller'),
(4, 'Sarah Guido'),
(5, 'William Stallings'),
(6, 'Andrew S. Tanenbaum'),
(7, 'Ronald J. Tocci'),
(8, 'Neal S. Widmer'),
(9, 'Gregory L. Moss'),
(10, 'David A. Patterson'),
(11, 'John L. Hennessy'),
(12, 'Ian Sommerville'),
(13, 'Roger S. Pressman'),
(14, 'Andrew Hunt'),
(15, 'David Thomas'),
(16, 'Marco Tulio Valente'),
(17, 'Nivio Ziviani'),
(18, 'L. V. Forbellone'),
(19, 'H. F. Eberspacher'),
(20, 'A. F. G. Ascencio'),
(21, 'E. A. V. Campos'),
(22, 'N. A. F. Souza'),
(23, 'M. M. Gomes'),
(24, 'M. V. Soares'),
(25, 'R. Concilio'),
(26, 'E. C. Araujo'),
(27, 'I. C. Boratti'),
(28, 'A. B. Oliveira'),
(29, 'R. S. Oliveira'),
(30, 'A. S. Carissimi'),
(31, 'S. S. Toscani'),
(32, 'B. L. Stuart'),
(33, 'A. Silberschatz'),
(34, 'P. B. Galvin'),
(35, 'G. Gagne'),
(36, 'Herbert Bos'),
(37, 'Maarten van Steen');

INSERT INTO g02_ebook (id_ebook, titulo, ano_publicacao, id_area) VALUES
(2, 'JavaScript: The Good Parts', 2008, 1),
(3, 'Arquitetura Limpa', 2017, 2),
(4, 'Machine Learning Prático', 2016, 3),
(5, 'Arquitetura e Organização de Computadores (8ª edição)', 2010, 4),
(6, 'Organização Estruturada de Computadores', 2013, 4),
(7, 'Sistemas Digitais: Princípios e Aplicações', 2019, 4),
(8, 'Arquitetura e Organização de Computadores: A Interface entre Hardware e Software', 2017, 4),
(9, 'Arquitetura e Organização de Computadores (10ª edição)', 2016, 4),
(10, 'Engenharia de Software (8ª edição)', 2007, 2),
(11, 'Engenharia de Software (6ª edição)', 2006, 2),
(12, 'Código Limpo: Habilidades Práticas do Agile Software', 2008, 2),
(13, 'O Programador Pragmático: De Aprendiz a Mestre', 1999, 2),
(14, 'Engenharia de Software Moderna: Princípios e Práticas para Desenvolvimento de Software com Produtividade e Qualidade', 2020, 2),
(15, 'Projeto de Algoritmos com Implementações em Pascal e C', 2004, 5),
(16, 'Lógica de Programação: A Construção de Algoritmos e Estruturas de Dados', 2005, 5),
(17, 'Fundamentos da Programação de Computadores: Algoritmos, Pascal, C/C++ e Java', 2007, 5),
(18, 'Algoritmos e Lógica de Programação', 2004, 5),
(19, 'Algoritmos: Fundamentos e Prática', 2006, 5),
(20, 'Introdução à Programação: Algoritmos', 2007, 5),
(21, 'Sistemas Operacionais (Livros Didáticos, volume 11)', 2008, 6),
(22, 'Sistemas Operacionais Modernos', 2007, 6),
(23, 'Princípios de Sistemas Operacionais: Projetos e Aplicações', 2011, 6),
(24, 'Sistemas Operacionais com Java', 2008, 6),
(25, 'Sistemas Operacionais Modernos (4ª edição)', 2016, 6),
(26, 'Sistemas Distribuídos: Princípios e Paradigmas (2ª edição)', 2007, 6);

INSERT INTO g02_ebook_autor (id_ebook, id_autor) VALUES
(2, 2),
(3, 1),
(4, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(7, 8),
(7, 9),
(8, 10),
(8, 11),
(9, 5),
(10, 12),
(11, 13),
(12, 1),
(13, 14),
(13, 15),
(14, 16),
(15, 17),
(16, 18),
(16, 19),
(17, 20),
(17, 21),
(18, 22),
(18, 23),
(18, 24),
(18, 25),
(19, 26),
(20, 27),
(20, 28),
(21, 29),
(21, 30),
(21, 31),
(22, 6),
(23, 32),
(24, 33),
(24, 34),
(24, 35),
(25, 6),
(25, 36),
(26, 6),
(26, 37);
