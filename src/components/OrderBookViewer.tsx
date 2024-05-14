import useOrderBook from "../utils/hooks/useOrderBook";

const OrderBookViewer = () => {
  const {
    orderBook,
    isLoading: loading,
    isError: error,
  } = useOrderBook("AAVE-BTC");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!orderBook) return null;

  return (
    <div>
      <h2>Order Book for BTC/USDT</h2>
      <h3>Bids</h3>
      <table>
        <thead>
          <tr>
            <th scope="column">Price</th>
            <th scope="column">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orderBook.bids.map((bid, index) => (
            <tr key={index}>
              <td>{bid[0]}</td>
              <td>{bid[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Asks</h3>
      <table>
        <thead>
          <tr>
            <th scope="column">Price</th>
            <th scope="column">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orderBook.asks.map((ask, index) => (
            <tr key={index}>
              <td>{ask[0]}</td>
              <td>{ask[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBookViewer;
