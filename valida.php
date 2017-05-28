<?
//Inicia a sessão
session_start();

//Include
include_once 'classes/rpl.php';

//Define os dados
$_SESSION['partida'] = strtoupper($_POST['partida']);
$_SESSION['chegada'] = strtoupper($_POST['chegada']);

//Instancia o objeto
$RPL = new RPL($_SESSION['partida'],$_SESSION['chegada']);

//Verifica se a chave existe
if ($RPL->rotas != null) {
    //Chave existe, redirecionando para a ferramenta
    $_SESSION['erro'] = 0;
    header('location:index.php');
}else{
    //Chave não existe, de volta a mesa de projetos
    $_SESSION['erro'] = 1;
    header('location:selecao.php');
}