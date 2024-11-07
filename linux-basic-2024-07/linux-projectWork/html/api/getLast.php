<?php
include('../mysql-requisites.php');
include('../lib.php');

$requisites = getConnectData();
$conn = new mysqli($requisites['replica-servername'], $requisites['replica-username'], $requisites['replica-password'], $requisites['replica-dbname']);
if ($conn->connect_error) {
    header("HTTP/1.1 500 Internal server error");
    $result = json_encode(['errors' => ['message' => DB_ERROR, 'data' => 'connect error']]);
    print $result;
    return;
}
    
$sql = "select * from meteo_db.tele t order by id desc limit 1";

date_default_timezone_set('Europe/Moscow');
$sqlResult = $conn->query($sql);

if (!$sqlResult) {
    header("HTTP/1.1 500 Internal server error");
    $short = json_encode(['errors' => ['message' => DB_ERROR, 'data' => 'sql execute error']]);
    $result = json_encode(['errors' => ['message' => DB_ERROR, 'data' => ['message' => 'sql execute error', 'id' => $id, 't' => $t, 'h' => $h, 'date' => $date, 'sql' => $sql]]]);
    print $short;

    error_log(
        $result
    );    
    return;
}

$resultData = [];
$sqlResultAr = [...$sqlResult];
if (count($sqlResultAr) >=0) {
    $resultData = $sqlResultAr[0];
}

header("HTTP/1.1 200 OK");
header('Content-Type: application/json');    
header('Node: ' . $_ENV['API_NODE']);


$result = json_encode(['code' => true, 'result' => (object)$resultData]);
print $result;

$conn->close();
    
?>