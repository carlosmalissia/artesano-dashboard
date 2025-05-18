"use client"

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { SidebarItem } from '../SidebarItem'

import {
  dataGeneralSidebarAdmin,
  dataSupportSidebarAdmin,
  dataToolsSidebarAdmin,
  dataGeneralSidebarVendedor,
  dataSupportSidebarVendedor,
  dataToolsSidebarVendedor,
} from './SidebarRoutes.data'

import { useUser } from '@/hooks/useUser' // suposición de un hook para obtener el usuario logueado

export function SidebarRoutes() {
  const { user } = useUser()
  const rol = user?.rol

  const dataGeneral = rol === 'admin' ? dataGeneralSidebarAdmin : dataGeneralSidebarVendedor
  const dataTools = rol === 'admin' ? dataToolsSidebarAdmin : dataToolsSidebarVendedor
  const dataSupport = rol === 'admin' ? dataSupportSidebarAdmin : dataSupportSidebarVendedor

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className='p-2 md:p-6'>
          <p className='text-slate-500 mb-2'>GENERAL</p>
          {dataGeneral.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        <div className='p-2 md:p-6'>
          <p className='text-slate-500 mb-2'>TOOLS</p>
          {dataTools.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        <div className='p-2 md:p-6'>
          <p className='text-slate-500 mb-1'>SUPPORT</p>
          {dataSupport.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div>
        <div className='text-center p-6'>
          <Button variant="outline" className='w-full'>
            Upgrade Plan
          </Button>
        </div>

        <Separator />

        <footer className='mt-3 p-3 text-center'>
          2025. All rights reserved
        </footer>
      </div>
    </div>
  )
}