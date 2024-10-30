<?php
function UI_echo($name, $val) {
    UI_ln("$name=$val");
}

function UI_ln($val) {
    echo "$val<br>\n";
}

?>