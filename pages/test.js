import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './../store/counterSlice'
import Link from 'next/link';

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>test 1</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <Link href="/test2">my enlace</Link>
    </div>
  )
}
