"use strict";
const useState = (state) => {
    let internalState = state;
    const setState = (fn) => {
        internalState = fn(internalState);
        render(internalState); //🚨same output?
    };
    render(internalState); //🚨same output?
    return [internalState, setState]; //why tupple?
}; //🚨🚨🤔🤔🤔🤔🤔
const [state, setState] = useState({ count: 0 }, increament());
console.log(state, setState);
const increament = () => {
    setState((state) => ({ count: state.count + 1 }));
};
const decreament = () => {
    setState((state) => ({ count: state.count - 1 }));
};
function render(state) {
    const app = document.getElementById("app"); //🤔may cause problem
    if (app === null) {
        throw new Error("You should have div with id app");
    } //we fix the error🙋‍♀️
    [...app.children].forEach((x) => {
        app.removeChild(x);
    }); //what does it do???🙋‍♀️⁉️🤔//becase of render in selected filter it just append, so we want to remove the previous ones, how?
    const increamentBtn = createBtn("+");
    increamentBtn.addEventListener("click", () => {
        increament();
    });
    const decreamentBtn = createBtn("-");
    decreamentBtn.addEventListener("click", () => {
        decreament();
    });
    const span = document.createElement("span");
    const spanText = document.createTextNode(`${state.count}`);
    span.append(spanText);
    app.append(increamentBtn);
    app.append(span);
    app.append(decreamentBtn);
    function createBtn(tag) {
        const btn = document.createElement("button");
        const textBtn = document.createTextNode(tag);
        btn.append(textBtn);
        return btn;
    }
}
