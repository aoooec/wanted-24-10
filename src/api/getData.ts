import { MOCK_DATA } from "../data/mockData";
import { MockData, ProductData } from "../types/data";

const PER_PAGE = 10;

export const getMockData = (pageNum: number): Promise<ProductData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datas: MockData[] = MOCK_DATA.slice(
        PER_PAGE * pageNum,
        PER_PAGE * (pageNum + 1)
      );
      const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

      resolve({ datas, isEnd });
    }, 1500);
  });
};
