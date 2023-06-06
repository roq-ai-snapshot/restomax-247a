import { OrderItemInterface } from 'interfaces/order-item';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface OrderInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  status: string;
  created_at: Date;
  order_item?: OrderItemInterface[];
  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {
    order_item?: number;
  };
}
