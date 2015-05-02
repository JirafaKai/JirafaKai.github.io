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
		if($check == true){$sql = $sql . $addword . ') ';$ocheck=$check;}
		
		$check = $ocheck;
		if($check == true){$addword = 'and (';$check = false;}
		else $addword = ' (';
		
		for($i=0;$i<2;$i++){
			if($cate[$i] == '1'){
			if($check == true) $addword = $addword .' or ';
			$check = true;
			$addword = $addword . '`categorg` like "%'.$cates[$i].'%"';}
		}
		if($check == true){$sql = $sql . $addword . ') ';$ocheck=$check;}
		
		$myre = array();
		$word = array();
		$result = mysql_query($sql);
		$word = array();
		while($row = @mysql_fetch_row($result)){
			foreach($row as $data1) array_push($word,$data1);
			$sql = 'select * from `charattrbase` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			$sql = 'select * from `charattr100` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			$sql = 'select * from `charattrhyper` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			$sql = 'select * from `leaderskill` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			$sql = 'select * from `activeskill` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			$sql = 'select * from `passiveskill` where `cNo` = "'.$row[0].'"';
			$result2 = mysql_query($sql);
			while($row2 = @mysql_fetch_row($result2)){
				foreach($row2 as $data2) array_push($word,$data2);
			}
			array_push($myre,$word);
			unset($word);
			$word = array();
		}
		echo json_encode($myre);
?> 