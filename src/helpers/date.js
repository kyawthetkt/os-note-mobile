import {format} from 'date-fns';

export const formtDate = (
  date = null || undefined,
  reqformat = 'MM/dd/yyyy (EEEE)',
) => (date ? format(new Date(date), reqformat) : '');
