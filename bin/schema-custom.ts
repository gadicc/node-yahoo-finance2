import {
  BaseType,
  Definition,
  NumberType,
  SubTypeFormatter,
} from "ts-json-schema-generator";

// import ts from "typescript";

export class yfNumberFormatter implements SubTypeFormatter {
  public supportsType(type: NumberType): boolean {
    return type instanceof NumberType;
  }

  public getDefinition(_type: NumberType): Definition {
    return {
      // @ts-ignore
      yahooFinance: "number",
    };
  }

  public getChildren(_type: NumberType): BaseType[] {
    return [];
  }
}
