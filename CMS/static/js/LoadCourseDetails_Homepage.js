mCode = window.location.search.split('=')[1]

const data = {
    mCode: mCode,
};

function start(){
    getCourses(data);
}


function getCourses(data){
    fetch(window.location.origin + '/homepage/api/getcoursesbymcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        showCoursesDetails(data[0])
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showCoursesDetails(data){
    // 获取元素
    var tbody = document.getElementById('CourseDetails');
    tbody.innerHTML = ''
    if(localStorage.getItem("role")){
        const Details = {
        name: "<h1>" + data.name + "</h1>",
        Academic_year: '<p>Academic Year: <b>'+ data.academic_year +'</b></p>',
        mcode: '<p>Module code: <b>'+ data.mCode +'</b></p>',
        credits: '<p>Total credits: <b>'+ data.credits +'</b></p>',
        level: '<p>Level: <b>'+ data.level +'</b></p>',
        faculty: '<p>Offering school: <b>'+ data.dID.Faculty +'</b></p>',
        Convenor: '<p>Module convenor: <b>' + data.wID.username + '</b></p>',
        semesters: '<p>Taught semesters: <b>'+ data.semester +'</b>',
        Summary: '<h1>Summary of content</h1><p>' + data.summary + '</p>',
        Aims: '<h1>Educational aims</h1><p>' + data.aims + '</p>',
        method_frequency: '<h1>Method and frequency of class</h1>' + data.method_frequency,
        assessment: '<h1>Assessment</h1>' + data.assessment,
        assessment_period: '<h1>Assessment period</h1>' + data.assessment_period,
        outcomes: '<h1>Outcomes</h1>' + data.outcomes,
    }
        for (let key in Details) {
            if (Details.hasOwnProperty(key)) {
                var coursedetail = document.createElement('div');
                coursedetail.innerHTML = Details[key]
                tbody.appendChild(coursedetail);
            }
        }
    }
}

window.addEventListener("load", start, false)
