import { FC, useRef } from "react"
import Card from "./Card"

const Home: FC = () => {

  const ref = useRef<HTMLDivElement>(null);

  return (
        <div ref={ref} className="flex p-4 flex-wrap gap-2 items-center justify-between w-full h-screen">
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
          <Card reference={ref} />
        </div>
  )
}

export default Home
