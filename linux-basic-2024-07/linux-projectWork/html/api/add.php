<?php
include('../mysql-requisites.php');
include('../lib.php');

const NO_REQUIRED_FIELD = 'no required field';
const WRONG_VALUE = 'wrong value';
const DB_ERROR = 'db error';
function validateInput() {
    $errors = [];
    $idExists = array_key_exists('id', $_GET);
    $tExists = array_key_exists('t', $_GET);
    $hExists = array_key_exists('h', $_GET);

    if (!$idExists) {
        array_push($errors, array('message' => NO_REQUIRED_FIELD, 'data' => 'id'));
    }
    if (!$tExists) {
        array_push($errors, ['message' => NO_REQUIRED_FIELD, 'data' => 't']);
    }
    if (!$hExists) {
        array_push($errors, ['message' => NO_REQUIRED_FIELD, 'data' => 'h']);
    }

    if ($idExists) {
        $id = (int) $_GET['id'];
        if ($id <= 0) {
            array_push($errors, ['message' => WRONG_VALUE, 'data' => ['field' => 'id', 'value' => $_GET['id']]]);
        }
    }

    return $errors;
}

$validateErrors = validateInput();

function go($validateErrors) {
    $result = '';
    if (count($validateErrors) > 0) {
        $result = json_encode(['errors' => $validateErrors]);
    
        header("HTTP/1.1 400 Bad Request");
        header('Content-Type: application/json');
        print $result;
        return;
    }

    $id = (int) $_GET['id'];
    $t = ((float) $_GET['t']) * 10;
    $h = (float) $_GET['h'];

    $requisites = getConnectData();
    $conn = new mysqli($requisites['source-servername'], $requisites['source-username'], $requisites['source-password'], $requisites['source-dbname']);
    if ($conn->connect_error) {
        header("HTTP/1.1 500 Internal server error");
        $result = json_encode(['errors' => ['message' => DB_ERROR, 'data' => 'connect error']]);
        print $result;
        return;
    }
    
    $sql = "INSERT INTO tele(sensor_id, dt, temperature, humidity) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    date_default_timezone_set('Europe/Moscow');
    $date = date('Y-m-d h:i:s', time());
    $code1 = $stmt->bind_param('isdd', $id, $date, $t, $h); // "is" means that $id is bound as an integer and $label as a string
    $code2 = $stmt->execute();    

    if (!$code1 || !$code2) {
        header("HTTP/1.1 500 Internal server error");
        $short = json_encode(['errors' => ['message' => DB_ERROR, 'data' => 'sql execute error']]);
        $result = json_encode(['errors' => ['message' => DB_ERROR, 'data' => ['message' => 'sql execute error', 'id' => $id, 't' => $t, 'h' => $h, 'date' => $date, 'sql' => $sql]]]);
        print $short;

        error_log(
            $result
        );    
        return;
    }
    header("HTTP/1.1 201 Created");
    header('Content-Type: application/json');    

    print $result;

    $conn->close();
    
}

go($validateErrors);
?>