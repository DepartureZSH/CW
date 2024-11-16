const form = document.getElementById('login');

form.addEventListener('submit', (event) => {
    event.preventDefault()
    var isValid = validateForm();
    if (isValid) {
        var role = document.forms["login"]["role"].value;
        var campus = document.forms["login"]["campus"].value;
        var faculty = document.forms["login"]["faculty"].value;
        var username = document.forms["login"]["username"].value;
        var email = document.forms["login"]["email"].value;
        var password = document.forms["login"]["password"].value;
        const data = {
            role: role,
            school: "University of Nottingham",
            campus: campus,
            faculty: faculty,
            username: username,
            email: email,
            password: password
        };

        fetch(window.location.origin+'/Register/',{
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
            });
            alert(res);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
})

function validateForm() {
    console.log("validateForm first")
    // 获取输入字段的值
    var username = document.forms["login"]["username"].value;
    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;
    var password1 = document.forms["login"]["password1"].value;

    // 检查是否所有必填字段都已填写
    if (username === "" || email === "" || password === "" || password1 === "") {
        alert("All fields are required.");
        return false;
    }

    // username validate
    var usernamePattern = /^[a-zA-Z0-9]+(?:[-\'][a-zA-Z0-9]+)*$/;
    if(!usernamePattern.test(username)){
        alert("Username should be a name in English.")
        return false
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

    // 检查两次输入的密码是否一致
    if (password !== password1) {
        alert("Passwords do not match.");
        return false;
    }

    // 检查邮箱格式（简单检查，实际应用中可能需要更复杂的正则表达式）
    var emailPattern = /^[a-zA-Z0-9._-]+@nottingham\.edu\.cn$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address, e.g. John@nottingham.edu.cn");
        return false;
    }

    // 如果所有检查都通过，返回true
    return true;
}