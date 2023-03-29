import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './../store/counterSlice'
import { useRouter } from 'next/router';

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const router = useRouter();

  const handleClick = () => {
    router.push('/test1');
  };

  return (
    <div>
      <h1>test 2</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <h1>{" "+count+" "}</h1>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <button onClick={handleClick}>Go to Test 1</button>
    </div>
  )
}