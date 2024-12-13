const module = document.getElementById("Module");

function start(){
    if(localStorage.getItem('role')==="student"){
        module.innerHTML =
            "<div class='container'>" +
                "<div class='title'>" +
                    "<h2>Your Enrollments</h2>" +
                "</div>" +
                "<div id='Enrollments' class='courses-div1'>" +
                "</div>" +
            "</div>" +
            "<div class='container'>" +
                "<div class='title'>" +
                    "<h2>Your Stars</h2>" +
                "</div>" +
                "<div id='Stars' class='courses-div1'>" +
                "</div>" +
            "</div>";
        getAllEnrollments();
        getAllStars();
    }
    else if(localStorage.getItem('role')==="teacher"){
        module.innerHTML =
            "<div class='container' style='width: 60%; margin-left: auto; margin-right: auto'>" +
                "<div class='title'>" +
                    "<h2>Your Lectures</h2>" +
                "</div>" +
                "<div id='Lecture' class='courses-div1'>" +
                "</div>" +
                "<div class='courses-div1'>" +
                    "<article>" +
                        "<div id='addCourse' class='course' style='text-align:center; color: gray'> +" +
                        "</div>" +
                    "</article>" +
                "</div>" +
            "</div>";
        getAllLectures();

    }
}

function getAllEnrollments(){
    fetch(window.location.origin + '/mymodules/api/getenrollments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role: localStorage.getItem('role'),
            id: localStorage.getItem('id')
        })
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showEnrollments(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showEnrollments(data){
    const enrollment = document.getElementById('Enrollments');
    enrollment.innerHTML = ''
    var course = createCourseContainer(data, 1)
    enrollment.appendChild(course);
    CourseContainer_init(data, 1);
}

function getAllStars(){
    fetch(window.location.origin + '/mymodules/api/getstars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role: localStorage.getItem('role'),
            id: localStorage.getItem('id')
        })
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showStars(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showStars(data){
    const stars = document.getElementById('Stars');
    stars.innerHTML = ''
    var course = createCourseContainer(data, 2);
    stars.appendChild(course);
    CourseContainer_init(data, 2);
}

function getAllLectures(){
    fetch(window.location.origin + '/mymodules/api/getLectures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role: localStorage.getItem('role'),
            id: localStorage.getItem('id')
        })
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showLectures(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showLectures(data){
    const lecture = document.getElementById('Lecture');
    lecture.innerHTML = ''
    var course = createCourseContainer(data, 1)
    lecture.appendChild(course);
    AddCourseContainer_init(data);
}

function createCourseContainer(data, mode){
    var course_info = ''
    var course = document.createElement('article');
    data.forEach(function (value, index) {
        if(localStorage.getItem("role")==="student"){
            value = value.cID
            if(mode===1){
                course_info =
                    '<div class="course">' +
                        '<a href="CourseDetails?mCode=' + value.mCode + '">' +
                            '<p>' + value.mCode + '\t' + value.name + '</p>' +
                            '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                        '</a>' +
                    '</div>' +
                    '<div class="CourseButtons">' +
                        '<div class="CourseButtons left-flex">' +
                            '<button class="btn" id="Detail' + value.mCode + '">Course Detail</button>' +
                        '</div>' +
                        '<div class="CourseButtons right-flex">' +
                            '<button class="btn" id="Unenroll' + value.mCode + '">Unenroll</button>' +
                        '</div>' +
                    '</div>'
            }else{
                course_info =
                    '<div class="course">' +
                        '<a href="CourseDetails?mCode=' + value.mCode + '">' +
                            '<p>' + value.mCode + '\t' + value.name + '</p>' +
                            '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                        '</a>' +
                    '</div>' +
                    '<div class="CourseButtons">' +
                        '<div class="CourseButtons left-flex">' +
                            '<button class="btn" id="Detail' + value.mCode + '">Course Detail</button>' +
                        '</div>' +
                        '<div class="CourseButtons right-flex">' +
                            '<button class="btn" id="Unstar' + value.mCode + '">Unstar</button>' +
                            '<button class="btn" id="Enroll' + value.mCode + '">Enroll</button>' +
                        '</div>' +
                    '</div>'
            }
        }else if(localStorage.getItem("role")==="admin"){
            alert("You have no access to this page!");
        }else{
            course_info =
                '<div class="course">' +
                    '<a href="MyCourseDetails?mCode=' + value.mCode + '">' +
                        '<p>' + value.mCode + '\t' + value.name + '</p>' +
                        '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                    '</a>' +
                '</div>' +
                '<div class="CourseButtons">' +
                    '<div class="CourseButtons left-flex">' +
                        '<button class="btn" id="Detail' + value.mCode + '">Course Detail & Update</button>' +
                        '<button class="btn" id="StudentList'+ value.mCode + '">Students list</button>' +
                    '</div>' +
                    '<div class="CourseButtons right-flex">' +
                        '<button class="btn" id="Delete' + value.mCode + '">Delete</button>' +
                    '</div>' +
                '</div>'
        }
        course.innerHTML += course_info
    })
    return course
}

function CourseContainer_init(data, mode){
    data.forEach(function (value, index) {
        value = value.cID
        const DetailButton = document.getElementById('Detail' + value.mCode);
        DetailButton.addEventListener('click', function (){
            window.location.href = window.location.origin + "/mymodules/MyCourseDetails?mCode=" + value.mCode;
        })
        if(localStorage.getItem("role")==="student"){
            if(mode===1){
                const UnEnrollButton = document.getElementById('Unenroll' + value.mCode);
                UnEnrollButton.addEventListener('click', function (){
                let enroll_data = {
                    sID: parseInt(localStorage.getItem("id")),
                    cID: value.cID
                }
                fetch(window.location.origin + '/homepage/api/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(enroll_data)
                }).then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok ' + response)
                    }
                    return response.json();
                }).then(data => {
                    alert(data["msg"])
                    window.location.reload()
                    // showCourses(data)
                }).catch((error) => {
                    console.error('Error:', error);
                });
                alert("Student enroll\n Student id:" + localStorage.getItem("id") + "\n Course id:" + value.mCode)
            })
            }
            else{
                const StarButton = document.getElementById('Unstar' + value.mCode);
                StarButton.addEventListener('click', function (){
                let star_data = {
                    sID: parseInt(localStorage.getItem("id")),
                    cID: value.cID
                }
                fetch(window.location.origin + '/homepage/api/star', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(star_data)
                }).then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok ' + response)
                    }
                    return response.json();
                }).then(data => {
                    alert(data["msg"])
                    window.location.reload()
                    // showCourses(data)
                }).catch((error) => {
                    console.error('Error:', error);
                });
                alert("Student star\n Student id:" + localStorage.getItem("id") + "\n Course id:" + value.mCode)
            })
                const EnrollButton = document.getElementById('Enroll' + value.mCode);
                EnrollButton.addEventListener('click', function (){
                let star_data = {
                    sID: parseInt(localStorage.getItem("id")),
                    cID: value.cID
                }
                fetch(window.location.origin + '/homepage/api/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(star_data)
                }).then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok ' + response)
                    }
                    return response.json();
                }).then(data => {
                    alert(data["msg"])
                    window.location.reload()
                    // showCourses(data)
                }).catch((error) => {
                    console.error('Error:', error);
                });
                alert("Student enroll\n Student id:" + localStorage.getItem("id") + "\n Course id:" + value.mCode)
            })
            }
        }
    })
}

function AddCourseContainer_init(data){
    const addCourse = document.getElementById('addCourse');
    addCourse.addEventListener('click', ()=>{
        document.location.href = window.location.origin + '/mymodules/addcourse';
    })
    data.forEach(function (value, index){
        const DetailButton = document.getElementById('Detail' + value.mCode)
        DetailButton.addEventListener('click', function (){
            document.location.href = window.location.origin + "/mymodules/MyCourseDetails?mCode=" + value.mCode;
        })
        const DeleteButton = document.getElementById('Delete' + value.mCode);
        DeleteButton.addEventListener('click', function (){
            var txt;
            if (confirm("Confirm Delete Course?!")) {
                txt = "OK";
            } else {
                txt = "Cancel";
            }
            if(txt === "OK"){
                fetch(document.location.origin+'/mymodules/api/Course',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mCode:value.mCode
                })
            }).then(response=>{
                if (!response.ok) {
                    console.log('Network response was not ok ' + response)
                }
                return response.json();
            }).then(data => {
                console.log(data)
                alert(data["msg"])
                document.location.reload()
            }).catch((error) => {
                console.error('Error:', error);
            });
            }
        })
        const StudentListButton = document.getElementById('StudentList' + value.mCode);
        StudentListButton.addEventListener('click', function (){
            document.location.href = window.location.origin + '/mymodules/StudentList?mCode=' + value.mCode;
        })
    })

}

window.addEventListener("load", start, false)