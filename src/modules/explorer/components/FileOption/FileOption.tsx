import { FC } from "react";
// components
import File from "src/modules/explorer/components/File";
import Folder from "src/modules/explorer/components/Folder";
// interfaces
import { FileOptionProps } from "./FileOption.interfaces";

const FileOption: FC<FileOptionProps> = (props) => {
  const { option } = props;

  return (
    <div>
      {option.type === "file" && <File data={option} />}
      {option.type === "folder" && <Folder data={option} />}
    </div>
  );
};

export default FileOption;
