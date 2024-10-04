export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface ProductData {
  isEnd: boolean;
  datas: MockData[];
}
