function start(){
    if(window.location.search){
        console.log(window.location.pathname);
    }
    if(localStorage.getItem("role")==="teacher"){
        form_init();
        if(window.location.pathname.split('/')[1]==="mymodules"){
            fetch_course_data();
        }
    }else{
        alert("You don't have permission to add courses!");
        window.location.href = window.location.origin+"/";
    }
}


function form_init(){
    const form = document.getElementById("course_form");
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        var isValid = validateForm();
        if (isValid) {
            const data = get_course_data()
            if(window.location.search){
                fetch(window.location.origin + '/mymodules/api/Course', {
                    method: 'PUT',
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
                    console.log(data);
                    alert(data["msg"])
                }).catch((error) => {
                    console.error('Error:', error);
                });
            }else{
                fetch(window.location.origin + '/mymodules/api/Course', {
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
                    console.log(data);
                    alert(data["msg"])
                }).catch((error) => {
                    console.error('Error:', error);
                });
            }

        }
    })
}

function fetch_course_data(){
    const mCode = window.location.search.split('=')[1]
    const data = {
        mCode: mCode,
    };
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
    const name = document.getElementById("id_name");
    name.value = data["name"];
    const academic_year = document.getElementById("id_academic_year");
    academic_year.value = data["academic_year"];
    const mCode = document.getElementById("id_mCode");
    mCode.value = data["mCode"];
    const credits = document.getElementById("id_credits");
    credits.value = data["credits"];
    const level = document.getElementById("id_level");
    level.value = data["level"];
    const semester = document.getElementById("id_semester");
    semester.value = data["semester"];
    const summary = document.getElementById("id_summary");
    summary.value = data["summary"];
    const aims = document.getElementById("id_aims");
    aims.value = data["aims"];
    const method_frequency = document.getElementById("id_method_frequency");
    method_frequency.value = data["method_frequency"];
    const assessment = document.getElementById("id_assessment");
    assessment.value = data["assessment"];
    const assessment_period = document.getElementById("id_assessment_period");
    assessment_period.value = data["assessment_period"];
    const outcomes = document.getElementById("id_outcomes");
    outcomes.value = data["outcomes"];
    const dID = document.getElementById("id_dID");
    const wID = document.getElementById("id_wID").value;
}

function get_course_data(){
    const name = document.getElementById("id_name").value;
    const academic_year = document.getElementById("id_academic_year").value;
    const mCode = document.getElementById("id_mCode").value;
    const credits = document.getElementById("id_credits").value;
    const level = document.getElementById("id_level").value;
    const semester = document.getElementById("id_semester").value;
    const summary = document.getElementById("id_summary").value;
    const aims = document.getElementById("id_aims").value;
    const method_frequency = document.getElementById("id_method_frequency").value;
    const assessment = document.getElementById("id_assessment").value;
    const assessment_period = document.getElementById("id_assessment_period").value;
    const outcomes = document.getElementById("id_outcomes").value;
    const dID = document.getElementById("id_dID").value;
    const wID = document.getElementById("id_wID").value;
    return {
        name: name,
        academic_year: academic_year,
        mCode: mCode,
        credits: parseInt(credits),
        level: parseInt(level),
        semester: semester,
        summary: summary,
        aims: aims,
        method_frequency: method_frequency,
        assessment: assessment,
        assessment_period: assessment_period,
        outcomes: outcomes,
        dID: parseInt(dID),
        wID: parseInt(wID),
    };
}

function validateForm(){
    const name = document.getElementById("id_name").value;
    const academic_year = document.getElementById("id_academic_year").value;
    const mCode = document.getElementById("id_mCode").value;
    const credits = document.getElementById("id_credits").value;
    const level = document.getElementById("id_level").value;
    const semester = document.getElementById("id_semester").value;
    const summary = document.getElementById("id_summary").value;
    const aims = document.getElementById("id_aims").value;
    const method_frequency = document.getElementById("id_method_frequency").value;
    const assessment = document.getElementById("id_assessment").value;
    const assessment_period = document.getElementById("id_assessment_period").value;
    const outcomes = document.getElementById("id_outcomes").value;
    const dID = document.getElementById("id_dID").value;
    const wID = document.getElementById("id_wID").value;
    // 检查是否所有必填字段都已填写
    if (name === ""){
        alert("Please enter name");
        return false;
    }else{
        var Pattern = /^[a-zA-Z0-9 .,:]+$/
        if(!Pattern.test(name) && name.length <= 50){
            alert("Please enter a valid name");
            return false;
        }
    }
    if(academic_year === ""){
        alert("Please enter academic year");
        return false;
    }else{
        var Pattern = /^20\d\d$/
        if(!Pattern.test(academic_year)){
            alert("Please enter a valid academic year");
            return false;
        }
    }
    if(mCode === ""){
        alert("Please enter mCode");
        return false;
    }else if(window.location.search){
        if(window.location.search.split("=")[1]!==mCode){
            alert("The module code should be " + window.location.search.split("=")[1]);
            return false;
        }
    }else{
        var Pattern = /^COMP\d\d\d\d$/
        if(!Pattern.test(mCode)){
            alert("Please enter a valid mCode");
            return false;
        }
    }
    if(credits === ""){
        alert("Please enter credits");
        return false;
    }
    if(level === ""){
        alert("Please enter level");
        return false;
    }
    if(semester === ""){
        alert("Please choose a semester");
        return false;
    }
    if(dID === ""){
        alert("Please choose a department");
        return false;
    }
    if(wID === ""){
        alert("Please choose a teacher");
        return false;
    }
    return true;
}

window.addEventListener("load", start, false)