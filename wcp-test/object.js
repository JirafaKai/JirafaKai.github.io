function myobj(){
	this.charactor=[];
	this.commentG=[];
	this.urlScript = "https://spreadsheets.google.com/feeds/list/1osCn09v241irWHcW2t21XxVjv41sSRMdb5rCduNG24I/2/public/values?alt=json";
	this.urlScript2 = "https://spreadsheets.google.com/feeds/list/1osCn09v241irWHcW2t21XxVjv41sSRMdb5rCduNG24I/1/public/values?alt=json";
	
	this.getTime = function(){
		var Today = new Date();
		$("#overlay-loading").remove();
		return Today.getFullYear() + ' / ' + parseInt(Today.getMonth()+1) + ' / ' + Today.getDate();
	}
}