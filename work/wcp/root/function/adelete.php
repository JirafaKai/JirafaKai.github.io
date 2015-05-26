<?php
		include('mysql_connect.php');
		$id = $_POST['id'];
		$sql = "DELETE FROM `wcp_new`.`announce` WHERE `announce`.`aid` = '$id'";
		if(mysql_query($sql)) echo '<h1>Delete Success!</h1>';
        else echo '<h1>Delete Fail!</h1>';
		echo "<br/>Id:$id";
		echo '<br/><br/><span id="showtime"></span>';
		echo '<script>var time = 1; setTimeout("killPage()",1000);function killPage(){document.getElementById("showtime").innerHTML = "自動關閉時間"+time+"s";time = time - 1;if(time == -2)window.close();setTimeout("killPage()",1000);}</script>';
?> 