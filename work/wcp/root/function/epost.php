<?php
		include('mysql_connect.php');
		$id = $_POST['id'];
		$title = $_POST['title'];
		$start = $_POST['start'];
		$end = $_POST['end'];
		$content = $_POST['editor1'];
		$sql = "INSERT INTO `wcp_new`.`event` (`aid`,`eStart`, `eEnd`, `eTitle`, `eContent`,`eBanner`) VALUES ('$id', '$start','$end', '$title', '$content','')";
		if(mysql_query($sql)) echo '<h1>Insert Success!</h1>';
        else echo '<h1>Insert Fail!</h1>';
		echo "<br/>Id:$id";
		echo "<br/>Start:$start<br/>End:$end";
		echo "<br/>Title:$title";
		echo "<br/>Content:$content";
		echo '<br/><br/><span id="showtime"></span>';
		echo '<script>var time = 1; setTimeout("killPage()",1000);function killPage(){document.getElementById("showtime").innerHTML = "自動關閉時間"+time+"s";time = time - 1;if(time == -2)window.close();setTimeout("killPage()",1000);}</script>';
?> 