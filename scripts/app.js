const ICONIMPORTANT = "iImportant fas fa-star";
const ICONNONIMPORTANT = "iImportant far fa-star";
let important = false;
let panelVisible = true;

function toggleImportance() {
  if (important) {
    //from imp to not imp
    $("#iImportant").removeClass(ICONIMPORTANT).addClass(ICONNONIMPORTANT);
    important = false;
  } else {
    //non imp to imp
    $("#iImportant").removeClass(ICONNONIMPORTANT).addClass(ICONIMPORTANT);
    important = true;
  }
}

function toggleButton() {
  if (panelVisible) {
    $("#form").hide();
    panelVisible = false;
  } else {
    $("#form").show();
    panelVisible = true;
  }
}
function saveTask() {
  let title = $("#txtTitle").val();
  let desc = $("#txtDescription").val();
  let dueDate = $("#txtDueDate").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#txtColor").val();
  let frequency = $("#selFrequency").val();
  let status = $("#selStatus").val();

  // create an obj
  let task = new Task(
    important,
    title,
    desc,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status
  );
  console.log(task);
  displayTask(task);
}

function getStatusText(status) {
  switch (status) {
    case `1`:
      return "Pending";
    case `2`:
      return "In Progress";
    case `3`:
      return "Paused";
    case `4`:
      return "Completed";
    case `5`:
      return "Abandoned";

    default:
      return "Other";
  }
}

function getFrequencyText(frequency) {
  switch (frequency) {
    case `0`:
      return "- One Time -";
    case `1`:
      return "Daily";
    case `2`:
      return "Weekly";
    case `3`:
      return "Monthly";

    default:
      return "Other";
  }
}

function displayTask(task) {
  let iconClass = ICONNONIMPORTANT;
  if (task.important) {
    iconClass = ICONIMPORTANT;
  }

  let syntax = `<div class="task-item" style="border: 1px solid ${task.color};">
        <div class="iconClass">  
        
        </div>

        <div class="info-1">  
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="info-2"> 
            <label>${task.dueDate}</label>
            <label>${task.location}</label>
        </div>

        <div class="info-3"> 
            <p>${task.invites}</p>
                
        </div>

        <div class="info-2"> 
            <label>${getStatusText(task.status)}</label>
            <label>${getFrequencyText(task.frequency)}</label>
        </div>
            

        </div>`;

  $("#tasks").append(syntax);
}

function init() {
  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(toggleButton);
  $("#saveTaskBtn").click(saveTask);
  //load data
}

window.onload = init;
