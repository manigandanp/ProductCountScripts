function a(num, cb){ 
	var ans = 0;
	if(num < 0) {
		console.log("if..   " + num)
		return 0
	} else {
		console.log("else..   " + num);
		ans += (num + a(num -1))
		
	}
	return cb(ans)
}

a(5, function(x) {console.log(x)})