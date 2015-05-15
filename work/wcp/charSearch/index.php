<?php include_once(__DIR__ . "/../assets/header.php"); ?>
<!-- charactor search page -->

<script src="charSearch/function.js"></script>
<script src="charSearch/object.js"></script>
<div class="content">
	
	<div class="char-section-1">
		<div class="wrapper-1024 position-r">
			<div class="char-search-board bg-white">
				<input type="text" value="" placeholder="角色名稱 / 暱稱" class="search-input" onkeyup="search()"/>
				<br/>
				<div id="star-board" class="display-ib search-attr-board bg-blue-01 font-white">
					<span>星數</span>
					<input type="checkbox" name="star" id="star1" value"1" onclick="search()"/><label for="star1">1</label>
					<input type="checkbox" name="star" id="star2" value"2" onclick="search()"/><label for="star2">2</label>
					<input type="checkbox" name="star" id="star3" value"3" onclick="search()"/><label for="star3">3</label>
					<input type="checkbox" name="star" id="star4" value"4" onclick="search()"/><label for="star4">4</label>
				</div><br/>
				<div id="job-board" class="search-attr-board bg-blue-01 font-white">
					<span>職業</span>
					<input type="checkbox" name="job" id="job1" value"劍" onclick="search()"/><label for="job1">劍</label>
					<input type="checkbox" name="job" id="job2" value"拳" onclick="search()"/><label for="job2">拳</label>
					<input type="checkbox" name="job" id="job3" value"斧" onclick="search()"/><label for="job3">斧</label>
					<input type="checkbox" name="job" id="job4" value"槍" onclick="search()"/><label for="job4">槍</label>
					<input type="checkbox" name="job" id="job5" value"弓" onclick="search()"/><label for="job5">弓</label>
					<input type="checkbox" name="job" id="job6" value"法" onclick="search()"/><label for="job6">法</label>
					<input type="checkbox" name="job" id="job7" value"雙刀" onclick="search()"/><label for="job7">雙刀</label>
				</div><br/>
				<div class="search-attr-board bg-blue-01 font-white">
					<span>類型</span>
					<input type="checkbox" name="type" id="type1" value"攻擊型" onclick="search()"/><label for="type1">攻擊型</label>
					<input type="checkbox" name="type" id="type2" value"防禦型" onclick="search()"/><label for="type2">防禦型</label>
					<input type="checkbox" name="type" id="type3" value"平衡型" onclick="search()"/><label for="type3">平衡型</label>
					<input type="checkbox" name="type" id="type4" value"支援型" onclick="search()"/><label for="type4">支援型</label>
					<input type="checkbox" name="type" id="type5" value"技能型" onclick="search()"/><label for="type5">技能型</label>
					<input type="checkbox" name="type" id="type6" value"技術型" onclick="search()"/><label for="type6">技術型</label>
					<input type="checkbox" name="type" id="type7" value"英雄型" onclick="search()"/><label for="type7">英雄型</label>
				</div><br/>
				<div class="search-attr-board bg-blue-01 font-white">
					<div class="display-tc">期數</div>
					<div class="display-tc">
						<input type="checkbox" name="phase" id="phase-0" value"初代" onclick="search()"/><label for="phase-0">初代</label>
						<input type="checkbox" name="phase" id="phase-1" value"第一期" onclick="search()"/><label for="phase-1">第一期</label>
						<input type="checkbox" name="phase" id="phase-2" value"第二期" onclick="search()"/><label for="phase-2">第二期</label>
						<input type="checkbox" name="phase" id="phase-3" value"第三期" onclick="search()"/><label for="phase-3">第三期</label>
						<input type="checkbox" name="phase" id="phase-4" value"第四期" onclick="search()"/><label for="phase-4">第四期</label>
						<input type="checkbox" name="phase" id="phase-5" value"第五期" onclick="search()"/><label for="phase-5">第五期</label>
						<input type="checkbox" name="phase" id="phase-6" value"第六期" onclick="search()"/><label for="phase-6">第六期</label>
						<input type="checkbox" name="phase" id="phase-7" value"第七期" onclick="search()"/><label for="phase-7">第七期</label>
						<input type="checkbox" name="phase" id="phase-8" value"第八期" onclick="search()"/><label for="phase-8">第八期</label>
						<input type="checkbox" name="phase" id="phase-9" value"第九期" onclick="search()"/><label for="phase-9">第九期</label>
						<input type="checkbox" name="phase" id="phase-10" value"第十期" onclick="search()"/><label for="phase-10">第十期</label>
						<br/>
						<input type="checkbox" name="phase" id="phase-11" value"第十一期" onclick="search()"/><label for="phase-11">第十一期</label>
					</div>
				</div><br/>
				<div class="search-attr-board bg-blue-01 font-white">
					<div class="display-tc">類別</div>
					<div class="display-tc">
						<input type="checkbox" name="category" id="cate-1" value"活動限定" onclick="search()"/><label for="cate-1">活動限定</label>
						<input type="checkbox" name="category" id="cate-2" value"正月限定" onclick="search()"/><label for="cate-2">正月限定</label>
						<input type="checkbox" name="category" id="cate-3" value"聖誕限定" onclick="search()"/><label for="cate-3">聖誕限定</label>
						<input type="checkbox" name="category" id="cate-4" value"黑貓限定" onclick="search()"/><label for="cate-4">黑貓限定</label>
						<input type="checkbox" name="category" id="cate-5" value"中川限定" onclick="search()"/><label for="cate-5">中川限定</label>
						<input type="checkbox" name="category" id="cate-6" value"限定角色" onclick="search()"/><label for="cate-6">限定角色</label>
					</div>
				</div>
			</div>
		</div>
	</div> <!-- section-1 -->
	
	<div class="char-section-2">
		<div class="wrapper-1024 position-r">
			<div class="char-search-result bg-white">
				<!-- when result > 1, use style char-search-01 to display. -->
				<div class="char-search-01" style="display:none;">
				</div>
				<!-- when result = 1, use style char-search-02 to display. -->
				<div class="char-search-02" style="display:none;">
				</div>
			</div>
		</div>
	</div> <!-- section-2 -->
	
</div> <!-- conetent-->
<script>
	var check = 0;
	var charator = [];
</script>
<?php include_once(__DIR__ . "/../assets/footer.php"); ?>