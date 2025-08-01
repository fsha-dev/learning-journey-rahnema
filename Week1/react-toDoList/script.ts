const app = document.getElementById("app")!;

const form = document.createElement("form");
const input = document.createElement("input");
input.placeholder = "Please add your task";
const submitBtn = createBtn("Add Todo");

form.append(input);
form.append(submitBtn);

app.append(form);

const ul = document.createElement("ul");

app.append(ul);

function addToDO(todo: string): void {
  const value = todo;
  const li = document.createElement("li");

  const text = document.createTextNode(todo);
  li.append(text);
  li.style.cursor = "pointer";
  li.addEventListener("click", (e) => {
    li.style.textDecoration =
      li.style.textDecoration === "line-through" ? "none" : "line-through";
  });
  ul.append(li);
}

function createBtn(tag: string) {
  const btn = document.createElement("button");
  const btnText = document.createTextNode(tag);
  btn.append(btnText);
  return btn;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDO(input.value);
  input.value = "";
});

const filterContainer = document.createElement("div");
app.append(filterContainer);

const todoBtn = createBtn("Todo");
const allBtn = createBtn("All");
const doneBtn = createBtn("done");

filterContainer.append(allBtn);
filterContainer.append(todoBtn);
filterContainer.append(doneBtn);

function selectedBtn(btn: HTMLButtonElement) {
  btn.style.backgroundColor = "white";
  btn.style.border = "none";
}
function nonSelectedBtn(btn: HTMLButtonElement) {
  btn.style.backgroundColor = "#6d6d6d6d";
  btn.style.border = "1px solid #000";
}
todoBtn.addEventListener("click", () => {
  selectedBtn(todoBtn);
  nonSelectedBtn(allBtn);
  nonSelectedBtn(doneBtn);
  [...ul.children].forEach((x) => {
    const li = x as HTMLLIElement;
    if (li.style.textDecoration === "line-through") {
      li.style.display = "none";
    } else {
      li.style.display = "list-item";
    }
  });
});
doneBtn.addEventListener("click", () => {
  selectedBtn(doneBtn);
  nonSelectedBtn(allBtn);
  nonSelectedBtn(todoBtn);
  [...ul.children].forEach((x) => {
    const li = x as HTMLLIElement;
    if (li.style.textDecoration === "line-through") {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
  });
});
allBtn.addEventListener("click", () => {
  selectedBtn(allBtn);
  nonSelectedBtn(doneBtn);
  nonSelectedBtn(todoBtn);
  [...ul.children].forEach((x) => {
    const li = x as HTMLLIElement;
    li.style.display = "list-item";
  });
});
nonSelectedBtn(doneBtn);
nonSelectedBtn(allBtn);
nonSelectedBtn(todoBtn);
