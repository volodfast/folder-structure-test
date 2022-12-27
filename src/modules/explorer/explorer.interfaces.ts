type IGenericFileOption = {
  id: string;
  name: string;
};

export type IFile = IGenericFileOption & {
  type: "file";
};

export type IFolder = IGenericFileOption & {
  type: "folder";
  data: Array<IFolder | IFile>;
};
