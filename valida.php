<?
//Inicia a sessão
session_start();

//Include
include_once 'classes/rpl.php';

//Define os dados
$_SESSION['partida'] = isset($_POST['partida']) ? strtoupper($_POST['partida']) : $_SESSION['partida'];
$_SESSION['chegada'] = isset($_POST['chegada']) ? strtoupper($_POST['chegada']) : $_SESSION['chegada'];
$_SESSION['cia'] = isset($_POST['cia']) ? strtoupper($_POST['cia']) : null;

//Instancia o objeto
$RPL = new RPL($_SESSION['partida'], $_SESSION['chegada'], $_SESSION['cia']);

//Verifica se a chave existe
if ($RPL->rotas) {
    //Chave existe, redirecionando para a ferramenta
    $_SESSION['erro'] = 0;
    header('location:index.php');
}else{
    //Chave não existe, de volta a mesa de projetos
    $_SESSION['erro'] = 1;
    header('location:selecao.php');
}