
//Used to dynamically generate Amazon search links of a FaceBook user's interests
var amazonLink = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=';

//Enable or disable output to console.log()
const DEBUG_MODE =  1;

/**
 ** Log user in to Facebook and begin reading data in
 **/
function appLogin(){
	FB.login(function(response) {

		if(response.status === 'connected'){
			if(DEBUG_MODE) console.log('Logged in and authenticated');
			
		  /* Setting up the HTML/sections for each block of output after a successful login
			 introBlock for displaying announcements/instructions and contains an input field (textbox)
			 for searching/filtering friends
		  */
		  
			$('#introBlock').addClass('hidden');
			$('#outputBlock').removeClass('hidden')
							 .empty()
							 .append('<br>Click on a friend to see their interests<br><br>')
			$('#friendSearch').removeClass('hidden');
			$('#searchTools').removeClass('hidden');
			$('#friendBlock').removeClass('hidden');
			$('#loginPanel').addClass('hidden');
			$('#logoutPanel').removeClass('hidden');
			
			$('#sortName').on('click', toggleSortName);
			$('#sortBirthday').on('click', toggleSortBirthday);
			
			//Setting the top bar to display the the logged in user's profile picture and name
			FB.api('/me', {fields: 'id,name,birthday'}, function(response) {
				$('#profilePic').attr('src', 'http://graph.facebook.com/' + response.id + '/picture?type=normal');
				$('#nameBadge').text(response.name);
			});
			
			//Grab and list the user's friends in the #friendBlock HTML element
			loadCalendar();
			listFriends();


			//Dynamically filter friends as you type by attaching an event listener to the #friendSearch input field
			$('#friendSearch').on("keyup", function() {
				if(DEBUG_MODE) console.log('keypress handler triggered');
				var inputText = $('#friendSearch').val();

				$(".fb-user").each(function(){
					var found = strCmp($(this).attr("data-block-id"),inputText);
					if(found){
						if(DEBUG_MODE) console.log('found');
						$(this).removeClass('hidden');
					}
					else {
						if(DEBUG_MODE) console.log('not found');
						$(this).addClass('hidden');
					}
				});
			});
		}

		else {
			if(DEBUG_MODE) console.log('Not authenticated');
		}
		
	}, {scope:'email,user_birthday,user_likes,user_friends', return_scopes:true});
	   /* Above are the permissions to request from the user logging in
		  Only pops up with a FaceBook login dialog if they haven't given access before
		  or there are new permissions that they haven't granted access to
	   */
}


/**
 ** Fills up the friendBlock with collapsible panels of the user's friends
 **/
function listFriends() {
	FB.api('/me/friends', {fields: 'id,name,birthday'}, 
		function (response) {
			if(DEBUG_MODE) console.log(response);
			
			$('#friendBlock').empty();
			var friend;
			var friends = response.data.sort(sortFriends);
			
			for(friend in friends){
				var user_id = friends[friend].id;
				var name = friends[friend].name;
				var birthday = friends[friend].birthday;
				
				//Wrapping each user in a unique div to make the search filtering easier
				$('#friendBlock').append('<div class = "fb-user" data-block-id = "' + name + '"></div>');
				
				//jQuery unique to the current friend's block 
				var query = "[data-block-id = '" + name + "']";
				$(query).append(''
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-interests">'
								 + '<div class="friend-panel fluid-panel" id="' + user_id + '-panel">'
								 + '<span><img class="friend-pic" src="http://graph.facebook.com/' + user_id + '/picture?type=normal"></img>'
								 + '<span class="friend-name">' + name + '</span></span><span class="friend-birthday">' + birthday + '</span></div></a>'
								 
								 + '<div class="collapse" id="' + user_id + '-interests">'
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-musicList">'
								 + '<div class="interest-panel">Music</div></a>'
								 + '<div class="collapse" id="' + user_id + '-musicList"></div>'
								 
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-moviesList">'
								 + '<div class="interest-panel">Movies</div></a>'
								 + '<div class="collapse" id="' + user_id + '-moviesList"></div>'
								 
								 + '<a data-toggle="collapse" data-target="#' + user_id + '-televisionList">'
								 + '<div class="interest-panel">Television</div></a>'
								 + '<div class="collapse" id="' + user_id + '-televisionList"></div></div>'
								);

				$('#' + user_id + '-panel').on('click', {id: user_id}, listInterests);
			}
		}
	);
}

/**
 ** Log user out of Facebook and remove data
 **/
function appLogout(response){
	$('#introBlock').removeClass('hidden');
	$('#outputBlock').addClass('hidden')
					 .empty();
	$('#friendSearch').addClass('hidden');
	$('#searchTools').addClass('hidden');
	$('#friendBlock').addClass('hidden');
	$('#logoutPanel').addClass('hidden');
	$('#loginPanel').removeClass('hidden');
	$('#nameBadge').text('');
	$('#profilePic').attr('src', '');
}

/**
 ** Comparator for case insensitive search (i.e. Does str1 contain str2 ?)
 **/
function strCmp(str1, str2){
	return (str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0); 
}

/**
 ** Toggles friends-sorting by name, ascending or descending
 **/
function toggleSortName() {
	if ($('#friendBlock').attr('data-sort') != 0)
		$('#friendBlock').attr('data-sort', 0);
	else
		$('#friendBlock').attr('data-sort', 1);
	
	listFriends();
}

/**
 ** Toggles friends-sorting by birthday, ascending or descending
 **/
function toggleSortBirthday() {
	if ($('#friendBlock').attr('data-sort') != 2)
		$('#friendBlock').attr('data-sort', 2);
	else
		$('#friendBlock').attr('data-sort', 3);
	
	listFriends();
}

/**
 ** Updates friends list, sorted by name or birthday
 **/
function sortFriends(a, b) {
	switch(parseInt($('#friendBlock').attr('data-sort'))) {
		case 0: return a.name.localeCompare(b.name);
		case 1: return b.name.localeCompare(a.name);
		case 2: return (Date.parse(b.birthday) <= Date.parse(a.birthday) ? 1 : -1);
		case 3: return (Date.parse(a.birthday) <= Date.parse(b.birthday) ? 1 : -1);
	}
}


/**
 ** Wrapper: updates all user interests
 **/
function listInterests(event) {
	updateInterest(event.data.id, 'music');
	updateInterest(event.data.id, 'movies');
	updateInterest(event.data.id, 'television');
}


/** 
 ** Customizable function to get and update a user's interests from the appropriate endpoint
 **/
function updateInterest(user_id, interest){
	var endpoint = '/' + user_id + '/' + interest;
	if(DEBUG_MODE) console.log(endpoint);
	
	var target;
	if(interest == 'music'){ target = ('' + user_id + '-musicList'); }
	else if(interest == 'television'){ target = ('' + user_id + '-televisionList'); }
	else if(interest == 'movies'){ target = ('' + user_id + '-moviesList'); }

	FB.api(endpoint, function(response){
		if(response && !response.error){
			listInterest(response, target);
		}
	});
}


/**
 ** Iterates over a response's data, generates amazonSearch link, and appends it to
 ** the target
 **/
function listInterest(response, target){
	query = '#' + target;
	
	if(DEBUG_MODE){
		console.log(target);
		console.log(query);
		console.log(response);
	}
	
	$(query).empty();
	for(item in response.data) {
		var name = response.data[item].name;
		var sname = name.replace(/ /g, "+");
		$(query).append('<div class="interest-item-panel">'
						+ '<a class = "jqPlaceholder" target = "_blank" href = "" ></a>'
						+ '</div>');
		$('.jqPlaceholder').attr('href', amazonLink + sname);
		$('.jqPlaceholder').html(name);
		$('.jqPlaceholder').removeClass('jqPlaceholder');
	}
}

function toggleVisibility(elemID){
	query = '#' + elemID;
	if($(query).hasClass('hidden')){
		$(query).removeClass('hidden');
	}
	else {
		$(query).addClass('hidden');
	}
}

/** Used with zabuto calendar
 ** Checks if an event exists on the date that
 ** a user clicks and shows an alert with the
 **	date and description of the event.
 **/
function eventAlert(eventId){
	var day = $("#" + eventId);
	var date = $("#" + eventId).data("date");
	var hasEvent = day.data("hasEvent");
	if(hasEvent){
		var newDate = new Date(date);
		console.log(day);
		bootbox.alert({message:"<center><h1>" + newDate.toDateString() + "<br><br>" + day[0].title + "</h1></center>", backdrop:true});
	}
}

function loadCalendar(){
	$('#outputBlock').append('<br><a href = "#" onclick = "toggleVisibility(\'myCalendar\')">Click to View Calendar</a>');
	$('#outputBlock').append('<div class = "hidden animated fadeIn" id = "myCalendar" style = "padding: 5% 7% 5% 7%;"><div id = "usr_calendar"></div></div>');

	$('#usr_calendar').ready(function(){$('#usr_calendar').zabuto_calendar(
		{
			language: "en", 
			show_previous:true, 
			show_next:true,
			data: holidayEvents,
			today:true,
			modal: true,
			action: function(){ eventAlert(this.id); },
			nav_icon:{prev:'<', next:'>'}
		}
	)});
	
}
