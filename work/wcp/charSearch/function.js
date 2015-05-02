	function search(){
		var star = [];
		var job = [];
		var type = [];
		var phase = [];
		var cate = [];
		for(var i=1;i<5;i++)
			if($('#star'+i).prop("checked"))star[i-1]='1';
			else star[i-1]='0';
		for(var i=1;i<8;i++)
			if($('#job'+i).prop("checked"))job[i-1]='1';
			else job[i-1]='0';
		for(var i=1;i<8;i++)
			if($('#type'+i).prop("checked"))type[i-1]='1';
			else type[i-1]='0';	
		for(var i=0;i<12;i++)
			if($('#phase-'+i).prop("checked"))phase[i]='1';
			else phase[i]='0';
		for(var i=1;i<3;i++)
			if($('#cate-'+i).prop("checked"))cate[i-1]='1';
			else cate[i-1]='0';
		var keyword = 'isempty';
		if($('.search-input').val() != '')
			keyword = $('.search-input').val().trim().split(" ");
		if(check == 0)searchajax(keyword,star,job,type,phase,cate);
	}
		function searchajaxx(keyword,star,job,type,phase,cate){
		check = 1;
		var URLs="charSearch/function/test.php";
		$.ajax({
                url: URLs,
                data: {info:keyword,star:star,job:job,type:type,phase:phase,cate:cate},
                type:"POST",
                dataType:'text',

                success: function(data){
					alert(data);
                },

                error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError);
                 }
            });
	}
	function searchajax(keyword,star,job,type,phase,cate){
		check = 1;
		var URLs="charSearch/function/getData.php";
		$.ajax({
                url: URLs,
                data: {info:keyword,star:star,job:job,type:type,phase:phase,cate:cate},
                type:"POST",
                dataType:'json',

                success: function(data){
					charactor = [];
					for(var i in data){
						charactor[i] = new charAttr(data[i]);
					}
					searchResult();
					check = 0;
                },

                error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError);
                 }
            });
	}
	function searchResult(){
		$('.char-search-01').html('');
		$('.char-search-01').hide();
		$('.char-search-02').html('');
		$('.char-search-02').hide();
		if(charactor.length == 1)makeDetialResult();
		else {
			for(var i in charactor)makeImgResult(i);
		}
	}
	function makeImgResult(i){
		$('.char-search-01').show();
		$('.char-search-01').append('<a href="#"><img title="'+charactor[i].getJPname()+'" src="' + charactor[i].getImg('icon') + '" /></a>');
	}
	function makeDetialResult(){
		var c = charactor[0];
		$('.char-search-02').show();
		$('.char-search-02').append(
			'<img class="char-search-arused" src="' + c.getImg('2d') + '"/>'
			+'<div class="char-search-tag">'
			+'<span class="bg-magician">' + c.getStar() + '星</span>'
			+'<span class="bg-magician">' + c.getJob() + '</span>'
			+'<span class="bg-magician">' + c.getPhase() + '</span>'
			+'<span class="bg-magician">' + c.getType() + '</span>'
			+'</div>'
			+'<a href="#" class="char-search-more font-white bg-gray-02">詳細資料</a>'
			+'<div class="char-search-name">'
			+'<span>原名：' + c.getJPname() + '</span><br/>'
			+'<span>台譯：' + c.getCname() + '</span>'
			+'</div>'
			+'<div class="char-search-table">'
			+'<table>'
			+'<tr>'
			+'<td class="title"></td>'
			+'<td class="title">HP</td>'
			+'<td class="title">SP</td>'
			+'<td class="title">攻擊</td>'
			+'<td class="title">防禦</td>'
			+'<td class="title">會心</td>'
			+'</tr>'
			+'<tr>'
			+'<td class="title">初期</td>'
			+'<td>'+c.getAttr('HP',0)+'</td>'
			+'<td>'+c.getAttr('SP',0)+'</td>'
			+'<td>'+c.getAttr('ATK',0)+'</td>'
			+'<td>'+c.getAttr('DEF',0)+'</td>'
			+'<td>'+c.getAttr('CRI',0)+'</td>'
			+'</tr>'
			+'<tr>'
			+'<td class="title">Lv.100</td>'
			+'<td>'+c.getAttr('HP',1)+'</td>'
			+'<td>'+c.getAttr('SP',1)+'</td>'
			+'<td>'+c.getAttr('ATK',1)+'</td>'
			+'<td>'+c.getAttr('DEF',1)+'</td>'
			+'<td>'+c.getAttr('CRI',1)+'</td>'
			+'</tr>'
			+'<tr>'
			+'<td class="title">Lv.100四突</td>'
			+'<td>'+c.getAttr('HP',2)+'</td>'
			+'<td>'+c.getAttr('SP',2)+'</td>'
			+'<td>'+c.getAttr('ATK',2)+'</td>'
			+'<td>'+c.getAttr('DEF',2)+'</td>'
			+'<td>'+c.getAttr('CRI',2)+'</td>'
			+'</tr>'
			+'</table>'
			+'</div>'
			+'<div class="char-search-skill">'
			+'<div class="skill-board skill01">'
			+'<span class="char-search-sTitle">進階隊長技能</span><br/>'
			+'<span>'+c.getlSkill('cn',0)+'</span>'
			+'</div>'
			+'<div class="skill-board skill02">'
			+'<span class="char-search-sTitle">主動技能</span><br/>'
			+'<span>'+c.getaSkill('cn',0)+'</span><br/>'
			+'<span class="f10 font-green-01">消費SP：'+c.getaSkill('sp',0)+'</span><br/>'
			+'<span>'+c.getaSkill('cn',1)+'</span><br/>'
			+'<span class="f10 font-green-01">消費SP：'+c.getaSkill('sp',1)+'</span>'
			+'</div>'
			+'<div class="skill-board skill03">'
			+'<span class="char-search-sTitle">被動技能</span><br/>'
			+'<span>'+c.getpSkill(0)+'</span><br/>'
			+'<span>'+c.getpSkill(1)+'</span><br/>'
			+'<span>'+c.getpSkill(2)+'</span>'
			+'</div>'
			+'</div>'
		);
	}