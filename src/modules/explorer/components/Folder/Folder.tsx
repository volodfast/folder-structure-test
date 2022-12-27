import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
// components
import FileOption from "src/modules/explorer/components/FileOption";
// interfaces
import { FolderProps } from "./Folder.interfaces";

const Folder: FC<FolderProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <div>
        <span>
          <FontAwesomeIcon icon={faFolder} />
        </span>
        <span> {data.name}</span>
      </div>
      {data.data.map((fileOption) => (
        <FileOption key={fileOption.id} option={fileOption} />
      ))}
    </div>
  );
};

export default Folder;
