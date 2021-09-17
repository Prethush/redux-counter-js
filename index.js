let store = Redux.createStore(reducer);
let counter = store.getState();

let h2 = document.querySelector("h2");
let increment = document.querySelector(".increment");
let decrement = document.querySelector(".decrement");
let reset = document.querySelector(".reset");
let steps = document.querySelectorAll(".step");
let limit = document.querySelectorAll(".max");

h2.innerText = counter;
let step = 1, max = Infinity;

steps.forEach(s => {
  s.addEventListener("click", (e) => {
    step = Number(s.innerText);
    selectStep(e);
  });
});

limit.forEach(l => {
  l.addEventListener("click", (e) => {
    max = Number(l.innerText);
    store.dispatch({type:"changeMax", max})
    selectMax(e);
  })
});

function selectMax(event) {
  limit.forEach(l => {
    if(l.id === event.target.id) {
      l.classList.add("active");
    }else {
      l.classList.remove("active");
    }
  });
}

function selectStep(event) {
  steps.forEach((step) => {
    if(step.id === event.target.id) {
      step.classList.add("active");
    }else {
      step.classList.remove("active");
    }
  });
}

increment.addEventListener("click", () => {
  store.dispatch({type: "increment", step, max});
});

decrement.addEventListener("click", () => {
  store.dispatch({type: "decrement", step, max});
});

reset.addEventListener("click", () => {
  store.dispatch({type: "reset"});
});

store.subscribe(() => {
  counter = store.getState();
  h2.innerText = counter;
});

function reducer(state = 0, action) {
  switch (action.type) {
    case "increment":
      return state = state + action.step <= action.max ? state + action.step : state;
      break;
    case "decrement":
      return state -= (action.step || 1);
      break;
    case "reset":
      return state = 0;
      break;
    case "changeMax":
      return state > action.max ? action.max : state;
      break;
    default:
      return state;
  }
}