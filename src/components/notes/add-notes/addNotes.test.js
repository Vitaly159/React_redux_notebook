import { render, fireEvent, rerender } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddNotes from "./AddNotes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import reducer, { onAddNote, addNoteSlice } from "../../../features/addNoteSlice";
import { act } from "react-dom/test-utils";

const defaultStates = configureStore({ reducer }).getState();

const renderWithRedux = (
  component,
  renderType,
  {
    preloadedState = defaultStates,
    store = configureStore({
      reducer: { notes: reducer },
      preloadedState: { notes: preloadedState },
    }),
  } = {}
) => {
  return {
    ...renderType(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const notesWithLongText = [
  {
    id: 1,
    title: "Задача №1",
    body: "very long text very long text! very long text very long text",
    lastChanged: "Date.now()",
  },
  {
    id: 2,
    title: "Задача №2",
    body: "very long text very long text! very long text very long text",
    lastChanged: "Date.now()",
  },
];

describe("addNotes", () => {
  let component;
  let getByText;
  let store;
  let getByRole;

  beforeEach(() => {
    component = renderWithRedux(<AddNotes />, render, {
      preloadedState: { ...defaultStates, notes: notesWithLongText },
    });
    store = component.store;
    // act(() => store.dispatch(onAddNote("")));
    getByText = component.getByText;
    getByRole = component.getByRole;
  });
  test("Тест onAddNote('')", async () => {
    expect(component.container).toMatchSnapshot();
    // expect(getByText("Имя задачи")).toBeInTheDocument();
    expect(store.getState().notes.notes).toHaveLength(2);
  });
  test("Тест клика по записи для редактирования", async () => {
    const note = getByRole("note-1");
    await userEvent.click(note);
    expect(store.getState().notes.activeNote.length).not.toEqual(0);
    expect(store.getState().notes.valueTitle).toEqual("Задача №1");
    expect(store.getState().notes.valueBody).toEqual(
      "very long text very long text! very long text very long text"
    );
  });
  test("Тест обрезки текста до 30 символов", async () => {
    expect(getByRole("start-text-1")).toBeInTheDocument();
    expect(getByRole("start-text-1")).toHaveTextContent("very long text very long text!...");
  });
  test("Тест кнопки удаления", async () => {
    const buttonRemove = getByRole("btn-rmv-2");
    expect(buttonRemove).toBeInTheDocument();
    await userEvent.click(buttonRemove);
    expect(buttonRemove).not.toBeInTheDocument();
  });
  test("Тест фильтрации", async () => {
    renderWithRedux(<AddNotes />, component.rerender, {
      preloadedState: { ...store.getState().notes, searchValue: "№1"  },
    });
    expect(component.container).toMatchSnapshot();
    expect(getByRole("note-1")).toBeInTheDocument()
    expect(component.queryByText("Задача №2")).not.toBeInTheDocument()
  });
});
