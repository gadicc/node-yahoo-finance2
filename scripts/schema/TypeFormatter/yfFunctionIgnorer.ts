import {
  BaseType,
  FunctionType,
  Definition,
  SubTypeFormatter,
} from "ts-json-schema-generator";

export default class yfNumberTypeFormatter implements SubTypeFormatter {
  public supportsType(type: FunctionType): boolean {
    return type instanceof FunctionType;
  }

  public getDefinition(): Definition {
    return {};
  }

  public getChildren(): BaseType[] {
    return [];
  }
}
