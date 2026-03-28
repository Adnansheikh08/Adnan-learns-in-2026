import React, { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState<number>(0)
  return (
    <div>Counter:{count}
    <button onClick={() => setCount(count + 1)}>+</button>
    <button onClick={() => setCount(count - 1)}>-</button>  
    </div>
  )
}
