'use client';

import { SidebarItem } from '../SidebarItem';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import {
  dataGeneralSidebarAdmin,
  dataSupportSidebarAdmin,
  dataToolsSidebarAdmin,
  dataGeneralSidebarVendedor,
  dataSupportSidebarVendedor,
  dataToolsSidebarVendedor,
} from './SidebarRoutes.data';

type Props = {
  rol: ('admin' | 'vendedor');
};

export function SidebarRoutesClient({ rol }: Props) {
  const dataGeneral = rol === 'admin' ? dataGeneralSidebarAdmin : dataGeneralSidebarVendedor;
  const dataTools = rol === 'admin' ? dataToolsSidebarAdmin : dataToolsSidebarVendedor;
  const dataSupport = rol === 'admin' ? dataSupportSidebarAdmin : dataSupportSidebarVendedor;

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
          2026. All rights reserved for Carlos Malissia
        </footer>
      </div>
    </div>
  );
}