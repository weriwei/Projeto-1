# **Corre ou carro?**
## Projeto 1 - Aplicação web progressiva
### Disciplina: Tópicos Especiais em Sistemas de Informação - PUC MG
### Aluno: Weren Ricardo

# Descrição: 
> A aplicação é um aplicativo simples para controle de gastos com transporte.
> Tive a ideia após filtrar em uma planilha de gastos e descobrir que poderia pagar a parcela de um carro popular apenas com o valor do que gastei com uber e buser no mês.

# Questionário: 
* A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? `Sim`
* A aplicação tem pelo menos duas interfaces (telas ou páginas)  `Sim`
* A aplicação armazena e usa de forma relevante dados complexos (mais de um atributo)? `Sim`
* A aplicação possui um manifesto para instalação no dispositivo do usuário? `Sim`
* A aplicação possui um service worker que permite o funcionamento off-line? `Sim`
* O código da minha aplicação possui comentários explicando cada operação? `Sim`
* A aplicação está funcionando corretamente? `Sim`
* A aplicação está completa? `Sim`

# Dados:
> A aplicação trabalha com uma lista de objetos desse tipo:
```
{
    "description": "Diamantina",
    "date": "2022-12-25",
    "value": "79.90",
    "type": "Viagem",
    "id": "8145339696449627"
}
``` 

## Screenshots da aplicação:

![initial screen.](/screenshots/01.jpg)
### Tela inicial da aplicação:
Possui uma headerBar com o título da aplicação e um campo que apresenta a soma dos gastos.
Botão para adicionar gastos.
Imagem de fundo demonstrando quando não existem gastos cadastrados

![initial screen.](/screenshots/02.jpg)
### Tela cadastro de gastos:
Ao clicar em adicionar gastos é aberto uma nova tela da aplicação.
É possível escolher entre 3 opções:
 1. Viagem ( Avião / Buser)
 1. Transporte coletivo ( Ônibus / Metrô )
 1. Particular ( Uber/ Táxi )

![initial screen.](/screenshots/03.jpg)
### Tela para detalhar o gasto:
Após selecionar uma das opções na tela interior, a nova tela é apresentada para detalhamento do gasto.
Existem 3 campos para serem preenchidos:
 1. Descrição 
 1. Data
 1. Valor 

A tela possui 3 botões de ação:
 1. Confirmar (Salva o dado)
 1. Limpar (Limpa os dados das entradas)
 3. Voltar (Volta para a tela inicial)

![initial screen.](/screenshots/04.jpg)
### Tela inicial / Listagem:
Após o cadastro de algum gasto, a tela inicial lista os gastos.
O somatório dos gatos é apresentado na headerBar
É possível realizar uma filtragem da lista pelo tipo do gasto.
É possível escolher entre 4 opções:
 1. Exibir tudo
 1. Viagem ( Avião / Buser)
 1. Transporte público ( Ônibus / Metrô )
 1. Corrida Particular ( Uber/ Táxi )

![initial screen.](/screenshots/05.jpg)
### Tela de alteração / exclusão
Ao clicar em qualquer item da listagem, a tela de alteração / exclusão é apresentada.
Ao clicar em Editar, a tela de detalhar é apresentada, com os valores carregados em cada campo.
Ao alterar qualquer dado e confirmar, o registro será atualizado e a aplicação redireciona para a tela de listagem.
  


