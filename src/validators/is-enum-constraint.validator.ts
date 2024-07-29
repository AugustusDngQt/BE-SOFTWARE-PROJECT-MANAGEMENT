import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEnumConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [enumArray] = args.constraints;
    for (const enumType of enumArray) {
      if (Object.values(enumType).includes(value)) {
        return true;
      }
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [enumArray] = args.constraints;
    const allowedValues = enumArray
      .flatMap((enumType) => Object.values(enumType))
      .join(', ');
    return `Value must be one of the following: ${allowedValues}`;
  }
}

export function IsEnum(
  enumArray: any[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [enumArray],
      validator: IsEnumConstraint,
    });
  };
}
