
function charAttr(data) {
	  this.imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
	  this.charno=data[0];
      this.jName=data[1];
	  this.cName=data[2];
      this.nName=data[3];
      this.star=data[4];
      this.type=data[5];
	  this.job=data[6];
	  this.phase=data[7];
	  this.costb=data[8];
	  this.costa=data[9];
	  this.cv=data[10];
	  this.imgSrc=this.imgRoot + '/icon/' + this.charno + '.png';
	  this.img2d=this.imgRoot + '/img2d/' + this.charno + '.png';
	  this.img3d=this.imgRoot + '/img3d/' + this.charno + '.png';
	  
      this.attr={hp:[data[15],data[20],data[25]], sp:[data[16],data[21],data[26]], atk:[data[17],data[22],data[27]], def:[data[18],data[23],data[28]], cri:[data[19],data[24],data[29]]};
      this.lskill={jlsname:[data[30],data[31]], clsname:[data[32],data[33]], lsef:[data[34],data[35]]};
	  this.pskill=[data[36],data[37],data[38]];
	  this.askill={asOrder:[data[39],data[45]],jasname:[data[40],data[46]],casname:[data[41],data[47]],assp:[data[42],data[48]],ascomment:[data[43],data[49]],asdetails:[data[44],data[50]]};
	  
	  
	  
	  
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
		  return this.jName;
	  }
	  
	  this.getCNname = function () {
		  return this.cName;
	  }
	  
	  //回傳角色暱稱
	  this.getNickname = function () {
		  return this.nName;
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
	  this.getJob = function () {
		  return this.job;
	  }
	  
	  //回傳角色(0-4突)素質值 (已計算被動技)
	  this.getAttr = function (attr, index) {
		  switch (attr) {
			case 'HP':
				return this.attr.hp[index];
				break;
			case 'SP':
				return this.attr.sp[index];
				break;
			case 'ATK':
				return this.attr.atk[index];
				break;
			case 'DEF':
				return this.attr.def[index];
				break;
			case 'CRI':
				return this.attr.cri[index];
				break;
			default:
				break;
		  }
	  }
	  
	  
	  //回傳隊長技、主動技、被動技、主動技SP消耗值
	  this.getaSkill = function (skillType, index) {
		  switch (skillType) {
				case 'order':
					return this.askill.asOrder[index];
					break;
				case 'jn':
					return this.askill.jasname[index];
					break;
				case 'cn':
					return this.askill.casname[index];
					break;
				case 'sp':
					return this.askill.assp[index];
					break;
				case 'comment':
					return this.askill.ascomment[index];
					break;
				case 'details':
					return this.askill.asdetails[index];
					break;
				default:
					break;
			}
	  }
	  
	  this.getlSkill = function (skillType, index) {
		  switch (skillType) {
				case 'jn':
					return this.lskill.jlsname[index];
					break;
				case 'cn':
					return this.lskill.clsname[index];
					break;
				case 'ef':
					return this.lskill.lsef[index];
					break;
				default:
					break;
			}
	  }
	  
	  this.getpSkill = function (index) {
		  return this.pskill[index];
	  }
	  
	  this.getCV = function () {
		return this.cv;
	  }
   }