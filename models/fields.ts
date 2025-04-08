import type { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export type RecordOfFields = {
  [name: string]: Field | Item[];
};
