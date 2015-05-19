<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- charactor show page -->

<script type="text/javascript" src="char/js/function.js"></script>

<?php
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
	if (!empty($_GET['eno'])){
		$eno = $_GET['eno'];
		include('function/mysql_connect_user.php');
		
		$sql = "SELECT * FROM `event` WHERE aid = '".$eno."'";
		$result = mysql_query($sql) or die('MySQL query error');
		
		if (mysql_num_rows($result)==0)
			echo 'No Data is founded.';
		else{
			$row = mysql_fetch_array($result);
		}
		
		$start = dateAndTime($row['eStart'],'month').'/'.dateAndTime($row['eStart'],'day').' '.dateAndTime($row['eStart'],'hour').'時';
		$end = dateAndTime($row['eEnd'],'month').'/'.dateAndTime($row['eEnd'],'day').' '.dateAndTime($row['eEnd'],'hour').'時';
		$interval = $start . ' - ' . $end;
	}
	else 
	{
		echo 'Invaild request.';
	}
?>
<div style="" class="content">
	
	<div class="announce-show">
		<div class="wrapper-1024 position-r">
			<div class="leftside bg-white">
				<div class="my-content">
					<div class="event-time bg-swordman font-white"><?php echo '開放時間：'.$interval;?></div>
					<span class="announce-title"><?php echo $row['eTitle'];?></span>
					<div class="data-show">
						<?php echo $row['eContent'];?>
					</div>
				</div>
			</div> <!-- leftside -->
			
			<div class="rightside">	
				<div class="adv">
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
					<div><img src="http://localhost/work/wcp/img/400x100.gif"/></div>
				</div>
			</div> <!-- rightside -->
			<div style="clear:both;"></div>
		</div>
	</div> <!-- char-show -->
</div> <!-- conetent-->
<script>
	
</script>

<?php include_once(__DIR__ . "/../assets/footer.php"); ?>