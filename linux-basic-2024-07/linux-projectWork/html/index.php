<?php
include 'lib.php';
include 'mysql-requisites.php';

UI_echo('API NODE', $_ENV['API_NODE']);
?>
<script>
    console.log('PHP JS!');
</script>

<?php
$requisites = getConnectData();

$conn = new mysqli($requisites['replica-servername'], $requisites['replica-username'], $requisites['replica-password'], $requisites['replica-dbname']);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

UI_ln("mysql connect OK");


$sql = "SELECT * FROM tele";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    UI_ln("records:");
    while($row = $result->fetch_assoc()) {
        UI_echo('id=', $row["id"]);
    }
} else {
    UI_ln("No tele records found");
}

$conn->close();
?>