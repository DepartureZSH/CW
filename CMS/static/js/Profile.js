const home = document.getElementById('home');
const modules = document.getElementById('modules');

function start(){
    Nav_init()
    UserInfo()
}

function Nav_init(){
    home.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/homepage/";
    })
    modules.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/mymodules/";
    })
    profile.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/profile/";
    })
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

function showStudentsButtons(){
    const PPheader = document.getElementById('PublicProfile');
    var modify = document.createElement("button");
    modify.innerText = "Modify";
    modify.setAttribute("class", "btn");
    PPheader.appendChild(modify);
}

window.addEventListener("load", start, false);