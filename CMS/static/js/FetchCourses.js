const form = document.getElementById('search');

form.addEventListener('submit', (event) => {
    event.preventDefault();
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
        // const entries = Object.entries(data)
        // let res = ""
        // entries.forEach(([key, value]) => {
        //     res += `${key}: ${value}\n`;
        //     if (value === 'success') {
        //         window.location.href = window.location.origin + "/homepage/"
        //     }
        // });
        // alert(res);
    }).catch((error) => {
        console.error('Error:', error);
    });
});

var data = [{
    id: 1,
    name: 'Programming',
    mCode: 'COMP4127'
}, {
    id: 2,
    name: 'Database',
    mCode: 'COMP4128'
}, {
    id: 3,
    name: 'Network',
    mCode: 'COMP4129'
}];
// 获取元素
var tbody = document.getElementById('courses-div');
data.forEach(function (value, index) {
    //方法1：利用字符串形式
    // var tr = '<tr><td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td></tr>'
    // tbody.insertAdjacentHTML('beforeend', tr);

    // 方法2：利用原生js的节点操作动态生成元素的方法
    var course = document.createElement('div');
    course.innerHTML = '<div>' + value.id + '</div><div>' + value.name + '</div><div>' + value.mCode + '</div></div>'
    tbody.appendChild(course);

    // 方法3：用jQuery实现	（记得引入jQuery文件)
    // var tr = $('<tr><td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td></tr>');
    // $('.tb tbody').append(tr);
    // 或者直接这样写：
    // $('.tb tbody').append('<tr><td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td></tr>');
})