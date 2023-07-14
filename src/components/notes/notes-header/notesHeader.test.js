import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotesHeader from "./NotesHeader";
import AddNotes from "../add-notes/AddNotes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import reducer, { addNoteSlice } from "../../../features/addNoteSlice";

const defaultStates = configureStore({ reducer }).getState();

const renderWithRedux = (
  component,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { notes: reducer },
      preloadedState: { notes: preloadedState },
    }),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("notesHeader", () => {
  let component;
  let getByText;
  let button;
  let store;
  let input;

  beforeEach(() => {
    component = renderWithRedux(<NotesHeader />, { preloadedState: defaultStates });
    getByText = component.getByText;
    button = component.getByRole("save-button");
    input = component.getByRole("input");
    store = component.store;
  });

  test("Делаем снимок", async () => {
    expect(component.container).toMatchSnapshot();
  });
  test("Наличие кнопки добавления записи", () => {
    expect(button).toBeInTheDocument();
  });
  test("Работоспособность кнопки добавления записи", async () => {
    expect(store.getState().notes.notes.length).toEqual(0);
    await userEvent.click(button);
    const addNotesComponent = renderWithRedux(<AddNotes />, {
      preloadedState: store.getState().notes,
    });
    expect(store.getState().notes.notes.length).toEqual(1);
    expect(addNotesComponent.container).toMatchSnapshot();
  });
  test("Наличие инпута", () => {
    expect(input).toBeInTheDocument();
  });
  test("Работоспособность инпута", async () => {
    fireEvent.change(input, { target: { value: "ok ok" } });
    expect(input).toHaveValue("ok ok");
  });
});
