import { wrapWithTestBackend } from "react-dnd-test-utils";
import { act, render, screen } from "@testing-library/react";
// components
import File from "./File";
// interfaces
import { IFile } from "../../explorer.interfaces";

const fileData: IFile = {
  id: "1",
  name: "file1",
  type: "file",
};

it("renders with a filename to display", () => {
  const [Component] = wrapWithTestBackend(File);

  render(<Component data={fileData} />);

  expect(screen.getByText(fileData.name)).toBeInTheDocument();
});

it("can be dragged with opacity changing", () => {
  const [Component, getBackend] = wrapWithTestBackend(File);

  render(<Component data={fileData} />);

  const file = screen.getByTestId("file-element");

  expect(file.style.opacity).toEqual("1");

  act(() => {
    getBackend()?.simulateBeginDrag([file.dataset["monitorid"]!]);
  });

  expect(file.style.opacity).toEqual("0.5");
});
