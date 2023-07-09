import { useState } from "react"
import {BsFillSunFill,BsMoon} from 'react-icons/bs'
import Select,{SelectOption} from "./assets/components/Select"
import { ThemeProvider, styled} from "styled-components"
import { light,dark } from "./GlobalStyles"


const options:SelectOption[]  = [
  {label: 'React', value:'react'},
  {label: 'UI', value:'ui'},
  {label: 'Figma', value:'figma'},
  {label: 'Web Design', value:'web design'},
  {label: 'Vue', value:'vue'}

]
const App = () => {
  const [theme,setTheme]  = useState(light)
  const [value, setValue ] = useState<SelectOption | null>(null)
  const [multiValue, setMultiValue] = useState<SelectOption[] | null>(null)
  return (
    <ThemeProvider theme={theme}>
    <Body>
      <Header>
        <button onClick={()=> setTheme(prev => prev === light ? dark : light)}>{
          theme=== light? <BsFillSunFill/> :<BsMoon/>
        }</button>
        </Header>
      <Content>
      <Select label="single-Select"  options={options} value={value} onChange={(e : SelectOption)=>setValue(e)}/>
      <Select label="multi-Select" multiple={true}  options={options} value={multiValue} onChange={(e : SelectOption[])=> setMultiValue(e)}/>
      </Content>
      </Body>
    </ThemeProvider>
  )
}

export default App

const Body = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${props=> props.theme.text === '#dee4ea'?'#101216': 'white' };

`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  background-color: ${props=> props.theme.background};
  width: 100%;

  button{
    background-color: inherit;
    font-size: 24px;
    color: ${props => props.theme.text};
    padding: 6px;
    outline: none;
    border: none;
    cursor: pointer;
  }
`

const Content = styled.div `
  height: 40%;
  margin:auto;
  display: flex;
  justify-content: space-around;
`