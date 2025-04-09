import type { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';

export type RecordOfFields = {
  [name: string]: Field | Item[];
};

export type KeyValuePair = {
  key: Field<string>;
  value: Field<string>;
};

export type RenderingParamGrid = {
  Class: {
    value: string;
  };
};

export type CustomRenderingParameter = KeyValuePair | RenderingParamGrid | string | null;