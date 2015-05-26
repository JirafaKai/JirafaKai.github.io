<?php include_once(__DIR__ . "/assets/header.php"); ?>
<?php
	include('char/function/mysql_connect_user.php');
function showWhere1($arr){
	$imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
	foreach ($arr as $i){
		$img = $imgRoot . '/icon/' . $i['cno'] . '.png';
		echo '<a href="http://'.$_SERVER['SERVER_NAME'].'/char/' . $i['cno'] . '"><img src="' . $img . '" title="' . $i['JName'].'"/></a>';
		//echo $img;
	}
}
function time2string($second){
    $day = floor($second/(3600*24));
    $second = $second%(3600*24);
    $hour = floor($second/3600);
    $second = $second%3600;
    $minute = floor($second/60);
    $second = $second%60;
    return '剩餘'.$day.'天'.$hour.'小時'.$minute.'分結束';
}
function dateAndTime($input, $oType){
	$tmp = explode(' ',$input);
	$date = $tmp[0];
	$time = $tmp[1];
	
	$tmp = explode('-',$date);
	$year = $tmp[0];
	$month = $tmp[1];
	$day = $tmp[2];
	
	$tmp = explode(':',$time);
	$hour = $tmp[0];
	$minute = $tmp[1];
	$second = $tmp[2];
	
	if ($oType == 'date')
		return $date;
	else if ($oType == 'time')
		return $time;
	else if ($oType == 'year')
		return $year;
	else if ($oType == 'month')
		return $month;
	else if ($oType == 'day')
		return $day;
	else if ($oType == 'hour')
		return $hour;
	else if ($oType == 'minute')
		return $minute;
	else if ($oType == 'second')
		return $second;
}
function showAnnounce($arr){
	foreach ($arr as $i){
		$month = dateAndTime($i['aCreateTime'],'month');
		$day = dateAndTime($i['aCreateTime'],'day');
		echo '<div>
				<a class="a-01" href="http://'.$_SERVER['SERVER_NAME'].'/announce/'.$i['aid'].'">'.$i['aTitle'].'</a>
				<span class="date-01">'.$month.'/'.$day.'</span>
			</div>';
	}	
}
function showEvent($arr){
	foreach ($arr as $i){
		$start = $i['eStart'];
		$end = $i['eEnd'];
		$endTime = dateAndTime($start, 'month').'/'.dateAndTime($start,'day').' ~ '. dateAndTime($end,'month').'/'.dateAndTime($end,'day');
		
		$time1 = strtotime($end);
		$time2 = strtotime(date('Y-m-d G:i:s'));
		$restTime = time2string($time1 - $time2);
		
		echo '<a href="http://'.$_SERVER['SERVER_NAME'].'/event/'.$i['aid'].'">
				<div title="'.$i['eTitle'].'">
					<img src="img/event-icon.png"/>
					<span class="end-time">'.$endTime.'</span><br/>
					<span class="rest-time">'.$restTime.'</span>
				</div>
			</a>';
	}
}
	$sqlEvent = "SELECT * FROM `event` WHERE eEnd > NOW() ORDER BY eEnd ASC";
	$sql = "SELECT cno,JName FROM `char` WHERE showWhere = 1";
	$sql2 = "SELECT cno,JName FROM `char` WHERE showWhere = 2";
	$sqlAnnounce = "SELECT * FROM `announce` ORDER BY aCreateTime DESC LIMIT 8";
	
	$resultEvent = mysql_query($sqlEvent);
	$result = mysql_query($sql);
	$result2 = mysql_query($sql2);
	$resultAnnounce = mysql_query($sqlAnnounce);
	
	$i = 0;
	$arrShow = array();
	while ($row =  mysql_fetch_array($result)){
		$arrShow[$i] = $row;
		$i++;
	}
	
	$i = 0;
	$arrShow2 = array();
	while ($row =  mysql_fetch_array($result2)){
		$arrShow2[$i] = $row;
		$i++;
	}
	$i=0;
	$arrEvent = array();
	while ($row = mysql_fetch_array($resultEvent)){
		$arrEvent[$i] = $row;
		$i++;
	}
	
	$i=0;
	$arrAnnounce = array();
	while ($row = mysql_fetch_array($resultAnnounce)){
		$arrAnnounce[$i] = $row;
		$i++;
	}
?>
<div class="content">

<div class="index-section-1 bg-white">
	<div class="wrapper-1024 position-r float-l">
		<div class="index-section-1-1">
			<span class="title-01 font-blue-01 border-blue-01">遊戲公告</span>
			<div class="headline display-n">
				<div class="headline-tooltip-02">
					<a href="#"><img class="headline-img" src="img/headline-2.jpg"/></a>
					<div class="headline-tooltip-content">
						<div class="headline-tooltip-title">headline-title</div>
						<div class="headline-tooltip-text">headline-contentheadline-contentheadline-contentheadline-content</div>
					</div>
				</div>
				<div class="headline-tooltip-02">
					<a href="#"><img class="headline-img" src="img/headline-3.jpg"/></a>
					<div class="headline-tooltip-content">
						<div class="headline-tooltip-title">headline-title</div>
						<div class="headline-tooltip-text">headline-contentheadline-contentheadline-contentheadline-content</div>
					</div>
				</div>
			</div> <!-- headline -->
			
			<div class="announce-group-01">
				<?php showAnnounce($arrAnnounce);?>
			</div>
		</div> <!-- section-1-1 -->
		
		<div class="index-section-1-2">
			<span id="data-title" class="title-01 font-blue-01 border-blue-01">當期轉蛋</span>
			<div onclick="dataHandler(this.id)" title="當期角色" id="char-icon" class="icon-button bg-gray-01 active"></div>
			<div onclick="dataHandler(this.id)"title="當期限定" id="weapon-icon" class="icon-button bg-gray-01"></div>
			<div class="icon-group" id="char-data">
				<?php showWhere1($arrShow); ?>
			</div>
			<div class="icon-group" id="weapon-data">
				<?php showWhere1($arrShow2); ?>
			</div>
			<div class="announce-group-02 display-n">
				<span class="title-01 font-blue-01 border-blue-01">站內更新</span>
				<div class="icon-group-02">
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
					<img title="Name" src="img/icon-41x41.png"/>
				</div>
			</div>
		</div> <!-- section-1-2 -->
	</div>
</div>

<div class="index-section-2 bg-blue-02">
	<div class="wrapper-1024 position-r">
		<div class="index-section-2-1">
			<div class="css-table css-table-01">
				<div class="css-title bg-yellow-01">
					活動時間表
				</div>
				<div class="css-tbody table-hover-01">
					<?php showEvent($arrEvent); ?>
				</div>
			</div>
		</div>
		<div class="index-section-2-2">
			<img src="img/400x100.gif"/>
			<img src="img/400x100.gif"/>
			<img src="img/400x100.gif"/>
		</div> 
	</div> <!-- wrapper-1024 -->
</div> <!-- index-section-2-->

</div> <!-- conetent-->
<script>
	$('#weapon-data').hide();
	
function dataHandler(bid){
	if (bid == 'char-icon'){
		$('#weapon-data').hide();
		$('#char-data').fadeIn();
		$('#weapon-icon').removeClass('active');
		$('#char-icon').addClass('active');
		$('#data-title').html('當期轉蛋');
	}
	else if (bid == 'weapon-icon'){
		$('#weapon-data').fadeIn();
		$('#char-data').hide();
		$('#char-icon').removeClass('active');
		$('#weapon-icon').addClass('active');
		$('#data-title').html('限定轉蛋');
	}
}
</script>

<?php include_once(__DIR__ . "/assets/footer.php"); ?>