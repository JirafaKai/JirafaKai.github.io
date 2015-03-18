function myobj(){
	this.charactor=[];
	this.commentG=[];
	this.urlScript = "https://spreadsheets.google.com/feeds/list/1osCn09v241irWHcW2t21XxVjv41sSRMdb5rCduNG24I/2/public/values?alt=json";
	this.urlScript2 = "https://spreadsheets.google.com/feeds/list/1osCn09v241irWHcW2t21XxVjv41sSRMdb5rCduNG24I/1/public/values?alt=json";
	
	this.loadcomment = function(){
		
		$.getJSON(urlScript2, 
			function(JData){
				for (var q in JData.feed.entry){
                    commentG[q] = new commAttr(
						JData.feed.entry[q].gsx$charno.$t,
						JData.feed.entry[q].gsx$commentmsg.$t,
                        JData.feed.entry[q].gsx$time.$t
					);
			}
		});
	}
	
	this.inti = function(){
		loadcomment();
		$.getJSON(urlScript, 
				function(JData){
					for (var i in JData.feed.entry){
						charactor[i] = new charAttr(
						  JData.feed.entry[i].gsx$charno.$t,
						  JData.feed.entry[i].gsx$img2d.$t,
						  JData.feed.entry[i].gsx$img3d.$t,
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
				
			});
	}
}