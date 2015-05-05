<?php
	function jobStandFor($job){
		switch ($job){
			case '劍':
				return '劍士';
			case '拳':
				return '格鬥家';
			case '斧':
				return '戰士';
			case '槍':
				return '槍兵';
			case '弓':
				return '弓兵';
			case '法':
				return '魔導士';
			case '雙刀':
				return '雙刀';
			default:
				return '-';
		}
	}
	
	function setDSsEffect($row){
		$dsArr = array($row['ps1'],$row['ps2'],$row['ps3']);
		$dsPreArr = array(1,1,1,1,1);
		$maxArr = array($row['hp100'], $row['sp100'], $row['atk100'], $row['def100'], $row['cri100']);
		$hyperArr = array($row['hpHyper'], $row['spHyper'], $row['atkHyper'], $row['defHyper'], $row['criHyper']);
		$changeFlag = array(0,0,0,0,0);
		//echo '<br/>';
		foreach ($dsArr as $i)
		{
			/* ========== HP ========== */
			if (substr_count($i,'HP+10%')>0){
					$dsPreArr[0]+=.10;
			}
			else if (substr_count($i,'HP+15%')>0){
					$dsPreArr[0]+=.15;
			}
			else if (substr_count($i,'HP+20%')>0){
					$dsPreArr[0]+=.20;
			}
			
			/* ========== SP ========== */
			if (substr_count($i,'SP+10%')>0){
					$dsPreArr[1]+=.10;
			}
			else if (substr_count($i,'SP+15%')>0){
					$dsPreArr[1]+=.15;
			}
			else if (substr_count($i,'SP+20%')>0){
					$dsPreArr[1]+=.20;
			}
			
			/* ========== ATK ========== */
			if (substr_count($i,'攻擊+10%')>0){
					$dsPreArr[2]+=.10;
			}
			else if (substr_count($i,'攻擊+15%')>0){
					$dsPreArr[2]+=.15;
			}
			else if (substr_count($i,'攻擊+20%')>0){
					$dsPreArr[2]+=.20;
			}
			
			/* ========== DEF ========== */
			if (substr_count($i,'防御+10%')>0){
					$dsPreArr[3]+=.10;
			}
			else if (substr_count($i,'防禦+10%')>0){
					$dsPreArr[3]+=.10;
			}
			else if (substr_count($i,'防御+15%')>0){
					$dsPreArr[3]+=.15;
			}
			else if (substr_count($i,'防禦+15%')>0){
					$dsPreArr[3]+=.15;
			}
			else if (substr_count($i,'防御+20%')>0){
					$dsPreArr[3]+=.20;
			}
			else if (substr_count($i,'防禦+20%')>0){
					$dsPreArr[3]+=.20;
			}
			
			/* ========== CRI ========== */
			if (substr_count($i,'會心+10%')>0){
					$dsPreArr[4]+=.10;
			}
			else if (substr_count($i,'會心+15%')>0){
					$dsPreArr[4]+=.15;
			}
			else if (substr_count($i,'會心+20%')>0){
					$dsPreArr[4]+=.20;
			}
		}
		
		for ($i=0; $i<5; $i++)
		{
			$maxArr[$i]=$maxArr[$i]*$dsPreArr[$i];
			if (substr_count($maxArr[$i], '.')>0)
				$maxArr[$i]=floor($maxArr[$i]);
			$hyperArr[$i]=$hyperArr[$i]*$dsPreArr[$i];
			if (substr_count($hyperArr[$i], '.')>0)
				$hyperArr[$i]=floor($hyperArr[$i]);
			if ($dsPreArr[$i] > 1)
				$changeFlag[$i] = 1;
		}
		//print_r($changeFlag);
		
		return array($changeFlag, $maxArr, $hyperArr);
	}
	
	function printDSsEffect($arr, $key, $type){
		if ($arr[0][0] == 1){
			if ($key == 'max' && $type == 'hp')
				echo ' ('.$arr[1][0].')';
			if ($key == 'hyper' && $type == 'hp')
				echo ' ('.$arr[2][0].')';
		}
		if ($arr[0][1] == 1){
			if ($key == 'max' && $type == 'sp')
				echo ' ('.$arr[1][1].')';
			if ($key == 'hyper' && $type == 'sp')
				echo ' ('.$arr[2][1].')';
		}
		if ($arr[0][2] == 1){
			if ($key == 'max' && $type == 'atk')
				echo ' ('.$arr[1][2].')';
			if ($key == 'hyper' && $type == 'atk')
				echo ' ('.$arr[2][2].')';
		}
		if ($arr[0][3] == 1){
			if ($key == 'max' && $type == 'def')
				echo ' ('.$arr[1][3].')';
			if ($key == 'hyper' && $type == 'def')
				echo ' ('.$arr[2][3].')';
		}
		if ($arr[0][4] == 1){
			if ($key == 'max' && $type == 'cri')
				echo ' ('.$arr[1][4].')';
			if ($key == 'hyper' && $type == 'cri')
				echo ' ('.$arr[2][4].')';
		}
	}
	
?>