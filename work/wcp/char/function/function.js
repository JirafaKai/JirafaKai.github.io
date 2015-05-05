function updateDSsEffect(){
	var URLs="char/index.php";
	$.ajax({
		url: URLs,
		data: {},
		type: 'POST',
		dataType: 'text',
		
		success: function(data){
			alert(data);
		}
		
		error: function(xhr, ajaxOptions, thrownError){ 
			alert(xhr.status); 
			alert(thrownError);
		 }
	});
}