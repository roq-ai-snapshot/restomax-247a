import * as yup from 'yup';

export const orderItemValidationSchema = yup.object().shape({
  menu_item_id: yup.string().required(),
  quantity: yup.number().integer().required(),
  order_id: yup.string().nullable().required(),
});
