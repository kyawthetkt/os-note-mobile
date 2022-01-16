import {format} from 'date-fns';

export const formtDate = (
  date = null || undefined,
  reqformat = 'dd/MM/yyyy (EEEE)',
) => (date ? format(new Date(date), reqformat) : null);
