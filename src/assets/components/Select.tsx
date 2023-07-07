import  {useState, ReactElement} from "react"
import {FaSortDown, FaCaretLeft} from 'react-icons/fa'
import {HiOutlineXMark} from 'react-icons/hi2'
import {styled } from 'styled-components'

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
    options : SelectOption[]
}&(singleValueProps | multipleValueProps)

const Select = ({multiple,options , value,onChange}: SelectProps) =>{
    const onSelectOption = (option: SelectOption)=>{
        if(multiple)
            if(value && value?.length < 3 || value === null)
                onChange(value ? [...value, option] : [option])
        if(!multiple)
            onChange(option)
        setIsOpen(false)
    }

    const removeSelect = (select : SelectOption)=>{
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
    return(
        <SelectContainer>
            <Display>
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
        </SelectContainer>
    )
}

export default Select






const SelectContainer = styled.div`
    position: relative;
    width:354px;
    margin: auto;
`

const Display = styled.div`
    padding: 0 8px;
    display: flex;
    height: 46px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #C7D1DB;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    button{
        border: none;
        background-color: inherit;
        cursor: pointer;
        
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
    border: 1px solid #C7D1DB;
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
    border: 1px solid #C7D1DB;
    position: absolute;
    width: 100%;
    z-index: 2;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.904);
    margin-top: 8px;

`
const Option  = styled.div<{ $selected?: boolean;}>`
    padding:12px;
    border-bottom: 1px solid #C7D1DB;
    background-color: ${props => props.$selected ? "#DEE4EA" : "white"};
    &:hover{
        background-color: #f0f1f3;
        
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