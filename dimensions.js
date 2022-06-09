const dropdownValues = [
  "Up",
  "Down",
  "Door Open",
  "Door Close",
  "Basement",
  "Lobby",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "6th Floor",
  "7th Floor",
  "8th Floor",
  "9th Floor",
  "10th Floor",
  "11th Floor",
  "12th Floor",
  "13th Floor",
  "14th Floor",
  "15th Floor",
  "16th Floor",
  "17th Floor",
  "18th Floor",
  "19th Floor",
  "20th Floor",
  "21st Floor",
  "22nd Floor",
  "23rd Floor",
  "24th Floor",
  "25th Floor",
  "26th Floor",
  "27th Floor",
  "28th Floor",
  "29th Floor",
  "30th Floor",
  "Ground Floor",
  "Penthouse",
  "Roof",
  "Cellar",
  "Mezzanine",
  "Sub-basement",
  "Sub-Cellar",
  "Lower Level",
  "Sub Cellar Rear",
  "Ground Floor Rear",
  "Garage",
  "Pool",
  "Fitness Center",
  "Lounge",
  "Sky Garden",
  "Gym",
  "Penthouse 1",
  "Penthouse 2",
  "Penthouse 3",
  "Penthouse 4",
  "Penthouse 5",
];

function updateButtonText(button, text) {
  button.innerHTML = text;
}

function addButton() {
  const content = document.getElementById("pageContent");
  const button = document.createElement("div");
  button.classList.add("placeButton");

  const dropdown = document.createElement("button");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = "Dropdown";

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdownContent");

  populateDropdown(dropdownContent, dropdown);

  button.appendChild(dropdown);
  button.appendChild(dropdownContent);

  content.appendChild(button);

  drag(button);
}

function addValue() {
  const dropdowns = document.getElementsByClassName("dropdown");
  const dropdownContent = document.getElementsByClassName("dropdownContent");

  const newVal = document.getElementById("addValue").value;

  // Checks to make sure new value is not empty
  if (newVal !== " ") {
    return;
  }

  // Checks to make sure new value is not already in dropdown
  for (let i = 0; i < dropdownValues.length; i++) {
    if (newVal === dropdownValues[i]) {
      return;
    }
  }

  dropdownValues.push(newVal);

  for (let i = 0; i < dropdowns.length; i++) {
    populateDropdown(dropdownContent[i], dropdowns[i]);
  }
}

function populateDropdown(dropdownContent, dropdown) {
  clearDropdowns(dropdownContent);
  for (let i = 0; i < dropdownValues.length; i++) {
    const value = document.createElement("a");
    value.innerHTML = dropdownValues[i];
    value.classList.add("dropdownValue");
    value.onclick = () => {
      updateButtonText(dropdown, value.innerHTML);
    };
    dropdownContent.appendChild(value);
  }
}

function clearDropdowns(dropdownContent) {
  while (dropdownContent.firstChild) {
    dropdownContent.removeChild(dropdownContent.firstChild);
  }
}

function drag(button) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  button.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    button.style.top = button.offsetTop - pos2 + "px";
    button.style.left = button.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
