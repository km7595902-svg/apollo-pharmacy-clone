let loginBtn = document.querySelector(".login-btn");
let loginModal = document.getElementById("loginModal");
let loginClose = document.getElementById("loginClose")
let mobileNumber = document.getElementById("mobileNumber")
let mobileNext = document.getElementById("mobileNext");

/* open login */
loginBtn.addEventListener("click",()=>{
    loginModal.classList.add("active");
});

// close  //
loginClose.addEventListener("click",()=>{
    loginModal.classList.remove("active")
})



// cart  pages  //


