import {
  faFolder,
  faFolderOpen,
  faFile,
  faQuestion,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
// interfaces
import { IconType } from "./Icon.interfaces";

const iconTypeMap: Record<IconType, IconDefinition> = {
  file: faFile,
  folder: faFolder,
  folderOpen: faFolderOpen,
};

export function getIconByType(type: IconType): IconDefinition {
  const icon = iconTypeMap[type];

  if (!icon) {
    return faQuestion;
  }

  return icon;
}
