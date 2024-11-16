const form = document.getElementById('login');

form.addEventListener('submit', (event) => {
    event.preventDefault()
    var isValid = validateForm();
    if (isValid) {
        const data = get_data()
        if(data){
            console.log(data)
            fetch(window.location.origin+'/Login/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response=>{
                if (!response.ok) {
                    console.log('Network response was not ok ' + response)
                }
                return response.json();
            }).then(data => {
                const entries = Object.entries(data)
                let res = ""
                entries.forEach(([key, value]) => {
                    res += `${key}: ${value}\n`;
                    if(value==='success'){
                        window.location.href=window.location.origin
                    }
                });
                alert(res);
            }).catch((error) => {
                console.error('Error:', error);
            });
        }else{
            alert("Please type the valid username or email!");
        }
    }
})

function get_data() {
    var email = document.forms["login"]["username"].value;
    var password = document.forms["login"]["password"].value;

    var emailPattern = /^[a-zA-Z0-9._-]+@nottingham\.edu\.cn$/;
    if (emailPattern.test(email)) {
        return {
            email: email,
            password: password
        };
    }

    var usernamePattern = /^[a-zA-Z0-9]+(?:[-\'][a-zA-Z0-9]+)*$/;
    if (usernamePattern.test(email)) {
        return {
            email: email + "@nottingham.edu.cn",
            password: password
        };
    }

    return null

}


function validateForm() {
    // 获取输入字段的值
    var user = document.forms["login"]["username"].value;
    var password = document.forms["login"]["password"].value;

    // 检查是否所有必填字段都已填写
    if (user === "" || password === "") {
        alert("All fields are required.");
        return false;
    }

    //password validation
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z\s]).{1,18}$/;
    if(!passwordPattern.test(password)){
        alert("Password should meet the requirements: " +
            "\n1. At least one uppercase letter" +
            "\n2. At least one lowercase letter" +
            "\n3. At least one number" +
            "\n4. At least one special char, e.g. ~!@#$%^&*?_-" +
            "\n5. The length must be between 6 and 18 characters")
        return false
    }

    // 如果所有检查都通过，返回true
    return true;
}