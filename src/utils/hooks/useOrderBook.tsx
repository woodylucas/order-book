import { useState, useEffect } from "react";

const BASE_URL = "https://api.exchange.coinbase.com";

type OrderBook = {
  bids: [string, string][];
  asks: [string, string][];
};

const useOrderBook = (productId: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const url = new URL(`/products/${productId}/book`, BASE_URL);
        const response = await fetch(url);
        const data: OrderBook = await response.json();
        setOrderBook(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(`Error: failed to fetch order data ${err}`);
        console.log("There was an error with your request", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderBook();
    const intervalId = setInterval(fetchOrderBook, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [productId]);

  return { orderBook, isLoading, isError };
};

export default useOrderBook;
