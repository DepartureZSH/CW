const form = document.getElementById('search');
const links = document.querySelectorAll('.link')

function start(){
    getAllCourses()
    HelloUser()
    form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {}
    var School = []
    var selectedLinks1 = document.querySelectorAll('#School .selected');
        if(selectedLinks1.length > 0){
            selectedLinks1.forEach(function (link){
                School.push(link.textContent);
            })
            // data.School = School;
        }
        var Campus = []
        var selectedLinks2 = document.querySelectorAll('#Campus .selected');
        if(selectedLinks2.length > 0){
            selectedLinks2.forEach(function (link){
                Campus.push(link.textContent);
            })
            // data.Campus = Campus;
        }
        var Faculty = []
        var selectedLinks3 = document.querySelectorAll('#Faculty .selected');
        if(selectedLinks3.length > 0){
            selectedLinks3.forEach(function (link){
                Faculty.push(link.textContent);
            });
            // data.Faculty = Faculty;
        }
        var selectedLinks4 = document.querySelector('#mCode .selected');
        if(selectedLinks4){
            var mCode = selectedLinks4.textContent.replaceAll("*","");
            data.mCode__startswith = mCode
        }else{
            data.mCode__startswith = "COMP"
        }
        var Year = [];
        var selectedLinks5 = document.querySelectorAll('#Year .selected');
        if(selectedLinks5.length > 0){
            selectedLinks5.forEach(function (link){
                Year.push(link.textContent);
            })
            data.academic_year__in = Year
        }
        var Semester = []
        var selectedLinks6 = document.querySelectorAll('#Semester .selected');
        if(selectedLinks6.length > 0){
            selectedLinks6.forEach(function (link){
                Semester.push(link.textContent);
            })
            data.semester__in = Semester;
        }
        var name = document.forms["search"]["title"].value;
        data.name__contains = name;
        console.log(data);
        getCourses(data);
    });

    links.forEach(function (link){
        link.addEventListener('click', function (event){
            event.preventDefault()
            if(link.classList.contains("selected")){
                link.classList.remove("selected")
            }else{
                link.classList.add("selected")
            }
        })
    })
}

function getCourses(filter_data){
    fetch(window.location.origin + '/homepage/api/getcourses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter_data)
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showCourses(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function getAllCourses(){
    fetch(window.location.origin + '/homepage/api/getcourses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showCourses(data)
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showCourses(data){
    // 获取元素
    var tbody = document.getElementById('courses-div');
    tbody.innerHTML = ''
    var course_info = ''
    var course = document.createElement('article');

    data.forEach(function (value, index) {
        if(localStorage.getItem("role")==="student"){
            course_info =
                '<div id="course">' +
                    '<a href="CourseDetails?cID=' + value.mCode + '">' +
                        '<p>' + value.mCode + '\t' + value.name + '</p>' +
                        '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                    '</a>' +
                '</div>' +
                '<div id="CourseButtons">' +
                    '<div id="CourseButtons" class="left-flex">' +
                        '<button class="btn" id="Detail' + value.mCode + '">Course Detail</button>' +
                    '</div>' +
                    '<div id="CourseButtons" class="right-flex">' +
                        '<button class="btn" id="Star' + value.mCode + '">Star</button>' +
                        '<button class="btn" id="Enroll' + value.mCode + '">Enroll</button>' +
                    '</div>' +
                '</div>'
        }else if(localStorage.getItem("role")==="admin"){
            course_info =
                '<div id="course">' +
                    '<a href="CourseDetails?cID=' + value.mCode + '">' +
                    '<p>' + value.mCode + '\t' + value.name + '</p>' +
                    '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                    '</a>' +
                '</div>' +
                '<div id="CourseButtons">' +
                    '<div id="CourseButtons" class="left-flex">' +
                        '<button class="btn" id="Detail' + value.mCode + '">Course Detail</button>' +
                    '</div>' +
                    '<div id="CourseButtons" class="right-flex">' +
                        '<button class="btn" id="Star' + value.mCode + '">Star</button>' +
                        '<button class="btn" id="Modify' + value.mCode + '">Modify</button>' +
                    '</div>' +
                '</div>'
        }else{
            course_info =
                '<div id="course">' +
                    '<a href="CourseDetails?cID=' + value.mCode + '">' +
                        '<p>' + value.mCode + '\t' + value.name + '</p>' +
                        '<p>' + value.academic_year + '-' + value.semester + '</p>' +
                    '</a>' +
                '</div>'
        }
        course.innerHTML += course_info
    })

    tbody.appendChild(course);

    data.forEach(function (value, index) {
        const DetailButton = document.getElementById('Detail' + value.mCode);
        DetailButton.addEventListener('click', function (){
            window.location.href = window.location.origin + "/homepage/CourseDetails?cID=" + value.mCode;
        })
        if(localStorage.getItem("role")==="student"){
            console.log(value)
            const StarButton = document.getElementById('Star' + value.mCode);
            StarButton.addEventListener('click', function (){
                let star_data = {
                    sID: localStorage.getItem("id"),
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
                    alert(data)
                    // showCourses(data)
                }).catch((error) => {
                    console.error('Error:', error);
                });
                alert("Student Star\n id:" + localStorage.getItem("id") + "\n courseid:" + value.mCode)
            })
            const EnrollButton = document.getElementById('Enroll' + value.mCode);
            EnrollButton.addEventListener('click', function (){
                alert("Student Enroll\n id" + localStorage.getItem("id") + "\n courseid:" + value.mCode)
            })
        }else if(localStorage.getItem("role")==="admin"){
            const ModifyButton = document.getElementById('Modify' + value.mCode);
            ModifyButton.addEventListener('click', function (){
                alert("Admin Modify courseid:" + value.mCode)
            })
        }else{
            alert("You don't have the right to do so! Please login in first!")
        }
    })
}

function HelloUser(){
    const hello = document.getElementById('hello_User')
    hello.innerHTML = '<p>Welcome, '+ localStorage.getItem("username") + '!</p>'
}

window.addEventListener("load", start, false)