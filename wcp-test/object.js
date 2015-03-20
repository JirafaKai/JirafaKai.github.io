
	function getTime(){
		var Today = new Date();
		return Today.getFullYear() + ' / ' + parseInt(Today.getMonth()+1) + ' / ' + Today.getDate();
	}
	function getData(target,urlScript){
		var charactor = [];
		$.getJSON(urlScript, 
			function(JData){
				for (var i in JData.feed.entry){
                      charactor[i] = new charAttr(
					  JData.feed.entry[i].gsx$charno.$t,
                      JData.feed.entry[i].gsx$imgsrc.$t,
                      JData.feed.entry[i].gsx$charname.$t,
                      JData.feed.entry[i].gsx$ccharname.$t,
                      JData.feed.entry[i].gsx$charnickname.$t,
                      JData.feed.entry[i].gsx$phase.$t,
                      JData.feed.entry[i].gsx$charstar.$t,
                      JData.feed.entry[i].gsx$chartype.$t,
                      JData.feed.entry[i].gsx$maxhp.$t,
                      JData.feed.entry[i].gsx$hyperhp.$t,
                      JData.feed.entry[i].gsx$maxsp.$t,
                      JData.feed.entry[i].gsx$hypersp.$t,
                      JData.feed.entry[i].gsx$maxatk.$t,
                      JData.feed.entry[i].gsx$hyperatk.$t,
                      JData.feed.entry[i].gsx$maxdef.$t,
                      JData.feed.entry[i].gsx$hyperdef.$t,
                      JData.feed.entry[i].gsx$maxcri.$t,
                      JData.feed.entry[i].gsx$hypercri.$t,
                      JData.feed.entry[i].gsx$spr.$t,
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
		}
		return charactor;
	}
    function charAttr (charno, imgSrc, cname, ccname, cnName, phase, star, type, hp, hhp, sp, hsp, atk, hatk, def, hdef, cri, hcri, spr, ls1, ls2, as1, as1sp, as2, as2sp, ds1, ds2, ds3, spcComm, gamewith) {
	  this.charno=charno;
      this.imgSrc=imgSrc;
      this.cName=cname;
      this.ccName=ccname;
      this.cnName=cnName;
      this.phase=phase;
      this.star=star;
      this.type=type;
      this.lvMaxAttr={hp:hp, sp:sp, atk:atk, def:def, cri:cri, spr:spr};
      this.hyperAttr={hp:hhp, sp:hsp, atk:hatk, def:hdef, cri:hcri};
      this.sprComm=spcComm;
      this.skill={ls:[ls1,ls2], as:[as1,as1sp,as2,as2sp], ds:[ds1,ds2,ds3]};
      this.gamewith=gamewith;
    }