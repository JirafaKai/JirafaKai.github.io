<?php
		include('mysql_connect_user.php');
		$data = $_POST['info'];
		$star = $_POST['star'];
		$stars = explode(' ' , '1 2 3 4');
		$job = $_POST['job'];
		$jobs = explode(' ' , '劍 拳 斧 槍 弓 法 雙刀');
		$type = $_POST['type'];
		$types = explode(' ' , '攻擊型 防禦型 平衡型 支援型 技能型 技術型 英雄型');
		$phase = $_POST['phase'];
		$phases = explode(' ' , '初代 第一期 第二期 第三期 第四期 第五期 第六期 第七期 第八期 第九期 第十期 第十一期');
		$cate = $_POST['cate'];
		$cates = explode(' ' , '活動 限定');
		$sql = 'select * from `char` where ';
		$num = 0;
		$check = false;
		$ocheck = false;
		if($data != 'isempty'){
			$check = true;
			foreach($data as $i){
					if($num != 0) $sql = $sql . 'and ';
					$sql = $sql . '(`JName` like "%' . $i . '%" or `CName` like "%' . $i . '%") ';
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
			$addword = $addword . '`star` = '.$stars[$i];}
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
		if($check == true)$sql = $sql . $addword . ') ';
		echo $sql;
?> 