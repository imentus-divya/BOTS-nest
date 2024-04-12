export interface IOrderService
{
  OrderBook(pair:string);

  PlaceOrder();

  CancelOrder();

  OrderDetails(orderId);
  

  // OrderLogs();
}