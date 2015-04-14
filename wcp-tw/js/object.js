function charAttr (charno, img2d, img3d, imgSrc, cname, ccname, cnName, phase, star, type, cv, appmedia, gamewith, famitsu, lv1hp, hp, hp4, lv1sp, sp, lv1atk, atk, atk4, lv1def, def, def4, lv1cri, cri, cri4, spr, sp1, sp2, sp3, sp4, ls1, ls2, as1, as1sp, as2, as2sp, ds1, ds2, ds3, spcComm, appmedia) {
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
	  this.cv=cv;
      this.lvMaxAttr={hp:[hp,'N/A','N/A','N/A',hp4,lv1hp], sp:[sp,sp1,sp2,sp3,sp4,lv1sp], atk:[atk,'N/A','N/A','N/A',atk4,lv1atk], def:[def,'N/A','N/A','N/A',def4,lv1def], cri:[cri,'N/A','N/A','N/A',cri4,lv1cri], spr:[spr,'N/A','N/A','N/A','N/A']};
      this.sprComm=spcComm;
      this.skill={ls:[ls1,ls2], as:[as1,as2], ds:[ds1,ds2,ds3], assp:[as1sp,as2sp]};
	  this.opinion={appmedia:appmedia, gamewith:gamewith, famitsu:famitsu};
	  
	  //回傳角色索引碼
	  this.getCharNo = function () {
		  return this.charno;
	  }

	  //回傳角色圖片(2D、3D、icon)
	  this.getImg = function (imgType) {
		  switch (imgType) {
			case '2d':
				return this.img2d;
				break;
			case '3d':
				return this.img3d;
				break;
			case 'icon':
				return this.imgSrc;
				break;
			default:
				break;
		  }
	  }
	  
	  //回傳角色日文名字
	  this.getJPname = function () {
		  return this.cName;
	  }
	  
	  //回傳角色暱稱
	  this.getNickname = function () {
		  return this.cnName;
	  }
	  
	  //回傳期數
	  this.getPhase = function () {
		  return this.phase;
	  }
	  
	  //回傳星數
	  this.getStar = function () {
		  return this.star;
	  }
	  
	  //回傳角色type
	  this.getType = function () {
		  return this.type;
	  }
	  
	  //回傳角色法米通評價
	  this.getOpinion = function (key) {
		switch (key) {
			case 'appmedia':
				return this.opinion.appmedia;
				break;
			default:
				break;
		}
	  }
	  
	  //回傳角色(0-4突)素質值 (已計算被動技)
	  this.getAttr = function (attr, index) {
		  switch (attr) {
			case 'HP':
				return this.lvMaxAttr.hp[index];
				break;
			case 'SP':
				return this.lvMaxAttr.sp[index];
				break;
			case 'ATK':
				return this.lvMaxAttr.atk[index];
				break;
			case 'DEF':
				return this.lvMaxAttr.def[index];
				break;
			case 'CRI':
				return this.lvMaxAttr.cri[index];
				break;
			case 'SPR':
				return this.lvMaxAttr.spr[index];
				break;
			default:
				break;
		  }
	  }
	  
	  //回傳角色(0-4突)原SP值 (扣除被動技)
	  this.getOriginalSP = function (index) {
		  var SPadd = this.getSPaddition();
		  return this.getAttr('SP', index)/(1+SPadd*0.01);
	  }
	  
	  //回傳被動技中SP的加成值
	  this.getSPaddition = function () {
		  var SPaddition = 0;
		  for (i=0;i<3;i++) {
			  if (this.getSkill('ds', i).indexOf('SP+15%') != -1) SPaddition += 15;
			  else if (this.getSkill('ds', i).indexOf('SP+20%') != -1) SPaddition += 20;
		  }
		  return SPaddition;
	  }
	  
	  //計算各情況下的SP
	  this.calSP = function (breakTime, bed, fast, arrow, arrowLV, magic, magicLV, weapon3, weapon5) {
		  var bedA		= 3*0.01;
		  var fastA		= 3*0.01;
		  var arrowA	= 1.5*2*0.01;
		  var magicA	= 3.5*2*0.01;
		  var weapon3A	= 3*0.01;
		  var weapon5A	= 5*0.01;
		  var dsA		= this.getSPaddition()*0.01;
		  
		  if (!bed) bedA = 0;
		  if (!fast) fastA = 0;
		  if (!weapon3) weapon3A = 0;
		  if (!weapon5) weapon5A = 0;
		  if (!arrow) arrowA = 0;
		  //else arrowA = calArrowA(arrowLV);
		  if (!magic) magicA = 0;
		  //else magicA = calMagicA(magicLV);
			  
		  var SPresult = 0;
		  var SPoriginal = 0;
		  
		  SPoriginal = this.getOriginalSP(breakTime);
		  
		  SPresult = SPoriginal*(1+dsA+weapon3A+weapon5A)*(1+bedA+fastA+arrowA+magicA);
		  //alert(SPresult);
		  return Math.floor(SPresult);
		  
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
	  
	  //計算弓研所等級的SP加成
	  function calArrowA (i) {
		var a=0;
		
		if (i=='3') a = 0.3;
		else if (i=='4' || i=='5' || i=='6') a = 0.6;
		else if (i=='7' || i=='8' || i=='9') a = 0.9;
		else if (i=='10' || i=='11' || i=='12') a = 1.2;
		else if (i=='13' || i=='14' || i=='15') a = 1.5;
		else a = 0;
		
		return a;
	}
	
	  //計算魔研所等級的SP加成
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
		
		return a;
	}
	  
	  //回傳隊長技、主動技、被動技、主動技SP消耗值
	  this.getSkill = function (skillType, index) {
		  switch (skillType) {
				case 'ls':	//隊長技能
					return this.skill.ls[index];
					break;
				case 'as':	//主動技能
					return this.skill.as[index];
					break;
				case 'ds':	//被動技能
					return this.skill.ds[index];
					break;
				case 'assp':	//主動技能SP消耗
					return this.skill.assp[index];
					break;
				default:
					break;
			}
	  }
	  
	  this.getCV = function () {
		return this.cv;
	  }
	  
	  //回傳評價
	  this.getOpinion = function (type) {
		switch (type){
			case 'appmedia':
				return this.opinion.appmedia;
			case 'gamewith':
				return this.opinion.gamewith;
			case 'famitsu':
				return this.opinion.famitsu;
			default:
				return 'ERROR_OPINION_TYPE';
		}
	  }
   }
	
function commAttr (charNo, comment, iTime) {
		this.charNo=charNo;
		this.iTime=iTime;
		this.comment=comment;
		
		//回傳留言所屬的角色索引碼
		this.getCharNo = function () {
			return this.charNo;
		}
		
		//回傳留言時間
		this.getInputTime = function () {
			return this.iTime;
		}
		
		//回傳留言
		this.getComment = function () {
			return this.comment;
		}
	}
function weaponAttr(wpno,name1,name2,name3,name4,name5,nickname,star,type,phase,src1,src2,src3,asComm,asSp,atk1,def1,cri1,add1,attr1,as1,ds1,atk2,def2,cri2,add2,attr2,as2,ds2,atk3,def3,cri3,add3,attr3,as3,ds3,atk4,def4,cri4,add4,attr4,as4,ds4,atk5,def5,cri5,add5,attr5,as5,ds5){
	this.wpNo = wpno;
	this.wpName=[name1,name2,name3,name4,name5];
	this.wpNickname=nickname;
	this.wpStar=star;
	this.wpType=type;
	this.wpPhase=phase;
	this.wpImg=[src1,src2,src3];
	this.asComm=asComm;
	this.asSp=asSp;
	this.wpAttr={atk:[atk1,atk2,atk3,atk4,atk5], def:[def1,def2,def3,def4,def5], cri:[cri1,cri2,cri3,cri4,cri5], add:[add1,add2,add3,add4,add5], attr:[attr1,attr2,attr3,attr4,attr5], as:[as1,as2,as3,as4,as5], ds:[ds1,ds2,ds3,ds4,ds5]};
	
	this.getAScomm=function(){
		return this.asComm;
	}
	this.getASsp=function(){
		return this.asSp;
	}
	this.getMax=function(){
		if(this.getName(5) != '-')return 5;
		else if(this.getName(4) != '-')return 4;
		else if(this.getName(3) != '-')return 3;
		else if(this.getName(2) != '-')return 2;
		else if(this.getName(1) != '-')return 1;
	}
	this.getNo=function(){return this.wpNo;}
	this.getName=function(index){return this.wpName[index-1];}
	this.getNickname=function(){return this.wpNickname;}
	this.getStar=function(){return this.wpStar;}
	this.getType=function(){return this.wpType;}
	this.getPhase=function(){return this.wpPhase;}
	this.getImg=function(index){
		if(index > 2)return this.wpImg[2];
		else return this.wpImg[index-1];
		}
	this.getAttr = function (attr, index) {
		  switch (attr) {
			case 'ATK':
				return this.wpAttr.atk[index-1];
				break;
			case 'DEF':
				return this.wpAttr.def[index-1];
				break;
			case 'CRI':
				return this.wpAttr.cri[index-1];
				break;
			case 'ADD':
				var add = this.wpAttr.add[index-1];
				var num = add.indexOf('L');
				if(num != -1){
					var frist = add.slice(0,num);
					var second = add.slice(num,add.length);
					return (frist + '<br />' + second);
				}
				return add;
				break;
			case 'ATTR':
				return this.wpAttr.attr[index-1];
				break;
			case 'AS':
				return this.wpAttr.as[index-1];
				break;
			case 'DS':
				return this.wpAttr.ds[index-1].replace('；','<br />');
				break;
			default:
				break;
		  }
	  }
}
