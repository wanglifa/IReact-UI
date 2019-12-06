import {FormValue} from "./form";

interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

type FormRules = Array<FormRule>

interface FormErrors {
  [k: string]: string[];
}
function isEmpty(value: any) {
  return !(value === undefined || value === null || value === '');
}

const Validator = (formValue: FormValue, rules: FormRules): FormErrors => {
  const errors: FormValue = {}
  const addError = (key: string, message: string) : void => {
    if (!errors[key]) {
      errors[key] = []
      errors[key].push(message)
    }
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if (rule.required && !isEmpty(value)) {
      addError(rule.key, '必填')
    }
    if (rule.minLength && isEmpty(value) && value.length < rule.minLength) {
      console.log(value.length,'value.lenght')
      console.log(rule.minLength, 'minlenght')
      addError(rule.key, `字符长度不能小于${rule.minLength}`)
    }
    if (rule.maxLength && isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, `字符长度不能大于${rule.maxLength}`)
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key, '格式不正确')
    }
  })
  return errors;
}
export default Validator;