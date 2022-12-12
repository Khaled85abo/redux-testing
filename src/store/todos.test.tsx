import reducer, {
  add,
  remove,
  sort,
  setText,
  clearText,
  toggleDes,
  InitialState,
} from "./todoSlice";

const initialState: InitialState = {
  todos: [
    {
      text: "first to do",
      id: "111",
      done: false,
    },
  ],
  newTodoText: "mmm",
  filterDescending: true,
};
describe("TodoReducer", () => {
  it("Should set text to string when setText fun is called", () => {
    expect(reducer(initialState, setText("new todo"))).toEqual({
      ...initialState,
      newTodoText: "new todo",
    });
  });

  it("Should clear text of newTodoText when clearText is called", () => {
    expect(reducer(initialState, clearText())).toEqual({
      ...initialState,
      newTodoText: "",
    });
  });

  it("Should add new todo when add fun is called", () => {
    expect(
      reducer(
        initialState,
        add({ text: "new todo", id: "ikjsdfs", done: false })
      )
    ).toEqual({
      ...initialState,
      todos: [
        { text: "new todo", id: "ikjsdfs", done: false },
        {
          text: "first to do",
          id: "111",
          done: false,
        },
      ],
    });
  });

  it("should change the value of filterDescending when toggleDes fun is called", () => {
    expect(reducer(initialState, toggleDes())).toEqual({
      ...initialState,
      filterDescending: false,
    });
  });

  it("Should remove todo when remove fun is called with the id 111", () => {
    expect(reducer(initialState, remove("111"))).toEqual({
      ...initialState,
      todos: [],
    });
  });
});
