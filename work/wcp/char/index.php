<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- charactor show page -->

<script type="text/javascript" src="char/js/function.js"></script>

<?php
	include("function/function.php");
	if (!empty($_GET['cno'])){
		$cno = $_GET['cno'];
		include('function/mysql_connect_user.php');
		
		$cnoOriginal = urlMaker($cno, 'original');
		$cnoArused = urlMaker($cno, 'arused');
		$sql = "SELECT * FROM `char`,`charattrbase`,`charattr100`,`charattrhyper`,`passiveSkill`,`leaderSkill` "
				. "WHERE char.cNo = '" . $cno . "' "
				. "AND charattrbase.cNo = char.cNo "
				. "AND charattr100.cNo = char.cNo "
				. "AND charattrhyper.cNo = char.cNo "
				. "AND leaderSkill.cNo = char.cNo "
				. "AND passiveSkill.cNo = char.cNo";
		
		$result = mysql_query($sql) or die('MySQL query error');
		
		
		$sqlAS = "SELECT * FROM `activeSkill` WHERE activeSkill.cNo = '" . $cno ."'";
		$resultAS = mysql_query($sqlAS);
		
		$asArr = array();
		$asArr[0] = mysql_fetch_array($resultAS);
		$asArr[1] = mysql_fetch_array($resultAS);
		
		if (mysql_num_rows($result)==0)
			echo 'No Data is founded.';
		else{
			$row = mysql_fetch_array($result);
			//echo $row['cNo'] . '<br/>';
		}
		$JName = explode('　', $row['JName']);
		if ($row['CName'] != '-')
			$CName = explode('　', $row['CName']);
		else{
			$CName[0] = '台版暫無';
			$CName[1] = '-';
		}
		$DSsEffect=setDSsEffect($row);
		
		$jobColor = jobColor($row['job']);
		
		echo "<script language='javascript'>$(document).ready(function(){initSPR('".$row['job']."')});</script>";
		$imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
		$arusedImg = $imgRoot . '/arused/' . $cnoOriginal . '.jpg';
		$img2d = $imgRoot . '/img2d/' . $cnoOriginal .'.png';
		$img3d = $imgRoot . '/img3d/' . $cnoOriginal .'.png';
		$as1Img = $imgRoot . '/as1/' . $cno .'.gif';
		$as2Img = $imgRoot . '/as2/' . $cno .'.gif';
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
					<img id="img-2d" class="img-2d display-b" src="<?php echo $img2d;?>"/>
					<img id="img-3d" class="img-3d display-n" src="<?php echo $img3d;?>"/>
					<img id="img-arused" class="img-arused display-n" src="<?php echo $arusedImg;?>"/>
				</div>
				<div class="img-button-group">
					<div onclick="javascript:imgHandler(this.id)" class="active" id="b2d">2D圖</div><div onclick="javascript:imgHandler(this.id)" class="" id="b3d">
					3D圖</div><div onclick="javascript:imgHandler(this.id)" class="" id="barused">
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
					<div class="link-01 bg-gray-02">
						<a class="font-white f14" href=<?php echo "weapon/?a=$cno&b=1"?>><div>專武</div></a>
					</div>
				</div>
			</div> <!-- leftside -->
			
			<div class="rightside">	
				<div class="char-attr">
					<div class="ganki-button-group">
						<a href="/char/<?php echo urlMaker($cno,'original');?>"><div id="before" class="">神氣前</div></a><a style="<?php displayArused($cnoArused);?>" href="/char/<?php echo urlMaker($cno,'arused');?>"><div id="after" class="">
						神氣後</div></a>
					</div>
					<div class="char-sub-attr">
						<div class="char-Name <?php echo $jobColor;?>">
							<span class="title"><?php echo $JName[0];?></span><br/>
							<span class="name"><?php echo $JName[1];?></span>
						</div><div class="char-Name char-CName <?php echo $jobColor;?>">
							<span class="title"><?php echo $CName[0];?></span><br/>
							<span class="name"><?php echo $CName[1];?></span>
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
									<?php echo $row['star'];?>
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
								<span class="font-bold font-red-01">
									<?php echo $row['JName1LS']?>
									<?php if ($row['CName1LS'] != '-')
											echo '('.$row['CName1LS'].')';?>
								</span><br/>
								<span><?php echo $row['effect1LS'];?></span>
								<?php if ($row['JName2LS'] != '-'){
								echo '<br/><br/>';
								echo '<span class="font-bold font-red-01">';
									echo $row['JName2LS'];
									if ($row['CName2LS'] != '-')
										echo '('.$row['CName2LS'].')';
								echo '</span><br/>';
								echo '<span>'.$row['effect2LS'].'</span>';
								}?>
							</div>
						</div>
						<div class="passive-skill">
							<div class="ps-title">
								被動技能
							</div>
							<div class="ps-content">
								<?php echo $row['ps1'];?><br/>
								<?php echo $row['ps2'];?>
								<?php if($row['ps3'] != '-'){
									echo '<br/>';
									echo $row['ps3'];}?>
							</div>
						</div>
						<div class="active-skill">
							<table>
								<tr>
									<td colspan="1" class="main-title">主動技能</td>
								</tr>
								<tr>
									<td valign="top" class="as-content as-name">
										<span class="font-bold f14 font-red-01"><?php echo $asArr[0]['JNameAS'];?></span>
										<?php 
											if ($asArr[0]['CNameAS'] != '-')
												echo '<span class="font-bold font-red-01"> ('.$asArr[0]['CNameAS'] .')</span>';?>
										<img class="float-r" src="<?php echo $as1Img;?>"/>
										<br/>
										<div class="as-details">
										<?php echo $asArr[0]['commentAS'];?>
										<br/>
										<?php echo $asArr[0]['details'];?>
										</div>
										<span class="sp-span f10 font-green-01">消費SP：<?php echo $asArr[0]['spAS'];?></span>
									</td>
								</tr>
								<tr>
									<td valign="top" class="as-content as-name">
										<span class="font-bold f14 font-red-01"><?php echo $asArr[1]['JNameAS'];?></span>
										<?php 
											if ($asArr[1]['CNameAS'] != '-')
												echo '<span class="font-bold font-red-01"> ('.$asArr[1]['CNameAS'] .')</span>';?>
										<img class="float-r" src="<?php echo $as2Img;?>"/>
										<br/>
										<div class="as-details">
										<?php echo $asArr[1]['commentAS'];?>
										<br/>
										<?php echo $asArr[1]['details'];?>
										</div>
										<span class="sp-span f10 font-green-01">消費SP：<?php echo $asArr[1]['spAS'];?></span>
									</td>
								</tr>
							</table>
						</div>
						<div class="SPR">
							<table>
								<tr>
									<td colspan="6" class="main-title">SP回復量</td>
								</tr>
								<tr>
									<td class="row-title"></td>
									<td class="col-title">SP</td>
									<td class="col-title">建築加成 (%)</td>
									<td class="col-title">武器加成 (%)</td>
									<td class="col-title">加成後SP</td>
									<td class="col-title">SP回復量</td>
								</tr>
								<tr>
									<td class="row-title">0突</td>
									<td id="sp100" class="spr-content"><?php printDSsEffect($DSsEffect,'0','spr')?></td>
									<td class="spr-content">
										<input id="spr00" class="city-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" value="0">
									</td>
									<td class="spr-content">
										<input id="spr01" class="weapon-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" max="5" value="0">
									</td>
									<td id="sp00" class="spr-content"></td>
									<td id="spr02" class="spr-content"></td>
								</tr>
								<tr>
									<td class="row-title">1突</td>
									<td id="sp1" class="spr-content"><?php echo $row['sp1'];?></td>
									<td class="spr-content">
										<input id="spr10" class="city-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" value="0">
									</td>
									<td class="spr-content">
										<input id="spr11" class="weapon-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" max="5" value="0">
									</td>
									<td id="sp10" class="spr-content"></td>
									<td id="spr12" class="spr-content"></td>
								</tr>
								<tr>
									<td class="row-title">2突</td>
									<td id="sp2" class="spr-content"><?php echo $row['sp2'];?></td>
									<td class="spr-content">
										<input id="spr20" class="city-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" value="0">
									</td>
									<td class="spr-content">
										<input id="spr21" class="weapon-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" max="5" value="0">
									</td>
									<td id="sp20" class="spr-content"></td>
									<td id="spr22" class="spr-content"></td>
								</tr>
								<tr>
									<td class="row-title">3突</td>
									<td id="sp3" class="spr-content"><?php echo $row['sp3'];?></td>
									<td class="spr-content">
										<input id="spr30" class="city-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" value="0">
									</td>
									<td class="spr-content">
										<input id="spr31" class="weapon-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" max="5" value="0">
									</td>
									<td id="sp30" class="spr-content"></td>
									<td id="spr32" class="spr-content"></td>
								</tr>
								<tr>
									<td class="row-title">4突</td>
									<td id="spHyper" class="spr-content"><?php printDSsEffect($DSsEffect,'4','spr')?></td>
									<td class="spr-content">
										<input id="spr40" class="city-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" value="0">
									</td>
									<td class="spr-content">
										<input id="spr41" class="weapon-add" onchange="sprHandler(this.id,'<?php echo $row['job']?>')" type="number" min="0" max="5" value="0">
									</td>
									<td id="sp40" class="spr-content"></td>
									<td id="spr42" class="spr-content"></td>
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
<script>
	cno = <?php echo urlMaker($_GET['cno'],'what');?>;
	if (cno)
		$('#after').addClass('active');
	else
		$('#before').addClass('active');
</script>

<?php include_once(__DIR__ . "/../assets/footer.php"); ?>