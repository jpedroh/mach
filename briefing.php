<!DOCTYPE html>
<?
//Declara a sessão
session_start();

//Verifica se a sessão existe
if(!isset($_SESSION['partida'])){
    $_SESSION['erro'] = 0;
    header('location:selecao.php');
}

//Includes
include_once 'classes/cartas.php';
?>
<html>
<head>
    <meta charset='UTF-8'>
    <!--Import materialize.css-->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'>
    <!--Import dataTables.css-->
    <link rel='stylesheet' type='text/css' href='//cdn.datatables.net/1.10.15/css/jquery.dataTables.css'>
    <!--Import style.css-->
    <link rel='stylesheet' href='css/index.css'>
    <!--Let browser know website is optimized for mobile-->
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>MACH - Planejamento de voo online</title>
</head>
<style>
.tabs .tab a {
    color: #1565c0;
}
.tabs .tab a:hover,
.tabs .tab a.active {
    background-color: transparent;
    color: #1565c0;
}
.tabs .tab.disabled a,
.tabs .tab.disabled a:hover {
    color: rgba(102, 147, 153, 0.7);
}
.tabs .indicator {
    background-color: #1565c0;
}
</style>
<body class='grey lighten-5'>
    <header>
        <nav class='blue darken-3'>
            <div class='container nav-wrapper'>
                <span style='font-weight:100' class='brand-logo'>mach<sup style='font-size:50%;'>beta</sup></span>
                <ul id='nav-mobile' class='right hide-on-med-and-down'>
                    <li><a href='index.php'>Voltar a seleção</a></li>
                    <li><a href='logout.php'>Sair</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <div class='container'>
            <!--Cabeçalho-->
            <h3>Voo  <?= $_SESSION['voo'] ?> de <?=$_SESSION['partida'] ?> para <?=$_SESSION['chegada'] ?></h3>
            <div class='divider'></div><br>

            <!--Resumo-->
            <h5>Resumo</h5>
            <div class='divider'></div>
            <table class='striped'>
                <tbody>
                    <tr><td><b>Voo</b> <?= $_SESSION['voo'] ?></td></tr>
                    <tr><td><b>Partida</b> <?= $_SESSION['partida'] ?></td></tr>
                    <tr><td><b>Chegada</b> <?= $_SESSION['chegada'] ?></td></tr>
                    <tr><td><b>Aeronave</b> <?= $_SESSION['aeronave'] . '/' . $_SESSION['esteira'] ?></td></tr>
                    <tr><td><b>Velocidade</b> <?= $_SESSION['velocidade'] ?></td></tr>
                    <tr><td><b>FL</b> <?= $_SESSION['altitude'] ?></td></tr>
                    <tr><td><b>Rota</b> <?= $_SESSION['rota'] ?></td></tr>
                </tbody>
            </table><br>

            <!--Meteorologia-->
            <h5>Meteorologia</h5>
            <div class='divider'></div>
            <table class='striped'>
                <tbody>
                    <tr><td><b>METAR em <?=$_SESSION['partida'] ?></b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['partida'] . '&msg=metar&data_hora=nao') ?></td></tr>
                    <tr><td><b>METAR em <?=$_SESSION['chegada'] ?></b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['chegada'] . '&msg=metar&data_hora=nao') ?></td></tr>
                </tbody>
            </table><br>

            <!--Cartas Aéreas-->
            
            
            
            <table id="example" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </tfoot>
        <tbody>
            <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
            </tr>
            <tr>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>2011/07/25</td>
                <td>$170,750</td>
            </tr>
            <tr>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>66</td>
                <td>2009/01/12</td>
                <td>$86,000</td>
            </tr>
            <tr>
                <td>Cedric Kelly</td>
                <td>Senior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>22</td>
                <td>2012/03/29</td>
                <td>$433,060</td>
            </tr>
            <tr>
                <td>Airi Satou</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>33</td>
                <td>2008/11/28</td>
                <td>$162,700</td>
            </tr>
            <tr>
                <td>Brielle Williamson</td>
                <td>Integration Specialist</td>
                <td>New York</td>
                <td>61</td>
                <td>2012/12/02</td>
                <td>$372,000</td>
            </tr>
            <tr>
                <td>Herrod Chandler</td>
                <td>Sales Assistant</td>
                <td>San Francisco</td>
                <td>59</td>
                <td>2012/08/06</td>
                <td>$137,500</td>
            </tr>
            <tr>
                <td>Rhona Davidson</td>
                <td>Integration Specialist</td>
                <td>Tokyo</td>
                <td>55</td>
                <td>2010/10/14</td>
                <td>$327,900</td>
            </tr>
            <tr>
                <td>Colleen Hurst</td>
                <td>Javascript Developer</td>
                <td>San Francisco</td>
                <td>39</td>
                <td>2009/09/15</td>
                <td>$205,500</td>
            </tr>
            <tr>
                <td>Sonya Frost</td>
                <td>Software Engineer</td>
                <td>Edinburgh</td>
                <td>23</td>
                <td>2008/12/13</td>
                <td>$103,600</td>
            </tr>
            <tr>
                <td>Jena Gaines</td>
                <td>Office Manager</td>
                <td>London</td>
                <td>30</td>
                <td>2008/12/19</td>
                <td>$90,560</td>
            </tr>
            <tr>
                <td>Quinn Flynn</td>
                <td>Support Lead</td>
                <td>Edinburgh</td>
                <td>22</td>
                <td>2013/03/03</td>
                <td>$342,000</td>
            </tr>
            <tr>
                <td>Charde Marshall</td>
                <td>Regional Director</td>
                <td>San Francisco</td>
                <td>36</td>
                <td>2008/10/16</td>
                <td>$470,600</td>
            </tr>
            <tr>
                <td>Haley Kennedy</td>
                <td>Senior Marketing Designer</td>
                <td>London</td>
                <td>43</td>
                <td>2012/12/18</td>
                <td>$313,500</td>
            </tr>
            <tr>
                <td>Tatyana Fitzpatrick</td>
                <td>Regional Director</td>
                <td>London</td>
                <td>19</td>
                <td>2010/03/17</td>
                <td>$385,750</td>
            </tr>
            <tr>
                <td>Michael Silva</td>
                <td>Marketing Designer</td>
                <td>London</td>
                <td>66</td>
                <td>2012/11/27</td>
                <td>$198,500</td>
            </tr>
            <tr>
                <td>Paul Byrd</td>
                <td>Chief Financial Officer (CFO)</td>
                <td>New York</td>
                <td>64</td>
                <td>2010/06/09</td>
                <td>$725,000</td>
            </tr>
            <tr>
                <td>Gloria Little</td>
                <td>Systems Administrator</td>
                <td>New York</td>
                <td>59</td>
                <td>2009/04/10</td>
                <td>$237,500</td>
            </tr>
            <tr>
                <td>Bradley Greer</td>
                <td>Software Engineer</td>
                <td>London</td>
                <td>41</td>
                <td>2012/10/13</td>
                <td>$132,000</td>
            </tr>
            <tr>
                <td>Dai Rios</td>
                <td>Personnel Lead</td>
                <td>Edinburgh</td>
                <td>35</td>
                <td>2012/09/26</td>
                <td>$217,500</td>
            </tr>
            <tr>
                <td>Jenette Caldwell</td>
                <td>Development Lead</td>
                <td>New York</td>
                <td>30</td>
                <td>2011/09/03</td>
                <td>$345,000</td>
            </tr>
            <tr>
                <td>Yuri Berry</td>
                <td>Chief Marketing Officer (CMO)</td>
                <td>New York</td>
                <td>40</td>
                <td>2009/06/25</td>
                <td>$675,000</td>
            </tr>
            <tr>
                <td>Caesar Vance</td>
                <td>Pre-Sales Support</td>
                <td>New York</td>
                <td>21</td>
                <td>2011/12/12</td>
                <td>$106,450</td>
            </tr>
            <tr>
                <td>Doris Wilder</td>
                <td>Sales Assistant</td>
                <td>Sidney</td>
                <td>23</td>
                <td>2010/09/20</td>
                <td>$85,600</td>
            </tr>
            <tr>
                <td>Angelica Ramos</td>
                <td>Chief Executive Officer (CEO)</td>
                <td>London</td>
                <td>47</td>
                <td>2009/10/09</td>
                <td>$1,200,000</td>
            </tr>
            <tr>
                <td>Gavin Joyce</td>
                <td>Developer</td>
                <td>Edinburgh</td>
                <td>42</td>
                <td>2010/12/22</td>
                <td>$92,575</td>
            </tr>
            <tr>
                <td>Jennifer Chang</td>
                <td>Regional Director</td>
                <td>Singapore</td>
                <td>28</td>
                <td>2010/11/14</td>
                <td>$357,650</td>
            </tr>
            <tr>
                <td>Brenden Wagner</td>
                <td>Software Engineer</td>
                <td>San Francisco</td>
                <td>28</td>
                <td>2011/06/07</td>
                <td>$206,850</td>
            </tr>
            <tr>
                <td>Fiona Green</td>
                <td>Chief Operating Officer (COO)</td>
                <td>San Francisco</td>
                <td>48</td>
                <td>2010/03/11</td>
                <td>$850,000</td>
            </tr>
            <tr>
                <td>Shou Itou</td>
                <td>Regional Marketing</td>
                <td>Tokyo</td>
                <td>20</td>
                <td>2011/08/14</td>
                <td>$163,000</td>
            </tr>
            <tr>
                <td>Michelle House</td>
                <td>Integration Specialist</td>
                <td>Sidney</td>
                <td>37</td>
                <td>2011/06/02</td>
                <td>$95,400</td>
            </tr>
            <tr>
                <td>Suki Burks</td>
                <td>Developer</td>
                <td>London</td>
                <td>53</td>
                <td>2009/10/22</td>
                <td>$114,500</td>
            </tr>
            <tr>
                <td>Prescott Bartlett</td>
                <td>Technical Author</td>
                <td>London</td>
                <td>27</td>
                <td>2011/05/07</td>
                <td>$145,000</td>
            </tr>
            <tr>
                <td>Gavin Cortez</td>
                <td>Team Leader</td>
                <td>San Francisco</td>
                <td>22</td>
                <td>2008/10/26</td>
                <td>$235,500</td>
            </tr>
            <tr>
                <td>Martena Mccray</td>
                <td>Post-Sales support</td>
                <td>Edinburgh</td>
                <td>46</td>
                <td>2011/03/09</td>
                <td>$324,050</td>
            </tr>
            <tr>
                <td>Unity Butler</td>
                <td>Marketing Designer</td>
                <td>San Francisco</td>
                <td>47</td>
                <td>2009/12/09</td>
                <td>$85,675</td>
            </tr>
            <tr>
                <td>Howard Hatfield</td>
                <td>Office Manager</td>
                <td>San Francisco</td>
                <td>51</td>
                <td>2008/12/16</td>
                <td>$164,500</td>
            </tr>
            <tr>
                <td>Hope Fuentes</td>
                <td>Secretary</td>
                <td>San Francisco</td>
                <td>41</td>
                <td>2010/02/12</td>
                <td>$109,850</td>
            </tr>
            <tr>
                <td>Vivian Harrell</td>
                <td>Financial Controller</td>
                <td>San Francisco</td>
                <td>62</td>
                <td>2009/02/14</td>
                <td>$452,500</td>
            </tr>
            <tr>
                <td>Timothy Mooney</td>
                <td>Office Manager</td>
                <td>London</td>
                <td>37</td>
                <td>2008/12/11</td>
                <td>$136,200</td>
            </tr>
            <tr>
                <td>Jackson Bradshaw</td>
                <td>Director</td>
                <td>New York</td>
                <td>65</td>
                <td>2008/09/26</td>
                <td>$645,750</td>
            </tr>
            <tr>
                <td>Olivia Liang</td>
                <td>Support Engineer</td>
                <td>Singapore</td>
                <td>64</td>
                <td>2011/02/03</td>
                <td>$234,500</td>
            </tr>
            <tr>
                <td>Bruno Nash</td>
                <td>Software Engineer</td>
                <td>London</td>
                <td>38</td>
                <td>2011/05/03</td>
                <td>$163,500</td>
            </tr>
            <tr>
                <td>Sakura Yamamoto</td>
                <td>Support Engineer</td>
                <td>Tokyo</td>
                <td>37</td>
                <td>2009/08/19</td>
                <td>$139,575</td>
            </tr>
            <tr>
                <td>Thor Walton</td>
                <td>Developer</td>
                <td>New York</td>
                <td>61</td>
                <td>2013/08/11</td>
                <td>$98,540</td>
            </tr>
            <tr>
                <td>Finn Camacho</td>
                <td>Support Engineer</td>
                <td>San Francisco</td>
                <td>47</td>
                <td>2009/07/07</td>
                <td>$87,500</td>
            </tr>
            <tr>
                <td>Serge Baldwin</td>
                <td>Data Coordinator</td>
                <td>Singapore</td>
                <td>64</td>
                <td>2012/04/09</td>
                <td>$138,575</td>
            </tr>
            <tr>
                <td>Zenaida Frank</td>
                <td>Software Engineer</td>
                <td>New York</td>
                <td>63</td>
                <td>2010/01/04</td>
                <td>$125,250</td>
            </tr>
            <tr>
                <td>Zorita Serrano</td>
                <td>Software Engineer</td>
                <td>San Francisco</td>
                <td>56</td>
                <td>2012/06/01</td>
                <td>$115,000</td>
            </tr>
            <tr>
                <td>Jennifer Acosta</td>
                <td>Junior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>43</td>
                <td>2013/02/01</td>
                <td>$75,650</td>
            </tr>
            <tr>
                <td>Cara Stevens</td>
                <td>Sales Assistant</td>
                <td>New York</td>
                <td>46</td>
                <td>2011/12/06</td>
                <td>$145,600</td>
            </tr>
            <tr>
                <td>Hermione Butler</td>
                <td>Regional Director</td>
                <td>London</td>
                <td>47</td>
                <td>2011/03/21</td>
                <td>$356,250</td>
            </tr>
            <tr>
                <td>Lael Greer</td>
                <td>Systems Administrator</td>
                <td>London</td>
                <td>21</td>
                <td>2009/02/27</td>
                <td>$103,500</td>
            </tr>
            <tr>
                <td>Jonas Alexander</td>
                <td>Developer</td>
                <td>San Francisco</td>
                <td>30</td>
                <td>2010/07/14</td>
                <td>$86,500</td>
            </tr>
            <tr>
                <td>Shad Decker</td>
                <td>Regional Director</td>
                <td>Edinburgh</td>
                <td>51</td>
                <td>2008/11/13</td>
                <td>$183,000</td>
            </tr>
            <tr>
                <td>Michael Bruce</td>
                <td>Javascript Developer</td>
                <td>Singapore</td>
                <td>29</td>
                <td>2011/06/27</td>
                <td>$183,000</td>
            </tr>
            <tr>
                <td>Donna Snider</td>
                <td>Customer Support</td>
                <td>New York</td>
                <td>27</td>
                <td>2011/01/25</td>
                <td>$112,000</td>
            </tr>
        </tbody>
    </table>
            
            
            
            <h5>Cartas Aéreas</h5>
            <div class='divider'></div>
            <div id ='cartas' class='row'>
                <!--Menu-->
                <div class='col s12'>
                    <ul class='tabs tabs-fixed-width'>
                        <li class='tab col s3'><a class='blue-text text-darken-3' href='#partida'><?=$_SESSION['partida'] ?></a></li>
                        <li class='tab col s3'><a class='blue-text text-darken-3' href='#chegada'><?=$_SESSION['chegada'] ?></a></li>
                    </ul>
                </div>
                <!--Abas-->
                <div id='partida' class='col s12'>
                    <table id='partida_tbl' class='display'>
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>CARTA</th>
                                <th>DATA</th>
                                <th>DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $partida = new Cartas($_SESSION['partida']);
                            $partida->montaLinhas();
                            ?>
                        </tbody>
                    </table>
                </div>
                <div id='chegada' class='col s12'>
                    <table id='chegada_tbl' class='display'>
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>CARTA</th>
                                <th>DATA</th>
                                <th>DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $chegada = new Cartas($_SESSION['chegada']);
                            $chegada->montaLinhas();
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!--Outros-->
            <h5>Outros</h5>
            <div class='divider'></div><br>
            <a href='fpl.php?id=<?=$_SESSION['id'] ?>' class="blue darken-3 waves-effect waves-light btn-large">Gerar plano de voo da IVAO</a>

            <!--Aviso-->
            <p>O sistema de meteorologia e de cartas aéreas são derivados do DECEA e podem estar indisponíveis por razões que fogem de nosso controle.</p>

        </div>
    </main>
    <footer class='page-footer blue darken-3'>
            <div class='footer-copyright'>
                <div class='container'> <i class='fa fa-copyright' aria-hidden='true'></i> <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class='fa fa-github' aria-hidden='true'></i></a></div>
            </div>
    </footer>
    <!--Import jQuery before materialize.js-->
    <script type='text/javascript' src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'></script>
    <script src='https://use.fontawesome.com/b19f6a7abc.js'></script>
    <script type='text/javascript' charset='utf8' src='//cdn.datatables.net/1.10.15/js/jquery.dataTables.js'></script>
    <script src='js/briefing.js'></script>
</body>
</html>
