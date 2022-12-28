import { wrapWithTestBackend } from "react-dnd-test-utils";
import { render, screen } from "@testing-library/react";
// components
import FileOption from "./FileOption";
// interfaces
import { IFile, IFolder } from "../../explorer.interfaces";

const fileData: IFile = {
  id: "1",
  name: "file1",
  type: "file",
};

const folderData: IFolder = {
  id: "1",
  name: "folder1",
  type: "folder",
  data: [],
};

it("renders with a file if passed", () => {
  const [Component] = wrapWithTestBackend(FileOption);

  render(<Component option={fileData} />);

  expect(screen.getByText(fileData.name)).toBeInTheDocument();
});

it("renders with a folder if passed", () => {
  const [Component] = wrapWithTestBackend(FileOption);

  render(<Component option={folderData} />);

  expect(screen.getByText(folderData.name)).toBeInTheDocument();
});
