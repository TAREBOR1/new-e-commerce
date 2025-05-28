import React from 'react'
import { filterOptions } from '@/config'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const Productfilter = ({filter,handleFilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm '>
       <div className='p-4 border-b'>
        <h2 className='text-lg font-extrabold'> Filters</h2>
       </div>
       <div className='p-4 space-y-4 '>
        {Object.keys(filterOptions).map((keyItem)=>{
          return <div>
          
            <h3 className='text-base font-bold'>{keyItem}</h3>
            <div className='grid gap-2 mt-2'>
              {filterOptions[keyItem].map((optionItem)=>{
                return <label key={optionItem.id} className='flex items-center gap-2 font-medium'>
                  <Checkbox 
                   checked={filter && Object.keys(filter).length>0 && filter[keyItem] && filter[keyItem].indexOf(optionItem.id)>-1 }
                  onCheckedChange={()=>{handleFilter(keyItem,optionItem.id)}}/>
                  {optionItem.label}
                </label>
              })}
            </div>
          </div>
        })}
       </div>
       <Separator/>
    </div>
  )
}

export default Productfilter
