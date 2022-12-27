// components
import Folder from "src/modules/explorer/components/Folder";
// hooks
import { useExplorer } from "src/modules/explorer/explorer.context";

const FileExplorer = () => {
  const { isLoading, error, folder } = useExplorer();

  return (
    <div style={{ width: 400, textAlign: "left" }}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {folder && (
        <>
          <div>{`Inside root folder - ${folder.name}`}</div>
          <Folder data={folder} initialIsOpen />
        </>
      )}
    </div>
  );
};

export default FileExplorer;
