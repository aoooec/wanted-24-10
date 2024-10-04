import { useEffect, useState } from "react";
import { MockData } from "../types/data";
import { getMockData } from "../api/getData";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";
import { useIntersect } from "../hooks/useIntersect";

interface IPageState {
  pageNum: number;
  isEnd: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<MockData[]>([]);
  const [page, setPage] = useState<IPageState>({ pageNum: 1, isEnd: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSum = (products: MockData[]) => {
    const sum = products.reduce((acc, cur) => acc + cur.price, 0);

    return sum;
  };

  const getData = async (pageNum: number) => {
    if (page.isEnd) return;

    setIsLoading(true);

    const response = await getMockData(pageNum);

    const { isEnd, datas } = response;

    setProducts((prev) => [...prev, ...datas]);
    if (!isEnd) {
      setPage((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }));
    } else {
      setPage((prev) => ({ ...prev, isEnd: true }));
    }

    setIsLoading(false);
  };

  const loadMoreRef = useIntersect(() => {
    if (page.isEnd || page.pageNum === 1 || isLoading) return;
    getData(page.pageNum);
  });

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ProductList</h2>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.productId}>
            <ProductItem {...product} />
          </li>
        ))}
        {isLoading && <p className={styles.loading}>loading...</p>}
      </ul>
      <span className={styles.sum} ref={loadMoreRef}>
        sum: $ {getSum(products)}
      </span>
    </div>
  );
}
