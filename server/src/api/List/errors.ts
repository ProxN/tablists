import { ListType } from './List.entity';

const typeValues = Object.values(ListType).join(',');

export const typeError = {
  field: 'type',
  message: `Type must be one of this ${typeValues}`,
};

export const editListPermission = {
  field: 'userId',
  message: 'You do not have permission to edit this list.',
};

export const listNotExists = {
  field: 'id',
  message: 'There is no list with that id.',
};

export const deleteListPermission = {
  field: 'id',
  message: `List does not exists or you don't have permission.`,
};

export const alreadyPublished = {
  field: 'published',
  message: `You can't delete published list.`,
};
