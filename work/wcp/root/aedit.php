<?php include_once(__DIR__ . "/header.php"); ?>
<!-- charactor search page -->
<?php
	$edit = $_POST['edit'];
	if($edit == 0){
		echo '<div class="content">';
		echo '<div class="wrapper-1024 position-r">';
		echo '<div class="char-section-1">';
		echo '<span id="data-title" class="title-01 font-blue-01 border-blue-01">Announce Edit</span><br /><br />';
		echo '<form action="root/function/post.php" method="post" target="_blank" id="announce">';
		echo '<input type="text" value="" placeholder="ID" class="search-input" name="id"/>';
		echo '<input type="text" value="" placeholder="Title" class="search-input" name="title"/>';
		echo '<button class="button button-01 bg-blue-01" onclick="myasubmit()">提交</button>';
		echo '<textarea name="editor1" id="editor1" rows="10" cols="80">';
		echo '</textarea>';
		echo '<script>';
		echo 'CKEDITOR.replace( "editor1",{customConfig: "ckeditor/config.js",width:800,height:300});';
		echo '</script>';
		echo '</form>';
		echo '</div> <!-- section-1 -->';
		echo '</div>';
		echo '<div class="char-section-2">';
		echo '</div> <!-- section-2 -->';
		echo '</div> <!-- conetent-->';
	}
?>
<?php include_once(__DIR__ . "/footer.php"); ?>