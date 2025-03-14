import {
  type Definition,
  type DefinitionType,
  DefinitionTypeFormatter,
} from "ts-json-schema-generator";

export default class yfReferenceTypeFormatter extends DefinitionTypeFormatter {
  public override getDefinition(type: DefinitionType): Definition {
    const ref = type.getName();

    const types = ["TwoNumberRange", "DateInMs"];

    if (types.includes(ref)) {
      return {
        // @ts-expect-error: non-standard property
        yahooFinanceType: ref,
      };
    } else return super.getDefinition(type);
  }
}
