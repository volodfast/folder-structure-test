import { IFolder } from "./explorer.interfaces";

export const explorerMockData: IFolder = {
  id: "1",
  name: "rootFolder",
  type: "folder",
  data: [
    {
      id: "2",
      name: "subRootFolder",
      type: "folder",
      data: [
        {
          id: "3",
          name: "subRootFolderFile",
          type: "file",
        },
      ],
    },
    {
      id: "4",
      name: "subRootFolder2",
      type: "folder",
      data: [],
    },
    {
      id: "5",
      name: "subRootFolder3",
      type: "folder",
      data: [
        {
          id: "6",
          name: "subRootFolder3File",
          type: "file",
        },
        {
          id: "7",
          name: "subRootFolder3File2",
          type: "file",
        },
        {
          id: "8",
          name: "subRootFolder3File3",
          type: "file",
        },
      ],
    },
    {
      id: "9",
      name: "rootFolderFile",
      type: "file",
    },
  ],
};
