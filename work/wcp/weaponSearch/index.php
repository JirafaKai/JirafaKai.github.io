<?php include_once(__DIR__ . "/../assets/header.html"); ?>
<!-- weapon search page -->

<div class="content">
	
	<div class="char-section-1">
		<div class="wrapper-1024 position-r">
			<div class="char-search-board bg-white">
				<input type="text" value="" placeholder="武器名稱 / 暱稱 / 專屬人物" class="search-input"/>
				<br/>
				<div id="star-board" class="display-ib search-attr-board bg-blue-01 font-white">
					<span>星數</span>
					<input type="checkbox" name="star" id="star1" value"1"/><label for="star1">1</label>
					<input type="checkbox" name="star" id="star2" value"2"/><label for="star2">2</label>
					<input type="checkbox" name="star" id="star3" value"3"/><label for="star3">3</label>
					<input type="checkbox" name="star" id="star4" value"4"/><label for="star4">4</label>
				</div><br/>
				<div id="job-board" class="search-attr-board bg-blue-01 font-white">
					<span>職業</span>
					<input type="checkbox" name="job" id="job-sword" value"劍"/><label for="job-sword">劍</label>
					<input type="checkbox" name="job" id="job-fighter" value"拳"/><label for="job-fighter">拳</label>
					<input type="checkbox" name="job" id="job-warrior" value"斧"/><label for="job-warrior">斧</label>
					<input type="checkbox" name="job" id="job-spearman" value"槍"/><label for="job-spearman">槍</label>
					<input type="checkbox" name="job" id="job-archer" value"弓"/><label for="job-archer">弓</label>
					<input type="checkbox" name="job" id="job-magician" value"法"/><label for="job-magician">法</label>
					<input type="checkbox" name="job" id="job-pole" value"雙刀"/><label for="job-pole">雙刀</label>
				</div>
				<div class="search-attr-board bg-blue-01 font-white">
					<div class="display-tc">期數</div>
					<div class="display-tc">
						<input type="checkbox" name="phase" id="phase-1" value"第一期"/><label for="phase-1">第一期</label>
						<input type="checkbox" name="phase" id="phase-2" value"第二期"/><label for="phase-2">第二期</label>
						<input type="checkbox" name="phase" id="phase-3" value"第三期"/><label for="phase-3">第三期</label>
						<input type="checkbox" name="phase" id="phase-4" value"第四期"/><label for="phase-4">第四期</label>
						<input type="checkbox" name="phase" id="phase-5" value"第五期"/><label for="phase-5">第五期</label>
						<input type="checkbox" name="phase" id="phase-6" value"第六期"/><label for="phase-6">第六期</label>
						<input type="checkbox" name="phase" id="phase-7" value"第七期"/><label for="phase-7">第七期</label>
						<input type="checkbox" name="phase" id="phase-8" value"第八期"/><label for="phase-8">第八期</label>
						<input type="checkbox" name="phase" id="phase-9" value"第九期"/><label for="phase-9">第九期</label>
						<input type="checkbox" name="phase" id="phase-10" value"第十期"/><label for="phase-10">第十期</label>
						<br/>
						<input type="checkbox" name="phase" id="phase-11" value"第十一期"/><label for="phase-11">第十一期</label>
					</div>
				</div><br/>
				<div class="search-attr-board bg-blue-01 font-white">
					<div class="display-tc">類別</div>
					<div class="display-tc">
						<input type="checkbox" name="category" id="cate-event" value"活動"/><label for="cate-event">活動</label>
						<input type="checkbox" name="category" id="cate-limited" value"限定"/><label for="cate-limited">限定</label>
					</div>
				</div>
			</div>
		</div>
	</div> <!-- section-1 -->
	
	<div class="char-section-2">
		<div class="wrapper-1024 position-r">
			<div class="weapon-search-result bg-white">
				<!-- when result > 1, use style char-search-01 to display. -->
				<div style="display:block;" class="char-search-01">
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
					<a href="#"><img title="char-JName" src="http://cdn.wiki.famitsu.com/theme/famitsu/shironeko/icon/weapon/sword/wep_00010552.png"/></a>
				</div>
			</div>
		</div>
	</div> <!-- section-2 -->
	
</div> <!-- conetent-->


<?php include_once(__DIR__ . "/../assets/footer.html"); ?>