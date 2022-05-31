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

  const value1 = document.createElement("a");
  value1.innerHTML = "Value 1";
  value1.classList.add("dropdownValue");
  value1.onclick = () => {
    updateButtonText(dropdown, value1.innerHTML);
  };

  const value2 = document.createElement("a");
  value2.innerHTML = "Value 2";
  value2.classList.add("dropdownValue");
  value2.onclick = () => {
    updateButtonText(dropdown, value2.innerHTML);
  };

  const value3 = document.createElement("a");
  value3.innerHTML = "Value 3";
  value3.classList.add("dropdownValue");
  value3.onclick = () => {
    updateButtonText(dropdown, value3.innerHTML);
  };

  dropdownContent.appendChild(value1);
  dropdownContent.appendChild(value2);
  dropdownContent.appendChild(value3);

  button.appendChild(dropdown);
  button.appendChild(dropdownContent);

  content.appendChild(button);
}

function addValue() {
  const dropdowns = document.getElementsByClassName("dropdownContent");

  const value = document.createElement("a");
  const valueText = document.getElementById("addValue").value;
  value.innerHTML = valueText;
  value.classList.add("dropdownValue");

  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].appendChild(value);
    value.onclick = () => {
      updateButtonText(dropdowns[i], value.innerHTML);
    };
  }
}
