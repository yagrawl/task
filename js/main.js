doneTasks = [];
diff = 0;
function checkStatus(){
    if(typeof localStorage.taskName !== 'undefined'){
        var question1 = document.getElementById("question1");
        page.removeChild(question1);
        if(typeof localStorage.doneTasks !== "undefined"){
            var done = localStorage.doneTasks.split(',');
            diff = Math.abs(new Date() - new Date(localStorage.shutdownTime));
        }
        showStats(done, diff);
    }
}

function getTaskName(){
    const page = document.getElementById("page");
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

function showStats(done, diff){
    var tasks = document.createElement('div');
    tasks.className = "tasks-screen";
    var p = document.createElement('p');
    p.className = "title";
    p.textContent = "TASKS";

    tasks.appendChild(p);

    var progressContainer = document.createElement('div');
    progressContainer.id = "progress-div";

    var progress = document.createElement('div');
    progress.id = "myProgress";

    var bar = document.createElement('div');
    bar.id = "myBar";

    progress.appendChild(bar);
    progressContainer.appendChild(progress);
    tasks.appendChild(progressContainer);
    var width = 1;

    for(i = 0; i < localStorage.taskNumber; i++)
    {
        var task = document.createElement('div');
        task.className = "task";
        task.id = "task" + i;
        task.onclick = function() {
            var checkClass = this.getAttribute('class');
            if(checkClass === "task-done"){
                this.className = "task";
                var elem = document.getElementById("myBar"); 
                width -= (100.0/localStorage.taskNumber); 
                elem.style.width = width + '%'; 
                var index = doneTasks.indexOf(this.id);
                if(index != -1) {
                    doneTasks.splice(index, 1);
                }
                localStorage.doneTasks = doneTasks;
                console.log(localStorage.doneTasks);
            }
            else{
                this.className = "task-done";
                var elem = document.getElementById("myBar");   
                width += (100.0/localStorage.taskNumber); 
                elem.style.width = width + '%'; 
                doneTasks.push(this.id);
                localStorage.doneTasks = doneTasks;
                console.log(localStorage.doneTasks);
            
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
    if(diff === undefined){
        var mins = localStorage.taskDeadline * 24 * 60;
    }
    else{
        var mins = (localStorage.shutMin) - Math.floor(diff/60000);
    }
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
        localStorage.shutMin = days*24*60 + hours*60 + min;
        localStorage.shutdownTime = new Date();
    }, 1000);

    
    
    var hr = document.createElement('hr');
    deadline.appendChild(hr);

    var p = document.createElement('p');
    p.className = "title";
    p.textContent = "TASK NAME";

    var taskname = document.createElement('p');
    taskname.className = "subtitle";
    taskname.textContent = localStorage.taskName;

    var newTask = document.createElement('div');
    newTask.className = "new";
    var newTaskLogo = document.createElement('img');
    newTaskLogo.src = "img/new.png";
    newTaskLogo.setAttribute('onclick', 'setNewTask();');
    newTask.appendChild(newTaskLogo);

    deadline.appendChild(p);
    deadline.appendChild(taskname);

    tasks.id = "tasks";
    deadline.id = "deadline";
    page.appendChild(tasks);
    page.appendChild(deadline);
    page.appendChild(newTask);

    if(done !== undefined){
        for(i = 0; i < done.length; i++){
            document.getElementById(done[i]).className = "task-done";
            var elem = document.getElementById("myBar");   
            width += (100.0/localStorage.taskNumber); 
            elem.style.width = width + '%'; 
        }
    }
    
}

function setNewTask(){
    document.getElementById('deadline').remove();
    document.getElementById('tasks').remove();
    doneTasks = [];
    localStorage.clear();
    var div = document.createElement('div');
    div.className = "question-div";
    div.id = "question1";
    
    var p = document.createElement('p');
    var input = document.createElement('input');
    var img = document.createElement('img');
    var br = document.createElement('br');

    p.className = "question-text";
    p.textContent = "What do you want to do?";
    input.className = "text-answer";
    input.type = "text";
    input.id = "taskName";
    input.placeholder = "Task Name";
    img.src = "img/next.png";
    img.className = "next-img";
    img.setAttribute('onclick','getTaskName();');

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(br);
    div.appendChild(img);
    page.appendChild(div);
}


