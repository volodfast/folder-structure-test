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

  public moveOption(idToMove: string, idTo: string) {
    const folderTo = this.findNodeById(this.root!, idTo) as IFolder;
    const folderFrom = this.findDirectParentById(idToMove);

    if (!folderTo || !folderFrom) {
      throw Error("Invalid move");
    }

    const fileOption = this.findNodeById(folderFrom, idToMove)!;

    folderTo.data = [...folderTo.data, fileOption];
    folderFrom.data = folderFrom.data.filter(
      (option) => option.id !== idToMove
    );

    const newRootObject = JSON.parse(JSON.stringify(this.root));
    this.root = newRootObject;

    return this.root as IFolder;
  }

  public checkIfCanMove = (id: string, idTo: string) => {
    if (id === idTo) {
      return false;
    }

    const folderTo = this.findNodeById(this.root!, idTo) as IFolder;

    const isDirectChild = this.checkFolderForChild(folderTo, id);

    if (isDirectChild) {
      return false;
    }

    return !this.checkIfParent(idTo, id);
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

  private findNodeById(root: IFolder, id: string): IFolder | IFile | null {
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
  }

  private checkFolderForChild(folder: IFolder, id: string): boolean {
    for (let i = 0; i < folder.data.length; i++) {
      const child = folder.data[i];

      if (id === child.id) {
        return true;
      }
    }

    return false;
  }

  private findDirectParentById(childId: string): IFolder | null {
    if (!this.root || this.root.id === childId) {
      return null;
    }

    const checkFolderForChild = this.checkFolderForChild;

    function recFindParent(folder: IFolder): IFolder | null {
      const isInFolder = checkFolderForChild(folder, childId);

      if (isInFolder) {
        return folder;
      }

      const subfolders = folder.data.filter(
        (option): option is IFolder => option.type === "folder"
      );

      return subfolders.reduce<IFolder | null>((acc, val) => {
        if (acc) {
          return acc;
        }

        return recFindParent(val);
      }, null);
    }

    return recFindParent(this.root);
  }
}
