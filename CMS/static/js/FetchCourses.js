const form = document.getElementById('search');
const links = document.querySelectorAll('.link')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var School = []
    var selectedLinks1 = document.querySelectorAll('#School .selected');
    selectedLinks1.forEach(function (link){
        School.push(link.textContent);
    })
    var Campus = []
    var selectedLinks2 = document.querySelectorAll('#Campus .selected');
    selectedLinks2.forEach(function (link){
        Campus.push(link.textContent);
    })
    var Faculty = []
    var selectedLinks3 = document.querySelectorAll('#Faculty .selected');
    selectedLinks3.forEach(function (link){
        Faculty.push(link.textContent);
    });
    var selectedLinks4 = document.querySelector('#mCode .selected');
    var mCode = selectedLinks4.textContent.replaceAll("*","");
    var Year = [];
    var selectedLinks5 = document.querySelectorAll('#Year .selected');
    selectedLinks5.forEach(function (link){
        Year.push(link.textContent);
    })
    var Semester = []
    var selectedLinks6 = document.querySelectorAll('#Semester .selected');
    selectedLinks6.forEach(function (link){
        Semester.push(link.textContent);
    })
    var name = document.forms["search"]["title"].value;
    const data = {
        School: School,
        Campus: Campus,
        Faculty: Faculty,
        mCode: mCode,
        Year: Year,
        Semester: Semester,
        name: name
    };
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
        course.innerHTML = '<div id="course"><p>' + value.mCode + '\t' + value.name +
            '</p><p>' + value.academic_year + '-' + value.semester + '</p></div>'
        tbody.appendChild(course);
    })
}
