const home = document.getElementById('home');
const modules = document.getElementById('modules');
const enrollment = document.getElementById('Enrollments');
const stars = document.getElementById('Stars');

function start(){
    Nav_init()
    getAllEnrollments()
    getAllStars()
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
    stars.innerHTML = ''
    var course = createCourseContainer(data, 2);
    stars.appendChild(course);
    CourseContainer_init(data, 2);
}

function createCourseContainer(data, mode){
    var course_info = ''
    var course = document.createElement('article');
    data.forEach(function (value, index) {
        value = value.cID
        if(localStorage.getItem("role")==="student"){
            if(mode===1){
                course_info =
                    '<div class="course">' +
                        '<a href="CourseDetails?cID=' + value.mCode + '">' +
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
                        '<a href="CourseDetails?cID=' + value.mCode + '">' +
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
            // course_info =
            //     '<div class="course">' +
            //         '<a href="CourseDetails?cID=' + value.mCode + '">' +
            //         '<p>' + value.mCode + '\t' + value.name + '</p>' +
            //         '<p>' + value.academic_year + '-' + value.semester + '</p>' +
            //         '</a>' +
            //     '</div>' +
            //     '<div class="CourseButtons">' +
            //         '<div class="CourseButtons left-flex">' +
            //             '<button class="btn" id="Detail' + value.mCode + '">Course Detail</button>' +
            //         '</div>' +
            //         '<div class="CourseButtons right-flex">' +
            //             '<button class="btn" id="Star' + value.mCode + '">Star</button>' +
            //             '<button class="btn" id="Modify' + value.mCode + '">Modify</button>' +
            //         '</div>' +
            //     '</div>'
        }else{
            // course_info =
            //     '<div class="course">' +
            //         '<a href="CourseDetails?cID=' + value.mCode + '">' +
            //             '<p>' + value.mCode + '\t' + value.name + '</p>' +
            //             '<p>' + value.academic_year + '-' + value.semester + '</p>' +
            //         '</a>' +
            //     '</div>'
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
            window.location.href = window.location.origin + "/mymodules/CourseDetails?cID=" + value.mCode;
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



window.addEventListener("load", start, false)