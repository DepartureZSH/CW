const module = document.getElementById("Module");
const mCode = document.location.search.split('=')[1];

function start(){
    module.innerHTML =
        "<div class='container'>" +
            "<div class='title'>" +
                "<h2>Students List</h2>" +
            "</div>" +
            "<div id='StudentsList' class='courses-div1'>" +
            "</div>" +
        "</div>" +
        "<div class='container'>" +
            "<div class='title'>" +
                "<h2>Students Enrolled in The Course</h2>" +
            "</div>" +
            "<div id='StudentsListForCourse' class='courses-div1'>" +
            "</div>" +
        "</div>";
    getAllStudents();
    getAllEnrollStudents();
}

function getAllStudents(){
    fetch(window.location.origin + '/mymodules/api/getallstudents',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data);
        showStudentList(data);
        StudentListButton_init(data);
    }).catch((error) => {
        console.error('Error:', error);
    })
}

function showStudentList(data){
    const students_list = document.getElementById("StudentsList");
    data.forEach((student) => {
        console.log(student);
        var student_info =
                '<div class="course">' +
                    '<a href="#">' +
                        '<p>' + student.sID + '\t' + student.username + '</p>' +
                        '<p>' + student.email + '</p>' +
                    '</a>' +
                '</div>' +
                '<div class="CourseButtons">' +
                    '<div class="CourseButtons right-flex">' +
                        '<button class="btn" id="Add' + student.sID + '">Add to course</button>' +
                    '</div>' +
                '</div>'
        students_list.innerHTML += student_info
    })

}

function StudentListButton_init(data){
    data.forEach((student) => {
        const AddButton = document.getElementById('Add' + student.sID);
        AddButton.addEventListener('click', () => {
            console.log(student);
            let enroll_data = {
                sID: student.sID,
                mCode: mCode,
            }
            fetch(window.location.origin + '/mymodules/api/enroll', {
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
                console.log(data);
                alert(data["msg"])
                document.location.reload();
            }).catch((error) => {
                console.error('Error:', error);
            });
        })
    });
}

function getAllEnrollStudents(){
    fetch(window.location.origin + '/mymodules/api/getallenrollstudents',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mCode: document.location.search.split('=')[1]
        })
    }).then(response => {
        if (!response.ok) {
            console.log('Network response was not ok ' + response)
        }
        return response.json();
    }).then(data => {
        console.log(data);
        showEnrollStudents(data);
        EnrollStudentsButton_init(data);
    }).catch((error) => {
        console.error('Error:', error);
    })
}

function showEnrollStudents(data){
    const students_list = document.getElementById("StudentsListForCourse");
    data.forEach((enrollment) => {
        var student = enrollment.sID
        console.log(student);
        var student_info =
                '<div class="course">' +
                    '<a href="#">' +
                        '<p>' + student.sID + '\t' + student.username + '</p>' +
                        '<p>' + student.email + '</p>' +
                    '</a>' +
                '</div>' +
                '<div class="CourseButtons">' +
                    '<div class="CourseButtons right-flex">' +
                        '<button class="btn" id="Remove' + student.sID + '">Remove from course</button>' +
                    '</div>' +
                '</div>'
        students_list.innerHTML += student_info
    })

}

function EnrollStudentsButton_init(data){
    data.forEach((enrollment) => {
        var student = enrollment.sID
        const RemoveButton = document.getElementById('Remove' + student.sID);
        RemoveButton.addEventListener('click', () => {
            let enroll_data = {
                sID: student.sID,
                mCode: mCode,
            }
            fetch(window.location.origin + '/mymodules/api/enroll', {
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
                console.log(data);
                alert(data["msg"])
                document.location.reload();
            }).catch((error) => {
                console.error('Error:', error);
            });
        })
    });
}

window.addEventListener("load", start, false);