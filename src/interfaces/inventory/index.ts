import { RestaurantInterface } from 'interfaces/restaurant';

export interface InventoryInterface {
  id?: string;
  item_name: string;
  quantity: number;
  restaurant_id: string;

  restaurant?: RestaurantInterface;
  _count?: {};
}
