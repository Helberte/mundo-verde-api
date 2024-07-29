CREATE DATABASE hbyte;

CREATE TABLE `estado` (
  `id` 			int 	PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` 		varchar(100)	NOT NULL,
  `uf` 			varchar(10) 	NOT NULL,
  `ibge_id` 	int 			NOT NULL,
  
  `created_at` 	datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 	datetime DEFAULT NULL,
  `deleted_at` 	datetime DEFAULT NULL,
  `created_by` 	int DEFAULT NULL,
  `updated_by` 	int DEFAULT NULL,
  `deleted_by` 	int DEFAULT NULL
);

CREATE TABLE `cidade` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 			varchar(150) NOT NULL,
  `ibge_id` 		int NOT NULL,
  `fk_estado_id` 	int DEFAULT NULL,
  
  KEY `fk_estado_id` (`fk_estado_id`),  
  CONSTRAINT `cidade_ibfk_1` FOREIGN KEY (`fk_estado_id`) REFERENCES `estado` (`id`) ON DELETE CASCADE,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL  
);

CREATE TABLE `bairro` (
  `id` 				int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 			varchar(150) 	NOT NULL,
  `fk_cidade_id` 	int DEFAULT 		NULL,
  
  KEY 			`fk_cidade_id` (`fk_cidade_id`),  
  CONSTRAINT 	`bairro_ibfk_1` FOREIGN KEY (`fk_cidade_id`) REFERENCES `cidade` (`id`) ON DELETE CASCADE,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL
);

CREATE TABLE `endereco` (
  `id` 				int 			NOT 	NULL PRIMARY KEY AUTO_INCREMENT,
  `rua` 			varchar(200) 	NOT 	NULL,
  `numero` 			varchar(20) 	DEFAULT NULL,
  `opcoes_tipo_id` 	int 			DEFAULT NULL,
  `observacao` 		varchar(500) 	DEFAULT NULL,
  `complemento` 	varchar(500) 	DEFAULT NULL,
  `cep` 			varchar(30) 	DEFAULT NULL,
  
  `fk_bairro_id` 	int NOT NULL,
  `fk_cidade_id` 	int NOT NULL,
  `fk_estado_id` 	int NOT NULL,
  
  KEY `fk_bairro_id` (`fk_bairro_id`),
  KEY `fk_cidade_id` (`fk_cidade_id`),
  KEY `fk_estado_id` (`fk_estado_id`),
  
  `created_at` 		datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime DEFAULT NULL,
  `deleted_at` 		datetime DEFAULT NULL,  
  `created_by` 		int DEFAULT NULL,
  `updated_by` 		int DEFAULT NULL,
  `deleted_by` 		int DEFAULT NULL,

  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`fk_bairro_id`) REFERENCES `bairro` (`id`) ON DELETE CASCADE,
  CONSTRAINT `endereco_ibfk_2` FOREIGN KEY (`fk_cidade_id`) REFERENCES `cidade` (`id`) ON DELETE CASCADE,
  CONSTRAINT `endereco_ibfk_3` FOREIGN KEY (`fk_estado_id`) REFERENCES `estado` (`id`) ON DELETE CASCADE
);

CREATE TABLE `grupo_empresa` (
  `id`					int 		 PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` 				varchar(300) NOT NULL,
  `codigo` 				varchar(20)  NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int 		DEFAULT NULL,
  `updated_by` int 		DEFAULT NULL,
  `deleted_by` int 		DEFAULT NULL
);

CREATE TABLE `empresa` (
  `id` 				int 			PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `razao_social` 	varchar(500) 	NOT NULL,
  `nome_fantasia` 	varchar(500) 	NOT NULL,
  `cnpj` 			varchar(20) 	NOT NULL,
  `filial` 			varchar(8) 		NOT NULL,
  
  `fk_grupo_empresa_id` int NOT NULL,
  KEY `fk_grupo_empresa_id` (`fk_grupo_empresa_id`),
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  CONSTRAINT `empresa_ibfk_2` FOREIGN KEY (`fk_grupo_empresa_id`) REFERENCES `grupo_empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `grupo_opcoes` (
  `id` 						int 			PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` 					varchar(100) 	NOT NULL,
  `observacao` 				varchar(300) 	DEFAULT NULL,
  `editavel` 				char(1) 		NOT NULL DEFAULT 'N',
  
  `fk_empresa_id`      int NOT NULL,
  KEY `fk_empresa_id` (`fk_empresa_id`),
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,

  CONSTRAINT `grupo_opcoes_ibfk_1` FOREIGN KEY (`fk_empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `opcoes` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 				varchar(100) NOT NULL,
  
  `fk_grupo_opcoes_id` 	int NOT NULL,
  `fk_empresa_id` 		int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  KEY `fk_empresa_id` (`fk_empresa_id`),
  
  CONSTRAINT `opcoes_ibfk_1` FOREIGN KEY (`fk_empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `pessoa` (
  `id` 					int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 				varchar(500) 	NOT NULL,
  `sobrenome` 			varchar(500) 	DEFAULT NULL,
  `cpf` 				varchar(20) 	DEFAULT NULL,
  `data_nascimento` 	datetime 		DEFAULT NULL,  
  `email` 				varchar(200) 	DEFAULT NULL,
  `telefone_1` 			varchar(20) 	DEFAULT NULL,
  `telefone_2` 			varchar(20) 	DEFAULT NULL,
  `rg` 					varchar(15) 	DEFAULT NULL,
  
  `opcoes_sexo_id` 		int 			NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
    
  KEY `opcoes_sexo_id` (`opcoes_sexo_id`),  
  CONSTRAINT `pessoa_ibfk_5` FOREIGN KEY (`opcoes_sexo_id`) REFERENCES `opcoes` (`id`)
);

CREATE TABLE `usuario` (
  `id` 				int 			PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `login` 			varchar(70) 	NOT NULL,
  `senha` 			varchar(1000) 	NOT NULL,
  `nome` 			varchar(120) 	NOT NULL,
  `ativo` 			char(1) 		NOT NULL DEFAULT 'S',
  
  `fk_pessoa_id` 	int 			NOT NULL,
  KEY `fk_pessoa_id` (`fk_pessoa_id`),
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fk_pessoa_id`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `empresa_endereco` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_empresa_id` 		int NOT NULL,
  `fk_endereco_id` 		int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,

  KEY `fk_empresa_id`   (`fk_empresa_id`),
  KEY `fk_endereco_id`  (`fk_endereco_id`),
  KEY `created_by` 		(`created_by`),
  KEY `updated_by`		(`updated_by`),
  KEY `deleted_by` 		(`deleted_by`),
  
  CONSTRAINT `empresa_endereco_ibfk_1` FOREIGN KEY (`fk_empresa_id`)  	REFERENCES `empresa`  (`id`),
  CONSTRAINT `empresa_endereco_ibfk_2` FOREIGN KEY (`fk_endereco_id`) 	REFERENCES `endereco` (`id`),
  CONSTRAINT `empresa_endereco_ibfk_3` FOREIGN KEY (`created_by`) 		REFERENCES `usuario`  (`id`),
  CONSTRAINT `empresa_endereco_ibfk_4` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario`  (`id`),
  CONSTRAINT `empresa_endereco_ibfk_5` FOREIGN KEY (`deleted_by`) 		REFERENCES `usuario`  (`id`)
);

CREATE TABLE `empresa_pessoa` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_empresa_id` 	int NOT NULL,
  `fk_pessoa_id` 	int NOT NULL,
  
  `created_at` 		datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime DEFAULT NULL,
  `deleted_at` 		datetime DEFAULT NULL,
  `created_by` 		int DEFAULT NULL,
  `updated_by` 		int DEFAULT NULL,
  `deleted_by` 		int DEFAULT NULL,

  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_pessoa_id` 				(`fk_pessoa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `empresa_pessoa_ibfk_1` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_pessoa_ibfk_2` FOREIGN KEY (`fk_pessoa_id`) 	REFERENCES `pessoa`  (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_pessoa_ibfk_3` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `empresa_pessoa_ibfk_4` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `empresa_pessoa_ibfk_5` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` (`id`)
);

CREATE TABLE `empresa_usuario` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_usuario_id` 		int NOT NULL,
  `fk_empresa_id` 		int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,

  KEY `fk_usuario_id` 				(`fk_usuario_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `empresa_usuario_ibfk_1` FOREIGN KEY (`fk_usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_usuario_ibfk_2` FOREIGN KEY (`fk_empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_usuario_ibfk_3` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `empresa_usuario_ibfk_4` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `empresa_usuario_ibfk_5` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` (`id`)
);

CREATE TABLE `funcao` (
  `id` 					int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 				varchar(120) 	NOT NULL,
  `descricao` 			varchar(350) 	NOT NULL,
  `codigo` 				varchar(8) 		NOT NULL,
  `fk_empresa_id` 		int NOT NULL,
  
  `created_at` 			datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 			datetime 	DEFAULT NULL,
  `deleted_at` 			datetime 	DEFAULT NULL,
  `created_by` 			int			DEFAULT NULL,
  `updated_by` 			int 		DEFAULT NULL,
  `deleted_by` 			int 		DEFAULT NULL,
   
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `funcao_ibfk_1` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `funcao_ibfk_2` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `funcao_ibfk_3` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `funcao_ibfk_4` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` (`id`)
);

CREATE TABLE `funcao_usuario` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_usuario_id` 	int NOT NULL,
  `fk_funcao_id` 	int NOT NULL,
  `fk_empresa_id` 	int NOT NULL,
  
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime 	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int 		DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_usuario_id` 				(`fk_usuario_id`),
  KEY `fk_funcao_id` 				(`fk_funcao_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `funcao_usuario_ibfk_1` FOREIGN KEY (`fk_usuario_id`) 	REFERENCES `usuario` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `funcao_usuario_ibfk_2` FOREIGN KEY (`fk_funcao_id`) 	REFERENCES `funcao` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `funcao_usuario_ibfk_3` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `funcao_usuario_ibfk_4` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `funcao_usuario_ibfk_5` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `funcao_usuario_ibfk_6` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `menu` (
  `id` 				int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 			varchar(200) 	NOT NULL,
  `descricao` 		varchar(300) 	NOT NULL,
  `pai` 			int 			DEFAULT NULL,
  `ordem` 			int 			NOT 	NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int 		DEFAULT NULL,
  `updated_by` int 		DEFAULT NULL,
  `deleted_by` int 		DEFAULT NULL,
  
  KEY `fk_created_by_usuario_id` (`created_by`),
  KEY `fk_updated_by_usuario_id` (`updated_by`),
  KEY `fk_deleted_by_usuario_id` (`deleted_by`),
  
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `menu_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `menu_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `usuario` (`id`)
);

CREATE TABLE `menu_usuario_especifico` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_empresa_id` 	int NOT NULL,
  `fk_menu_id` 		int NOT NULL,
  `fk_usuario_id` 	int NOT NULL,
  
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime 	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int 		DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_menu_id` 					(`fk_menu_id`),
  KEY `fk_usuario_id` 				(`fk_usuario_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `menu_usuario_especifico_ibfk_1` FOREIGN KEY (`fk_empresa_id`) REFERENCES `empresa` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_usuario_especifico_ibfk_2` FOREIGN KEY (`fk_menu_id`) 	REFERENCES `menu` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_usuario_especifico_ibfk_3` FOREIGN KEY (`fk_usuario_id`) REFERENCES `usuario` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_usuario_especifico_ibfk_4` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `menu_usuario_especifico_ibfk_5` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `menu_usuario_especifico_ibfk_6` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `perfil` (
  `id` 				int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 			varchar(200) 	NOT NULL,
  `fk_empresa_id` 	int 			NOT NULL,
  
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int 		DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_ibfk_2` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `perfil_ibfk_3` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` (`id`),
  CONSTRAINT `perfil_ibfk_4` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` (`id`)
);

CREATE TABLE `perfil_menu` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_menu_id` 		int NOT NULL,
  `fk_perfil_id` 	int NOT NULL,
  `fk_empresa_id` 	int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int 		DEFAULT NULL,
  `updated_by` int 		DEFAULT NULL,
  `deleted_by` int 		DEFAULT NULL,

  KEY `fk_menu_id` 					(`fk_menu_id`),
  KEY `fk_perfil_id` 				(`fk_perfil_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `perfil_menu_ibfk_1` FOREIGN KEY (`fk_menu_id`) 	REFERENCES `menu` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_menu_ibfk_2` FOREIGN KEY (`fk_perfil_id`) 	REFERENCES `perfil` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_menu_ibfk_3` FOREIGN KEY (`fk_empresa_id`) REFERENCES `empresa` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_menu_ibfk_4` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `perfil_menu_ibfk_5` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `perfil_menu_ibfk_6` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `perfil_usuario` (
  `id` 				int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_usuario_id` 	int NOT NULL,
  `fk_perfil_id` 	int NOT NULL,
  `fk_empresa_id` 	int NOT NULL,
  
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime 	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int 		DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_usuario_id` 				(`fk_usuario_id`),
  KEY `fk_perfil_id` 				(`fk_perfil_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `perfil_usuario_ibfk_1` FOREIGN KEY (`fk_usuario_id`) 	REFERENCES `usuario` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_usuario_ibfk_2` FOREIGN KEY (`fk_perfil_id`) 	REFERENCES `perfil` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_usuario_ibfk_3` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_usuario_ibfk_4` FOREIGN KEY (`created_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `perfil_usuario_ibfk_5` FOREIGN KEY (`updated_by`) 	REFERENCES `usuario` 	(`id`),
  CONSTRAINT `perfil_usuario_ibfk_6` FOREIGN KEY (`deleted_by`) 	REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `pessoa_endereco` (
  `id` 				int 		NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_pessoa_id` 	int 		NOT NULL,
  `fk_endereco_id` 	int 		NOT NULL,
  
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime 	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int			DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_pessoa_id` 	(`fk_pessoa_id`),
  KEY `fk_endereco_id` 	(`fk_endereco_id`),
  KEY `created_by` 		(`created_by`),
  KEY `updated_by` 		(`updated_by`),
  KEY `deleted_by` 		(`deleted_by`),
  
  CONSTRAINT `pessoa_endereco_ibfk_1` FOREIGN KEY (`fk_pessoa_id`) 		REFERENCES `pessoa` 	(`id`),
  CONSTRAINT `pessoa_endereco_ibfk_2` FOREIGN KEY (`fk_endereco_id`) 	REFERENCES `endereco` 	(`id`),
  CONSTRAINT `pessoa_endereco_ibfk_3` FOREIGN KEY (`created_by`) 		REFERENCES `usuario` 	(`id`),
  CONSTRAINT `pessoa_endereco_ibfk_4` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario` 	(`id`),
  CONSTRAINT `pessoa_endereco_ibfk_5` FOREIGN KEY (`deleted_by`) 		REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `unidade_primaria` (
  `id` 				int 			NOT 	NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 			varchar(50) 	NOT 	NULL,
  `descricao` 		varchar(350) 	DEFAULT NULL,
  `observacao` 		varchar(350) 	DEFAULT NULL,
  
  `fk_empresa_id` 	int			NOT	NULL,
  `created_at` 		datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 		datetime 	DEFAULT NULL,
  `deleted_at` 		datetime 	DEFAULT NULL,
  `created_by` 		int 		DEFAULT NULL,
  `updated_by` 		int 		DEFAULT NULL,
  `deleted_by` 		int 		DEFAULT NULL,
  
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  CONSTRAINT `unidade_primaria_ibfk_1` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `unidade_primaria_ibfk_2` FOREIGN KEY (`created_by`) 		REFERENCES `usuario` (`id`),
  CONSTRAINT `unidade_primaria_ibfk_3` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario` (`id`),
  CONSTRAINT `unidade_primaria_ibfk_4` FOREIGN KEY (`deleted_by`) 		REFERENCES `usuario` (`id`)
);

CREATE TABLE `produto` (
  `id` 						int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 					varchar(500) NOT NULL,
  `peso` 					decimal(7,3) NOT NULL DEFAULT '0.000',
  `modo_usar` 				varchar(100) DEFAULT NULL,
  `observacao` 				varchar(500) DEFAULT NULL,
  `composicao` 				varchar(100) DEFAULT NULL,
  `ativo` 					char(1) 		NOT NULL DEFAULT 'S',
  `comercializa` 			char(1) 		NOT NULL DEFAULT 'S',
  `descricao` 				varchar(1000) 	DEFAULT NULL,
  
  `fk_unidade_primaria_id` 	int NOT NULL,
  `fk_empresa_id` 			int NOT NULL,
  
  `created_at` 				datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 				datetime DEFAULT NULL,
  `deleted_at` 				datetime DEFAULT NULL,
  `created_by` 				int 	 DEFAULT NULL,
  `updated_by` 				int DEFAULT NULL,
  `deleted_by` 				int DEFAULT NULL,
  
  KEY `fk_unidade_primaria_id` 		(`fk_unidade_primaria_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`fk_unidade_primaria_id`) 	REFERENCES `unidade_primaria` (`id`) 	ON DELETE CASCADE,
  CONSTRAINT `produto_ibfk_2` FOREIGN KEY (`fk_empresa_id`) 			REFERENCES `empresa` (`id`) 			ON DELETE CASCADE,
  CONSTRAINT `produto_ibfk_3` FOREIGN KEY (`created_by`) 				REFERENCES `usuario` (`id`),
  CONSTRAINT `produto_ibfk_4` FOREIGN KEY (`updated_by`) 				REFERENCES `usuario` (`id`),
  CONSTRAINT `produto_ibfk_5` FOREIGN KEY (`deleted_by`) 				REFERENCES `usuario` (`id`)
);

CREATE TABLE `composicao_preco` (
  `id` 					int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `custo` 				decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  `venda` 				decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  `markup` 				char(1) 		NOT NULL DEFAULT 'S',
  `nome` 				varchar(100) 	NOT NULL,
  `ordem` 				int 			NOT NULL,
  `ativo` 				char(1) 		NOT NULL DEFAULT 'S',
  `despesas_fixas` 		decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  `despesas_variaveis` 	decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  `lucro_pretendido` 	decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  
  `fk_produto_id` 		int 			NOT NULL,
  `fk_empresa_id` 		int 			NOT NULL,
  
  `created_at` 			datetime 		DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 			datetime 		DEFAULT NULL,
  `deleted_at` 			datetime 		DEFAULT NULL,
  `created_by` 			int 			DEFAULT NULL,
  `updated_by` 			int 			DEFAULT NULL,
  `deleted_by` 			int 			DEFAULT NULL,

  KEY `fk_produto_id` 				(`fk_produto_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `composicao_preco_ibfk_1` FOREIGN KEY (`fk_produto_id`) 	REFERENCES `produto` (`id`) ON DELETE CASCADE,
  CONSTRAINT `composicao_preco_ibfk_2` FOREIGN KEY (`fk_empresa_id`) 	REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `composicao_preco_ibfk_3` FOREIGN KEY (`created_by`) 		REFERENCES `usuario` (`id`),
  CONSTRAINT `composicao_preco_ibfk_4` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario` (`id`),
  CONSTRAINT `composicao_preco_ibfk_5` FOREIGN KEY (`deleted_by`) 		REFERENCES `usuario` (`id`)
);

CREATE TABLE `tipo_representante` (
  `id` 						int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` 					varchar(150) 	NOT NULL,
  `valor` 					decimal(9,4) 	NOT NULL DEFAULT '0.0000',
  
  `fk_composicao_preco_id` 	int 			NOT NULL,
  `fk_empresa_id` 			int 			NOT NULL,
  
  `created_at`				datetime 		DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 				datetime 		DEFAULT NULL,
  `deleted_at` 				datetime 		DEFAULT NULL,
  `created_by` 				int 			DEFAULT NULL,
  `updated_by` 				int 			DEFAULT NULL,
  `deleted_by` 				int				DEFAULT NULL,
  
  KEY `fk_composicao_preco_id` 		(`fk_composicao_preco_id`),
  KEY `fk_empresa_id` 				(`fk_empresa_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `tipo_representante_ibfk_1` FOREIGN KEY (`fk_composicao_preco_id`) REFERENCES `composicao_preco` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `tipo_representante_ibfk_2` FOREIGN KEY (`fk_empresa_id`) 			REFERENCES `empresa` 			(`id`) ON DELETE CASCADE,
  CONSTRAINT `tipo_representante_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 			(`id`),
  CONSTRAINT `tipo_representante_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 			(`id`),
  CONSTRAINT `tipo_representante_ibfk_5` FOREIGN KEY (`deleted_by`)				REFERENCES `usuario` 			(`id`)
);

CREATE TABLE `representante` (
  `id` 							int 	NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ativo` 						char(1) NOT NULL DEFAULT 'S',
  
  `fk_pessoa_id` 				int 	NOT NULL,
  `fk_tipo_representante_id` 	int 	NOT NULL,
  
  `created_at` 					datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 					datetime 	DEFAULT NULL,
  `deleted_at` 					datetime 	DEFAULT NULL,
  `created_by` 					int 		DEFAULT NULL,
  `updated_by` 					int 		DEFAULT NULL,
  `deleted_by` 					int 		DEFAULT NULL,
  
  KEY `fk_pessoa_id` 			 (`fk_pessoa_id`),
  KEY `fk_tipo_representante_id` (`fk_tipo_representante_id`),
  KEY `fk_created_by_usuario_id` (`created_by`),
  KEY `fk_updated_by_usuario_id` (`updated_by`),
  KEY `fk_deleted_by_usuario_id` (`deleted_by`),
  
  CONSTRAINT `representante_ibfk_1` FOREIGN KEY (`fk_pessoa_id`) 			 	REFERENCES `pessoa` 			(`id`) ON DELETE CASCADE,
  CONSTRAINT `representante_ibfk_2` FOREIGN KEY (`fk_tipo_representante_id`) 	REFERENCES `tipo_representante` (`id`) ON DELETE CASCADE,
  CONSTRAINT `representante_ibfk_3` FOREIGN KEY (`created_by`) 					REFERENCES `usuario` 			(`id`),
  CONSTRAINT `representante_ibfk_4` FOREIGN KEY (`updated_by`) 					REFERENCES `usuario` 			(`id`),
  CONSTRAINT `representante_ibfk_5` FOREIGN KEY (`deleted_by`) 					REFERENCES `usuario` 			(`id`)
);

CREATE TABLE `sequencial` (
  `id` 			int 			NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `tabela` 		varchar(100) 	NOT NULL,
  `campo` 		varchar(100) 	NOT NULL,
  `sequencial` 	varchar(20) 	NOT NULL,
  
  `fk_campo_id` int 			NOT NULL,
  
  `created_at` 	datetime 		DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 	datetime 		DEFAULT NULL,
  `deleted_at` 	datetime 		DEFAULT NULL,
  `created_by` 	int 			DEFAULT NULL,
  `updated_by` 	int 			DEFAULT NULL,
  `deleted_by` 	int				DEFAULT NULL,

  KEY `fk_created_by_usuario_id` (`created_by`),
  KEY `fk_updated_by_usuario_id` (`updated_by`),
  KEY `fk_deleted_by_usuario_id` (`deleted_by`),
  
  CONSTRAINT `sequencial_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `sequencial_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `sequencial_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `usuario` (`id`)
);

CREATE TABLE `controle_representante` (
  `id` 								int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_representante_id` 			int NOT NULL,
  `fk_representante_subordinado_id` int NOT NULL,
  
  `created_at` 						datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 						datetime DEFAULT NULL,
  `deleted_at` 						datetime DEFAULT NULL,
  `created_by` 						int DEFAULT NULL,
  `updated_by` 						int DEFAULT NULL,
  `deleted_by` 						int DEFAULT NULL,
  
  KEY `fk_representante_id` 			(`fk_representante_id`),
  KEY `fk_representante_subordinado_id` (`fk_representante_subordinado_id`),
  KEY `fk_created_by_usuario_id` 		(`created_by`),
  KEY `fk_updated_by_usuario_id` 		(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 		(`deleted_by`),
  
  CONSTRAINT `controle_representante_ibfk_1` FOREIGN KEY (`fk_representante_id`) 			 REFERENCES `representante` (`id`) ON DELETE CASCADE,
  CONSTRAINT `controle_representante_ibfk_2` FOREIGN KEY (`fk_representante_subordinado_id`) REFERENCES `representante` (`id`) ON DELETE CASCADE,
  CONSTRAINT `controle_representante_ibfk_3` FOREIGN KEY (`created_by`) 					 REFERENCES `usuario` (`id`),
  CONSTRAINT `controle_representante_ibfk_4` FOREIGN KEY (`updated_by`) 					 REFERENCES `usuario` (`id`),
  CONSTRAINT `controle_representante_ibfk_5` FOREIGN KEY (`deleted_by`) 					 REFERENCES `usuario` (`id`)
);

CREATE TABLE `pedido_compra` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 			varchar(500) DEFAULT NULL,
  `data_envio` 			datetime DEFAULT NULL,
  `opcoes_status_id` 	int NOT NULL,
  `valor_total` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_sub_total` 	decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_desconto` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `fk_representante_id` int NOT NULL,
  
  `created_at` 			datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 			datetime DEFAULT NULL,
  `deleted_at` 			datetime DEFAULT NULL,
  `created_by` 			int DEFAULT NULL,
  `updated_by` 			int DEFAULT NULL,
  `deleted_by` 			int DEFAULT NULL,
  
  KEY `fk_representante_id` 		(`fk_representante_id`),
  KEY `opcoes_status_id` 			(`opcoes_status_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pedido_compra_ibfk_1` FOREIGN KEY (`fk_representante_id`) REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_compra_ibfk_2` FOREIGN KEY (`opcoes_status_id`)	REFERENCES `opcoes` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_compra_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_compra_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_compra_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `pedido_compra_itens` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 			varchar(500) DEFAULT NULL,
  `quantidade` 			decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_total` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_sub_total` 	decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_desconto` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  
  `fk_pedido_compra_id` int NOT NULL,
  `fk_produto_id` 		int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  KEY `fk_pedido_compra_id` 		(`fk_pedido_compra_id`),
  KEY `fk_produto_id` 				(`fk_produto_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pedido_compra_itens_ibfk_1` FOREIGN KEY (`fk_pedido_compra_id`) 	REFERENCES `pedido_compra` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_compra_itens_ibfk_2` FOREIGN KEY (`fk_produto_id`) 		REFERENCES `produto` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_compra_itens_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_compra_itens_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_compra_itens_ibfk_5` FOREIGN KEY (`deleted_by`)			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `pedido_venda` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 			varchar(500) DEFAULT NULL,
  `data_envio` 			datetime DEFAULT NULL,
  `valor_total` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_sub_total` 	decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_desconto` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `data_recebimento` 	datetime DEFAULT NULL,
  
  `opcoes_status_id` 	int NOT NULL,
  `fk_representante_id` int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int 		DEFAULT NULL,
  `updated_by` int 		DEFAULT NULL,
  `deleted_by` int 		DEFAULT NULL,
   
  KEY `opcoes_status_id` 			(`opcoes_status_id`),
  KEY `fk_representante_id` 		(`fk_representante_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pedido_venda_ibfk_1` FOREIGN KEY (`opcoes_status_id`) 	REFERENCES `opcoes` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_venda_ibfk_2` FOREIGN KEY (`fk_representante_id`) 	REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_venda_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_venda_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_venda_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `pedido_venda_itens` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 			varchar(500) 			DEFAULT NULL,
  `quantidade` 			decimal(9,4) NOT NULL 	DEFAULT '0.0000',
  `valor_total` 		decimal(9,4) NOT NULL 	DEFAULT '0.0000',
  `valor_sub_total` 	decimal(9,4) NOT NULL 	DEFAULT '0.0000',
  `valor_desconto` 		decimal(9,4) NOT NULL 	DEFAULT '0.0000',
  
  `fk_produto_id` 		int NOT NULL,
  `fk_pedido_venda_id` 	int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  KEY `fk_produto_id`				(`fk_produto_id`),
  KEY `fk_pedido_venda_id` 			(`fk_pedido_venda_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pedido_venda_itens_ibfk_1` FOREIGN KEY (`fk_produto_id`) 		REFERENCES `produto` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_venda_itens_ibfk_2` FOREIGN KEY (`fk_pedido_venda_id`) REFERENCES `pedido_venda` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_venda_itens_ibfk_3` FOREIGN KEY (`created_by`) 		REFERENCES `usuario`		(`id`),
  CONSTRAINT `pedido_venda_itens_ibfk_4` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pedido_venda_itens_ibfk_5` FOREIGN KEY (`deleted_by`)			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `pre_pedido` (
  `id` 						int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 				varchar(500) DEFAULT NULL,
  `data_envio` 				datetime DEFAULT NULL,
  `valor_total` 			decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_sub_total` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_desconto` 			decimal(9,4) NOT NULL DEFAULT '0.0000',
  
  `fk_representante_id` int NOT NULL,
  `fk_opcoes_status_id` int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int 		DEFAULT NULL,
  `updated_by` int 		DEFAULT NULL,
  `deleted_by` int 		DEFAULT NULL,

  KEY `fk_representante_id` 		(`fk_representante_id`),
  KEY `fk_opcoes_status_id` 		(`fk_opcoes_status_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pre_pedido_ibfk_1` FOREIGN KEY (`fk_representante_id`) 	REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pre_pedido_ibfk_2` FOREIGN KEY (`fk_opcoes_status_id`) 	REFERENCES `opcoes` 		(`id`) ON DELETE CASCADE,
  CONSTRAINT `pre_pedido_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pre_pedido_ibfk_4` FOREIGN KEY (`updated_by`)				REFERENCES `usuario` 		(`id`),
  CONSTRAINT `pre_pedido_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `pre_pedido_itens` (
  `id` 						int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `observacao` 				varchar(500) DEFAULT NULL,
  `quantidade` 				decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_total` 			decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_sub_total` 		decimal(9,4) NOT NULL DEFAULT '0.0000',
  `valor_desconto` 			decimal(9,4) NOT NULL DEFAULT '0.0000',
  
  `fk_produto_id` 			int NOT NULL,
  `fk_pre_pedido_id` 		int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,

  KEY `fk_produto_id` 				(`fk_produto_id`),
  KEY `fk_pre_pedido_id` 			(`fk_pre_pedido_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `pre_pedido_itens_ibfk_1` FOREIGN KEY (`fk_produto_id`) 	REFERENCES `produto` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `pre_pedido_itens_ibfk_2` FOREIGN KEY (`fk_pre_pedido_id`) REFERENCES `pre_pedido` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pre_pedido_itens_ibfk_3` FOREIGN KEY (`created_by`) 		REFERENCES `usuario` 	(`id`),
  CONSTRAINT `pre_pedido_itens_ibfk_4` FOREIGN KEY (`updated_by`) 		REFERENCES `usuario` 	(`id`),
  CONSTRAINT `pre_pedido_itens_ibfk_5` FOREIGN KEY (`deleted_by`) 		REFERENCES `usuario` 	(`id`)
);

CREATE TABLE `rel_pedido_compra_pedido_venda` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  `fk_pedido_compra_id` int NOT NULL,
  `fk_pedido_venda_id` 	int NOT NULL,
  
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  
  KEY `fk_pedido_compra_id` 		(`fk_pedido_compra_id`),
  KEY `fk_pedido_venda_id` 			(`fk_pedido_venda_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_pedido_compra_pedido_venda_ibfk_1` FOREIGN KEY (`fk_pedido_compra_id`) 	REFERENCES `pedido_compra` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pedido_compra_pedido_venda_ibfk_2` FOREIGN KEY (`fk_pedido_venda_id`) 	REFERENCES `pedido_venda` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pedido_compra_pedido_venda_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pedido_compra_pedido_venda_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pedido_compra_pedido_venda_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `rel_pre_pedido_pedido_compra` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  `fk_pedido_compra_id` int NOT NULL,
  `fk_pre_pedido_id` 	int NOT NULL,
  
  `created_at` 			datetime 	DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 			datetime 	DEFAULT NULL,
  `deleted_at` 			datetime 	DEFAULT NULL,
  `created_by` 			int 		DEFAULT NULL,
  `updated_by` 			int 		DEFAULT NULL,
  `deleted_by` 			int 		DEFAULT NULL,
  
  KEY `fk_pedido_compra_id` 		(`fk_pedido_compra_id`),
  KEY `fk_pre_pedido_id` 			(`fk_pre_pedido_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_pre_pedido_pedido_compra_ibfk_1` FOREIGN KEY (`fk_pedido_compra_id`) 	REFERENCES `pedido_compra` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pre_pedido_pedido_compra_ibfk_2` FOREIGN KEY (`fk_pre_pedido_id`) 	REFERENCES `pre_pedido` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pre_pedido_pedido_compra_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pre_pedido_pedido_compra_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pre_pedido_pedido_compra_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `rel_pre_pedido_pedido_venda` (
  `id` 							int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  `fk_pedido_venda_id` 			int NOT NULL,
  `fk_pre_pedido_id` 			int NOT NULL,
  
  `created_at` 					datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 					datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` 					datetime DEFAULT NULL,
  `created_by` 					int DEFAULT NULL,
  `updated_by` 					int DEFAULT NULL,
  `deleted_by` 					int DEFAULT NULL,
  
  KEY `fk_pedido_venda_id` 			(`fk_pedido_venda_id`),
  KEY `fk_pre_pedido_id` 			(`fk_pre_pedido_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_pre_pedido_pedido_venda_ibfk_1` FOREIGN KEY (`fk_pedido_venda_id`) 	REFERENCES `pedido_venda` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pre_pedido_pedido_venda_ibfk_2` FOREIGN KEY (`fk_pre_pedido_id`) 		REFERENCES `pre_pedido` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_pre_pedido_pedido_venda_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pre_pedido_pedido_venda_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_pre_pedido_pedido_venda_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `rel_representante_pedido_compra` (
  `id` 						int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  `fk_representante_id` 	int NOT NULL,
  `fk_pedido_compra_id` 	int NOT NULL,
  
  `created_at` 				datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 				datetime DEFAULT NULL,
  `deleted_at` 				datetime DEFAULT NULL,
  `created_by` 				int DEFAULT NULL,
  `updated_by` 				int DEFAULT NULL,
  `deleted_by` 				int DEFAULT NULL,
  
  KEY `fk_representante_id` 		(`fk_representante_id`),
  KEY `fk_pedido_compra_id`			(`fk_pedido_compra_id`),
  
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_representante_pedido_compra_ibfk_1` FOREIGN KEY (`fk_representante_id`) 	REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_representante_pedido_compra_ibfk_2` FOREIGN KEY (`fk_pedido_compra_id`) 	REFERENCES `pedido_compra` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_representante_pedido_compra_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_representante_pedido_compra_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_representante_pedido_compra_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);

CREATE TABLE `rel_vendedor_gestor_pedido_venda` (
  `id` 					int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fk_gestor_id` 		int NOT NULL,
  `fk_vendedor_id` 		int NOT NULL,
  `fk_pedido_venda_id` 	int NOT NULL,
  `created_at` 			datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 			datetime DEFAULT NULL,
  `deleted_at` 			datetime DEFAULT NULL,
  `created_by` 			int DEFAULT NULL,
  `updated_by` 			int DEFAULT NULL,
  `deleted_by` 			int DEFAULT NULL,
  
  KEY `fk_gestor_id` 				(`fk_gestor_id`),
  KEY `fk_vendedor_id` 				(`fk_vendedor_id`),
  KEY `fk_pedido_venda_id` 			(`fk_pedido_venda_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_1` FOREIGN KEY (`fk_gestor_id`) 		REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_2` FOREIGN KEY (`fk_vendedor_id`) 		REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_3` FOREIGN KEY (`fk_pedido_venda_id`) 	REFERENCES `pedido_venda` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_5` FOREIGN KEY (`updated_by`) REFERENCES `usuario` (`id`),
  CONSTRAINT `rel_vendedor_gestor_pedido_venda_ibfk_6` FOREIGN KEY (`deleted_by`) REFERENCES `usuario` (`id`)
);

CREATE TABLE `rel_vendedor_pedido_venda` (
  `id` 						int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  
  `fk_vendedor_id` 			int NOT NULL,
  `fk_pedido_venda_id` 		int NOT NULL,
  
  `created_at` 				datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` 				datetime DEFAULT NULL,
  `deleted_at` 				datetime DEFAULT NULL,
  `created_by` 				int DEFAULT NULL,
  `updated_by` 				int DEFAULT NULL,
  `deleted_by` 				int DEFAULT NULL,
  
  KEY `fk_vendedor_id` 				(`fk_vendedor_id`),
  KEY `fk_pedido_venda_id` 			(`fk_pedido_venda_id`),
  KEY `fk_created_by_usuario_id` 	(`created_by`),
  KEY `fk_updated_by_usuario_id` 	(`updated_by`),
  KEY `fk_deleted_by_usuario_id` 	(`deleted_by`),
  
  CONSTRAINT `rel_vendedor_pedido_venda_ibfk_1` FOREIGN KEY (`fk_vendedor_id`)	   	REFERENCES `representante` 	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_vendedor_pedido_venda_ibfk_2` FOREIGN KEY (`fk_pedido_venda_id`) 	REFERENCES `pedido_venda`	(`id`) ON DELETE CASCADE,
  CONSTRAINT `rel_vendedor_pedido_venda_ibfk_3` FOREIGN KEY (`created_by`) 			REFERENCES `usuario` 		(`id`),
  CONSTRAINT `rel_vendedor_pedido_venda_ibfk_4` FOREIGN KEY (`updated_by`) 			REFERENCES `usuario`		(`id`),
  CONSTRAINT `rel_vendedor_pedido_venda_ibfk_5` FOREIGN KEY (`deleted_by`) 			REFERENCES `usuario` 		(`id`)
);