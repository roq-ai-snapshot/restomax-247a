import { RestaurantInterface } from 'interfaces/restaurant';

export interface MenuItemInterface {
  id?: string;
  name: string;
  price: number;
  restaurant_id: string;

  restaurant?: RestaurantInterface;
  _count?: {};
}
