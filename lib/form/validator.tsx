import {FormValue} from "./form";
interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: (value: string) => Promise<string>
}
type OneError = string | Promise<string>
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
function zip(kvList: Array<[string, string]>) {
  const result = {}
  kvList.map(([key, value]) => {
    if (!result[key]) {
      result[key] = []
    }
    result[key].push(value)
  })
  return result
}
// function fromEntries(array: Array<[string, string[]]>): object {
//   const result: {[key: string]: string[]} = {}
//   for (let i = 0; i < array.length; i++) {
//     result[array[i][0]] = array[i][1]
//   }
//   return result
// }
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
      const promise = rule.validator(value)
      addError(rule.key, promise)
    }
    if (rule.required && !isEmpty(value)) {
      addError(rule.key, 'required')
    }
    if (rule.minLength && isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, 'minLength')
    }
    if (rule.maxLength && isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, 'maxLength')
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addError(rule.key,  'pattern')
    }
  })
  const flattenErrors = flat(Object.keys(errors).map(key =>
    errors[key].map((promiseOrString: OneError) => [key, promiseOrString])
  ))
  const newPromise = flattenErrors.map(([key, promiseOrString]) => (
    promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString))
    .then(() => {
      return [key, undefined]
    }, (reason: string) => {
      return [key, reason]
    }))
  Promise.all(newPromise).then((results: Array<[string, string]>) => {
    callback(zip(results.filter(item => item[1])))
  })
}
export default Validator;