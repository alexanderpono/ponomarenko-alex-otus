<?php
function getConnectData() {
    return array(
        "source-servername" => "project-db-source", 
        "source-username" => "meteo_api", 
        "source-password" => {DB_USER_API_PASS}, 
        "source-dbname" => "meteo_db",

        "replica-servername" => "project-db-replica", 
        "replica-username" => "meteo_r", 
        "replica-password" => {DB_USER_READ_PASS}, 
        "replica-dbname" => "meteo_db"
    );
}
?>