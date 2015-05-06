function initSPR(job){
	max=6;
	bubbleSpr=0;
	bubbleOffset1=0;
	bubbleOffset2=0;
	switch (job){
		case '弓':
			max=9;
			bubbleOffset1=9;
			$('.city-add').attr({"max":'9'});
			break;
		case '法':
			max=13;
			bubbleOffset1=13;
			$('.city-add').attr('max','13');
			break;
		default:
			$('.city-add').attr('max','6');
			break;
	}
	var spArr = [$('#sp100').text(),$('#sp1').text(),$('#sp2').text(),$('#sp3').text(),$('#spHyper').text()];
	
	spr0 = calSprOffset(max, job, spArr[0]);
	spr1 = calSprOffset(max, job, spArr[1]);
	spr2 = calSprOffset(max, job, spArr[2]);
	spr3 = calSprOffset(max, job, spArr[3]);
	spr4 = calSprOffset(max, job, spArr[4]);
	
	$('#spr00').attr('value',spr0[0]);
	$('#spr01').attr('value',spr0[1]);
	$('#spr02').text(spr0[2]);
	$('#sp00').text(spr0[3]);
	
	$('#spr10').attr('value',spr1[0]);
	$('#spr11').attr('value',spr1[1]);
	$('#spr12').text(spr1[2]);
	$('#sp10').text(spr1[3]);
	
	$('#spr20').attr('value',spr2[0]);
	$('#spr21').attr('value',spr2[1]);
	$('#spr22').text(spr2[2]);
	$('#sp20').text(spr2[3]);
	
	$('#spr30').attr('value',spr3[0]);
	$('#spr31').attr('value',spr3[1]);
	$('#spr32').text(spr3[2]);
	$('#sp30').text(spr3[3]);
	
	$('#spr40').attr('value',spr4[0]);
	$('#spr41').attr('value',spr4[1]);
	$('#spr42').text(spr4[2]);
	$('#sp40').text(spr4[3]);
}
function calSprOffset(max, job, sp){
	offset1 = max;
	offset2 = 0;
	bubbleSpr = 0;
	for (var i=max; i>0; i--){
		spr = sprCalSimple(sp,job,i,0,'spr');
		if (spr > bubbleSpr){
			bubbleSpr = spr;
			offset1 = i;
		}
		if (spr == bubbleSpr && offset1 > i){
			offset1 = i;
		}
	}
	spr = sprCalSimple(sp,job,max,5,'spr');
	if (spr > bubbleSpr){
		offset2 = 5;
		bubbleSpr = spr;
		for (var i=0; i<=max; i++){
			tmp = sprCalSimple(sp,job,i,5,'spr');
			if (tmp == bubbleSpr){
				offset1 = i;
				break;
			}
		}
	}
	spr = sprCalSimple(sp,job,max,3,'spr');
	if (spr > bubbleSpr){
		for (var i=0; i<=max; i++){
			tmp = sprCalSimple(sp,job,i,3,'spr');
			if (tmp == bubbleSpr){
				offset1 = i;
				break;
			}
		}
		offset2 = 5;
		bubbleSpr = spr;
	}
	var spResult = sprCalSimple(sp,job,offset1,offset2,'sp');
	result = [offset1, offset2, bubbleSpr, spResult];
	return result;
}
function imgHandler(bid){
	$('#b2d').removeClass('active');
	$('#b3d').removeClass('active');
	$('#barused').removeClass('active');
	$('#img-2d').hide();
	$('#img-3d').hide();
	$('#img-arused').hide();
	
	if (bid=='b2d'){
		$('#b2d').addClass('active');
		$('#img-2d').fadeIn();
	}
	if (bid=='b3d'){
		$('#b3d').addClass('active');
		$('#img-3d').fadeIn();
	}
	if (bid=='barused'){
		$('#barused').addClass('active');
		$('#img-arused').fadeIn();
	}
}
function sprHandler(bid,job){
	if (bid == 'spr00' || bid == 'spr01'){
		sp = $('#sp100').text();
		offset1 = $('#spr00').val();
		offset2 = $('#spr01').val();
		spr = sprCalSimple(sp, job, offset1, offset2,'spr');
		spResult = sprCalSimple(sp, job, offset1, offset2,'sp');
		$('#spr02').text(spr);
		$('#sp00').text(spResult);
	}
	else if (bid == 'spr10' || bid == 'spr11'){
		sp = $('#sp1').text();
		offset1 = $('#spr10').val();
		offset2 = $('#spr11').val();
		spr = sprCalSimple(sp, job, offset1, offset2,'spr');
		spResult = sprCalSimple(sp, job, offset1, offset2,'sp');
		$('#spr12').text(spr);
		$('#sp10').text(spResult);
	}
	else if (bid == 'spr20' || bid == 'spr21'){
		sp = $('#sp2').text();
		offset1 = $('#spr20').val();
		offset2 = $('#spr21').val();
		spr = sprCalSimple(sp, job, offset1, offset2,'spr');
		spResult = sprCalSimple(sp, job, offset1, offset2,'sp');
		$('#spr22').text(spr);
		$('#sp20').text(spResult);
	}
	else if (bid == 'spr30' || bid == 'spr31'){
		sp = $('#sp3').text();
		offset1 = $('#spr30').val();
		offset2 = $('#spr31').val();
		spr = sprCalSimple(sp, job, offset1, offset2,'spr');
		spResult = sprCalSimple(sp, job, offset1, offset2,'sp');
		$('#spr32').text(spr);
		$('#sp30').text(spResult);
	}
	else if (bid == 'spr40' || bid == 'spr41'){
		sp = $('#spHyper').text();
		offset1 = $('#spr40').val();
		offset2 = $('#spr41').val();
		spr = sprCalSimple(sp, job, offset1, offset2,'spr');
		spResult = sprCalSimple(sp, job, offset1, offset2,'sp');
		$('#spr42').text(spr);
		$('#sp40').text(spResult);
	}
}
function sprCalSimple(sp, job, offset1, offset2, type){
	switch (job){
		case '斧':
			base = 2;
		case '槍':
			base = 1;
		default:
			base = 0;
	}
	spResult = sp * (1+offset1/100) * (1+offset2/100) + base;
	if (spResult===Number(spResult)  && spResult%1!==0)
		spResult = Math.floor(spResult);
	spr = countSPR(spResult);
	if (type == 'spr')
		return spr;
	else if (type == 'sp')
		return spResult;
}
function countSPR(sp){
	if (sp >= 234)
		return 7;
	else if (sp >= 200)
		return 6;
	else if (sp >= 167)
		return 5;
	else if (sp >= 134)
		return 4;
	else if (sp >= 100)
		return 3;
	else if (sp >= 67)
		return 2;
	else if (sp >= 0)
		return 1;
	else 
		return 'ERR_INVAILD_SP';
}
