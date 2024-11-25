const form = document.getElementById('search');
const links = document.querySelectorAll('.link')


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

getAllCourses()
HelloUser()

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

    data.forEach(function (value, index) {
        var course = document.createElement('article');
        course.innerHTML = '<div id="course"><a href="CourseDetails?cID='+value.mCode+'"><p>' + value.mCode + '\t' + value.name +
            '</p><p>' + value.academic_year + '-' + value.semester + '</p></a></div>' +
            '<div id="CourseButtons"><div>Course Detail</div><div>Star</div></div>'
        tbody.appendChild(course);
    })
}

function HelloUser(){
    const hello = document.getElementById('hello_User')
    hello.innerHTML = '<p>Welcome, '+ localStorage.getItem("username") + '</p>'
}