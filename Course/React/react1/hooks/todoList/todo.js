"use strict";
/*
//LOGIC
type Filter = "All" | "Done" | "Todo";

interface TodoItem {
  id: number;
  title: string;
  done: boolean;
}
interface State {
  todos: TodoItem[];
  selectedFilter: Filter;
}

const useState = (state: State) => {
  let internalState = state;
  const setState = (fn: (state: State) => State) => {
    internalState = fn(internalState);
    render(internalState);
  };
  render(internalState);
  return [internalState, setState] as const; //why tupple?
}; //🚨🚨🤔🤔🤔🤔🤔

const [state, setState] = useState({
  todos: [
    { id: 1, title: "Get 1", done: false },
    { id: 2, title: "Get 2", done: true },
    { id: 3, title: "Get 3", done: true },
  ],
  selectedFilter: "All",
}); //it is called state too. logic that our app is work on
//🚨🚨🚨🤔🤔why???[state,setState]

// const setState = (fn: (state: State) => State) => {
//   state = fn(state); //mutate state
//   render(state);
// }; // fn->state -> setState(new state)🙋‍♀️⁉️🤔

//function toggle todo
const toggleTodo = (clickedID: number) => {
  setState((state) => ({
    ...state,
    todos: state.todos.map((x) =>
      x.id === clickedID ? { ...x, done: !x.done } : x
    ),
  }));
};

// function add todo
const addTodo = (todo: string) => {
  setState((state) => ({
    ...state,
    todos: [
      ...state.todos,
      { title: todo, done: false, id: state.todos.length + 1 },
    ],
  }));
  // id:state.todos.length is the lenght of previous state , so i add 1 for the new todo that is add(length of new array when we add todo = length previous todolist + 1)
};

//why🙋‍♀️🤔⁉️
// we use ...spread operator not to mutate origianl state?why?why don't we just use to push them item?

// function filtering
const selectedFilter = (filter: Filter) => {
  setState((state) => ({ ...state, selectedFilter: filter }));
}; //btns by using this function while click on them can change the filter mode

//run todo app
function render(state: State) {
  //UI
  //variables (todo form)
  const app = document.getElementById("app"); //🤔may cause problem
  if (app === null) {
    throw new Error("You should have div with id app");
  } //we fix the error🙋‍♀️

  [...app.children].forEach((x) => {
    app.removeChild(x);
  }); //what does it do???🙋‍♀️⁉️🤔//becase of render in selected filter it just append, so we want to remove the previous ones, how?

  const form = document.createElement("form");
  const input = document.createElement("input");
  input.placeholder = "Please add your task";
  const submitBtn = createBtn("Add Todo");

  form.append(input);
  form.append(submitBtn);

  app.append(form);
  const ul = document.createElement("ul");
  // variable todo list(ul,li)

  //ui based on state(displaying what is inside state as todolits container)
  state.todos
    .filter((todoItem) => {
      switch (state.selectedFilter) {
        case "All":
          return todoItem;
        case "Done":
          return todoItem.done;
        case "Todo":
          return !todoItem.done;
      }
    }) //is filter output pass to the map???⁉️🙋‍♀️🤔or each methos is independent?
    .map((todoItem, index) => {
      //format map(element,index,array)
      const li = document.createElement("li");
      // variable li(use to show todo items in the list)
      const text = document.createTextNode(todoItem.title); //🤔🙋‍♀️⁉️why not htmltext??
      //text of li
      li.append(text);
      //connect li with its text(<li><p></p><li>)
      li.style.cursor = "pointer";
      //set cursor to pointer (change status todo)
      li.style.textDecoration =
        todoItem.done === true ? "line-through" : "none";
      // set text-decoration based on its property(status todo) is done or not
      // return todo of the todolist(inside the state todolist) as li(list item)
      li.addEventListener("click", () => {
        const clickedID = todoItem.id;
        toggleTodo(clickedID);
      });
      //implement toggle todo
      return li;
    })
    .forEach((x) => {
      ul.append(x);
      // add each li(todo) to the list in html
    }); //It's like a factory line: todos → filter out some → turn them into <li>s → add each to the page.

  app.append(ul);
  // ul format as list container in html

  //function create  btn(in html with text)
  function createBtn(tag: string) {
    const btn = document.createElement("button");
    const btnText = document.createTextNode(tag);
    btn.append(btnText);
    return btn;
  }
  function createFilteredBtn(tag: string) {
    const btn = createBtn(tag);
    btn.style.backgroundColor = "#6d6d6d6d";
    btn.style.border = "1px solid #000";
    return btn;
  }
  //filterd buttons style 2 states: selected or not selected
  function selectedBtn(btn: HTMLButtonElement) {
    btn.style.backgroundColor = "white";
    btn.style.border = "none";
  }

  //filtered buttons
  const todoBtn = createFilteredBtn("Todo");
  const allBtn = createFilteredBtn("All");
  const doneBtn = createFilteredBtn("done");

  todoBtn.addEventListener("click", () => {
    selectedFilter("Todo");
  });
  allBtn.addEventListener("click", () => {
    selectedFilter("All");
  });
  doneBtn.addEventListener("click", () => {
    selectedFilter("Done");
  });

  //filter todo list based on state filter properties
  switch (state.selectedFilter) {
    case "All":
      selectedBtn(allBtn);
      break;
    case "Done":
      selectedBtn(doneBtn);
      break;
    case "Todo":
      selectedBtn(todoBtn);
      break;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //what is e.preventDefault???🤔⁉️🙋‍♀️
    addTodo(input.value);
    input.value = "";
  }); //💡🌞use sumbit for forms

  const filterContainer = document.createElement("div");
  app.append(filterContainer);

  filterContainer.append(allBtn);
  filterContainer.append(todoBtn);
  filterContainer.append(doneBtn);
}
*/
