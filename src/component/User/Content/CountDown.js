import { useEffect, useState } from "react"

const CountDown = (props) => {

    const [count, setCount] = useState(300)

    useEffect(() => {
        if (count === 0) {
            props.onTimeUp()
            return
        }

        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000)

        // clean up

        return () => {
            clearInterval(timer)
        }
    }, [count])

    const format_time = (s) => {
        return new Date(s * 1e3).toISOString().slice(-13, -5);
    }

    return (
        <div>
            {format_time(count)}
        </div>
    )
}

export default CountDown