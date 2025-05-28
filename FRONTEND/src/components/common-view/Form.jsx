import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const Form = ({FormControls,FormData,setFormData,onSubmit,buttonText,isButtonDisabled}) => {
    const renderInputByComponentType=(getControlItem)=>{
   let element=null
   const value=FormData[getControlItem.name] || ''
   switch (getControlItem.componentType) {
    case "input":
        element= <Input
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        type={getControlItem.type}
        id={getControlItem.name}
        value={value}
        onChange={e=>setFormData({
                ...FormData,
                [getControlItem.name]:e.target.value
            })
        }
        />
        break;
    case "textarea":
        element= <Textarea
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.id}
        value={value}
        onChange={e=>setFormData({
            ...FormData,
            [getControlItem.name]:e.target.value
        })
    }
        />
        break;
    case "select":
        element= <Select onValueChange={(value)=>setFormData({
            ...FormData,
            [getControlItem.name]:value
        })} value={value}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={getControlItem.label}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {getControlItem.options && getControlItem.options.length>0 ?getControlItem.options.map((optionItem)=>{
            return <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
        }): null}
      </SelectContent>
        </Select>
      
        break;
    default:
        element= <Input
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        type={getControlItem.type}
        id={getControlItem.name}
        value={value}
        onChange={e=>setFormData({
                ...FormData,
                [getControlItem.name]:e.target.value
            })
        }
        />
   }
   return element;
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
          {FormControls.map((controlItem)=>{
            return <div className='grid w-full gap-1.5' key={controlItem.name}>
            <label className='mb-1' >{controlItem.label}</label>
            {renderInputByComponentType(controlItem)}
            </div>
          })}
        </div>
       
        <Button disabled={isButtonDisabled} type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
      </form>
    </div>
  )
}

export default Form
