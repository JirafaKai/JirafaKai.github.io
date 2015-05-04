<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- charactor show page -->

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
	
	
	if (!empty($_GET['cno'])){
		$cno = $_GET['cno'];
		include('function/mysql_connect_user.php');
		
		$sql = "SELECT * FROM `char`,`charattrbase`,`charattr100`,`charattrhyper`,`passiveSkill` "
				. "WHERE char.cNo = '" . $cno . "' "
				. "AND charattrbase.cNo = char.cNo "
				. "AND charattr100.cNo = char.cNo "
				. "AND charattrhyper.cNo = char.cNo "
				. "AND passiveSkill.cNo = char.cNo";
		$result = mysql_query($sql) or die('MySQL query error');
		
		if (mysql_num_rows($result)==0)
			echo 'No Data is founded.';
		else{
			$row = mysql_fetch_array($result);
			echo $row['cNo'] . '<br/>';
		}
		$JName = explode('　', $row['JName']);
		$CName = explode('　', $row['CName']);
		$DSsEffect=setDSsEffect($row);
	}
	else 
	{
		echo 'Invaild request.';
	}

?>

<div style="" class="content">
	
	<div class="char-show">
		<div class="wrapper-1024 position-r">
			<div class="leftside">
				<div class="char-img bg-white">
					<img style="display:block" class="img-2d" src="<?php echo $row['img2d'];?>"/>
					<img style="display:none" class="img-3d" src="<?php echo $row['img3d'];?>"/>
					<img style="display:none" class="img-arused" src="http://pic3.mofang.com/2014/0926/20140926061510799.jpg"/>
				</div>
				<div class="img-button-group">
					<div class="active" id="b2d">2D圖</div><div class="" id="b3d">
					3D圖</div><div class="" id="barused">
					覺醒圖</div>
				</div>			
				<div class="char-comment position-r">
					<div class="comment-01 bg-green-01">
						<span>網友評分</span><br/>
						<span class="f24">7.5</span>
					</div>
					<div class="comment-02 bg-green-01">
						<span>清雜魚</span>
						<span>7.5</span><br/>
						<span>殺頭目</span>
						<span>7.5</span><br/>
						<span>幫協力</span>
						<span>7.5</span><br/>
					</div>
					<div class="vote f14">
						<div>
							我要<br/>投票
						</div>
					</div>
				</div>
				<div class="char-comment-02">
					<div>
						<div class="sorce"><span class="bg-green-01">8.5</span></div>
						<div class="c-content">texttexttexttexttexttext</div>
					</div>
					<div>
						<div class="sorce"><span class="bg-yellow-01">8.5</span></div>
						<div class="c-content">texttexttexttexttexttext</div>
					</div>
					<div>
						<div class="sorce"><span class="bg-red-01">8.5</span></div>
						<div class="c-content">texttexttexttexttexttext</div>
					</div>
					<div class="more-sorce font-blue-01">
						<span>▼</span>
					</div>
				</div>
				<div class="link-block">
					<div class="link-01 bg-gray-02 font-white f14">
						<div>專武</div>
					</div>
				</div>
			</div> <!-- leftside -->
			
			<div class="rightside">	
				<div class="char-attr">
					<div class="ganki-button-group">
						<div class="active">神氣前</div><div class="">
						神氣後</div>
					</div>
					<div class="char-sub-attr">
						<div class="char-Name bg-magician">
							<span class="title"><?php echo $JName[0];?></span><br/>
							<span class="name"><?php echo $JName[1];?></span>
						</div><div class="char-Name char-CName bg-magician">
							<span class="title">台譯稱號</span><br/>
							<span class="name">台譯名稱</span>
						</div>
						<div class="char-sub-info">
							<div class="char-phase bg-gray-02">
								<?php echo $row['phase'];?>
							</div>
							<div class="char-job bg-gray-02">
								<?php echo jobStandFor($row['job']);?>
							</div>
						</div>
						<div class="char-main-info">
							<div class="tag-of-2">
								<div>
									型態
								</div>
								<div>
									<?php echo $row['type'];?>
								</div>
							</div>
							<div class="tag-of-2">
								<div>
									稀有度
								</div>
								<div>
									<?php echo $row['star'].'星';?>
								</div>
							</div>
							<div class="tag-of-2">
								<div style="font-size:10px;">
									COST<br/>(覺醒前/後)
								</div>
								<div>
									<?php echo $row['costBefore'].'/'.$row['costAfter'];?>
								</div>
							</div>
							<div class="tag-of-2">
								<div>
									配音
								</div>
								<div>
									<?php echo $row['CV'];?>
								</div>
							</div>
						</div>
						<div class="char-attr-table">
							<table>
							<tr>
								<td class="title"></td>
								<td class="title">HP</td>
								<td class="title">SP</td>
								<td class="title">攻擊</td>
								<td class="title">防禦</td>
								<td class="title">會心</td>
							</tr>
							<tr>
								<td class="title">初期</td>
								<td><?php echo $row['hpBase'];?></td>
								<td><?php echo $row['spBase'];?></td>
								<td><?php echo $row['atkBase'];?></td>
								<td><?php echo $row['defBase'];?></td>
								<td><?php echo $row['criBase'];?></td>
							</tr>
							<tr>
								<td class="title">Lv.100</td>
								<td><?php echo $row['hp100'];?><?php printDSsEffect($DSsEffect,'max','hp')?></td>
								<td><?php echo $row['sp100'];?><?php printDSsEffect($DSsEffect,'max','sp')?></td>
								<td><?php echo $row['atk100'];?><?php printDSsEffect($DSsEffect,'max','atk')?></td>
								<td><?php echo $row['def100'];?><?php printDSsEffect($DSsEffect,'max','def')?></td>
								<td><?php echo $row['cri100'];?><?php printDSsEffect($DSsEffect,'max','cri')?></td>
							</tr>
							<tr>
								<td class="title">Lv.100四突</td>
								<td><?php echo $row['hpHyper'];?><?php printDSsEffect($DSsEffect,'hyper','hp')?></td>
								<td><?php echo $row['spHyper'];?><?php printDSsEffect($DSsEffect,'hyper','sp')?></td>
								<td><?php echo $row['atkHyper'];?><?php printDSsEffect($DSsEffect,'hyper','atk')?></td>
								<td><?php echo $row['defHyper'];?><?php printDSsEffect($DSsEffect,'hyper','def')?></td>
								<td><?php echo $row['criHyper'];?><?php printDSsEffect($DSsEffect,'hyper','cri')?></td>
							</tr>
						</table>
						</div>
						<div class="leader-skill">
							<div class="ls-title">
								隊長技能
							</div>
							<div class="ls-content">
								<span class="font-red-01">全力魔法(魔法力量全開)</span><br/>
								<span>法師傷害增加(中)<br/>倍率1.1倍</span>
							</div>
							<div class="ls-content">
								<span class="font-red-01">全力魔法(魔法力量全開)</span><br/>
								<span>sth.</span>
							</div>
						</div>
						<div class="passive-skill">
							<div class="ps-title">
								被動技能
							</div>
							<div class="ps-content">
								<?php echo $row['ps1'];?><br/>
								<?php echo $row['ps2'];?><br/>
								<?php echo $row['ps3'];?>
							</div>
						</div>
						<div class="active-skill">
							<table>
								<tr>
									<td colspan="3" class="main-title">主動技能</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">原名</td>
									<td valign="top" class="as-content as-name font-red-01">原名</td>
									<td valign="top" class="as-content as-name font-red-01">原名</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">台譯</td>
									<td valign="top" class="as-content font-red-01">神聖的聖殿</td>
									<td valign="top" class="as-content font-red-01">-</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">SP消耗</td>
									<td valign="top" class="as-content">30</td>
									<td valign="top" class="as-content">55</td>
								</tr>	
								<tr>
									<td valign="top" class="as-title">倍率</td>
									<td valign="top" class="as-content">回復攻擊值的45%</td>
									<td valign="top" class="as-content">15倍</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">段數</td>
									<td valign="top" class="as-content">-</td>
									<td valign="top" class="as-content">3</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">屬性傷害</td>
									<td valign="top" class="as-content">-</td>
									<td valign="top" class="as-content">-</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">施放時間</td>
									<td valign="top" class="as-content">中</td>
									<td valign="top" class="as-content">長</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">範圍</td>
									<td valign="top" class="as-content">自身大範圍</td>
									<td valign="top" class="as-content">前方直線中範圍</td>
								</tr>
								<tr>
									<td valign="top" class="as-title">持續增益</td>
									<td valign="top" class="as-content">全體防禦+50%，持續10秒</td>
									<td valign="top" class="as-content">-</td>
								</tr>
							</table>
						</div>
						<div class="SPR">
							<table>
								<tr>
									<td colspan="5" class="main-title">SP回復量</td>
								</tr>
								<tr>
									<td class="row-title"></td>
									<td class="col-title">SP</td>
									<td class="col-title">建築加成</td>
									<td class="col-title">武器加成</td>
									<td class="col-title">最大SPR</td>
								</tr>
								<tr>
									<td class="row-title">0突</td>
									<td class="spr-content">123</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">123</td>
								</tr>
								<tr>
									<td class="row-title">1突</td>
									<td class="spr-content">123</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">123</td>
								</tr>
								<tr>
									<td class="row-title">2突</td>
									<td class="spr-content">123</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">123</td>
								</tr>
								<tr>
									<td class="row-title">3突</td>
									<td class="spr-content">123</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">123</td>
								</tr>
								<tr>
									<td class="row-title">4突</td>
									<td class="spr-content">123</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">
										<input name="a" type="number" min="0" max="15" value="10">
									</td>
									<td class="spr-content">123</td>
								</tr>
							</table>
						</div>
					</div>
				</div> <!-- char-attr -->
			</div> <!-- rightside -->
			<div style="clear:both;"></div>
		</div>
	</div> <!-- char-show -->
</div> <!-- conetent-->
<script type="text/javascript" src="char/function/function.js"></script>


<?php include_once(__DIR__ . "/../assets/footer.php"); ?>