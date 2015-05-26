<?php include_once(__DIR__ . "/header.php"); ?>
<!-- charactor search page -->

<?php
	if(isset($_POST['id'])){
		$aid = $_POST['id'];
		include('function/mysql_connect.php');
		$sql = 'select * from `event` where `aid` = "'.$aid.'"';
		$result = mysql_query($sql);
		$row = @mysql_fetch_row($result);
		echo '<div class="content">';
		echo '<div class="wrapper-1024 position-r">';
		echo '<div class="char-section-1">';
		echo '<span class="title-01 font-blue-01 border-blue-01">Event Edit</span>';
		echo '<div style="width:200px;float:right;"><div class="link-block"><div class="link-01 bg-gray-02"><a class="font-white f14" href="root/elist.php"><div>Back</div></a></div></div></div><br /><br />';
		echo '<form action="root/function/eupdate.php" method="post" target="_blank" id="edit">';
		echo '<input type="text" value="'.$row[0].'" placeholder="ID" class="search-input" name="id"/>';
		echo '<input type="text" value="'.$row[0].'" name="oid" style="display:none;"/>';
		echo '<input type="text" value="'.$row[3].'" placeholder="Title" class="search-input" name="title"/><br/>';
		echo '<input type="text" value="'.$row[1].'" placeholder="StartTime" class="search-input" name="start"/>';
		echo '<input type="text" value="'.$row[2].'" placeholder="EndTime" class="search-input" name="end"/>';
		echo '<button class="button button-01 bg-blue-01">提交</button>';
		echo '<textarea name="editor1" id="editor1" rows="10" cols="80">';
		echo $row[4].'</textarea>';
		echo '<script>';
		echo 'CKEDITOR.replace( "editor1",{customConfig: "ckeditor/config.js",width:800,height:300});';
		echo '</script>';
		echo '</form>';
		echo '</div> <!-- section-1 -->';
		echo '</div>';
		echo '</div> <!-- conetent-->';
	}
	else {
		echo '<div class="content">';
		echo '<div class="wrapper-1024 position-r">';
		echo '<div class="char-section-1">';
		echo '<span class="title-01 font-blue-01 border-blue-01">Event Edit</span>';
		echo '<div style="width:200px;float:right;"><div class="link-block"><div class="link-01 bg-gray-02"><a class="font-white f14" href="root/elist.php"><div>Back</div></a></div></div></div><br /><br />';
		echo '<form action="root/function/epost.php" method="post" target="_blank" id="edit">';
		echo '<input type="text" value="" placeholder="ID" class="search-input" name="id"/>';
		echo '<input type="text" value="" placeholder="Title" class="search-input" name="title"/><br/>';
		echo '<input type="text" value="" placeholder="StartTime" class="search-input" name="start"/>';
		echo '<input type="text" value="" placeholder="EndTime" class="search-input" name="end"/>';
		echo '<button type="button" class="button button-01 bg-blue-01" onclick="myesubmit()">提交</button>';
		echo '<textarea name="editor1" id="editor1" rows="10" cols="80">';
		echo '</textarea>';
		echo '<script>';
		echo 'CKEDITOR.replace( "editor1",{customConfig: "ckeditor/config.js",width:800,height:300});';
		echo '</script>';
		echo '</form>';
		echo '</div> <!-- section-1 -->';
		echo '</div>';
		echo '</div> <!-- conetent-->';
	}
?>
<?php include_once(__DIR__ . "/footer.php"); ?>