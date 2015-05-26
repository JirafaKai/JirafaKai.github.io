<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- weapon show page -->

<?php

function genType($job){
	if ($job == '劍')
		echo '劍';
	else if ($job == '拳')
		echo '拳套';
	else if ($job == '槍')
		echo '槍';
	else if ($job == '斧')
		echo '斧';
	else if ($job == '弓')
		echo '弓';
	else if ($job == '法')
		echo '法杖';
	else if ($job == '雙刀')
		echo '雙刀';
}
function getDS($ds){
	$tmp = explode('；',$ds);
	foreach ($tmp as $i)
		echo $i.'<br/>';
}
function countStage($wno){
	$count=5;
	$sqlCount = "SELECT * FROM `weapon`,`weaponAttr4`,`weaponAttr5` WHERE weapon.wNo = '" . $wno . "' "
				. "AND weapon.wNo = weaponAttr4.wNo "
				. "AND weapon.wNo = weaponAttr5.wNo ";
	$resultCount = mysql_query($sqlCount) or die('MySQL query error');
	$rowCount = mysql_fetch_array($resultCount);
	if ($rowCount['JName5'] == '-')
		$count = 4;
	if ($rowCount['JName4'] == '-')
		$count = 3;
	return $count;
}
	if (!empty($_GET['a'])){
		$wno = $_GET['a'];
		$stage = $_GET['b'];
		include('function/mysql_connect_user.php');
		
		$sql = "SELECT * FROM `weapon`,`weaponAttr" . $stage . "` WHERE weapon.wNo = '" . $wno . "' "
				. "AND weapon.wNo = weaponAttr". $stage . ".wNo ";
		
		$result = mysql_query($sql) or die('MySQL query error');
		if (mysql_num_rows($result)==0)
			echo 'No Data is founded.';
		else{
			$row = mysql_fetch_array($result);
			$sql2 = 'select `JName`,`job` from `char` where `cNo` = "' . $wno . '"';
			$result2 = mysql_query($sql2);
			$row2 = mysql_fetch_row($result2);
			$cname = explode('　',$row2[0]);
			if($row2[1] == "劍")$bgjob = 'swordman';
			else if($row2[1] == "拳")$bgjob = 'fighter';
			else if($row2[1] == "斧")$bgjob = 'warrior';
			else if($row2[1] == "槍")$bgjob = 'lanser';
			else if($row2[1] == "弓")$bgjob = 'archer';
			else if($row2[1] == "法")$bgjob = 'magician';
			else if($row2[1] == "雙刀")$bgjob = 'crosssaber';
		}
		$count = countStage($wno);
	}
	$imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
	$icon = $imgRoot.'/weapon/icon'.$stage.'/'.$wno.'.png';
?>

<div class="content">
	
	<div class="weapon-show">
		<div class="wrapper-1024 position-r">
			<div class="leftside">
				<?php
						if(mysql_num_rows($result2)==0){
							echo '<div>';
							echo '<img src="img/256x100.gif"/>';
							echo '</div>';
						}
						else {
							echo '<a href="char/'.$wno.'" >';
							echo '<div class="link-02 bg-'.$bgjob.' font-white position-r">';
							echo '<img src="https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s/icon/'.$wno.'.png"/>';
							echo '<div>';
							echo '	<span class="f10 display-b">專屬人物</span>';
							echo '	<span class="f14 font-bold display-b">'.$cname[1].'</span>';
							echo '</div>';
							echo '</div>';
							echo '</a>';
						}
				?>
				<div>
					<img src="img/256x100.gif"/>
				</div>
				<div>
					<img src="img/256x100.gif"/>
				</div>
				<div>
					<img src="img/256x100.gif"/>
				</div>
				<div>
					<img src="img/256x100.gif"/>
				</div>
				
			</div> <!-- leftside -->
			
			<div class="rightside">	
				<div class="weapon-attr">
					<div class="weapon-button-group">
						<a href="http://<?php echo $_SERVER['SERVER_NAME'];?>/weapon/?a=<?php echo $wno;?>&b=1"><div id="a1" class="">一階</div></a><a href="http://<?php echo $_SERVER['SERVER_NAME'];?>/weapon/?a=<?php echo $wno;?>&b=2"><div id="a2" class="">
						二階</div></a><a href="http://<?php echo $_SERVER['SERVER_NAME'];?>/weapon/?a=<?php echo $wno;?>&b=3"><div id="a3" class="">
						三階</div></a><a href="http://<?php echo $_SERVER['SERVER_NAME'];?>/weapon/?a=<?php echo $wno;?>&b=4"><div id="a4" class="" style="<?php if ($count<4) echo 'display:none';?>">
						四階</div></a><a href="http://<?php echo $_SERVER['SERVER_NAME'];?>/weapon/?a=<?php echo $wno;?>&b=5"><div id="a5" class="" style="<?php if ($count<5) echo 'display:none';?>">
						五階</div><a/>
					</div>
					<div class="weapon-board">
						<div class="float-r icon">
							<img src="<?php echo $icon;?>"/>
						</div>
						<div class="main-tag">
							<div class="attr-tag bg-gray-02"><?php echo $row['phase']?></div>
							<div class="attr-tag bg-gray-02"><?php genType($row['job']);?></div>
						</div><br/>
						<div class="weapon-name">
							<span class="f16 font-bold"><?php echo $row['JName'.$stage];?></span>
							<span class="f10">
								<?php
									if ($row['CName'.$stage] != '-')
										echo ' (' . $row['CName'.$stage] . ')';
								?>
							</span>
						</div>
						<div class="table-01">
							<table>
								<tr>
									<td class="t-title">攻擊</td>
									<td class="t-title">防禦</td>
									<td class="t-title">會心</td>
									<td class="t-title">追加</td>
									<td class="t-title">屬性</td>
								</tr>
								<tr>
									<td class="t-content"><?php echo $row['atk'.$stage];?></td>
									<td class="t-content"><?php echo $row['def'.$stage];?></td>
									<td class="t-content"><?php echo $row['cri'.$stage];?></td>
									<td class="t-content"><?php echo $row['add'.$stage];?></td>
									<td class="t-content"><?php echo $row['attr'.$stage];?></td>
								</tr>
							</table>
						</div>
						<div class="table-02">
							<div class="t-title">
								被動技能
							</div>
							<div class="t-content">
								<?php getDS($row['ds'.$stage]);?>
							</div>
						</div>
						<div class="active-skill <?php if ($row['as'.$stage]=='-') echo 'display-n';?>">
							<table>
								<tr>
									<td colspan="1" class="main-title">主動技能</td>
								</tr>
								<tr>
									<td valign="top" class="as-content as-name">
										<span class="font-bold f14 font-red-01"><?php echo $row['as'.$stage];?></span>
										<img class="float-r" src="<?php echo $as1Img;?>"/>
										<br/>
										<div class="as-details">
										<?php echo $row['was'];?>
										</div>
										<span class="sp-span f10 font-green-01">消費SP：<?php echo $row['assp'];?></span>
									</td>
								</tr>
							</table>
						</div>
						<div class="active-skill">
						<table>
							<tr>
								<td class="main-title">進化下一階素材</td>
							</tr>
							<tr>
								<td valign="top" class="as-content">
									<?php $row['material'.$stage.$stage+1];?>
								</td>
							</tr>
						</table>
						</div>
					</div>
				</div> <!-- weapon-attr -->
			</div> <!-- rightside -->
			<div style="clear:both;"></div>
		</div>
	</div> <!-- char-show -->
</div> <!-- conetent-->

<script>
	stage = '<?php echo $_GET['b'];?>';
	aAdd = '#a' + stage;
	$(aAdd).addClass('active');
</script>

<?php include_once(__DIR__ . "/../assets/footer.php"); ?>