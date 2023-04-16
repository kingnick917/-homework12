const dashboard = document.querySelector("#logIn");


  signupBtn.addEventListener("click", function(){
    logInContent.style.display = "none"
    signUpContent.style.display = "block"

  })

  dashboard.addEventListener("click", function(){
    signUpContent.style.display = "none"
    logInContent.style.display = "block"
  })
