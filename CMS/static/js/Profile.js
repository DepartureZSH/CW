function start(){
    UserInfo()
}

function UserInfo(){

    if(localStorage.getItem("role")==="student"){
        fetch(window.location.origin + '/profile/api/getStudentInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
            })
        }).then(response => {
            if (!response.ok) {
                console.log('Network response was not ok ' + response)
            }
            return response.json();
        }).then(data => {
            console.log(data);
            showInfos(data);
            showStudentsButtons();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }else if(localStorage.getItem("role")==="teacher"){
        fetch(window.location.origin + '/profile/api/getTeacherInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
            })
        }).then(response => {
            if (!response.ok) {
                console.log('Network response was not ok ' + response)
            }
            return response.json();
        }).then(data => {
            console.log(data);
            showTeacherInfos(data);
            showTeachersButtons();
        }).catch((error) => {
            console.error('Error:', error);
        })
    }else if(localStorage.getItem("role")==="admin"){

    }else{
        alert("Please login in first!");
        window.location.href = window.location.origin;
    }
}

function showInfos(data){
    const role = document.getElementById('Role');
    role.innerHTML = '<p>Role: <b>'+ localStorage.getItem("role") + '</b></p>';
    const user = document.getElementById('User');
    user.innerHTML = '<p>Username: <b>'+ localStorage.getItem("username") + '</b></p>';
    if(data["gender"]!==""){
        const gender = document.getElementById('Gender');
        gender.innerHTML = '<p>Gender: <b>'+ data["gender"] + '</b></p>';
    }
    if(data["telephone"]!==""){
        const telephone = document.getElementById('Telephone');
        telephone.innerHTML = '<p>Telephone: <b>'+ data["telephone"] + '</b></p>';
    }
    if(data["email"]!==""){
        const email = document.getElementById('Email');
        email.innerHTML = '<p>Email: <b>'+ data["email"] + '</b></p>';
    }
    const is_user = document.getElementById('isUser');
    is_user.innerHTML = '<p>User: <b>'+ data["is_user"] + '</b></p>';
    const is_teacher = document.getElementById('isTeacher');
    is_teacher.innerHTML = '<p>Teacher: <b>'+ data["is_teacher"] + '</b></p>';
    const is_admin = document.getElementById('isAdmin');
    is_admin.innerHTML = '<p>Admin: <b>'+ data["is_admin"] + '</b></p>';

    const school = document.getElementById('School');
    school.innerHTML = '<p>School: <b>'+ data["dID"]["School"] + '</b></p>';
    const campus = document.getElementById('Campus');
    campus.innerHTML = '<p>Campus: <b>'+ data["dID"]["Campus"] + '</b></p>';
    const faculty = document.getElementById('Faculty');
    faculty.innerHTML = '<p>Faculty: <b>'+ data["dID"]["Faculty"] + '</b></p>';
}

function showTeacherInfos(data){
    const role = document.getElementById('Role');
    role.innerHTML = '<p>Role: <b>'+ localStorage.getItem("role") + '</b></p>';
    const user = document.getElementById('User');
    user.innerHTML = '<p>Username: <b>'+ localStorage.getItem("username") + '</b></p>';
    if(data["Title"]!==""){
        const gender = document.getElementById('Gender');
        gender.innerHTML = '<p>Title: <b>'+ data["Title"] + '</b></p>';
    }else{
        const gender = document.getElementById('Gender');
        gender.innerHTML = '<p>Title: <b>***</b></p>';
    }
    if(data["Telephone"]!==""){
        const telephone = document.getElementById('Telephone');
        telephone.innerHTML = '<p>Telephone: <b>'+ data["Telephone"] + '</b></p>';
    }
    if(data["email"]!==""){
        const email = document.getElementById('Email');
        email.innerHTML = '<p>Email: <b>'+ data["email"] + '</b></p>';
    }
    const is_user = document.getElementById('isUser');
    is_user.innerHTML = '<p>User: <b>'+ data["is_user"] + '</b></p>';
    const is_teacher = document.getElementById('isTeacher');
    is_teacher.innerHTML = '<p>Teacher: <b>'+ data["is_teacher"] + '</b></p>';
    const is_admin = document.getElementById('isAdmin');
    is_admin.innerHTML = '<p>Admin: <b>'+ data["is_admin"] + '</b></p>';

    const school = document.getElementById('School');
    school.innerHTML = '<p>School: <b>'+ data["dID"]["School"] + '</b></p>';
    const campus = document.getElementById('Campus');
    campus.innerHTML = '<p>Campus: <b>'+ data["dID"]["Campus"] + '</b></p>';
    const faculty = document.getElementById('Faculty');
    faculty.innerHTML = '<p>Faculty: <b>'+ data["dID"]["Faculty"] + '</b></p>';
}

function showStudentsPublicInfo(data){
    if(data["gender"]!==""){
        const gender = document.getElementById('Gender');
        gender.innerHTML = "";
        gender.innerHTML = '<p>Gender: <b>'+ data["gender"] + '</b></p>';
    }
    if(data["telephone"]!==""){
        const telephone = document.getElementById('Telephone');
        telephone.innerHTML = "";
        telephone.innerHTML = '<p>Telephone: <b>'+ data["telephone"] + '</b></p>';
    }
}

function validatePhoneNumber(phoneNumber) {
    // 正则表达式匹配国际格式的电话号码，包括国家代码
    var regex = /^\+\d+\s?\d{11}$/;
    return regex.test(phoneNumber);
}

function showStudentsButtons(){
    const PPheader = document.getElementById('PublicProfile');
    var modify = document.createElement("button");
    modify.innerText = "Modify";
    modify.setAttribute("class", "btn");
    PPheader.appendChild(modify);
    modify.addEventListener("click", ()=>{
        if(modify.innerText === "Modify") {
            modify.innerText = "Submit";
            const gender = document.getElementById('Gender');
            gender.innerHTML = '<p style="display: flex">Gender: <label for="gender"></label><input type="text" id="gender" name="gender" style="width: 20%; border: grey 0.5px solid;"/></p>';
            const telephone = document.getElementById('Telephone');
            telephone.innerHTML = '<p style="display: flex">Telephone: <label for="telephone"></label><input type="tel" id="telephone" name="telephone" style="width: 50%; border: grey 0.5px solid;"/></p>';
        } else {
            //提交form
            const gender = document.getElementById('gender');
            var gender_content = gender.value
            if(gender_content.length > 10 || gender_content.length < 2){
                alert('Please write a correct gender!');
                return;
            }
            const telephone = document.getElementById('telephone');
            var telephone_content = telephone.value
            if(!validatePhoneNumber(telephone_content)){
                alert('Please write a correct telephone number!');
                return;
            }
            fetch(window.location.origin + '/profile/api/modifyStudentInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    Gender: gender_content,
                    Telephone: telephone_content,
                })
            }).then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok ' + response)
                }
                return response.json();
            }).then(data => {
                console.log(data);
                showStudentsPublicInfo(data);
            }).catch((error) => {
                console.error('Error:', error);
            });
            modify.innerText = "Modify";

        }
    })
}

function showTeachersButtons(){
    var modify = document.createElement("button");
    modify.style.display = "none";
}

window.addEventListener("load", start, false);