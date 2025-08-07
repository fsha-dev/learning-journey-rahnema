const app = document.getElementById("app");
if (app === null) {
  throw new Error("You should have div with id app");
}
//rahnemaact
interface MyElement {
  type: string | "TEXT-ELEMENT"; //for each element in UI
  props: {
    children: Array<MyElement>;
  } & Record<string, any>; //💡🌞A magical box where you don’t know in advance what’s inside — but everything inside has a label (string) and a value.
  //First Step: A system to have declartive programming
}

function render(element: MyElement, dom: HTMLElement) {
  if (element.type === "TEXT_ELEMENT") {
    const el = document.createTextNode(" ");

    el.nodeValue = element.props.nodeValue; //🙋‍♀️what is it?in element sturcture we don't have access to nodeValue like this?
    dom.append(el);
    return;
  } //🙋‍♀️⁉️🤔what is text_elemnt? what is createTextNode, why not innerHtml?
  const el = document.createElement(element.type);

  Object.keys(element.props) //gets all keys (property names) in the props object.
    .filter((x) => x.startsWith("on"))
    .forEach((x) => {
      el.addEventListener(x.slice(2).toLocaleLowerCase(), element.props[x]);
    }); /////🤔🤔🤔🤔

  element.props.children.forEach((x) => render(x, el));
  dom.append(el);
} //render here : convert my own element description to a real HTML element and place it somewhere.
//🤔🤔🤔🤔difference between render and renderApp?
function renderApp(app: HTMLElement, element: MyElement) {
  [...app.children].forEach((x) => {
    app.removeChild(x);
  }); // every time your state changes, it removes the old UI and renders the new one from scratch.

  render(element, app);
} //

//logic
interface State {
  count: number;
}

const useState = (state: State) => {
  let internalState = state;
  const setState = (fn: (state: State) => State) => {
    internalState = fn(internalState);
    renderApp(app, draw(internalState));
  };
  renderApp(app, draw(internalState));
  return [internalState, setState] as const; //🙋‍♀️⁉️🤔why as const?why tuple, why not
};
// 💡When the app first loads, inside useState
// 💡Whenever you click a button and setState is called
/*
          useState()
              ↓
      ┌────────────────────────┐
      │                        │
      │   let internalState    │
      │   function setState()  │ ← defined here
      │   return [state, setState] ─────┐
      │                        │        ↓
      └────────────────────────┘   [state, setState]
                                       ↓
                             increment(), decrement()
                                  ↓
                             call setState()
*/

const [state, setState] = useState({ count: 0 });

const increament = () => {
  setState((state) => ({ count: state.count + 1 }));
};
const decreament = () => {
  setState((state) => ({ count: state.count - 1 }));
};

//UI
function draw(state: State) {
  //🤔⁉️🙋‍♀️what dose draw do???
  const increamentBtn: MyElement = {
    type: "button",
    props: {
      onClick: () => increament(),
      children: [
        { type: "TEXT_ELEMENT", props: { nodeValue: "+", children: [] } },
      ],
    },
  };
  // const spanText = document.createTextNode('');
  // spanText.nodeValue ='${count}'
  const decreamentBtn: MyElement = {
    type: "button",
    props: {
      onClick: () => decreament(),
      children: [
        { type: "TEXT_ELEMENT", props: { nodeValue: "-", children: [] } },
      ],
    },
  };

  const span: MyElement = {
    type: "span",
    props: {
      children: [
        {
          type: "TEXT_ELEMENT",
          props: { nodeValue: `${state.count}`, children: [] },
        },
      ],
    },
  };

  const div: MyElement = {
    type: "div",
    props: {
      children: [increamentBtn, span, decreamentBtn],
    },
  };
  return div;
}
