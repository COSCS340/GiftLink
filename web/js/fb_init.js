window.fbAsyncInit = function() {
	FB.init({
		appId      : '2050570888522386',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.12'
	});
	  
	FB.AppEvents.logPageView();
	
	FB.getLoginStatus(function(response){
	  if (response.status === 'connected') {
		if(DEBUG_MODE) console.log('User already logged in');
		postLoginSetup();
	  }else{
		if(DEBUG_MODE) console.log('User not logged in');
		removeOverlay();
	  }
	})
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));