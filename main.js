window.addEventListener("DOMContentLoaded", () => {
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

  const checkEmpty = () => {
    const todolist = document.querySelectorAll('.todo');
    const empty = document.getElementById('empty-message');
    if (todolist.length === 0) {
      empty.style.display = 'flex';
    } else {
      empty.style.display = 'none';
    }
  }

  const appendItem = (checkbox, value) => {
    const div = document.createElement('div');
    const text = document.createTextNode(value);
    const label = document.createElement('label');
    const button = document.createElement('button');
    button.textContent = '×';
    button.addEventListener('click', () => {
      if (confirm(`「${value}」を削除しますか？`)) {
        div.remove();
        saveList();
        checkEmpty();
      }
    });

    div.classList.add('todo-wrapper');

    label.classList.add('todo');
    label.appendChild(checkbox);
    label.appendChild(text);
    div.appendChild(label);
    div.appendChild(button);
    todos.appendChild(div);
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

  input.addEventListener('input', () => {
    if (input.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  button.addEventListener('click', () => {
    const checkbox = document.createElement('input');
    const value = input.value;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', checkboxChangeHandler);

    input.value = '';
    button.disabled = true;

    appendItem(checkbox, value);
    saveList();
    checkEmpty();
  });

  checkEmpty();
});