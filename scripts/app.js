const ICONIMPORTANT = "iImportant fas fa-star";
const ICONNONIMPORTANT = "iImportant far fa-star";
let important = false;
let panelVisible = true;
let count = 0;

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
    color,
    frequency,
    status
  );
  // console.log(task);
  // displayTask(task);

  //sending a request to a server
  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Task saved", res);
      displayTask(task);
      clearForm();

      //update the count
      total += 1;
      $("#headcount").text("You have " + total + "task");
    },
    error: function (errorDetails) {
      console.log("Save failed", errorDetails);
    },
  });
}

function clearForm() {
  // $("#txtTitle").val("");
  // $("#txtDescription").val("");
  // $("#txtDueDate").val("");
  // $("#txtLocation").val("");
  // $("#txtColor").val("#ffffff");
  // $("#selFrequency").val("");
  // $("#selStatus").val("");
  $("select").val("0");
  $("input").val("");
  $("textarea").val("");
  $("#txtColor").val("#ffffff");
}

function deleteTask() {
  console.log("deleting");
  $.ajax({
    type: "delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Aldrian",
    success: function () {
      // reload the page
      location.reload();
    },
    error: function () {
      console.log("Error clearing tasks");
    },
  });
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
        <div class="icon-class">  
          <i class="${iconClass}"></i>
        </div>

        <div class="info-1">  
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="info-2"> 
            <label>${task.dueDate}</label>
        </div>

        <div class="info-3"> 
            <label>${task.location}</label>
        </div>

        <div class="info-4"> 
            <label>${getStatusText(task.status)}</label>
            <label>${getFrequencyText(task.frequency)}</label>
        </div>
        
        </div>`;

  $("#tasks").append(syntax);
}
function fetchTask() {
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      let data = JSON.parse(res); // (decode) from string to obj
      let count = 0;

      //for loop over data
      for (let i = 0; i < data.length; i++) {
        //get every element inside the array
        let task = data[i];
        //send the element to the display fn
        if (task.name == "Aldrian") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.log("Error retrieving data", err);
    },
  });
}

function init() {
  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(toggleButton);
  $("#saveTaskBtn").click(saveTask);
  $("#deleteBtnAll").click(deleteTask);
  //load data
  fetchTask();
}

window.onload = init;
