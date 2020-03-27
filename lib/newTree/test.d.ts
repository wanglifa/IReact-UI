interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[]
}
type A = { selected: string[], multiple: true, onChange: (selected: string[]) => void}
type B = { selected: string, multiple?: false, onChange: (selected: string) => void}
type TreeProps = {
  sourceData: SourceDataItem[];
} & (A | B)