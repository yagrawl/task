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
    input.placeholder = "17";
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
    input.placeholder = "12";
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
    var tasks = document.createElement('div');
    tasks.className = "tasks-screen";
    var p = document.createElement('p');
    p.className = "title";
    p.textContent = "TASKS";

    tasks.appendChild(p);

    for(i = 0; i < localStorage.taskNumber; i++)
    {
        var task = document.createElement('div');
        task.className = "task";
        task.onclick = function() {
            var checkClass = this.getAttribute('class');
            if(checkClass === "task-done"){
                this.className = "task";
            }
            else{
                this.className = "task-done";
            }
            
        };
        tasks.appendChild(task);
    }

    var deadline = document.createElement('div');
    deadline.className = "tasks-deadline";

    var p = document.createElement('p');
    p.className = "title";
    p.textContent = "TIME LEFT";

    deadline.appendChild(p);
    
    var time = document.createElement('p');
    time.className = "subtitle";
    deadline.appendChild(time);
    var mincounter = 0;
    var mins = localStorage.taskDeadline * 24 * 60;
    var countdown = setInterval(function(){
        var days = Math.floor(mins/(24*60));
        var hours = Math.floor(mins%(days*24*60)/60);
        var min = mins - days*24*60 - hours*60;
        time.innerHTML = days + '<sup> days </sup>' + hours + '<sup> hours </sup>' + min + '<sup> mins </sup>';
        if(mincounter == 60){
            mins -= 1;
            mincounter = 0;
        }
        mincounter += 1;
    }, 1000);

    
    
    var hr = document.createElement('hr');
    deadline.appendChild(hr);

    var p = document.createElement('p');
    p.className = "title";
    p.textContent = "TASK NAME";

    var taskname = document.createElement('p');
    taskname.className = "subtitle";
    taskname.textContent = localStorage.taskName;

    deadline.appendChild(p);
    deadline.appendChild(taskname);

    page.appendChild(tasks);
    page.appendChild(deadline);
}

