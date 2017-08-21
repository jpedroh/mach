<?php
$fixos = file_get_contents('aerovias.txt');

echo $fixos[0];

//echo substr($fixos, 3);

$aerovias = explode("\n", substr($fixos, strpos(' ', $fixos)));

echo '<pre>';
//print_r($aerovias);
echo '</pre>';
