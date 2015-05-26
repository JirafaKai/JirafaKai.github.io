<?php
		include('mysql_connect.php');
		$sql = 'select * from `event` ORDER BY `event`.`eStart` DESC';
	
		$myre = array();
		$word = array();
		$result = mysql_query($sql);
		while($row = @mysql_fetch_row($result)){
			foreach($row as $data) array_push($word,$data);
			array_push($myre,$word);
			unset($word);
			$word = array();
		}
		echo json_encode($myre);
?> 