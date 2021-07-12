import {
  BaseType,
  Definition,
  NumberType,
  SubTypeFormatter,
} from "ts-json-schema-generator";

export default class yfNumberTypeFormatter implements SubTypeFormatter {
  public supportsType(type: NumberType): boolean {
    return type instanceof NumberType;
  }

  public getDefinition(_type: NumberType): Definition {
    return {
      // @ts-ignore
      yahooFinanceType: "number",
    };
  }

  public getChildren(_type: NumberType): BaseType[] {
    return [];
  }
}
