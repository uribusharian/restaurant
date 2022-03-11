




 function navChange() {
    var navbarChange = document.getElementById("navbarOrders")
    var navbarChange2 = document.getElementById("navbarChat")
    var navbarChange3 = document.getElementById("navbarRegister")
    var navbarChange4 = document.getElementById("navbarLogin")
    var navbarChange5 = document.getElementById("navbarLogout")
    navbarChange.className = "nav-link"
    navbarChange2.className = "nav-link"
    navbarChange3.className = "nav-link disabled"
    navbarChange4.className = "nav-link disabled"
    navbarChange5.className = "nav-link"

};

function isAdmin(){
    var navbarChange6 = document.getElementById("navbarAdmin")
    navbarChange6.className = "nav-link"
}


function logout(){
    
    var navbarChange = document.getElementById("navbarOrders")
    var navbarChange2 = document.getElementById("navbarChat")
    var navbarChange3 = document.getElementById("navbarRegister")
    var navbarChange4 = document.getElementById("navbarLogin")
    var navbarChange5 = document.getElementById("navbarLogout")
    navbarChange.className = "nav-link disabled"
    navbarChange2.className = "nav-link disabled"
    navbarChange3.className = "nav-link "
    navbarChange4.className = "nav-link "
    navbarChange5.className = "nav-link disabled"
    
}  

