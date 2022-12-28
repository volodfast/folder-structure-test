import { wrapWithTestBackend } from "react-dnd-test-utils";
import { render, screen } from "@testing-library/react";
// components
import FileExplorer from "./FileExplorer";
// interfaces
import { IFolder } from "../../explorer.interfaces";
import { useExplorer } from "../../explorer.context";

const folderData: IFolder = {
  id: "1",
  name: "folder1",
  type: "folder",
  data: [],
};

jest.mock("src/modules/explorer/explorer.context", () => {
  return {
    useExplorer: (): ReturnType<typeof useExplorer> => ({
      isLoading: false,
      error: null,
      folder: folderData,
      checkIfCanMove: () => false,
      moveFileOption: () => {},
    }),
  };
});

it("renders", () => {
  const [Component] = wrapWithTestBackend(FileExplorer);

  render(<Component />);

  expect(screen.getByText(folderData.name)).toBeInTheDocument();
});
