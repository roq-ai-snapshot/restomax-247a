import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReviewInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  rating: number;
  comment?: string;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
