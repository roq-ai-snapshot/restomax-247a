import { OrderInterface } from 'interfaces/order';

export interface OrderItemInterface {
  id?: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;

  order?: OrderInterface;
  _count?: {};
}
