import { useState } from "react"
import Select,{SelectOption} from "./assets/components/Select"


const options:SelectOption[]  = [
  {label: 'React', value:'react'},
  {label: 'UI', value:'ui'},
  {label: 'Figma', value:'figma'},
  {label: 'Web Design', value:'web design'},
  {label: 'Vue', value:'vue'}

]
const App = () => {
  const [value, setValue ] = useState<SelectOption | null>(null)
  const [multiValue, setMultiValue] = useState<SelectOption[] | null>(null)
  const multiValueHandler = (option :SelectOption) =>{
    if(multiValue === null || multiValue?.length < 3  )
      setMultiValue(prev => prev ? [...prev, option]: [option] )
  }
  return (
    <div>
      <Select  options={options} value={value} onChange={(e : SelectOption)=>setValue(e)}/>
      <Select multiple={true}  options={options} value={multiValue} onChange={(e : SelectOption[])=> setMultiValue(e)}/>
    </div>
  )
}

export default App