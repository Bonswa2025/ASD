import React, {useState} from 'react';
export function Tabs({defaultValue, children}){
  const [value, setValue] = useState(defaultValue);
  return <div data-tabs data-value={value}>
    {React.Children.map(children, child => React.cloneElement(child, { value, setValue }))}
  </div>;
}
export function TabsList({children, value, setValue, className=''}){
  const items = React.Children.toArray(children);
  return <div className={`flex gap-2 mb-3 ${className}`}>{items}</div>;
}
export function TabsTrigger({children, value: v, setValue, className='', ...rest}){
  const name = rest['data-value'] || rest.value || children;
  return <button className={`px-3 py-1.5 rounded-lg border ${className}`} onClick={()=>setValue?.(name)}>{children}</button>;
}
export function TabsContent({children, value: current, setValue, value}){
  // naive implementation: always render
  return <div>{children}</div>;
}