<?php include_once(__DIR__ . "/header.php"); ?>
<!-- charactor search page -->
	
<div class="content">
	<div class="wrapper-1024 position-r">
		<div class="char-section-1">
			<span id="data-title" class="title-01 font-blue-01 border-blue-01">Root</span><br /><br />
			<form action="root/aedit.php" method="post" id="announce">
				<input type="text" value="0" name="edit" style="display:none;"/>
				<button class="button button-01 bg-blue-01" onclick="myasubmit()">announce</button>
			</form>
		</div> <!-- section-1 -->
	</div>
	<div class="char-section-2">

	</div> <!-- section-2 -->
	
</div> <!-- conetent-->

<?php include_once(__DIR__ . "/footer.php"); ?>