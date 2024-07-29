import { combineReducers, createStore } from "redux";

const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const intialCustomerState = {
  fullName: "",
  NationalID: "",
  createdAt: "",
};

function accountReducer(state = intialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ customertype: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payloan" });

// console.log(store.getState());

// action creator in redux

function deposit(amount) {
  return store.dispatch({ type: "account/deposit", payload: amount });
}
function withdraw(amount) {
  return store.dispatch({ type: "account/withdraw", payload: amount });
}
function requestLoan(amount, purpose) {
  return store.dispatch({
    type: "account/requestLoan",
    payload: { amount, purpose },
  });
}
function payloan() {
  return store.dispatch({ type: "account/payloan" });
}

function customerReducer(state = intialCustomerState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        NationalID: action.payload.NationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(500));
console.log(store.getState());
store.dispatch(requestLoan(1000, "go shopping"));
console.log(store.getState());
store.dispatch(payloan());
console.log(store.getState());

function createCustomer(fullName, NationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, NationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Alao Abdulsalam Adebayo", "8765456789"));
console.log(store.getState());
export default store;
