// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    var form = document.getElementById('login');

    // 为表单添加submit事件监听器
    form.addEventListener('submit', function(event) {
        // 调用验证函数
        var isValid = validateForm();
        // 如果验证失败，阻止表单提交
        if (!isValid) {
            event.preventDefault();
        }
    });
});

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

    // 检查两次输入的密码是否一致
    if (password !== password1) {
        alert("Passwords do not match.");
        return false;
    }

    // 检查邮箱格式（简单检查，实际应用中可能需要更复杂的正则表达式）
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // 如果所有检查都通过，返回true
    return true;
}

function goBack() {
    window.history.back();
}