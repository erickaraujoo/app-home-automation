import { object, string } from 'yup';

export const authSchema = object().shape({
  ip: string().required('IP é obrigatório')
});
