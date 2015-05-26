	function search(){
		var star = [];
		var job = [];
		var phase = [];
		var cate = [];
		for(var i=1;i<5;i++)
			if($('#star'+i).prop("checked"))star[i-1]='1';
			else star[i-1]='0';
		for(var i=1;i<8;i++)
			if($('#job'+i).prop("checked"))job[i-1]='1';
			else job[i-1]='0';
		for(var i=0;i<12;i++)
			if($('#phase-'+i).prop("checked"))phase[i]='1';
			else phase[i]='0';
		for(var i=1;i<8;i++)
			if($('#cate-'+i).prop("checked"))cate[i-1]='1';
			else cate[i-1]='0';
		var keyword = 'isempty';
		if($('.search-input').val() != '')
			keyword = $('.search-input').val().trim().split(" ");
		if(check == 0)searchajax(keyword,star,job,phase,cate);
	}
	
	function searchajaxx(keyword,star,job,phase,cate){
		check = 1;
		var URLs="weaponSearch/function/test.php";
		$.ajax({
                url: URLs,
                data: {info:keyword,star:star,job:job,phase:phase,cate:cate},
                type:"POST",
                dataType:'text',

                success: function(data){
					console.log(data);
					check = 0;
                },

                error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError);
                 }
            });
	}

	function searchajax(keyword,star,job,phase,cate){
		check = 1;
		var URLs="weaponSearch/function/getData.php";
		$.ajax({
                url: URLs,
                data: {info:keyword,star:star,job:job,phase:phase,cate:cate},
                type:"POST",
                dataType:'json',

                success: function(data){
					weapon = [];
					for(var i in data){
						weapon[i] = data[i];
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
		for(var i in weapon)makeImgResult(i);
	}
	function makeImgResult(i){
		var imgRoot = 'https://i0.wp.com/googledrive.com/host/0B2fxyLtO7o4xfnZYS0RXUmR3MTZJa3U2bEFrLWtTa0JmRW5oaFhId0dyU01KWFJfMEVqT2s';
		var link = imgRoot + '/weapon/icon1/' + weapon[i][0] + '.png';
		$('.char-search-01').append('<a href="weapon/?a=' + weapon[i][0] + '&b=1"><img title="'+weapon[i][1]+'" src="' + link + '" /></a>');
	}