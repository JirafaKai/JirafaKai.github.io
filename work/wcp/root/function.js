	function searchajax(){
		check = 1;
		var URLs="root/function/getAData.php";
		$.ajax({
                url: URLs,
                data: {},
                type:"POST",
                dataType:'json',

                success: function(data){
					announce = [];
					for(var i in data){
						announce[i] = data[i];
					}
					searchaResult();
					check = 0;
                },

                error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError);
                 }
            });
	}
	function searchejax(){
		check = 1;
		var URLs="root/function/getEData.php";
		$.ajax({
                url: URLs,
                data: {},
                type:"POST",
                dataType:'json',

                success: function(data){
					myevent = [];
					for(var i in data){
						myevent[i] = data[i];
					}
					searcheResult();
					check = 0;
                },

                error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError);
                 }
            });
	}
	function searcheResult(){
		$('.char-sub-attr').html('');
		for(var i in myevent){
			$('.char-sub-attr').append('<form action="root/eedit.php" method="post" id="result'+i+'"><input type="text" value="'+myevent[i][0]+'" name="id" style="display:none"/><div class="font-blue-01 border-blue-01" style="font-weight:bold;border-bottom:2px solid;padding:10px 0;"><span style="line-height:30px;">Title: '+myevent[i][3]+'</span><button type="button" class="button button-01 bg-blue-01" style="float:right;" onclick="myedel('+i+')">Delete</button><button class="button button-01 bg-blue-01" style="float:right;">Edit</button><span style="float:right;padding-right:10px;line-height:30px;">Start:'+myevent[i][1]+'</span></div></form>');
		} 
	}
	function searchaResult(){
		$('.char-sub-attr').html('');
		for(var i in announce){
			$('.char-sub-attr').append('<form action="root/aedit.php" method="post" id="result'+i+'"><input type="text" value="'+announce[i][0]+'" name="id" style="display:none"/><div class="font-blue-01 border-blue-01" style="font-weight:bold;border-bottom:2px solid;padding:10px 0;"><span style="line-height:30px;">Title: '+announce[i][2]+'</span><button type="button" class="button button-01 bg-blue-01" style="float:right;" onclick="myadel('+i+')">Delete</button><button class="button button-01 bg-blue-01" style="float:right;">Edit</button><span style="float:right;padding-right:10px;line-height:30px;">'+announce[i][1]+'</span></div></form>');
		} 
	}
	function myasubmit(){
		document.getElementById("edit").submit();
		setTimeout("returnapage()",1000);
	}
	function returnapage(){
		document.location.href="root/alist.php";
	}
	function myesubmit(){
		document.getElementById("edit").submit();
		setTimeout("returnepage()",1000);
	}
	function returnepage(){
		document.location.href="root/elist.php";
	}
	function myadel(i){
		$(".char-section-2").append('<form action="root/function/adelete.php" method="post" id="delete" target="_blank"><input type="text" value="'+announce[i][0]+'" name="id" style="display:none"/></form>');
		document.getElementById("delete").submit();
		setTimeout("searchajax()",1000);
	}
	function myedel(i){
		$(".char-section-2").append('<form action="root/function/edelete.php" method="post" id="delete" target="_blank"><input type="text" value="'+myevent[i][0]+'" name="id" style="display:none"/></form>');
		document.getElementById("delete").submit();
		setTimeout("searchejax()",1000);
	}
