window.onload = () => {
  const input = document.getElementById('input');
  const button = document.getElementById('submit');
  const todos = document.getElementById('todos');

  const saveList = () => {
    const items = document.querySelectorAll('.todo');

    let itemList = [];
    items.forEach((item) => {
      const todo = {
        "status": item.firstElementChild.checked,
        "text": item.textContent
      }
      itemList.push(todo);
    });

    const itemListString = JSON.stringify(itemList);
    localStorage.setItem("todos", itemListString);
  }

  const checkboxChangeHandler = () => {
    saveList();
  }

  const appendItem = (checkbox, value) => {
    const text = document.createTextNode(value);
    const label = document.createElement('label');
    label.classList.add('todo');
    label.appendChild(checkbox);
    label.appendChild(text);
    todos.appendChild(label);
  }

  let savedList = localStorage.getItem("todos");
  if (savedList) {
    const savedListJson = JSON.parse(savedList);
    savedListJson.forEach((item) => {
      const status = item.status;
      const text = item.text;
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = status;
      checkbox.addEventListener('change', checkboxChangeHandler);
      appendItem(checkbox, text);
    });
  }

  button.addEventListener('click', () => {
    const checkbox = document.createElement('input');
    const value = input.value;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', checkboxChangeHandler);

    appendItem(checkbox, value);
    saveList();
  });
}