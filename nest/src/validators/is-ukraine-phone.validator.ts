import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsUkrainePhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: string, args: ValidationArguments) {
    const ukrainePhoneRegex = /^(?:\+380|0)\d{9}$/;
    return ukrainePhoneRegex.test(phone);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must be a valid Ukrainian phone number';
  }
}

export function IsUkrainePhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUkrainePhoneConstraint,
    });
  };
}
