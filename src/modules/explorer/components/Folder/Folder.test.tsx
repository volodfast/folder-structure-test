import { wrapWithTestBackend } from "react-dnd-test-utils";
import { act, fireEvent, render, screen } from "@testing-library/react";
// components
import Folder from "./Folder";
// interfaces
import { IFolder } from "../../explorer.interfaces";

const folderData: IFolder = {
  id: "1",
  name: "folder1",
  type: "folder",
  data: [
    {
      id: "2",
      name: "fileInFolder1",
      type: "file",
    },
  ],
};

it("renders with a foldername to display", () => {
  const [Component] = wrapWithTestBackend(Folder);

  render(<Component data={folderData} />);

  expect(screen.getByText(folderData.name)).toBeInTheDocument();
});

it("can be dragged with opacity changing", () => {
  const [Component, getBackend] = wrapWithTestBackend(Folder);

  render(<Component data={folderData} />);

  const folder = screen.getByTestId("folder-element");

  expect(folder.style.opacity).toEqual("1");

  act(() => {
    getBackend()?.simulateBeginDrag([folder.dataset["monitorid"]!]);
  });

  expect(folder.style.opacity).toEqual("0.5");
});

it("does not show subfolders if not clicked", () => {
  const [Component] = wrapWithTestBackend(Folder);

  render(<Component data={folderData} />);

  expect(screen.queryByText(folderData.data[0].name)).not.toBeInTheDocument();
});

it("does show subfolders if clicked", () => {
  const [Component] = wrapWithTestBackend(Folder);

  render(<Component data={folderData} />);

  const folder = screen.getByText(folderData.name);

  fireEvent.click(folder);

  expect(screen.getByText(folderData.data[0].name)).toBeInTheDocument();
});
