import * as yup from 'yup';
import { inventoryValidationSchema } from 'validationSchema/inventories';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { orderValidationSchema } from 'validationSchema/orders';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { scheduleValidationSchema } from 'validationSchema/schedules';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  inventory: yup.array().of(inventoryValidationSchema),
  menu_item: yup.array().of(menuItemValidationSchema),
  order: yup.array().of(orderValidationSchema),
  review: yup.array().of(reviewValidationSchema),
  schedule: yup.array().of(scheduleValidationSchema),
});
