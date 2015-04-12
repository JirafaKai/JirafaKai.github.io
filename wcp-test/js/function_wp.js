	//從GOOGLE表單中取得角色資料
	function getData(target,urlScript){
		$.getJSON(urlScript, 
			function(JData){
				for (var i in JData.feed.entry){
                      weapon[i] = new weaponAttr(
					  JData.feed.entry[i].gsx$wno.$t,
					  JData.feed.entry[i].gsx$wname1.$t,
					  JData.feed.entry[i].gsx$wname2.$t,
					  JData.feed.entry[i].gsx$wname3.$t,
					  JData.feed.entry[i].gsx$wname4.$t,
					  JData.feed.entry[i].gsx$wname5.$t,
					  JData.feed.entry[i].gsx$wnickname.$t,
					  JData.feed.entry[i].gsx$star.$t,
					  JData.feed.entry[i].gsx$type.$t,
					  JData.feed.entry[i].gsx$phase.$t,
					  JData.feed.entry[i].gsx$src1.$t,
					  JData.feed.entry[i].gsx$src2.$t,
					  JData.feed.entry[i].gsx$src3.$t,
					  JData.feed.entry[i].gsx$ascomm.$t,
					  JData.feed.entry[i].gsx$assp.$t,
					  JData.feed.entry[i].gsx$atk1.$t,
					  JData.feed.entry[i].gsx$def1.$t,
					  JData.feed.entry[i].gsx$cri1.$t,
					  JData.feed.entry[i].gsx$add1.$t,
					  JData.feed.entry[i].gsx$attr1.$t,
					  JData.feed.entry[i].gsx$as1.$t,
					  JData.feed.entry[i].gsx$ds1.$t,
					  JData.feed.entry[i].gsx$atk2.$t,
					  JData.feed.entry[i].gsx$def2.$t,
					  JData.feed.entry[i].gsx$cri2.$t,
					  JData.feed.entry[i].gsx$add2.$t,
					  JData.feed.entry[i].gsx$attr2.$t,
					  JData.feed.entry[i].gsx$as2.$t,
					  JData.feed.entry[i].gsx$ds2.$t,
					  JData.feed.entry[i].gsx$atk3.$t,
					  JData.feed.entry[i].gsx$def3.$t,
					  JData.feed.entry[i].gsx$cri3.$t,
					  JData.feed.entry[i].gsx$add3.$t,
					  JData.feed.entry[i].gsx$attr3.$t,
					  JData.feed.entry[i].gsx$as3.$t,
					  JData.feed.entry[i].gsx$ds3.$t,
					  JData.feed.entry[i].gsx$atk4.$t,
					  JData.feed.entry[i].gsx$def4.$t,
					  JData.feed.entry[i].gsx$cri4.$t,
					  JData.feed.entry[i].gsx$add4.$t,
					  JData.feed.entry[i].gsx$attr4.$t,
					  JData.feed.entry[i].gsx$as4.$t,
					  JData.feed.entry[i].gsx$ds4.$t,
					  JData.feed.entry[i].gsx$atk5.$t,
					  JData.feed.entry[i].gsx$def5.$t,
					  JData.feed.entry[i].gsx$cri5.$t,
					  JData.feed.entry[i].gsx$add5.$t,
					  JData.feed.entry[i].gsx$attr5.$t,
					  JData.feed.entry[i].gsx$as5.$t,
					  JData.feed.entry[i].gsx$ds5.$t
					  
					  
                    );
				}
			target.remove();
		});
	}
	//主程式
	function setKey(target){
		target.onkeyup = function(e){
			$("#weapon-data").html("");
			for(var i in weapon){
				var keyword = target.value.trim().split(" ");
				if(checkpost(keyword,target.value.trim(),i) == true)
					weaponData(weapon[i]);
			}	
		}
	}
	//搜尋關鍵字
	function checkpost(keyword,key,i){
		var checknum = 0;
		var checknum2 = 0;
		for(var n in keyword){
			if(keyword[n] != ""){checknum2++;	// prevent 2 spaces together, cannot use keyword.length (num of element of keyword array)
			for(var k=1;k<=5;k++){
			var check = false;
			if(weapon[i].getName(k).toLowerCase().indexOf(keyword[n].toLowerCase()) != -1) {check = true;break;}
			}
			if(check == true)checknum++;
			else if(weapon[i].getNickname().toLowerCase().indexOf(keyword[n].toLowerCase()) != -1) checknum++;
			else if(weapon[i].getType().indexOf(keyword[n]) != -1) checknum++;
			else if(weapon[i].getPhase().indexOf(keyword[n]) != -1) checknum++;
			else if(weapon[i].getStar().indexOf(keyword[n]) != -1) checknum++;
		}
		}
		if((checknum >= checknum2) && key.length != 0)
			return true;
		else return false;
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
	function weaponData(myWp){
		$("#weapon-data").append('<div id="weapon-data-each-' + myWp.getNo() + '" class="weapon-data-each"></div>');
		var target = $('#weapon-data-each-'+myWp.getNo());
		weaponDataEach(target,myWp);
	}
	function weaponDataEach(target,myWp){
		target.append(
			'<div id="weaponStatus' + myWp.getNo() + '"></div>'
			+'<div id="weaponMore' + myWp.getNo() + '" class="weapon-more"></div>'
		);
		var color = typecolor(myWp.getType());
		var nTarget = $('#weaponStatus'+myWp.getNo());
		weaponImg(nTarget,myWp);
		weaponSData(nTarget,myWp,color);
		weaponAData(nTarget,myWp,color);
		nTarget = $('#weaponMore'+myWp.getNo());
		weaponMore(nTarget,myWp,color);
		intbtnactive(myWp);
	}
	function weaponImg(target,myWp){
		target.append(
			'<div id="weaponIcon' + myWp.getNo() + '" class="weapon-icon-wrapper display-ib">'
			+'<img id="weaponImg' + myWp.getNo() + '" class="weapon-icon" src="' + myWp.getImg(myWp.getMax()) + '"/></div>'
		);
	}
	function weaponSData(target,myWp,color){
		target.append(
			'<div class="weapon-simple-data display-ib position-a">'
			+'<span class="span-tag" style="background:'+color+';">'+myWp.getStar()+'</span>\n'
			+'<span class="span-tag" style="background:'+color+';">'+myWp.getType()+'</span>\n'
			+'<span class="span-tag" style="background:'+color+';">'+myWp.getPhase()+'</span>\n'
			+'<div id="wpName'+myWp.getNo()+'" class="weapon-name">'+myWp.getName(myWp.getMax())+'</div>'
			+'<span class="weapon-nname">'+myWp.getNickname()+'</span>'
			+'</div>'
			+'<div style="position:absolute;right:0;top:0;" class="hidden-lg hidden-md">'
			+'<a href="#more-'+myWp.getNo()+'" data-toggle="collapse">更多</a>'
			+'</div>'
		);
	}
	function weaponAData(target,myWp,color){
		target.append(
			'<div class="weapon-attr display-ib float-r hidden-xs hidden-sm">'
			+'<table style="margin-bottom:10px;word-break:break-all;" class="table table-bordered weapon-table">'
			+'<thead><tr>'
			+'<th class="th" style="background:'+color+'">攻擊</th>'
			+'<th class="th" style="background:'+color+'">防御</th>'
			+'<th class="th" style="background:'+color+'">會心</th>'
			+'<th class="th" style="background:'+color+'">追加</th>'
			+'<th class="th" style="background:'+color+'">屬性</th>'
			+'<th class="th-s" style="background:'+color+'">AS</th>'
			+'<th class="th-s" style="background:'+color+'">DS</th>'
			+'</tr></thead>'
			+'<tr><td id="wpStatus-1-'+myWp.getNo()+'big">'+myWp.getAttr('ATK',myWp.getMax())+'</td>'
			+'<td id="wpStatus-2-'+myWp.getNo()+'big">'+myWp.getAttr('DEF',myWp.getMax())+'</td>'
			+'<td id="wpStatus-3-'+myWp.getNo()+'big">'+myWp.getAttr('CRI',myWp.getMax())+'</td>'
			+'<td id="wpStatus-4-'+myWp.getNo()+'big">'+myWp.getAttr('ADD',myWp.getMax())+'</td>'
			+'<td id="wpStatus-5-'+myWp.getNo()+'big">'+myWp.getAttr('ATTR',myWp.getMax())+'</td>'
			+'<td id="wpStatus-6-'+myWp.getNo()+'big">'+genASeffect(myWp,myWp.getMax())+'</td>'
			+'<td id="wpStatus-7-'+myWp.getNo()+'big">'+myWp.getAttr('DS',myWp.getMax())+'</td>'
			+'</tr></table>'
			+weaponButton(myWp,'big') + '</div>'
		);
	}
	function genASeffect(myWp,lv){
		var rString="";
		if (myWp.getAttr('AS',lv)=='-')
			return '-';
		rString ='<span class="mytooltip">'
				+'<span class="mytooltip-item">'
				+myWp.getAttr('AS',lv)
				+'</span>'
				+'<span class="mytooltip-content clearfix">'
				+'<span class="mytooltip-text">'
				+myWp.getAScomm()
				+'<br/><span class="sp-span">'
				+'消費SP：'+myWp.getASsp()
				+'</span>'
				+'</span>'
				+'</span>'
				+'</span>';
		return rString;
	}
	function genASsmall(myWp,lv,color){
		var rString;
		if (myWp.getAttr('AS',lv)=='-')
			return '-';
		
		rString='<span class="AS-small-title" style="color:'+color+';">'
				+myWp.getAttr('AS',lv)
				+'</span>'
				+'<br/><span>'
				+myWp.getAScomm()
				+'</span>'
				+'<br/><span class="sp-span">'
				+'SP消費：'+myWp.getASsp()
				+'</span>'
		return rString;
	}
	function weaponMore(target,myWp,color){
		target.html(
			'<div id="more-'+myWp.getNo()+'" class="collapse weapon-attr display-ib float-l hidden-md hidden-lg">'
			+'<table style="word-break:break-all;margin-bottom:10px;" class="weapon-table table table-bordered">'
			+'<thead><tr><th class="th" style="background:'+color+'">攻擊</th>'
			+'<th class="th" style="background:'+color+'">防御</th>'
			+'<th class="th" style="background:'+color+'">會心</th>'
			+'<th class="th" style="background:'+color+'">追加</th>'
			+'<th class="th" style="background:'+color+'">屬性</th>'
			+'</tr></thead>'
			+'<tr><td id="wpStatus-1-'+myWp.getNo()+'">'+myWp.getAttr('ATK',myWp.getMax())+'</td>'
			+'<td id="wpStatus-2-'+myWp.getNo()+'">'+myWp.getAttr('DEF',myWp.getMax())+'</td>'
			+'<td id="wpStatus-3-'+myWp.getNo()+'">'+myWp.getAttr('CRI',myWp.getMax())+'</td>'
			+'<td id="wpStatus-4-'+myWp.getNo()+'">'+myWp.getAttr('ADD',myWp.getMax())+'</td>'
			+'<td id="wpStatus-5-'+myWp.getNo()+'">'+myWp.getAttr('ATTR',myWp.getMax())+'</td>'
			+'</tr><tr>'
			+'<th class="th-s" style="background:'+color+'">AS</th>'
			+'<td id="wpStatus-6-'+myWp.getNo()+'" colspan="4" class="ta-left">'+genASsmall(myWp,myWp.getMax(),color)+'</td>'
			+'</tr><tr>'
			+'<th class="th-s" style="background:'+color+'">DS</th>'
			+'<td id="wpStatus-7-'+myWp.getNo()+'" colspan="4" class="ta-left">'+myWp.getAttr('DS',myWp.getMax())+'</td>'
			+'</tr></table>'
			+weaponButton(myWp,'')
			+'</div>'
		);
	}
	function weaponButton(myWp,which){
		var max = myWp.getMax();
		var work = '';
		var colorClass = 'button-';
		if (myWp.getType()=='劍') colorClass+='red';
		else if (myWp.getType()=='拳') colorClass+='yellow';
		else if (myWp.getType()=='斧') colorClass+='blue';
		else if (myWp.getType()=='槍') colorClass+='green';
		else if (myWp.getType()=='弓') colorClass+='orange';
		else if (myWp.getType()=='法') colorClass+='purple';
		else if (myWp.getType()=='雙刀') colorClass+='pink';
		
		if(which == 'big')work += '<div class="weapon-button-group hidden-xs hidden-sm">';
		else work += '<div class="weapon-button-group hidden-lg hidden-md">';
		work +='<button id="wpBtn-1-'+myWp.getNo()+which+'" class="' + colorClass + ' weapon-button" tabindex="0" onclick="buttonHandler(1,'+findMyI(myWp) + ')">一階</button>';
		if(max > 1)work += '<button id="wpBtn-2-'+myWp.getNo()+which+'" class="' + colorClass + ' weapon-button" onclick="buttonHandler(2,'+findMyI(myWp) + ')">二階</button>';
		if(max > 2)work += '<button id="wpBtn-3-'+myWp.getNo()+which+'" class="' + colorClass + ' weapon-button" onclick="buttonHandler(3,'+findMyI(myWp) + ')">三階</button>';
		if(max > 3)work += '<button id="wpBtn-4-'+myWp.getNo()+which+'" class="' + colorClass + ' weapon-button" onclick="buttonHandler(4,'+findMyI(myWp) + ')">四階</button>';
		if(max > 4)work += '<button id="wpBtn-5-'+myWp.getNo()+which+'" class="' + colorClass + ' weapon-button" onclick="buttonHandler(5,'+findMyI(myWp) + ')">五階</button>';
		work += '</div>';
		return work;
	}
	function intbtnactive(myWp){
		$('#wpBtn-' + myWp.getMax() + '-' + myWp.getNo()).addClass("active");
		$('#wpBtn-' + myWp.getMax() + '-'+ myWp.getNo() + 'big').addClass("active");
	}
	function buttonHandler(lv,i){
		var myWp = weapon[i];
		var wpNo = myWp.getNo();
		for (w=1;w<8;w++){
			$('#wpBtn-' + w + '-' + wpNo).removeClass("active");
			$('#wpBtn-' + w + '-'+ wpNo + 'big').removeClass("active");
		}
		$('#wpBtn-' + lv + '-' + wpNo).addClass("active");
		$('#wpBtn-' + lv + '-'+ wpNo + 'big').addClass("active");
		
		$('#weaponImg'+wpNo).attr("src",myWp.getImg(lv));
		$('#wpName' + wpNo).html(myWp.getName(lv));
		$('#wpStatus-1-' + wpNo + 'big').html(myWp.getAttr('ATK',lv));
		$('#wpStatus-2-' + wpNo + 'big').html(myWp.getAttr('DEF',lv));
		$('#wpStatus-3-' + wpNo + 'big').html(myWp.getAttr('CRI',lv));
		$('#wpStatus-4-' + wpNo + 'big').html(myWp.getAttr('ADD',lv));
		$('#wpStatus-5-' + wpNo + 'big').html(myWp.getAttr('ATTR',lv));
		$('#wpStatus-6-' + wpNo + 'big').html(genASeffect(myWp,lv));
		$('#wpStatus-7-' + wpNo + 'big').html(myWp.getAttr('DS',lv));
		$('#wpStatus-1-' + wpNo).html(myWp.getAttr('ATK',lv));
		$('#wpStatus-2-' + wpNo).html(myWp.getAttr('DEF',lv));
		$('#wpStatus-3-' + wpNo).html(myWp.getAttr('CRI',lv));
		$('#wpStatus-4-' + wpNo).html(myWp.getAttr('ADD',lv));
		$('#wpStatus-5-' + wpNo).html(myWp.getAttr('ATTR',lv));
		$('#wpStatus-6-' + wpNo).html(myWp.getAttr('AS',lv));
		$('#wpStatus-7-' + wpNo).html(myWp.getAttr('DS',lv));
	}
	function findMyI(myWp){
		for(var i in weapon){
			if(myWp.getNo() == weapon[i].getNo())
				return i;
		}
	}
	function setnavbtn(){
		$('#navcharbtn').removeClass("active");
		$('#navweaponbtn').addClass("active");
	}