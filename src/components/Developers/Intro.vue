<template>
<div>
  <h1>Bem vindo à API do Mach!</h1>
  <p class='lead'>A maneira mais fácil de se conseguir dados aeronáuticos.</p><br>

  <h3>Primeiros passos</h3><hr>
  <p class='lead'>Acesar os dados de rotas do CGNA nem sempre é uma tarefa fácil. A dificuldade de legibilidade e o formato arcaico com que as informações são divulgadas no site do CGNA, faz com que conseguir informações atualizadas seja um desafio para os menos experientes. A API do Mach surge com a ideia de facilitar esse processo, fazendo com que você só tenha de se preocupar com a sua aplicação. Veja alguns motivos de porque usar a API do Mach:</p>
  <ul>
    <li class='lead'><b>Simplicidade e novas tecnologias:</b> ao invés de ter de consultar vários arquivos TXT com informações fora de ordem e tudo mais, o Mach reúne todas as informações do RPL, com alto poder de filtragem</li>
    <li class='lead'><b>Qualquer plataforma:</b> não importa se você é fã de PHP, JavaScript, Python, Java ou qualquer outra linguagem. O fluxo de dados através de JSON permite o uso da plataforma em qualquer linguagem de programação.</li>
    <li class='lead'><b>Gratuito e open-source:</b> por que raios pagar por dados públicos? Somos totalmente gratuitos - e assim seremos - além de sermos totalmente open-source. Não acredita? Vê o nosso código lá no <a target='_blank' href='https://github.com/jpedroh/mach-api'>GitHub</a> então ;)</li>
  </ul><br>

  <h3>Exemplos dos métodos</h3><hr>
  <p class='lead'>Vejamos como buscar alguns voos usando a API do Mach. Mas antes, vejamos como cada voo é estruturado no sistema do Mach. Cada voo é um objeto que possui as seguintes propriedades:</p>
    <ul>
    <li class='lead'><b>id:</b> ID da rota no banco de dados do Mach</li>
    <li class='lead'><b>departure:</b> Aeródromo de partida (ICAO)</li>
    <li class='lead'><b>aircraft:</b> Aeronave em que o voo é realizado (ICAO)</li>
    <li class='lead'><b>wakeTurbulence: </b>Esteira de turbulência da aeronave que realiza o voo</li>
    <li class='lead'><b>days: </b>Dias da semana em que o voo é realizado (ICAO)</li>
    <li class='lead'><b>arrival: </b>Aeródromo de destino (ICAO)</li>
    <li class='lead'><b>eet: </b>Tempo estimado em rota (EET)</li>
    <li class='lead'><b>speed: </b>Velocidade em que o voo será realizado</li>
    <li class='lead'><b>callsign: </b>Indicativo de chamada do voo</li>
    <li class='lead'><b>eqpt: </b>Indicativos EQPT do voo (ICAO)</li>
    <li class='lead'><b>company: </b>Companhia que realiza o voo (ICAO)</li>
    <li class='lead'><b>flight: </b>Número do voo</li>
    <li class='lead'><b>rules: </b>Regras de voo (ICAO)</li>
    <li class='lead'><b>fl: </b>Nível de voo</li>
    <li class='lead'><b>eobt: </b>Horário estimado de calçoes-fora (EOBT)</li>
    <li class='lead'><b>beginDate: </b>Início do voo no RPL</li>
    <li class='lead'><b>endDate: </b>Data de término do voo no RPL (null em caso de UFN)
    <li class='lead'><b>route: </b>Rota planejada para o voo</li>
    <li class='lead'><b>rmk: </b>Campo RMK (ICAO)</li>
  </ul><br>

  <h4>Métodos</h4><hr>
  <h5>getFlightById</h5>
  <p class='lead'>Permite acessar os dados de um voo através do ID.</p>
  <blockquote><b>http://us-central1-mach-app.cloudfunctions.net/api/flights/:id</b></blockquote>

  <h5>getFlights</h5>
  <p class='lead'>Permite acessar os dados de vários voos, com suporte a queries.</p>
  <blockquote><b>http://us-central1-mach-app.cloudfunctions.net/api/flights</b></blockquote>
  <p class='lead'>É possível fazer queries com qualquer um dos parâmetros presentes no voo. No exemplo abaixo, recebemos todos os voos que fazem a rota SBEG-SBBV</p>
  <blockquote><b>http://us-central1-mach-app.cloudfunctions.net/api/flights?departure=SBEG&arrival=SBBV</b></blockquote>

  <h3>Source code</h3><hr>
  <p class='lead'>O código da API, que roda nas Cloud Functions do Firebase, está disponível no <a target='_blank' href='https://github.com/jpedroh/mach-api'>GitHub</a>. Se você está interessado em colaborar no desenvolvimento e aperfeiçoá-lo sinta-se a vontade.</p>
</div>
</template>
