import { InventoryInterface } from 'interfaces/inventory';
import { MenuItemInterface } from 'interfaces/menu-item';
import { OrderInterface } from 'interfaces/order';
import { ReviewInterface } from 'interfaces/review';
import { ScheduleInterface } from 'interfaces/schedule';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  user_id: string;
  inventory?: InventoryInterface[];
  menu_item?: MenuItemInterface[];
  order?: OrderInterface[];
  review?: ReviewInterface[];
  schedule?: ScheduleInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    menu_item?: number;
    order?: number;
    review?: number;
    schedule?: number;
  };
}
