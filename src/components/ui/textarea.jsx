import React from 'react'
export function Textarea(props){ return <textarea className={`w-full min-h-[6rem] border rounded-lg px-3 py-2 ${props.className||''}`} {...props} /> }
export default Textarea
