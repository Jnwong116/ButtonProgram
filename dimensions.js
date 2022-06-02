const dropdownValues = ["Value 1", "Value 2", "Value 3"];

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
}

function addValue() {
  const dropdowns = document.getElementsByClassName("dropdown");
  const dropdownContent = document.getElementsByClassName("dropdownContent");

  const newVal = document.getElementById("addValue").value;

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
