import {
  ArrayType,
  ArrayTypeFormatter,
  Definition,
} from "ts-json-schema-generator";

export default class yfArrayTypeFormatter extends ArrayTypeFormatter {
  public getDefinition(type: ArrayType): Definition {
    const item = type.getItem();
    // @ts-ignore
    console.error(555, item, item?.type?.properites);
    return super.getDefinition(type);
  }
}
