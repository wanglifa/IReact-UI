import {FormValue} from "./form";

interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

type FormRules = Array<FormRule>

interface FormErrors {
  [k: string]: string[];
}

const Validator = (formValue: FormValue, rules: FormRules): FormErrors => {
  const errors: FormValue = {}
  rules.map(rule => {
    const value = formValue[rule.key]
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        errors[rule.key] = ['必填']
      }
    }
    console.log(rule)
  })
  return errors;
}
export default Validator;