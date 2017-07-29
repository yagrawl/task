const page = document.getElementById("page");

function checkStatus(){
    
}

function getTaskName(){
    var taskName = document.getElementById("taskName").value;
    if (typeof(Storage) !== "undefined"){
        localStorage.taskName = taskName;
    }

    var question1 = document.getElementById("question1");
    page.removeChild(question1);

    console.log('Done with question1')

    setTaskNumber();
}

function setTaskNumber(){
    var div = document.createElement('div');
    div.className = "question-div";
    div.id = "question2";
    
    var p = document.createElement('p');
    var input = document.createElement('input');
    var img = document.createElement('img');
    var br = document.createElement('br');

    p.className = "question-text";
    p.textContent = "How Many Tasks?";
    input.className = "number-answer";
    input.type = "number";
    input.id = "taskNumber";
    img.src = "img/next.png";
    img.className = "next-img";
    img.setAttribute('onclick','getTaskNumber();');

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(br);
    div.appendChild(img);
    page.appendChild(div);
}

function getTaskNumber(){
    var taskNumber = document.getElementById("taskNumber").value;
    if (typeof(Storage) !== "undefined"){
        localStorage.taskNumber = taskNumber;
    }

    var question2 = document.getElementById("question2");
    page.removeChild(question2);

    console.log('Done with question2');
    setTaskDeadline();
}

function setTaskDeadline(){
    var div = document.createElement('div');
    div.className = "question-div";
    div.id = "question3";
    
    var p = document.createElement('p');
    var input = document.createElement('input');
    var img = document.createElement('img');
    var br = document.createElement('br');

    p.className = "question-text";
    p.textContent = "How Many Days till Deadline?";
    input.className = "number-answer";
    input.type = "number";
    input.id = "taskDeadline";
    img.src = "img/next.png";
    img.className = "next-img";
    img.setAttribute('onclick','getTaskDeadline();');

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(br);
    div.appendChild(img);
    page.appendChild(div);
}

function getTaskDeadline(){
    var taskDeadline = document.getElementById("taskDeadline").value;
    if (typeof(Storage) !== "undefined"){
        localStorage.taskDeadline = taskDeadline;
    }

    var question3 = document.getElementById("question3");
    page.removeChild(question3);

    console.log('Done with question3');
    showStats();
}

function showStats(){
    var div = document.createElement('div');
    div.className = "tasks-screen";

    for(i = 0; i < localStorage.taskNumber; i++)
    {
        var task = document.createElement('div');
        task.className = "task";
        task.onclick = function() {
            this.className = "task-done";
        };
        div.appendChild(task);
    }


    page.appendChild(div);
}

