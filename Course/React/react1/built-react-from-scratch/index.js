"use strict";
const app = document.getElementById("app");
if (app === null) {
    throw new Error("You should have div with id app");
}
function render(element, dom) {
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
function renderApp(app, element) {
    [...app.children].forEach((x) => {
        app.removeChild(x);
    }); // every time your state changes, it removes the old UI and renders the new one from scratch.
    render(element, app);
} //
const useState = (state) => {
    let internalState = state;
    const setState = (fn) => {
        internalState = fn(internalState);
        renderApp(app, draw(internalState));
    };
    renderApp(app, draw(internalState));
    return [internalState, setState]; //🙋‍♀️⁉️🤔why as const?
};
// 💡When the app first loads, inside useState
// 💡Whenever you click a button and setState is called
const [state, setState] = useState({ count: 0 });
const increament = () => {
    setState((state) => ({ count: state.count + 1 }));
};
const decreament = () => {
    setState((state) => ({ count: state.count - 1 }));
};
//UI
function draw(state) {
    //🤔⁉️🙋‍♀️what dose draw do???
    const increamentBtn = {
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
    const decreamentBtn = {
        type: "button",
        props: {
            onClick: () => decreament(),
            children: [
                { type: "TEXT_ELEMENT", props: { nodeValue: "-", children: [] } },
            ],
        },
    };
    const span = {
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
    const div = {
        type: "div",
        props: {
            children: [increamentBtn, span, decreamentBtn],
        },
    };
    return div;
}
