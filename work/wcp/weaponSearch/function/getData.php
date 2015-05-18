<?php
		include('mysql_connect_user.php');
		$data = $_POST['info'];
		$star = $_POST['star'];
		$stars = explode(' ' , '1 2 3 4');
		$job = $_POST['job'];
		$jobs = explode(' ' , '劍 拳 斧 槍 弓 法 雙刀');
		$phase = $_POST['phase'];
		$phases = explode(' ' , '初代 第一期 第二期 第三期 第四期 第五期 第六期 第七期 第八期 第九期 第十期 第十一期');
		$cate = $_POST['cate'];
		$cates = explode(' ' , '活動限定 正月限定 聖誕限定 黑貓限定 中川限定 限定角色');
		$sql = 'select `weapon`.`wNo`,`weapon`.`nickname` from `weapon`,`weaponattr1`,`weaponattr2`,`weaponattr3`,`weaponattr4`,`weaponattr5` where `weapon`.`wNo` = `weaponattr1`.`wNo` and `weapon`.`wNo` = `weaponattr2`.`wNo`and `weapon`.`wNo` = `weaponattr3`.`wNo` and `weapon`.`wNo` = `weaponattr4`.`wNo`and `weapon`.`wNo` = `weaponattr5`.`wNo` and ';
		$num = 0;
		$check = false;
		$ocheck = false;
		if($data != 'isempty'){
			$check = true;
			foreach($data as $i){
					if($num != 0) $sql = $sql . 'and ';
					$sql = $sql . '(`JName1` like "%' . $i . '%" or `CName1` like "%' . $i . '%" or `nickname` like "%' . $i . '%" or `JName2` like "%' . $i . '%" or `CName2` like "%' . $i . '%" or `JName3` like "%' . $i . '%" or `CName3` like "%' . $i . '%" or `JName4` like "%' . $i . '%" or `CName4` like "%' . $i . '%" or `JName5` like "%' . $i . '%" or `CName5` like "%' . $i . '%") ';
					$num = 1;
			}
			$ocheck = $check;
		}
		if($check == true){$addword = 'and (';$check = false;}
		else $addword = ' (';
		
		for($i=0;$i<4;$i++){
			if($star[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`star` = "'.$stars[$i].'星"';}
		}
		if($check == true){$sql = $sql . $addword . ') ';$ocheck=$check;}
		
		$check = $ocheck;
		if($check == true){$addword = 'and (';$check = false;}
		else $addword = ' (';
		
		for($i=0;$i<7;$i++){
			if($job[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`job` = "'.$jobs[$i].'"';}
		}
		if($check == true){$sql = $sql . $addword . ') ';$ocheck=$check;}
		
		$check = $ocheck;
		if($check == true){$addword = 'and (';$check = false;}
		else $addword = ' (';
		
		for($i=0;$i<12;$i++){
			if($phase[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`phase` = "'.$phases[$i].'"';}
		}
		for($i=0;$i<6;$i++){
			if($cate[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`phase` = "'.$cates[$i].'"';}
		}
		if($check == true){$sql = $sql . $addword . ') ';$ocheck=$check;}
		$myre = array();
		$word = array();
		$result = mysql_query($sql);
		$word = array();
		while($row = @mysql_fetch_row($result)){
			foreach($row as $data) array_push($word,$data);
			array_push($myre,$word);
			unset($word);
			$word = array();
		}
		echo json_encode($myre);
?> 