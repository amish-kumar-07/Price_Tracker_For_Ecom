"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { useUser } from '@/app/context/UserContext';


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(1);
  const { setTracking_Frequency } = useUser(); // ✅ access it from context

  function onClick(adjustment: number) {
    const newGoal = ((goal - 1 + adjustment + 24) % 24) + 1;
    setGoal(newGoal);
  }


  function handleSubmit() {
    setTracking_Frequency(`${goal}`);
    console.log("Tracking frequency updated to:", goal);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-transparent transition-colors">
          Set Alert
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Tracking Goal</DrawerTitle>
            <DrawerDescription>Set your daily update every.</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onClick(-1)} disabled={goal <= 0}>
                <Minus />
              </Button>

              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">hr/day</div>
              </div>

              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onClick(1)} disabled={goal >= 25}>
                <Plus />
              </Button>
            </div>

            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="goal" style={{ fill: "hsl(var(--foreground))", opacity: 0.9 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
