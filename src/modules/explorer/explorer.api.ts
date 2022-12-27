import { IFolder } from "./explorer.interfaces";
import { explorerMockData } from "./explorer.mock";

type ApiResponse = {
  data: IFolder;
};

export class ExplorerApi {
  async getFolder(): Promise<ApiResponse> {
    return { data: explorerMockData };
  }
}
