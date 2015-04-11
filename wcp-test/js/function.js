	//回傳YYYY / MM / DD的時間值
	function getTime(){
		var Today = new Date();
		return Today.getFullYear() + ' / ' + parseInt(Today.getMonth()+1) + ' / ' + Today.getDate();
	}
	//從GOOGLE表單中取得角色資料
	function getData(target,urlScript){
		$.getJSON(urlScript, 
			function(JData){
				for (var i in JData.feed.entry){
                      charactor[i] = new charAttr(
					  JData.feed.entry[i].gsx$charno.$t,
					  JData.feed.entry[i].gsx$img2d.$t,
                      JData.feed.entry[i].gsx$img3d.$t,
                      JData.feed.entry[i].gsx$imgsrc.$t,
                      JData.feed.entry[i].gsx$charname.$t,
                      JData.feed.entry[i].gsx$ccharname.$t,
                      JData.feed.entry[i].gsx$charnickname.$t,
                      JData.feed.entry[i].gsx$phase.$t,
                      JData.feed.entry[i].gsx$charstar.$t,
                      JData.feed.entry[i].gsx$chartype.$t,
                      JData.feed.entry[i].gsx$voice.$t,
                      JData.feed.entry[i].gsx$appmedia.$t,
                      JData.feed.entry[i].gsx$gamewith.$t,
                      JData.feed.entry[i].gsx$famitsu.$t,
					  JData.feed.entry[i].gsx$lv1hp.$t,
                      JData.feed.entry[i].gsx$maxhp.$t,
					  JData.feed.entry[i].gsx$hp4.$t,
					  JData.feed.entry[i].gsx$lv1sp.$t,
                      JData.feed.entry[i].gsx$maxsp.$t,
					  JData.feed.entry[i].gsx$lv1atk.$t,
                      JData.feed.entry[i].gsx$maxatk.$t,
					  JData.feed.entry[i].gsx$atk4.$t,
					  JData.feed.entry[i].gsx$lv1def.$t,
                      JData.feed.entry[i].gsx$maxdef.$t,
					  JData.feed.entry[i].gsx$def4.$t,
					  JData.feed.entry[i].gsx$lv1cri.$t,
                      JData.feed.entry[i].gsx$maxcri.$t,
					  JData.feed.entry[i].gsx$cri4.$t,
                      JData.feed.entry[i].gsx$spr.$t,
					  JData.feed.entry[i].gsx$sp1.$t,
					  JData.feed.entry[i].gsx$sp2.$t,
					  JData.feed.entry[i].gsx$sp3.$t,
					  JData.feed.entry[i].gsx$sp4.$t,
                      JData.feed.entry[i].gsx$ls1.$t,
                      JData.feed.entry[i].gsx$ls2.$t,
                      JData.feed.entry[i].gsx$as1.$t,
					  JData.feed.entry[i].gsx$as1sp.$t,
                      JData.feed.entry[i].gsx$as2.$t,
					  JData.feed.entry[i].gsx$as2sp.$t,
                      JData.feed.entry[i].gsx$ds1.$t,
                      JData.feed.entry[i].gsx$ds2.$t,
                      JData.feed.entry[i].gsx$ds3.$t,
                      JData.feed.entry[i].gsx$sprcomm.$t,
                      JData.feed.entry[i].gsx$gamewith.$t
                    );
				}
			target.remove();
		});
	}
	//從GOOGLE表單中取得評價資料
	function loadcomment(urlScript2){
		$.getJSON(urlScript2, 
			function(JData){
				for (var q in JData.feed.entry){
                    commentG[q] = new commAttr(
						JData.feed.entry[q].gsx$charno.$t,
						JData.feed.entry[q].gsx$commentmsg.$t,
                        JData.feed.entry[q].gsx$time.$t
					);
				}
		});
	}
	//主程式
	function setKey(target){
		target.onkeyup = function(e){
			loadcomment();
			$("#char-board").html("");
			for(var i in charactor){
				var keyword = target.value.trim().split(" ");
				if(checkpost(keyword,target.value.trim(),i) == true)
					charBoardData(charactor[i]);
			}	
		}
	}
	//搜尋關鍵字
	function checkpost(keyword,key,i){
		var checknum = 0;
		var checknum2 = 0;
		for(var n in keyword){
			if(keyword[n] !== ""){checknum2++;	// prevent 2 spaces together, cannot use keyword.length (num of element of keyword array)
			if(charactor[i].getJPname().toLowerCase().indexOf(keyword[n].toLowerCase()) !== -1) checknum++;    // !==-1 -> is match
			if(charactor[i].getNickname().toLowerCase().indexOf(keyword[n].toLowerCase()) !== -1) checknum++;
			if(charactor[i].getType().indexOf(keyword[n]) !== -1) checknum++;
			if(charactor[i].getPhase().indexOf(keyword[n]) !== -1) checknum++;
			if(charactor[i].getStar().indexOf(keyword[n]) !== -1) checknum++;}
		}
		if((checknum >= checknum2) && key.length !== 0)
			return true;
		else return false;
	}
	function makecomment(i,comment,add){
		var content = '<table class="table table-striped" id="commTable">'
					+ '<tr><td colspan="2"><input class="inputComm" type="text" id="inputCommt' + charactor[i].charno+ '" placeholder="可輸入評語" />'
					+ '<input type="button" value="提交" onclick="submitcom(' + i + ')"</td></tr>';
		if(add == 1){
			content	+= '<tr><td class="commTime" id="commtd"><span class="spanTime">' + getTime() + '</span></td><td class="commTd">' + comment + '</td></tr>';}
		for(var c in commentG){
			if(commentG[c].charNo == charactor[i].charno)
				content += '<tr><td class="commTime" id="commtd"><span class="spanTime">' + commentG[c].iTime + '</span></td><td class="commTd">' + commentG[c].comment + '</td></tr>';
		}
		content += '</table>';
		return content;
	}
	function typecolor(type){
		var color="#";
		if(type == "劍")color += "e03d3e;";
		else if(type == "法")color += "c056dc";
		else if(type == "槍")color += "088A4B";
		else if(type == "斧")color += "1c7cd0";
		else if(type == "弓")color += "fc6d21";
		else if(type == "拳")color += "d8c238";
		else if(type == "雙刀")color += "e4688c";
		return color;
	}
    function submitReport(charNo) {
      var inputText = $('#reportContent' + charNo);
	  var text = inputText.val();
      var result = 'https://docs.google.com/forms/d/1s1YJ1n80Ow5eSc9VvjgoTeSxsJ6KRi3zF1lw1Xp8ZUk/formResponse?'
                   + 'entry.1948090599=' + text
                   + '&entry.261850290=' + charNo
                   + '&submit=Submit';
      $.getScript(result);
      inputText.val("");
      $('#report'+charNo).modal("hide");
    }
	function submitComment(charNo){
		var inputtext = $('#latestComment'+charNo);
		var text = inputtext.val();
		var result = 'https://docs.google.com/forms/d/1NJxcKOtlviztl54Em5esFJS3tejv-WGX2fYvH9azEqA/formResponse?'
					+ 'entry.1562942030=' + charNo
					+ '&entry.2001095882=' + text
					+ '&entry.714632310=' + getTime()
					+ '&submit=Submit';			
		$.getScript(result);
		inputtext.val("");
		var reComment = getCommentTable(charNo);
		reComment += '<tr><td class="comment-date"><span>' +getTime() + '</span></td><td class="comment-data">' + text + '</td></tr>';
		reComment += getComment(charNo);
		reComment += '</table></div>';
		$('#comment'+charNo).html(reComment);
		commentG=[];
		commentG = loadcomment(urlScript2);
	}
	function charBoardData(myChar){
		$("#char-board").append('<div id="char-data' + myChar.getCharNo() + '" class="bottom-line"></div>');
		var target = $('#char-data'+myChar.getCharNo());
		charDataShow(target,myChar);
		charDataComment(target,myChar.getCharNo());
		charDataMore(target,myChar);
		charShowReportModal(target,myChar);
	}
	function charDataShow(target,myChar){
		target.append('<div id="char-show' + myChar.getCharNo() + '" class="row"></div>'
		);
		var target = $('#char-show'+myChar.getCharNo());
		var color = typecolor(myChar.getType());
		charShowIcon(target,myChar);
		charShowName(target,myChar,color);
		charShowStatus(target,myChar,color);
	}
	function charShowIcon(target,myChar){
		target.append(
			'<div class="img-icon col-xs-3 col-md-1">'
			+'<a href="#" data-toggle="modal" data-target="#img2d3d' + myChar.getCharNo() + '">'
			+'<img src="'+myChar.getImg('icon') + '" /></a>'
			+'</div>'
		);
		charShowIconModal(target,myChar);
	}
	function charShowIconModal(target,myChar){
		target.append('<div class="modal fade" id="img2d3d' + myChar.getCharNo() + '" taindex="-1" role="dialog" aria-labelledby="reportLabel" aria-hidden="true">'
					+ '<div class="modal-dialog">'
					+ '<div class="modal-content">'
					+ '<div class="modal-header">'
					+ '<h4 class="modal-title" id="reportLabel">' + myChar.getJPname() + '</h4>'
					+ '</div>'
					+ '<div class="modal-body" style="text-align:center;">'
					+ '<div style="display:block;">'
					+ '<img class="img2dC" src="' + myChar.getImg('2d') + '"/>'
					+ '<img class="img2dC" src="' + myChar.getImg('3d') + '"/>'
					+ '</div>'
					+ '</div>'
					+ '</div>' 
					+ '</div>'
					+ '</div>');
	}
	function charShowName(target,myChar,color){
		var name = myChar.getJPname().split("　");
		var content = '<div class="textJPname text-left col-xs-7 col-md-3">'
			+ '<label class="label-tag" style="background:' + color +'">' + myChar.getStar() + '</label>\n'
			+'<label class="label-tag" style="background:' + color +'">' + myChar.getPhase() + '</label>\n'
			+'<label class="label-tag" style="background:' + color +'">' + myChar.getType() + '</label><br/>';
		if(name.length > 1)
			content += '<span class="hidden-xs">' + name[0] + '　</span>'+'<span>' + name[1] + '</span><br/>';
		else content += '<span>' + name[0] + '</span><br/>';
		content += '<span>' +myChar.getNickname()+ '</span></div>'
		target.append(content);
	}
	function charShowStatus(target,myChar,color){
		target.append(
			'<div class="col-md-8">'
			+'<div class="pull-right extend-panel text-right">'
			+'<a href="#more' + myChar.getCharNo() + '" data-toggle="collapse">更多</a><br/>'
			+'<a href="#comment' + myChar.getCharNo() + '" data-toggle="collapse">評價</a><br/>'
			+'<a href="#" data-toggle="modal" data-target="#report' + myChar.getCharNo() + '">回報</a></div>'
			+'<table class="pull-right text-center attr-table-md hidden-sm hidden-xs">'
			+'<tr><td style="background:' + color +'"><span id="LVattr' + myChar.getCharNo() + 'big">Lv.100</span></td>'
			+'<td>HP <span id="HPattr' + myChar.getCharNo() + 'big">' + myChar.getAttr('HP',0) + '</span></td>'
			+'<td>SP <span id="SPattr' + myChar.getCharNo() + 'big">' + myChar.getAttr('SP',0) + '</span></td>'
			+'<td>ATK <span id="ATKattr' + myChar.getCharNo() + 'big">' + myChar.getAttr('ATK',0) + '</span></td>'
			+'<td>DEF <span id="DEFattr' + myChar.getCharNo() + 'big">' + myChar.getAttr('DEF',0) + '</span></td>'
			+'<td>CRI <span id="CRIattr' + myChar.getCharNo() + 'big">' + myChar.getAttr('CRI',0) + '</span></td>'
			+'<td>SPR <span id="SPRattr' + myChar.getCharNo() + 'big">' + calSPR(myChar.getAttr('SP',0),myChar.getType()) + '</span></td>'
			+'</tr></table>'
			+'<div class="pull-right break-btn btn-group hidden-sm hidden-xs" role="group">'
			+'<button type="button" id="button-1-big' + findMyI(myChar) + '" class="btn btn-default" onclick="buttonHandler(5,'+findMyI(myChar) + ')">Lv.1</button>'
			+'<button type="button" id="button-0-big' + findMyI(myChar) + '" class="active btn btn-default" onclick="buttonHandler(0,'+findMyI(myChar) + ')">Lv.100</button>'
			+'<button type="button" id="button-2-big' + findMyI(myChar) + '" class="btn btn-default" onclick="buttonHandler(4,'+findMyI(myChar) + ')">4突</button></div></div>'	
		);
	}
	function charDataComment(target,charNo){
		var addComment = '<div id="comment' + charNo + '" class="collapse">';
		addComment += getCommentTable(charNo);
		addComment += getComment(charNo);
		addComment += '</table></div>';
		target.append(addComment);
	}
	function charDataMore(target,myChar){
		target.append('<div id="more' + myChar.getCharNo() + '" class="collapse"></div>')
		var target = $('#more' + myChar.getCharNo());
		moreShowCV(target,myChar);
		moreShowAttr(target,myChar);
		moreShowSPRcomment(target,myChar);
		moreShowSkill(target,myChar);
	}
	function moreShowCV(target,myChar){
		target.append('<div style="margin-bottom:10px;margin-top:10px;" class="well">聲優：'
					+ myChar.getCV()
					+'</div>');
	}
	function moreShowAttr(target,myChar){
		target.append('<div class="hidden-md hidden-lg row">'
					+ '<div class="col-xs-12">'
					+ '<div class="char-attr panel panel-default">'
					+ '<div class="panel-heading">'
					+ '<strong><span id="LVattr' + myChar.getCharNo() + 'small">LV.100</span></strong>'
					+ '</div>'
					+ '<div class="panel-body">'
					+ '<span class="attr-tag"><span>HP</span><span id="HPattr' + myChar.getCharNo() + 'small">' + myChar.getAttr('HP',0) + '</span></span>'
					+ '<span class="attr-tag"><span>SP</span><span id="SPattr' + myChar.getCharNo() + 'small">' + myChar.getAttr('SP',0) + '</span></span>'
					+ '<span class="attr-tag"><span>SPR</span><span id="SPRattr' + myChar.getCharNo() + 'small" class="no-margin-right margin-bottom-small">' + myChar.getAttr('SPR',0) + '</span></span><br/>'
					+ '<span class="attr-tag"><span>ATK</span><span id="ATKattr' + myChar.getCharNo() + 'small">' + myChar.getAttr('ATK',0) + '</span></span>'
					+ '<span class="attr-tag"><span>DEF</span><span id="DEFattr' + myChar.getCharNo() + 'small">' + myChar.getAttr('DEF',0) + '</span></span>'
					+ '<span class="attr-tag"><span>CRI</span><span id="CRIattr' + myChar.getCharNo() + 'small" class="no-margin-right">' + myChar.getAttr('CRI',0) + '</span></span>'
					+ '</div>'
					+ '<div class="panel-footer clearfix">'
					+ '<div class="pull-right btn-group" role="group">'
					+ '<button type="button" id="button-1-' + findMyI(myChar) + '" class="btn btn-default" onclick="buttonHandler(5,'+findMyI(myChar) + ')">Lv.1</button>'
					+ '<button type="button" id="button-0-' + findMyI(myChar) + '" class="active btn btn-default" onclick="buttonHandler(0,'+findMyI(myChar) + ')">Lv.100</button>'
					+ '<button type="button" id="button-2-' + findMyI(myChar) + '" class="btn btn-default" onclick="buttonHandler(4,'+findMyI(myChar) + ')">4突</button>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>')
	}
	function moreShowSPRcomment(target,myChar){
		var SPRcomment = makeSPRcomm(myChar);

		target.append('<div class="row">'
					+ '<div class="col-xs-12">'
					+ '<div class="spr-data panel panel-default">'
					+ '<div class="panel-heading">'
					+ '<strong><span>SPR計算</span></strong>'
					+ '</div>'
					+ '<div class="panel-body">' + SPRcomment + '</div>'
					+ '<div class="clearfix panel-footer">'
					+ '<button type="button" class="btn btn-info pull-right calculator" data-toggle="modal" data-target="#calSP" onclick=calClick(' + findMyI(myChar) + ',' + 0 + ')>SPR計算器</button>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>')
	}
	function buttonHandler(breakTime, i){
		var myChar = charactor[i];
		var charNo = myChar.getCharNo();
		
		for (w=0;w<3;w++){
			$('#button-' + w + '-' + i).removeClass("active");
			$('#button-' + w + '-big' + i).removeClass("active");
		}
		var breakbtn;
		var lv = 'Lv.100';
		if(breakTime == 5){breakbtn = 1;lv = 'Lv.1'}
		else if(breakTime == 4)breakbtn = 2;
		else breakbtn = breakTime;
		$('#button-' + breakbtn + '-' + i).addClass("active");
		$('#button-' + breakbtn + '-big' + i).addClass("active");
		
		$('#LVattr' + charNo + 'small').html(lv);
		$('#HPattr' + charNo + 'small').html(myChar.getAttr('HP',breakTime));
		$('#SPattr' + charNo + 'small').html(myChar.getAttr('SP',breakTime));
		$('#SPRattr' + charNo + 'small').html(calSPR(myChar.getAttr('SP',breakTime),myChar.getType()));
		$('#ATKattr' + charNo + 'small').html(myChar.getAttr('ATK',breakTime));
		$('#DEFattr' + charNo + 'small').html(myChar.getAttr('DEF',breakTime));
		$('#CRIattr' + charNo + 'small').html(myChar.getAttr('CRI',breakTime));
		
		$('#LVattr' + charNo + 'big').html(lv);
		$('#HPattr' + charNo + 'big').html(myChar.getAttr('HP',breakTime));
		$('#SPattr' + charNo + 'big').html(myChar.getAttr('SP',breakTime));
		$('#SPRattr' + charNo + 'big').html(calSPR(myChar.getAttr('SP',breakTime),myChar.getType()));
		$('#ATKattr' + charNo + 'big').html(myChar.getAttr('ATK',breakTime));
		$('#DEFattr' + charNo + 'big').html(myChar.getAttr('DEF',breakTime));
		$('#CRIattr' + charNo + 'big').html(myChar.getAttr('CRI',breakTime));
	}
	function calHandler() {
		var charno = $('#hiddenCalInput').val();
		calClick(charno, 1);
	}
	function calClick (i, status) {
		
		if (status==0)
		{
			$('#sheepBed').attr('checked', false);
			$('#breakthrough').val('0');
			$('#arrow1').val('0');
			$('#arrow2').val('0');
			$('#magic1').val('0');
			$('#magic2').val('0');
			$('#weapon5').attr('checked', false);
			$('#weapon3').attr('checked', false);
		}
		
		$('#calAns').empty();
		$('#arrow').hide();
		$('#magic').hide();
		$('#weapon5').show();
		$('#lweapon5').show();
		$('#weapon3').show();
		$('#lweapon3').show();
		
		var totalSP = 0;
		var baseCorr = 0;
		var bedA = 0;
		var weaponA = 0;
		var SPR = 0;
		var originalSP = 0;
		
		var breakthrough = document.getElementById('breakthrough').value;
		var sheepBed = document.getElementById('sheepBed').value;
		var arrow1 = document.getElementById('arrow1').value;
		var arrow2 = document.getElementById('arrow2').value;
		var magic1 = document.getElementById('magic1').value;
		var magic2 = document.getElementById('magic2').value;
		
		$('#calPopHeader').html(charactor[i].cName);
		
		if (breakthrough=='0') totalSP = charactor[i].lvMaxAttr.sp[0];
		else if (breakthrough=='1') totalSP = charactor[i].lvMaxAttr.sp[1];
		else if (breakthrough=='2') totalSP = charactor[i].lvMaxAttr.sp[2];
		else if (breakthrough=='3') totalSP = charactor[i].lvMaxAttr.sp[3];
		else if (breakthrough=='4') totalSP = charactor[i].lvMaxAttr.sp[4];
		
		if ($('#sheepBed').is(':checked'))
		{
			bedA = 0.03;
			//$('#calAns').append('-sheepBed ' + bedA + '<br/>');
		}
		else
		{
			bedA = 0;
			//$('#calAns').append('-sheepBed unchecked' + bedA + '<br/>');
		}
		
		if ($('#weapon3').is(':checked')) {
			weaponA = 3*0.01;
		}
		else if ($('#weapon5').is(':checked')) {
			weaponA = 5*0.01;
		}
		else weaponA = 0;
		
		if (charactor[i].type=='劍') {
		}
		if (charactor[i].type=='拳') {
			//$('#weapon5').hide();
			//$('#lweapon5').hide();
		}
		if (charactor[i].type=='斧') {
			baseCorr = 2;
			$('#weapon5').hide();
			$('#lweapon5').hide();
		}
		if (charactor[i].type=='槍') {
			baseCorr = 1;
		}
		if (charactor[i].type=='弓') {
			$('#arrow').show();
			$('#weapon5').hide();
			$('#lweapon5').hide();
		}
		if (charactor[i].type=='法') {
			$('#magic').show();
		}
		if (charactor[i].type=='雙刀') {
			$('#weapon5').hide();
			$('#lweapon5').hide();
			$('#weapon3').hide();
			$('#lweapon3').hide();
		}
		
		$('#hiddenCalInput').val(i);
		
		originalSP = totalSP/(1+checkDS(i))*(1+weaponA+checkDS(i));
		
		totalSP = Math.floor(originalSP*(1+bedA+calArrowA(arrow1)+calArrowA(arrow2)+calMagicA(magic1)+calMagicA(magic2)));

		$('#calAns').append('<span style="font-size:18px;text-align:right;">SP = </span>')
		$('#calAns').append('<span style="font-size:18px;">' + totalSP + '</span>');
		$('#calAns').append('<br/>');
		$('#calAns').append('<span style="font-size:18px;">SPR = ' + calSPR(totalSP, charactor[i].getType()) + '</span>');
		
	}
	function makeSPRcomm(myChar){
		var SPRcomment = '';
		var firstFlag = true;
		var A;
		var B;
		var firstBreak = 0;
		var firstBreakNum = 0;
		var nullFlag = true;
		//function calSP (breakTime, bed, arrow, arrowLV, magic, magicLV, weapon3, weapon5)
		
		//突破
		for (k=1;k<5;k++){
			A = calSPR(myChar.calSP(k,false,false,false,false,false,false,false),myChar.getType());
			B = calSPR(myChar.getAttr('SP',0),myChar.getType());
			if (A > B) {
				if (!firstFlag) SPRcomment += '<br/>';
				firstFlag = false;
				SPRcomment += k + '突回' + A + '；';
				firstBreak = A;
				firstBreakNum = k;
				nullFlag = false;
				break;
			}
		}
		
		//羊床
		A = calSPR(myChar.calSP(0,true,false,false,false,false,false,false),myChar.getType());
		B = calSPR(myChar.getAttr('SP',0),myChar.getType());
		if (A > B) {
			if (!firstFlag) SPRcomment += '<br/>';
			firstFlag = false;
			SPRcomment += '羊床 = 回' + A + '；';
			firstBreak = A;
			nullFlag = false;
		}
		
		//突破 + 羊床
		for (k=1;k<5;k++){
			A = calSPR(myChar.calSP(k,true,false,false,false,false,false,false),myChar.getType());
			B = calSPR(myChar.getAttr('SP',0),myChar.getType());
			if (A > B && (A > firstBreak || k < firstBreakNum)) {
				if (!firstFlag) SPRcomment += '<br/>';
				firstFlag = false;
				SPRcomment += k + '突 + 羊床 = 回' + A + '；';
				if (A > firstBreak) firstBreak = A;
				if (k < firstBreakNum) firstBreakNum = k;
				nullFlag = false;
				break;
			}
		}
		
		//突破 + 羊床 + 研所
		for (k=1;k<5;k++){
			if (myChar.getType()=='弓')
				A = calSPR(myChar.calSP(k,true,true,15,false,false,false,false),myChar.getType());
			else if (myChar.getType()=='法')
				A = calSPR(myChar.calSP(k,true,false,false,true,15,false,false),myChar.getType());
			else break;
			B = calSPR(myChar.getAttr('SP',0),myChar.getType());
			
			
			if (A > B && (A > firstBreak || k < firstBreakNum)) {
				if (!firstFlag) SPRcomment += '<br/>';
				firstFlag = false;
				SPRcomment += k + '突 + 羊床 + 研究所 = 回' + A + '；';
				if (A > firstBreak) firstBreak = A;
				if (k < firstBreakNum) firstBreakNum = k;
				nullFlag = false;
				break;
			}
		}
		
		//突破 + 羊床 + 研所 + 3%
		for (k=1;k<5;k++){
			var tmp = '';
			if (myChar.getType()=='弓') {
				A = calSPR(myChar.calSP(k,true,true,15,false,false,true,false),myChar.getType());
				tmp = '+ 研究所 ';
			}
			else if (myChar.getType()=='法') {
				A = calSPR(myChar.calSP(k,true,false,false,true,15,true,false),myChar.getType());
				tmp = '+ 研究所 ';
			}
			else if (myChar.getType()=='雙刀')
				break;
			else 
				A = calSPR(myChar.calSP(k,true,false,false,false,false,true,false),myChar.getType());
			B = calSPR(myChar.getAttr('SP',0),myChar.getType());
			if (A > B && (A > firstBreak || k < firstBreakNum)) {
				if (!firstFlag) SPRcomment += '<br/>';
				firstFlag = false;
				SPRcomment += k + '突 + 羊床 ' + tmp + '+ 武器3% = 回' + A + '；';
				if (A > firstBreak) firstBreak = A;
				if (k < firstBreakNum) firstBreakNum = k;
				nullFlag = false;
				break;
			}
		}
		
		//突破 + 羊床 + 研所 + 5%
		for (k=1;k<5;k++){
			var tmp = '';
			if (myChar.getType()=='弓' || myChar.getType()=='斧' || myChar.getType()=='雙刀')  //無5%武器
				break;
			else if (myChar.getType()=='法') {
				A = calSPR(myChar.calSP(k,true,false,false,true,15,false,true),myChar.getType());
				tmp = '+ 研究所 ';
			}
			else 
				A = calSPR(myChar.calSP(k,true,false,false,false,false,false,true),myChar.getType());
			B = calSPR(myChar.getAttr('SP',0),myChar.getType());
			if (A > B && (A > firstBreak || k < firstBreakNum)) {
				if (!firstFlag) SPRcomment += '<br/>';
				firstFlag = false;
				SPRcomment += k + '突 + 羊床 ' + tmp + '+ 武器5% = 回' + A + '；';
				if (A > firstBreak) firstBreak = A;
				if (k < firstBreakNum) firstBreakNum = k;
				nullFlag = false;
				break;
			}
		}
		
		if (nullFlag) SPRcomment += '無';

		return SPRcomment;
	}
	function moreShowSkill(target,myChar){
		target.append('<div class="row">'
					+ '<div class="col-xs-12">'
					+ '<table class="skill-table table table-bordered">'
					+ '<tr><td>隊長技能1</td><td>' + myChar.getSkill('ls',0) + '</td></tr>'
					+ '<tr><td>隊長技能2</td><td>' + myChar.getSkill('ls',1) + '</td></tr>'
					+ '<tr><td>主動技能1</td><td>' + myChar.getSkill('as',0) + '<br/>'
					+ '<span>消費SP：' + myChar.getSkill('assp',0) + '</span></td></tr>'
					+ '<tr><td>主動技能2</td><td>' + myChar.getSkill('as',1) + '<br/>'
					+ '<span>消費SP：' + myChar.getSkill('assp',1) + '</span></td></tr>'
					+ '<tr><td>被動技能</td><td>'
					+ myChar.getSkill('ds',0) + '<br/>' + myChar.getSkill('ds',1) + '<br/>' + myChar.getSkill('ds',2)
					+ '</tr>'
					+ '</table>'
					+ '</div>'
					+ '</div>')
	}
	function getCommentTable(charNo){
		var myChar = charactor[findMyII(charNo)];
		var addComment = '<table class="comment-table table">'
			+'<tr><td class="text-left" colspan="2" style="width:150px;">'
			+'<span class="span-inline-block"><span class="comment-site-name">FAMI通</span>'
			+'<span class="site-comment site-comment-xs">' + myChar.getOpinion('famitsu') + '</span></span>'
			+'<span class="span-inline-block"><span class="comment-site-name">appmedia</span>'
			+'<span class="site-comment site-comment-xs">' + myChar.getOpinion('appmedia') + '</span></span>'
			+'<span class="span-inline-block"><span class="comment-site-name">gamewith</span>'
			+'<span class="site-comment site-comment-xs">' + myChar.getOpinion('gamewith') + '</span></span></td>'
			+'</div></td></tr>'
			+'<tr><td class="input-comment" colspan="2">'
			+'<form class="form-inline">'
			+'<div style="margin:0;padding:0;" class="col-xs-9">'
			+'<input id="latestComment' + charNo + '"style="width:99%" type="text" class="form-control" /></div>'
			+'<button type="button" class="col-xs-3 btn btn-default" onclick="submitComment(\'' + charNo + '\')">送出評價</button>'
			+'</form></td></tr>';
		return addComment;
	}
	function getComment(charNo){
		var addComment = "";
		for(var i in commentG){
			if(commentG[i].getCharNo() == charNo){
			addComment += '<tr><td class="comment-date"><span>' + commentG[i].getInputTime() + '</span></td>'
			+'<td class="comment-data">' + commentG[i].getComment() + '</td></tr>';}
		}
		return addComment;
	}
	function charShowReportModal(target,myChar){
		target.append('<div class="modal fade" id="report' + myChar.getCharNo() + '" taindex="-1" role="dialog" aria-labelledby="reportLabel" aria-hidden="true">'
						+ '<div class="modal-dialog">'
						+ '<div class="modal-content">'
						+ '<div class="modal-header">'
						+ '<h4 class="modal-title" id="reportLabel">' + myChar.getJPname() + ' 的錯誤回報</h4>'
						+ '</div>'
						+ '<div class="modal-body">'
						+ '<div class="form-group">'
						+ '<label for="message-text" class="control-label">回報內容:</label>'
						+ '<textarea id="reportContent' + myChar.getCharNo() + '" class="form-control" id="message-text"></textarea>'
						+ '</div></form></div>'
						+ '<div class="modal-footer">'
						+ '<button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>'
						+ '<button type="button" class="btn btn-primary" onclick=submitReport(\'' + myChar.getCharNo() + '\')>傳送</button>'
						+ '</div>'
						+ '</div>' 
						+ '</div>'
						+ '</div>');
	}
	function findMyI(myChar){
		for(var i in charactor){
			if(myChar.getCharNo() == charactor[i].getCharNo())
				return i;
		}
	}
	function findMyII(myCharNo){
		for(var i in charactor){
			if(myCharNo == charactor[i].getCharNo())
				return i;
		}
	}
	function calArrowA (i) {
		var a=0;
		
		if (i=='3') a = 0.3;
		else if (i=='4' || i=='5' || i=='6') a = 0.6;
		else if (i=='7' || i=='8' || i=='9') a = 0.9;
		else if (i=='10' || i=='11' || i=='12') a = 1.2;
		else if (i=='13' || i=='14' || i=='15') a = 1.5;
		else a = 0;
		
		return a*0.01;
	}
	function calMagicA (i) {
		var a=0;
		if (i=='1') a = 0.3;
		else if (i=='2') a = 0.6;
		else if (i=='3') a = 0.9;
		else if (i=='4') a = 1.2;
		else if (i=='5') a = 1.5;
		else if (i=='6') a = 1.7;
		else if (i=='7') a = 1.9;
		else if (i=='8') a = 2.1;
		else if (i=='9') a = 2.3;
		else if (i=='10') a = 2.5;
		else if (i=='11') a = 2.7;
		else if (i=='12') a = 2.9;
		else if (i=='13') a = 3.1;
		else if (i=='14') a = 3.3;
		else if (i=='15') a = 3.5;
		else a = 0;
		
		return a*0.01;
	}
	function calSPR (SP, type) {
		var baseCorr=0;
		var SPR = 0;
		
		if (type=='斧') baseCorr=2;
		else if (type=='槍') baseCorr=1;
		
		if (SP<67) SPR = 1;
		else if (SP>=67 && SP<100) SPR = 2;
		else if (SP>=100 && SP<134) SPR = 3;
		else if (SP>=134 && SP<167) SPR = 4;
		else if (SP>=167 && SP<200) SPR = 5;
		else if (SP>=200 && SP<234) SPR = 6;
		else if (SP>=234) SPR = 7;
		else SPR = 7;
		
		SPR+=baseCorr;
		
		if (SPR>=7) SPR=7;
		
		return SPR;
	}
	function checkDS (i) {
		var SPpercent = 0;
		for (k=0;k<3;k++) {
			if (charactor[i].skill.ds[k].indexOf('SP+15%') !== -1) SPpercent += 15;
			else if (charactor[i].skill.ds[k].indexOf('SP+20%') !== -1) SPpercent += 20;
		}
		return SPpercent*0.01;
	}
	function weaponCheck (boxNum) {
		if (boxNum==3) {
			if ($('#weapon5').is(':checked')) $('#weapon5').attr('checked',false);
		}
		else if (boxNum==5) {
			if ($('#weapon3').is(':checked')) $('#weapon3').attr('checked',false);
		}
	}
