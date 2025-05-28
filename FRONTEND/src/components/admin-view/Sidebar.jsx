import { AdminSideBarMenuItem } from '@/config'
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'



const MenuItem=({setOpen})=>{
  const navigate=useNavigate()
  return <nav className='mt-8 flex-col flex gap-2'>
        {
          AdminSideBarMenuItem.map((items)=>{
            return <div onClick={()=>{navigate(items.path)
              setOpen?setOpen(false):null
            }} className='flex items-center text-xl cursor-pointer gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground' key={items.id}>
              {<items.icon/>}
              <span>{items.label}</span>
            </div>
          })
        }
  </nav>
}

const Sidebar = ({open,setOpen}) => {
  const navigate=useNavigate()
  return (
 <Fragment>
  <Sheet open={open} onOpenChange={setOpen} >
  <SheetContent side='left' className='w-64'>
    <div className='flex flex-col h-full'>
   <SheetHeader className='border-b'>
      <SheetTitle className='flex gap-2 mt-5 mb-5'>
      <ChartNoAxesCombined size={30}/><h1 className='text-2xl font-extrabold'>Admin panel</h1></SheetTitle>
   </SheetHeader>
   <MenuItem setOpen={setOpen}/>
    </div>
  </SheetContent>
  </Sheet>
  <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
    <div onClick={()=>{navigate('/admin/dashboard')}} className='items-center cursor-pointer flex gap-2'>
      <ChartNoAxesCombined size={30}/>
      <h1 className='text-2xl font-extrabold'>Admin panel</h1>
 </div>
<MenuItem/>
  </aside>
 </Fragment>
  )
}

export default Sidebar
