import  {useState, ReactElement} from "react"
import {FaSortDown, FaCaretLeft} from 'react-icons/fa'
import {HiOutlineXMark} from 'react-icons/hi2'
import { styled} from 'styled-components'

export type SelectOption = {
    label : string
    value: string
}
type singleValueProps = {
    multiple?: false
    value? : SelectOption | null
    onChange: (e:SelectOption) => void
}


type multipleValueProps = {
    multiple : true
    value : SelectOption[] | null
    onChange: (e:SelectOption[]) => void
}
type SelectProps = {
    label: string,
    options : SelectOption[]
}&(singleValueProps | multipleValueProps)

const Select = ({label,multiple,options , value,onChange}: SelectProps) =>{

    const onSelectOption = (option: SelectOption)=>{
        
        if(multiple)
            if(value && value?.length < 2 || value === null)
                onChange(value ? [...value, option] : [option])
            else{
                setWarning('Select limit is 2')
            }
        if(!multiple)
            onChange(option)
        setIsOpen(false)
    }

    const removeSelect = (select : SelectOption)=>{
        setWarning('')
       if(multiple && value) onChange([...value.filter(v => v !== select)])
    }

    const isSelected = (option: SelectOption)=>{
       return  multiple ? value && value.filter(v => v === option)[0] === option ? true : false :  value === option ? true : false 
    }
    const RenderChips = (value:SelectOption[]): ReactElement =>{
        return(
        <Chips>
        {value.map((selected:SelectOption)=>{
            return(
                <Chip key={selected.value}>
                    <h3>{selected.label}</h3>
                    <button onClick={()=>removeSelect(selected)}><HiOutlineXMark/></button>
                </Chip>
                )
        })}
        </Chips>
        )
    }
    const [isOpen, setIsOpen] = useState(false)
    const [warning, setWarning] = useState<string>('') 
    return(
        <SelectContainer>
            <p>{label}</p>
            <Display $active={isOpen}>
               {multiple ? (!value  ? 'Select' : RenderChips(value)) : (value ? value?.label : 'Select')}
            <button onClick={()=> setIsOpen(!isOpen)}>{isOpen ? <FaSortDown/> : <FaCaretLeft/>}  </button>
            </Display>
            {isOpen?
            <Options>
                
                {options.map((option:SelectOption):ReactElement =>{
                        return (
                            <Option 
                            $selected={
                                isSelected(option)
                            }
                            
                        key={option.value}  
                        onClick={()=> !isSelected(option) ? onSelectOption(option):''}>   
                            {option.label} 
                    </Option>)  
                }) }
            </Options>:''}
            {warning}
        </SelectContainer>
    )
}

export default Select






const SelectContainer = styled.div`
    position: relative;
    width:354px;
    margin: auto;
    color: ${props=>props.theme.text};
`

const Display = styled.div<{$active? :boolean;}>`
    padding: 0 8px;
    display: flex;
    height: 46px;
    align-items: center;
    justify-content: space-between;
    border: 1.5px solid ${props => props.$active ? props.theme.borderDark :props.theme.border};
    box-shadow: ${props => props.$active ? '0 0 0 2px ' + props.theme.shadow  : 'none'};
    background: ${props => props.theme.background};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: all 0.2s ease;

    button{
        border: none;
        background-color: inherit;
        cursor: pointer;
        color: ${props => props.theme.text}
        
    }
`
const Chips = styled.div`
    width: auto;
    display: flex;
    align-items: center;
`
const Chip = styled.div`
    padding: 0 6px 0 12px;
    height: 32px;
    display: flex;
    align-items: center;
    border: 1.5px solid ${props => props.theme.border};
    background: ${props => props.theme.background};
    border-radius: 8px;
    margin-left: 8px;
    &:first-child{
        margin-left: 0;
    }
    h3{
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        margin-right: 6px;
        width: max-content;
    }
    button{
        height: 100%;
        text-align: center;
        line-height: 16px;
        font-size: 20px;
    }
`
const Options = styled.div`
    border: 1.5px solid ${props => props.theme.border};
    position: absolute;
    width: 100%;
    z-index: 2;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.904);
    margin-top: 8px;

`
const Option  = styled.div<{ $selected?: boolean;}>`
    padding:12px;
    border-bottom: 1.5px solid ${props => props.theme.border};
    background-color: ${props => props.$selected ? props.theme.selected : props.theme.background};
    &:hover{
        background-color: ${props => props.theme.hover};
        
    }
    &:first-child{
        border-radius:  8px 8px 0px 0px ;
    }
     &:last-child{
        border: none;
        border-radius:  0px 0px 8px 8px ;
    }
    cursor: pointer;
`