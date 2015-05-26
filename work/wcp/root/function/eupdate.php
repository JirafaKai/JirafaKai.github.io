<?php
		include('mysql_connect.php');
		$id = $_POST['id'];
		$oid = $_POST['oid'];
		$title = $_POST['title'];
		$start = $_POST['start'];
		$end = $_POST['end'];
		$content = $_POST['editor1'];
		$sql = "UPDATE `wcp_new`.`event` set `aid` = '$id',`eStart`='$start',`eEnd`='$end', `eTitle` = '$title', `eContent` = '$content' where `event`.`aid` = '$oid'";
		if(mysql_query($sql)) echo '<h1>Update Success!</h1>';
        else echo '<h1>Update Fail!</h1>';
		echo "<br/>Id:$id";
		echo "<br/>Start:$start<br/>End:$end";
		echo "<br/>Title:$title";
		echo "<br/>Content:$content";
		echo '<br/><br/><span id="showtime"></span>';
		echo '<script>var time = 1; setTimeout("killPage()",1000);function killPage(){document.getElementById("showtime").innerHTML = "自動關閉時間"+time+"s";time = time - 1;if(time == -2)window.close();setTimeout("killPage()",1000);}</script>';
?> 