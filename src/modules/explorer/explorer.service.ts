// utils
import { ExplorerApi } from "./explorer.api";
// interfaces
import { IFile, IFolder } from "./explorer.interfaces";

export class ExplorerService {
  private root: null | IFolder = null;

  constructor(public api: ExplorerApi) {}

  public fetchRoot = async () => {
    const response = await this.api.getFolder();

    this.root = response.data;

    return this.root;
  };

  public checkIfCanMove = (idFrom: string, idTo: string) => {
    if (idFrom === idTo) {
      return false;
    }

    return !this.checkIfParent(idTo, idFrom);
  };

  private checkIfParent(childId: string, parentId: string) {
    if (childId === parentId || !this.root) {
      return false;
    }

    const parent = this.findNodeById(this.root, parentId);

    if (!parent || parent.type === "file") {
      return false;
    }

    const child = this.findNodeById(parent, childId);

    return !!child;
  }

  private findNodeById = (
    root: IFolder,
    id: string
  ): IFolder | IFile | null => {
    function checkFolder(folder: IFolder): IFolder | IFile | null {
      if (folder.id === id) {
        return folder;
      }

      if (folder.data.length === 0) {
        return null;
      }

      for (let i = 0; i < folder.data.length; i++) {
        const option = folder.data[i];

        if (option.id === id) {
          return option;
        }
      }

      const subfolders = folder.data.filter(
        (option): option is IFolder => option.type === "folder"
      );

      return subfolders.reduce<IFolder | IFile | null>((acc, val) => {
        if (acc) {
          return acc;
        }

        return checkFolder(val);
      }, null);
    }

    if (!root) {
      return null;
    }

    return checkFolder(root);
  };
}
