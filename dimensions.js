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

const relayValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,
];

const buttonRelay = {};

let selectedButton = null;

function updateButtonText(text) {
  selectedButton.innerHTML = text;
}

function updateRelays() {
  const relayContainer = document.getElementById("relayContainer");
  relayContainer.childNodes.forEach((relay) => {
    if (buttonRelay[relay.innerHTML] !== undefined) {
      relay.disabled = true;
      relay.classList.add("relayDisabled");
    }

    if (buttonRelay[relay.innerHTML] === undefined) {
      relay.disabled = false;
      relay.classList.remove("relayDisabled");
    }
  });
}

function updateRelayText(text) {
  if (selectedButton === null) {
    return;
  }
  const relay = document.getElementById("relay");

  relay.innerHTML = text;

  if (text === "Relay Number") {
    return;
  }

  // Checks if button is already assigned to relay
  for (const key in buttonRelay) {
    if (buttonRelay[key] === selectedButton) {
      buttonRelay[key] = undefined;
    }
  }

  buttonRelay[text] = selectedButton;
  updateRelays();
}

function getButtonRelay() {
  for (const key in buttonRelay) {
    if (buttonRelay[key] === selectedButton) {
      updateRelayText(key);
      return;
    }
  }
  updateRelayText("Relay Number");
}

function addButton() {
  const content = document.getElementById("pageContent");
  const button = document.createElement("div");
  button.classList.add("placeButton");
  button.innerHTML = "Placeholder";

  content.appendChild(button);

  // Adds number to relay values
  const dropdownContent = document.getElementsByClassName("dropdownContent");
  // relayValues.push(relayValues.length + 1);
  // populateDropdown(dropdownContent[1], relayValues, updateRelayText);

  // Resets relay value text
  const relay = document.getElementById("relay");
  relay.innerHTML = "Relay Number";

  drag(button);
}

function addValue() {
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

  populateDropdown(dropdownContent[0], dropdownValues, updateButtonText);
}

function populateDropdown(dropdownContent, dropdownArray, onClick) {
  clearDropdowns(dropdownContent);
  for (let i = 0; i < dropdownArray.length; i++) {
    const value = document.createElement("option");
    value.innerHTML = dropdownArray[i];
    value.classList.add("dropdownValue");
    value.onclick = () => {
      onClick(value.innerHTML);
    };
    dropdownContent.appendChild(value);
  }
}

function clearDropdowns(dropdownContent) {
  while (dropdownContent.firstChild) {
    dropdownContent.removeChild(dropdownContent.firstChild);
  }
}

function calculateDimensions() {
  const left = document.getElementById("left");
  const top = document.getElementById("top");
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const dimensions = selectedButton.getBoundingClientRect();
  left.value = selectedButton.offsetLeft;
  top.value = selectedButton.offsetTop;
  width.value = dimensions.width;
  height.value = dimensions.height;
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
    if (selectedButton !== null) {
      selectedButton.classList.remove("selected");
    }
    selectedButton = button;
    selectedButton.classList.add("selected");
    getButtonRelay();
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
    calculateDimensions();
  }
}

// Populates dropdown with values
const dropdownContent = document.getElementsByClassName("dropdownContent");
populateDropdown(dropdownContent[0], dropdownValues, updateButtonText);
populateDropdown(dropdownContent[1], relayValues, updateRelayText);
