import React, { useState, useEffect } from "react";
// components
import Folder from "src/modules/explorer/components/Folder";
// utils
import { ExplorerApi } from "../../explorer.api";
// interfaces
import { IFolder } from "src/modules/explorer/explorer.interfaces";

const FileExplorer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [folder, setFolder] = useState<null | IFolder>(null);

  useEffect(() => {
    async function fetchRootFolder() {
      try {
        setIsLoading(true);
        const explorerService = new ExplorerApi();

        const response = await explorerService.getFolder();

        setIsLoading(false);
        setFolder(response.data);
      } catch (err) {
        setError(String(err));
        setIsLoading(false);
      }
    }

    fetchRootFolder();
  }, [setIsLoading, setError, setFolder]);

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
