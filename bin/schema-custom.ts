import {
  BaseType,
  Definition,
  NumberType,
  DefinitionTypeFormatter,
  SubTypeFormatter,
  DefinitionType,
} from "ts-json-schema-generator";

// import ts from "typescript";

export class yfNumberFormatter implements SubTypeFormatter {
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

export class yfReferenceFormatter extends DefinitionTypeFormatter {
  public getDefinition(type: DefinitionType): Definition {
    const ref = type.getName();

    const types = ["TwoNumberRange", "DateInMs"];

    if (types.includes(ref))
      return {
        // @ts-ignore
        yahooFinanceType: ref,
      };
    else return super.getDefinition(type);
  }
}
