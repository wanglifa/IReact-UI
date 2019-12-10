import {FormValue} from "./form";
interface Validator {
  name: string,
  validate: (username: string) => Promise<void>
}
interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: Validator
}
interface OneError {
  message: string;
  promise?: Promise<void>;
}
type FormRules = Array<FormRule>

function isEmpty(value: any) {
  return !(value === undefined || value === null || value === '');
}
function flat(arr: Array<any>): Array<any> {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result.push(...arr[i])
    } else {
      result.push(arr[i])
    }
  }
  return result
}
function fromEntries(array: Array<[string, string[]]>): object {
  const result: {[key: string]: string[]} = {}
  for (let i = 0; i < array.length; i++) {
    result[array[i][0]] = array[i][1]
  }
  return result
}
const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: FormValue) => void): void => {
  const errors: FormValue = {}
  const addError = (key: string, error: OneError) : void => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(error)
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if (rule.validator) {
      // 自定义的校验器
      const promise = rule.validator.validate(value)
      addError(rule.key, {message: '用户名已经存在', promise})
    }
    if (rule.required && !isEmpty(value)) {
      addError(rule.key, {message: '必填'})
    }
    if (rule.minLength && isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, {message: `字符长度不能小于${rule.minLength}`})
    }
    if (rule.maxLength && isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, {message: `字符长度不能大于${rule.maxLength}`})
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key, {message: '格式不正确'})
    }
  })
  const promiseList = flat(Object.values(errors))
    .filter(item => item.promise)
    .map(item => item.promise)
  Promise.all(promiseList)
    .then(() => {
      const newErrors = fromEntries(Object.keys(errors).map(key =>
        [key, errors[key].map((item: OneError) => item.message)]
      ))
      callback(newErrors)
    }, () => {
      const newErrors = fromEntries(Object.keys(errors).map(key =>
        [key, errors[key].map((item: OneError) => item.message)]
      ))
      callback(newErrors)
    })
}
export default Validator;