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
					$sql = $sql . '(`JName` like "%' . $i . '%" or `CName` like "%' . $i . '%" or `nickname` like "%' . $i . '%") ';
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
		$sql = $sql . ' ORDER BY `char`.`job` ASC';
		$result = mysql_query($sql);
		$myre = array();
		$word = array();
		if(mysql_num_rows($result) == 1)$check = true;else $check = false;
		
		$word = array();
		while($row = @mysql_fetch_row($result)){
			foreach($row as $data) array_push($word,$data);
			if($check == true){
			$sql = 'select `CName`,`star`,`type`,`job`,`phase`,`hpBase`,`spBase`,`atkBase`,`defBase`,`criBase`,`hp100`,`sp100`,`atk100`,`def100`,`cri100`,`hpHyper`,`spHyper`,`atkHyper`,`defHyper`,`criHyper`,`JName1LS`,`JName2LS`,`ps1`,`ps2`,`ps3` from `char`,`charattrbase`,`charattr100`,`charattrhyper`,`leaderskill`,`passiveskill` where 
			`char`.`cNo` = "'.$row[0].'" and 
			`charattrbase`.`cNo` = "'.$row[0].'" and  `charattr100`.`cNo` = "'.$row[0].'" and  `charattrhyper`.`cNo` = "'.$row[0].'" and  `leaderskill`.`cNo` = "'.$row[0].'" and  `passiveskill`.`cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			$row2 = @mysql_fetch_row($result2);
			foreach($row2 as $data2)array_push($word,$data2);
			$sql = 'select `JNameAS`,`spAS` from `activeskill` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2)array_push($word,$data2);
			}}
			
			array_push($myre,$word);
			unset($word);
			$word = array();
		}
		echo json_encode($myre);
?> 