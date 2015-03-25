
	function getTime(){
		var Today = new Date();
		return Today.getFullYear() + ' / ' + parseInt(Today.getMonth()+1) + ' / ' + Today.getDate();
	}
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
                      JData.feed.entry[i].gsx$maxhp.$t,
                      JData.feed.entry[i].gsx$maxsp.$t,
                      JData.feed.entry[i].gsx$maxatk.$t,
                      JData.feed.entry[i].gsx$maxdef.$t,
                      JData.feed.entry[i].gsx$maxcri.$t,
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
    function charAttr (charno, img2d, img3d, imgSrc, cname, ccname, cnName, phase, star, type, hp, sp, atk, def, cri, spr, sp1, sp2, sp3, sp4, ls1, ls2, as1, as1sp, as2, as2sp, ds1, ds2, ds3, spcComm, gamewith) {
	  this.charno=charno;
	  this.img2d=img2d;
      this.img3d=img3d;
      this.imgSrc=imgSrc;
      this.cName=cname;
      this.ccName=ccname;
      this.cnName=cnName;
      this.phase=phase;
      this.star=star;
      this.type=type;
      this.lvMaxAttr={hp:hp, sp:[sp,sp1,sp2,sp3,sp4], atk:atk, def:def, cri:cri, spr:spr};
      this.sprComm=spcComm;
      this.skill={ls:[ls1,ls2], as:[as1,as1sp,as2,as2sp], ds:[ds1,ds2,ds3]};
      this.gamewith=gamewith;
    }
	function commAttr (charNo, comment, iTime) {
		this.charNo=charNo;
		this.iTime=iTime;
		this.comment=comment;
	}
	function setKey(target){
		target.onkeyup = function(e){
			loadcomment();
			$("#result").html("");
			for(var i in charactor){
				if (target.value.length <= 0) {
					return $("#result").html("");
				}
				var keyword = target.value.trim().split(" ");
				if(checkpost(keyword,target.value.trim(),i) == true)
				{
					var color = typecolor(charactor[i].type);
					resultStatus(i,color);
					resultSkill(i);
					resultReport(i);
					resultComment(i);
				}
			}	
		}
	}
	function checkpost(keyword,key,i){
		var checknum = 0;
		var checknum2 = 0;
		for(var n in keyword){
			if(keyword[n] !== ""){checknum2++;	// prevent 2 spaces together, cannot use keyword.length (num of element of keyword array)
			if(charactor[i].cName.toLowerCase().indexOf(keyword[n].toLowerCase()) !== -1) checknum++;    // !==-1 -> is match
			if(charactor[i].cnName.toLowerCase().indexOf(keyword[n].toLowerCase()) !== -1) checknum++;
			if(charactor[i].type.indexOf(keyword[n]) !== -1) checknum++;
			if(charactor[i].phase.indexOf(keyword[n]) !== -1) checknum++;
			if(charactor[i].star.indexOf(keyword[n]) !== -1) checknum++;}
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
    function submitReport (i) {
      var nid ='reportContent' + charactor[i].charno;
      var result = 'https://docs.google.com/forms/d/1s1YJ1n80Ow5eSc9VvjgoTeSxsJ6KRi3zF1lw1Xp8ZUk/formResponse?'
                   + 'entry.1948090599=' + document.getElementById(nid).value
                   + '&entry.261850290=' + charactor[i].charno
                   + '&submit=Submit';
      $.getScript(result);
      $('#'+nid).val("");
      $('#report'+i).modal("hide");
    }
      
	function submitcom (i) {
		var nid = 'inputCommt' + charactor[i].charno;
		var result = 'https://docs.google.com/forms/d/1NJxcKOtlviztl54Em5esFJS3tejv-WGX2fYvH9azEqA/formResponse?'
					+ 'entry.1562942030=' + charactor[i].charno
					+ '&entry.2001095882=' + document.getElementById(nid).value
					+ '&entry.714632310=' + getTime()
					+ '&submit=Submit';			
		$.getScript(result);
		var commt = document.getElementById(nid).value;
		document.getElementById(nid).value = "";
		nid = 'comm' + charactor[i].charno;
		document.getElementById(nid).innerHTML = makecomment(i,commt,1);
		commentG=[];
		commentG = loadcomment(urlScript2);
	}
	function resultStatus(i,color){
		$("#result").append('<table class="table" id="charTable"><tr>'
							+ '<td id="imgtd"><a href="#" data-toggle="modal" data-target="#img2d3d' + i + '"><img style="width:70px;" src="' + charactor[i].imgSrc + '"></img></a></td>'
							+ '<td style="width:450px;" id="charNametd"><span class="tag-label" style="background:' + color + ';">' + charactor[i].phase + '</span>'    //phase
							+ '<span class="tag-label" style="background:' + color + ';">' + charactor[i].star + '</span>'                         //star
							+ '<span class="tag-label" style="background:' + color + ';">' + charactor[i].type +'</span>'                          //type
							+ '<br/>' + charactor[i].cName                                              //chinese name
							+ '<br/>' + charactor[i].cnName + '</td>'
							+ '<td id="attrtd"><table id="innerCharTable"><tr><td id="attrInnertd" style="background:' + color + ';">LV.100</td>'  //table of LV100 attribute
							+ '<td class="attrInnertd">HP '+ charactor[i].lvMaxAttr.hp + '</td>'
							+ '<td class="attrInnertd">SP '+ charactor[i].lvMaxAttr.sp[0] + '</td>'
							+ '<td class="attrInnertd">ATK '+ charactor[i].lvMaxAttr.atk + '</td>'
							+ '<td class="attrInnertd">DEF '+ charactor[i].lvMaxAttr.def + '</td>'
							+ '<td class="attrInnertd">CRI '+ charactor[i].lvMaxAttr.cri + '</td>'
							+ '<td class="attrInnertd">SPR '+ charactor[i].lvMaxAttr.spr + '</td></tr></table>'
							+ '<table id="innerCharTable"><tr>'
							+ '<td id="attrInnertd" style="width:6em;background:#fff; color:#000;padding-left:15px;">'
							+ '<a href="#" data-toggle="modal" data-target="#calSP" onClick=calClick(' + i + ',' + 0 + ')>SPR計算</a>' + '</td>'
							+ '<td id="attrInnertd" style="padding-left:2em;text-align:left;background:#fff;color:#000;width:450px;">' + makeSPRcomment(i) + '</td>'
							+ '<td class="attrInnertd" style="float:right;text-align:right;background:#fff;width:150px;text-align:left;"><span style="border:2px solid '+color+';color:'+color+';padding:.2em .5em .2em .5em;width:150px;display:block;">appmedia評價：' + charactor[i].gamewith + '</span></td>'
							+ '</tr></table></td>'
							+ '<td id="more"><a style="display:block;width:2em;" href="#char' + i + ' "data-toggle="collapse">更多</a>'      //more button
							+ '<a style="display:block;width:2em;" href="#comm' + charactor[i].charno + ' "data-toggle="collapse">評價</a>'
							+ '<a style="display:block;width:2em;" href="#" data-toggle="modal" data-target="#report' + i + '">回報</a>' + '</td>'				//comment button
							+ '</tr>');
		$("#result").append('<div class="modal fade" id="img2d3d' + i + '" taindex="-1" role="dialog" aria-labelledby="reportLabel" aria-hidden="true">'
							+ '<div class="modal-dialog">'
                            + '<div class="modal-content">'
                            + '<div class="modal-header">'
							+ '<h4 class="modal-title" id="reportLabel">' + charactor[i].cName + '</h4>'
							+ '</div>'
                            + '<div class="modal-body" style="text-align:center;">'
                            + '<div style="display:block;">'
							+ '<img class="img2dC" src="' + charactor[i].img2d + '"/>'
                            + '<img class="img2dC" src="' + charactor[i].img3d + '"/>'
                            + '</div>'
                            + '</div>'
							+ '</div>' 
                            + '</div>'
							+ '</div>');
	}
	function resultSkill(i){
		$("#result").append('<div id="char' + i + '" class="collapse">'
							+ '<table class="table" id="skillTable"><tr>'
							+ '<tr><td id="titletd">隊長技能1</td><td>' + charactor[i].skill.ls[0] + '</td></tr>'
							+ '<tr><td id="titletd">隊長技能2</td><td>' + charactor[i].skill.ls[1] + '</td></tr>'
							+ '<tr><td id="titletd">主動技能1</td><td>' + charactor[i].skill.as[0] + '<br/>消費SP：' + charactor[i].skill.as[1] + '</td></tr>'
							+ '<tr><td id="titletd">主動技能2</td><td>' + charactor[i].skill.as[2] + '<br/>消費SP：' + charactor[i].skill.as[3] + '</td></tr>'
							+ '<tr><td id="titletd">被動技能</td><td>' + charactor[i].skill.ds[0] + '<br/>'
							+ charactor[i].skill.ds[1] + '<br/>'
							+ charactor[i].skill.ds[2] 
							+ '</td></tr></table></div>');
	}
	function resultReport(i){
		$("#result").append('<div class="modal fade" id="report' + i + '" taindex="-1" role="dialog" aria-labelledby="reportLabel" aria-hidden="true">'
							+ '<div class="modal-dialog">'
							+ '<div class="modal-content">'
							+ '<div class="modal-header">'
							+ '<h4 class="modal-title" id="reportLabel">' + charactor[i].cName + ' 的錯誤回報</h4>'
							+ '</div>'
							+ '<div class="modal-body">'
							+ '<div class="form-group">'
							+ '<label for="message-text" class="control-label">回報內容:</label>'
							+ '<textarea id="reportContent' + charactor[i].charno + '" class="form-control" id="message-text"></textarea>'
							+ '</div></form></div>'
							+ '<div class="modal-footer">'
							+ '<button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>'
							+ '<button type="button" class="btn btn-primary" onclick=submitReport(' + i + ')>傳送</button>'
							+ '</div>'
							+ '</div>' 
							+ '</div>'
							+ '</div>');
	}
	function resultComment(i){
		var comment = '<div id="comm' + charactor[i].charno + '" class="collapse">' + makecomment(i,"",0) + '</div>';
		$("#result").append(comment);
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
		}
		if (charactor[i].type=='斧') {
			baseCorr = 2;
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
		$('#calAns').append('<span style="font-size:18px;">SPR = ' + calSPR(totalSP, baseCorr) + '</span>');
		
	}
	function calSPR (SP, baseCorr) {
		var SPR = 0;
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
    function makeSPRcomment (i) {
		var SPRcomment = '';
		baseCorr=0;
		bedA=3*0.01;
		arrowA=1.5*2*0.01;
		magicA=3.5*2*0.01;
		firstSPR=0;
		secondSPR=0;
		brFlag=false;
		nullFlag=true;
		if (charactor[i].type=='斧') baseCorr=2;
		else if (charactor[i].type=='槍') baseCorr=1;
		
		//突破
		for (j=1;j<5;j++) {
			if (calSPR(charactor[i].lvMaxAttr.sp[j],baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
				SPRcomment+=j + '突回' + calSPR(charactor[i].lvMaxAttr.sp[j],baseCorr) + '；';
				firstSPR=calSPR(charactor[i].lvMaxAttr.sp[j],baseCorr);
				brFlag=true;
				nullFlag=false;
				break;
			}
		}
		
		//羊床
		if (calSPR(charactor[i].lvMaxAttr.sp[0]*(1+bedA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
			SPRcomment+='羊床 = 回' + calSPR(charactor[i].lvMaxAttr.sp[0]*(1+bedA),baseCorr) + '；';
			firstSPR=calSPR(charactor[i].lvMaxAttr.sp[j],baseCorr);
			brFlag=true;
			nullFlag=false;
		}
		
		if (brFlag) {
			SPRcomment+='<br/>';
			brFlag=false;
		}
		
		//突破 + 羊床
		for (j=1;j<5;j++) {
			if (calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)
				& calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA),baseCorr) > firstSPR) {
				SPRcomment+=j + '突 + 羊床 = 回' + calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA),baseCorr) + '；';
				SPRcomment+='<br/>';
				firstSPR = calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA),baseCorr);
				nullFlag=false;
				break;
			}
		}
		
		//突破 + 羊床 + 研究所(法、弓)
		if (charactor[i].type=='法') {
			for (j=1;j<5;j++) {
				if (calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+magicA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)
					& calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+magicA),baseCorr) > firstSPR) {
					SPRcomment+=j + '突 + 羊床 + 研究所 = 回' + calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+magicA),baseCorr) + '；';
					firstSPR = calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+magicA),baseCorr);
					nullFlag=false;
					break;
				}
			}
		}
		else if (charactor[i].type=='弓') {
			for (j=1;j<5;j++) {
				if (calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+arrowA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)
					& calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+arrowA),baseCorr) > firstSPR) {
					SPRcomment+=j + '突 + 羊床 + 研究所 = 回' + calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+arrowA),baseCorr) + '；';
					firstSPR = calSPR(charactor[i].lvMaxAttr.sp[j]*(1+bedA+arrowA),baseCorr);
					nullFlag=false;
					break;
				}
			}	
		}
		
		//突破 + 羊床 + 研究所(法、弓) + 武器+SP3%
		if (charactor[i].type=='法') {
			for (j=1;j<5;j++) {
				var originalSP = charactor[i].lvMaxAttr.sp[j]/(1+checkDS(i));
				if (calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) > firstSPR
					& calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
					SPRcomment += j + '突破+羊床+研究所+武器SP3% = 回' + calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) + '；';
					secondSPR = calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+magicA),baseCorr);
					brFlag=true;
					nullFlag = false;
					break;
				}
			}
		}
		else if (charactor[i].type=='弓') {
			for (j=1;j<5;j++) {
				var originalSP = charactor[i].lvMaxAttr.sp[j]/(1+checkDS(i));
				if (calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+arrowA),baseCorr) > firstSPR
					& calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+arrowA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
					SPRcomment += j + '突破+羊床+研究所+武器SP3% = 回' + calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+arrowA),baseCorr) + '；';
					secondSPR = calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA+arrowA),baseCorr);
					brFlag=true;
					nullFlag = false;
					break;
				}
			}
		}
		else {
			for (j=1;j<5;j++) {
				var originalSP = charactor[i].lvMaxAttr.sp[j]/(1+checkDS(i));
				if (calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA),baseCorr) > firstSPR
					& calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
					SPRcomment += j + '突破+羊床+武器SP3% = 回' + calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA),baseCorr) + '；';
					secondSPR = calSPR(originalSP*(1+3*0.01+checkDS(i))*(1+bedA),baseCorr);
					brFlag=true;
					nullFlag = false;
					break;
				}
			}
		}
		
		if (brFlag) {
			SPRcomment+='<br/>';
			brFlag=true;
		}
		
		//突破 + 羊床 + 研究所(法、弓) + 武器+SP5% (暫時只有劍、槍、法)
		if (charactor[i].type=='法') {
			for (j=1;j<5;j++) {
				var originalSP = charactor[i].lvMaxAttr.sp[j]/(1+checkDS(i));
				//SPRcomment+='<br/>' + originalSP;
				if (calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) > firstSPR
					& calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
					SPRcomment += j + '突破+羊床+研究所+武器SP5% = 回' + calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA+magicA),baseCorr) + '；';
					nullFlag = false;
					break;
				}
			}
		}
		else if (charactor[i].type=='劍' || charactor[i].type=='槍' || charactor[i].type=='拳') {
			for (j=1;j<5;j++) {
				var originalSP = charactor[i].lvMaxAttr.sp[j]/(1+checkDS(i));
				//SPRcomment+='<br/>' + originalSP;
				//SPRcomment+='<br/>' + calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA),baseCorr);
				if (calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA),baseCorr) > firstSPR
					& calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA),baseCorr) > calSPR(charactor[i].lvMaxAttr.sp[0],baseCorr)) {
					SPRcomment += j + '突破+羊床+武器SP5% = 回' + calSPR(originalSP*(1+5*0.01+checkDS(i))*(1+bedA),baseCorr) + '；';
					nullFlag = false;
					break;
				}
			}
		}
		
		if (nullFlag) SPRcomment+='-';
		return SPRcomment;
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