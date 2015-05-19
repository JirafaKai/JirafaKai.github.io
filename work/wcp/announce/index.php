<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- charactor show page -->

<script type="text/javascript" src="char/js/function.js"></script>

<?php
	if (!empty($_GET['ano'])){
		$ano = $_GET['ano'];
		include('function/mysql_connect_user.php');
		
		$sql = "SELECT * FROM `announce` WHERE aid = '".$ano."'";
		$result = mysql_query($sql) or die('MySQL query error');
		
		if (mysql_num_rows($result)==0)
			echo 'No Data is founded.';
		else{
			$row = mysql_fetch_array($result);
		}
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
					<span class="announce-title"><?php echo $row['aTitle'];?></span>
					<div class="data-show">
						<?php echo $row['aContent'];?>
					</div>
					<br/><span class="float-r announce-time"><?php echo $row['aCreateTime'];?></span>
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