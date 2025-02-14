import {
  Definition,
  DefinitionTypeFormatter,
  DefinitionType,
} from "ts-json-schema-generator";

export default class yfReferenceTypeFormatter extends DefinitionTypeFormatter {
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
