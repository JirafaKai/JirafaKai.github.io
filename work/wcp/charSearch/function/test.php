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
		$cates = explode(' ' , '活動限定 正月限定 聖誕限定 黑貓限定 中川限定 限定角色');
		$sql = 'select `cNo`,`JName` from `char` where ';
		$num = 0;
		$check = false;
		$ocheck = false;
		if($data != 'isempty'){
			$check = true;
			foreach($data as $i){
					if($num != 0) $sql = $sql . 'and ';
					$sql = $sql . '(`char`.`JName` like "%' . $i . '%" or `char`.`CName` like "%' . $i . '%" or `char`.`nickname` like "%' . $i . '%") ';
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
			$addword = $addword . '`char`.`star` = "'.$stars[$i].'星"';}
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
		
		for($i=0;$i<7;$i++){
			if($type[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`type` = "'.$types[$i].'"';}
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
		echo $sql;
?> 