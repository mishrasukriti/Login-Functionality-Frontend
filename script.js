let url = "http://localhost:3000"

function onLogIn() {
    let email = document.getElementById("logInEmailId").value;
    let password = document.getElementById("loginPassword").value;

    fetch(url + `/login`, {
        method: "POST",
        body: JSON.stringify({
             email, password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Login success"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Login Success! </strong>" ;
                console.log("User Logged in Successfully");
                deleteAlert(alertDiv);
            }
            else if(data.message === "Password Incorrect"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Incorrect Password!</strong>" ;
                console.log("Password Incorrect");
                deleteAlert(alertDiv);
            }
            else {
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>User is not registered!</strong>" ;
                console.log("User is not registered");
                deleteAlert(alertDiv);
            }
            document.getElementById("login-form").append(alertDiv);
        })
        return false;

}

function onSignUp() {
    let email = document.getElementById("signupEmailId").value;
    let password = document.getElementById("signUpPassword").value;
    let reEnterPassword = document.getElementById("confirmPassword").value;
    
    // Write password and repeat password matching logic
    let passwordMismatchDiv = document.getElementById("passwordMismatchDiv");
    if(password!== reEnterPassword) {
        console.log("came under password matching");
        passwordMismatchDiv.classList.remove("d-none");
        return;
    }
    // Add logic to complete signup
    passwordMismatchDiv.classList.add("d-none");

    fetch(url + `/register`, {
        method: "POST",
        body: JSON.stringify({
             email, password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "User registered successfully"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Success! </strong>" + data.message;
                console.log("User Registered Successfully");
                deleteAlert(alertDiv);
            }
            if(data.message === "User already exists"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong>" + data.message;
                console.log("User already Registered ");
                deleteAlert(alertDiv);
            }
            document.getElementById("sign-up-form").append(alertDiv);
            
            
        })
        return false;
}

function sendPasswordResetLink(){
    let email = document.getElementById("emailToResetPassword").value;
    fetch(url + `/reset-password`, {
        method: "PUT",
        body: JSON.stringify({
             email
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Verification mail is sent"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Success! </strong>" + data.message + "Please check your email";
                console.log("User Registered Successfully");
                deleteAlert(alertDiv);
            }
            if(data.message === "User doesn't exist"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong>" + data.message;
                console.log("User already Registered ");
                deleteAlert(alertDiv);
            }
            document.body.append(alertDiv);
            
            
        })
        return false;
}

function changePassword() {
    console.log("changing password inside function");
    let currentLocation = new URL(window.location.href);
    let objId = JSON.stringify(currentLocation).split("&rs=")[0].split("?id=")[1];
    console.log("inside change password function: objectId is:" +   objId);

    let newPassword = document.getElementById('newPassword').value;
    let reconfirmedPassword = document.getElementById('reEnterPassword').value;
    if(newPassword!== reconfirmedPassword) {
        let alertDiv = document.createElement('alert');
        alertDiv.setAttribute("role","alert" );
        alertDiv.setAttribute("id","alertDiv" );
        alertDiv.setAttribute("class","alert alert-danger" );
        alertDiv.innerHTML = "<strong>Failure! </strong> + <br> + <p> Re-entered Password did not match! </p>";
        deleteAlert(alertDiv);
        document.getElementById('changePasswordDiv').append(alertDiv);
        return false;
    }

    fetch(url + `/change-password/` + objId, {
        method: "PUT",
        body: JSON.stringify({
             password: newPassword
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Password Updated Successfully"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Success! </strong>" + data.message;
                console.log("Password Updated Successfully");
                deleteAlert(alertDiv);
            }
            else {
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong>" + data.message;
                console.log("Error in changing the password");
                deleteAlert(alertDiv);
            }
            document.getElementById('changePasswordDiv').append(alertDiv);
        })
        return false;

}

function deleteAlert(alert){
    setTimeout(function(){
        alert.remove()
    }, 3000)
}
