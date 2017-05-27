<?
$content = file_get_contents('rpl.php');

echo $content;

// Converte a string com o conteúdo em um array associativo
$array = json_decode($content, true);

print_r($array);