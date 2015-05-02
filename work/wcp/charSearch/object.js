
function charAttr(data) {
	  this.charno=data[0];
      this.cName=data[2];
      this.ccName=data[3];
      this.star=data[4];
      this.type=data[5];
	  this.job=data[6];
	  this.categorg=data[7];
	  this.phase=data[8];
	  this.costb=data[9];
	  this.costa=data[10];
	  this.cv=data[11];
	  this.imgSrc=data[12];
	  this.img2d=data[13];
      this.img3d=data[14];
	  
      this.attr={hp:[data[17],data[24],data[31]], sp:[data[18],data[25],data[32]], atk:[data[19],data[26],data[33]], def:[data[20],data[27],data[34]], cri:[data[21],data[28],data[35]]};
      this.lskill={jlsname:[data[38],data[39]], clsname:[data[40],data[41]], lsef:[data[42],data[43]]};
	  this.askill={jasname:[data[46],data[59]],casname:[data[47],data[60]],assp:[data[48],data[61]],astype:[data[49],data[62]],assize:[data[50],data[63]],asbuff:[data[51],data[64]],asattrdamage:[data[52],data[65]],asdamage:[data[53],data[66]],asctime:[data[54],data[67]],asatime:[data[55],data[68]],asimg:[data[56],data[69]]};
	  this.pskill=[data[72],data[73],data[74]];
	  
	  
	  
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
	  this.getCname = function () {
		  return this.ccName;
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
				case 'cn':
					return this.askill.casname[index];
					break;
				case 'sp':
					return this.askill.assp[index];
					break;
				case 'type':
					return this.askill.astype[index];
					break;
				case 'size':
					return this.askill.assize[index];
					break;
				case 'buff':
					return this.askill.asbuff[index];
					break;
				case 'attrdamage':
					return this.askill.asattrdamage[index];
					break;
				case 'damage':
					return this.askill.asdamage[index];
					break;
				case 'ctime':
					return this.askill.asctime[index];
					break;
				case 'atime':
					return this.askill.asatime[index];
					break;
				case 'img':
					return this.askill.asimg[index];
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