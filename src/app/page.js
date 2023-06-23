"use client";
import TodoList from '@/components/TodoList'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-5 sm:p-10 md:p-24 bg-gradient-to-b from-[#A18AFF] text-white">
       <TodoList/>  
    </main>
  )
}
