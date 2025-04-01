let addTaskButton = document.getElementById("addTaskButton");
let notesContainer = document.getElementById("noteContainer");
let currentDate = new Date().toDateString();
addTaskButton.addEventListener("click", appendNote);
//  function
function appendNote() {
  //current time
  let currentTime = new Date();
  let hours = currentTime.getHours().toString().padStart(2, "0");
  let minutes = currentTime.getMinutes().toString().padStart(2, "0");
  let currentTimeValue = document.createElement("span");
  currentTimeValue.classList.add("time");
  if (hours >= 12) {
    currentTimeValue.innerText = `${hours}:${minutes}`;
  } else {
    currentTimeValue.innerText = `${hours}:${minutes}`;
  }

  let count = 0;
  //parent div
  let parentDiv = document.createElement("div");
  let div = document.createElement("div");
  div.setAttribute("class", "parentDiv");

  // to add date
  let dateTitle = document.createElement("b");
  dateTitle.setAttribute("class", "dates");
  let dateValue = document.getElementById("dateInput").value;
  dateValue = new Date(dateValue).toDateString();
  dateTitle.innerText = dateValue;
  if (!dateValue) {
    alert("please enter the date");
    return;
  }
  div.appendChild(dateTitle);
  //adding chevron icon
  let chevron = document.createElement("span");
  chevron.classList.add("bx", "bx-chevron-down");
  chevron.setAttribute("id", "chevronIcon");
  dateTitle.append(chevron);

  //to add input
  let noteValue = document.getElementById("noteInput").value;
  if (!noteValue) {
    alert("please enter the task");
    return;
  }
  let note = document.createElement("span");
  note.innerText = noteValue;
  note.setAttribute("class", dateValue);
  div.appendChild(note);

  //to add time
  let timeValue = document.getElementById("timeInput").value;
  let time = document.createElement("span");
  time.classList.add("time");
  if (!timeValue) {
    time = currentTimeValue;
  } else {
    time.innerText = timeValue;
  }
  note.appendChild(time);

  // to edit the task
  let editBtn = document.createElement("i");
  editBtn.classList.add("bx", "bx-pencil");
  editBtn.classList.add('class', "editBtn");
  note.appendChild(editBtn);

  editBtn.onclick = (event) => {
    let targetedArea = event.target.parentNode;
    let time = document.createElement("span");
    time.innerText = targetedArea.children[0].innerText;
    time.classList.add("time");
    let newTaskPrompt = prompt("Enter new task(max 55 characters)");
    if(newTaskPrompt.length<=55){
      if (newTaskPrompt) {
        targetedArea.textContent = newTaskPrompt;
        note.appendChild(time);
        note.appendChild(editBtn);
        note.appendChild(clearBtn);
      }
    }
    else{
      alert("Please write a task of maximum 55 characters");
    }
  
  };

  // to remove task
  let clearBtn = document.createElement("i");
  clearBtn.classList.add("bx", "bx-x");
  clearBtn.classList.add('class', "clearBtn");
  note.appendChild(clearBtn);

  //add a add button
  let addIcon = document.createElement("p");
  addIcon.setAttribute("id", "addIcon");
  addIcon.innerText = " + Add new note";
  div.appendChild(addIcon);

  // checking the same date
  let allDates = document.getElementsByClassName("dates");
  for (let date of allDates) {
    if (date.innerText === dateValue) {
      let sameDiv = date.parentNode;
      let addNewNotebutton = sameDiv.lastChild;
      let newDiv = document.createElement("div");

      note.appendChild(time);
      note.appendChild(editBtn);
      note.appendChild(clearBtn);
      newDiv.appendChild(note);
      sameDiv.insertBefore(newDiv, addNewNotebutton);
      count = 1;
    }
  }
  function parentCount() {
    let parentCount = document.getElementsByClassName("parentDiv").length;
    if (parentCount === 0) {
      document.body.classList.add("addBackgroundImage");
    }
  }

  clearBtn.onclick = (event) => {
    let clickedArea = event.target;
    let childs = document.getElementsByClassName(dateValue);
    clickedAreaParent = clickedArea.parentNode;
    let childCount = childs.length;
    parentCount()
    if (childCount === 1) {
      clickedAreaParent = clickedAreaParent.parentNode;
      clickedAreaParent.parentNode.remove();
      childCount--;
    } else {
      clickedAreaParent.remove();
      childCount--;
    }
  };

  // chevron icon functioning
  chevron.onclick = (event) => {
    let chevronIconParent = event.target.parentElement;
    let parentElement = chevronIconParent.parentElement;

    let allchildren = parentElement.children;
    for (let i = 1; i < allchildren.length; i++) {
      allchildren[i].classList.toggle("chevronUp");
    }
  };

  // Adding new task directly
  addIcon.onclick = (event) => {
    let notePrompt = prompt("Enter the new task(maximum 55 characters)");
if(notePrompt.length<=55){
  if (notePrompt) {
    let newDiv = document.createElement("div");
    newDiv.innerText = notePrompt;
    let editBtn = document.createElement("i");
    editBtn.classList.add("bx", "bx-pencil");
    editBtn.classList.add('class', "editBtn");
    //clearn button for new task
    let clearBtn = document.createElement("i");
    clearBtn.classList.add("bx", "bx-x");
    clearBtn.classList.add('class', "clearBtn");
    clearBtn.onclick = (event) => {
      let clickedArea = event.target;
      clickedArea.parentNode.remove();
    };

    // current time for new task
    let currentTime = new Date();
    let hours = currentTime.getHours().toString().padStart(2, "0");
    let minutes = currentTime.getMinutes().toString().padStart(2, "0");
    let currentTimeValue = document.createElement("span");
    currentTimeValue.classList.add("time");
    if (hours >= 12) {
      currentTimeValue.innerText = `${hours}:${minutes}`;
    } else {
      currentTimeValue.innerText = `${hours}:${minutes}`;
    }
    // edit button for new task
    editBtn.onclick = (event) => {
      let targetedArea = event.target.parentNode;
      let newTaskPrompt = prompt("Enter new task");

      targetedArea.textContent = newTaskPrompt;
      newDiv.appendChild(currentTimeValue);
      newDiv.appendChild(editBtn);
      newDiv.appendChild(clearBtn);
    };
    newDiv.appendChild(currentTimeValue);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(clearBtn);
    let targetedArea = event.target;
    let taregtParent = targetedArea.parentNode;
    taregtParent.insertBefore(newDiv, addIcon);
  } else {
    alert("Please write  a task");
  }
}
else{
  alert("Please write a task of maximum 55 characters");
}
    
  };

  if (count === 0) {
    parentDiv.append(div);
    count = 0;
  }
  let childs = document.getElementsByClassName(dateValue);
  let childCount = childs.length;
  notesContainer.append(parentDiv);
  document.body.classList.add("removeBackgroundImage");
  notesContainer.style.borderColor = "black";
}

// removing values after refreshing
function afterRefresh() {
  let allInput = document.querySelectorAll("input");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
}

document.onload = afterRefresh();
