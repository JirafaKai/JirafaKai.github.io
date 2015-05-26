
function charAttr(data) {
	  this.imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
	  this.charno=data[0];
      this.jName=data[1];
	  this.cName=data[2];
      this.star=data[3];
      this.type=data[4];
	  this.job=data[5];
	  this.phase=data[6];
	  this.imgSrc=this.imgRoot + '/icon/' + this.charno + '.png';
	  this.img2d=this.imgRoot + '/img2d/' + this.charno + '.png';
	  this.img3d=this.imgRoot + '/img3d/' + this.charno + '.png';
	  
      this.attr={hp:[data[7],data[12],data[17]], sp:[data[8],data[13],data[18]], atk:[data[9],data[14],data[19]], def:[data[10],data[15],data[20]], cri:[data[11],data[16],data[21]]};
      this.lskill=[data[22],data[23]];
	  this.pskill=[data[24],data[25],data[26]];
	  this.askill={jasname:[data[27],data[29]],assp:[data[28],data[30]]};
	  
	  
	  
	  
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
				case 'jn':
					return this.askill.jasname[index];
					break;
				case 'sp':
					return this.askill.assp[index];
					break;
				default:
					break;
			}
	  }
	  
	  this.getlSkill = function (index) {
		  if(this.lskill[index] == "null")return '';
		  return this.lskill[index];
	  }
	  
	  this.getpSkill = function (index) {
		  if(this.pskill[index] == "null")return '';
		  return this.pskill[index];
	  }
   }