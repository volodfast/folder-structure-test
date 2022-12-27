import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
// interfaces
import { FileProps } from "./File.interfaces";

const File: FC<FileProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <span>
        <FontAwesomeIcon icon={faFile} />
      </span>
      <span> {data.name}</span>
    </div>
  );
};

export default File;
