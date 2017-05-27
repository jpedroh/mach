<?
//Decodifica o json para uma array associativa
$decodifica = json_decode(file_get_contents('exemplo/api_exemplo.php'), true);        
//Escreve os dados em uma tabela
foreach($decodifica as $voo){
    echo '<tr>
            <td>'.$voo['callsign'].'</td>
            <td>'.$voo['partida'].'</td>
            <td>'.$voo['rota'].'</td>
            <td>'.$voo['chegada'].'</td>
         </tr>';
        }
?>