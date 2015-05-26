<?php include_once(__DIR__ . "/header.php"); ?>
<!-- charactor search page -->

<script src="root/function.js"></script>	
<div class="content">
	<div class="wrapper-1024 position-r">
		<div class="char-section-1">
		<span id="data-title" class="title-01 font-blue-01 border-blue-01">Event List</span>
		<div class="link-block" style="width:100px;float:right;padding:0;margin:0;"><div class="link-01 bg-gray-02" style="height:30px">
		<a class="font-white f14" style="line-height:30px;"href="root/eedit.php">新增</a></div></div><br /><br />
		<div class="char-sub-attr">
		</div>
		</div> <!-- section-1 -->
		<div class="char-section-2">
		</div>
	</div>
	
</div> <!-- conetent-->

<script>
	var myevent = [];
	var check = 0;
	searchejax();
</script>

<?php include_once(__DIR__ . "/footer.php"); ?>