'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Github, MessageCircle, Send, Twitter } from 'lucide-react'
import avatar from './avatar.png'
import Transition from './Transition'

const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value.toString(), 10)
    const duration = 2000
    let timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, duration / end)

    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString()}</span>
}

const ProgressBar = ({ value, max, name }: { value: number; max: number; name: string }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((value / max) * 100)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, max])

  return (
      <div className="relative w-full">
        <div className="flex justify-between mb-1">
          <span className="text-xs hover-animation">{name}</span>
          <span className="text-xs hover-animation">{value}%</span>
        </div>
        <div className="w-full bg-green-900/30 rounded-full h-2.5">
          <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setLoaded(true)

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !isTransitioning) {
        setIsTransitioning(true);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isTransitioning])

  const handleTransitionComplete = () => {
    window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';
  }

  return (
      <>
        <div className="min-h-screen bg-black text-green-500 font-game p-4 overflow-hidden">
          <div className="terminal-overlay"></div>
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold glitch" data-text="TumGov">TumGov</h1>
              <p className="text-sm mt-2 typewriter">НЕДОКОДЕР НА СТЕРОЙДАХ</p>
            </header>

            <main className="space-y-6">
              <section className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 glow">
                  <Image
                      src={avatar}
                      alt="TumGov"
                      className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold hover-animation">Александр</h2>
                  <p className="text-sm hover-animation">Возраст: 14</p>
                  <p className="text-sm hover-animation">Опыт использования нейросетей: 99%</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2 hover-animation">About Me</h3>
                <p className="text-sm hover-animation">
                  Привет, хакеры! Я нейрокиборг, ваш проводник в мир нейронных сетей! Когда я не прокачиваю ИИ-модели или не ковыряюсь в старинном железе, я тресусь от конвульсий сидя за электронно-лучевыми мониторами. Учу много языков и развиваюсь в целом, я не ограничен программированием, я ограничен ограниченными возможностями 😁😁😁
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2 hover-animation">Успехи</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="stat-box">
                    <span className="stat-label hover-animation">Потрачено часов с нейронками:</span>
                    <span className="stat-value"><AnimatedNumber value={9999} /></span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label hover-animation">Количество нервных срывов:</span>
                    <span className="stat-value"><AnimatedNumber value={1337} /></span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label hover-animation">Выпито кофе:</span>
                    <span className="stat-value" style={{ fontSize: '200%', marginTop: '-0.2em' }}>∞</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label hover-animation">Количество проёбаных часов:</span>
                    <span className="stat-value"><AnimatedNumber value={42000} /></span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4 hover-animation">Умения</h3>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {[
                    { name: 'Страдать хуйнёй', level: 100 },
                    { name: 'Пользоваться нейронками', level: 99 },
                    { name: 'Писать треки', level: 90 },
                    { name: 'Анализировать', level: 90 },
                    { name: 'Кодить самостоятельно', level: 5 },
                    { name: 'Думать', level: 0.01 }
                  ].map((skill) => (
                      <ProgressBar
                          key={skill.name}
                          name={skill.name}
                          value={skill.level}
                          max={100}
                      />
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-2 hover-animation">Связь</h3>
                <div className="flex space-x-4">
                  <a href="https://t.me/TumaG0v" className="contact-icon hover-animation" aria-label="Telegram"><Send size={16} /></a>
                  <a href="https://github.com/TumGovic1" className="contact-icon hover-animation" aria-label="Github"><Github size={16} /></a>
                  <a href="https://x.com/TumGovic" className="contact-icon hover-animation" aria-label="X"><Twitter size={16} /></a>
                </div>
              </section>
            </main>

            <footer className="mt-8 text-center">
              <p className="text-sm blink hover-animation">Press Enter to Continue...</p>
            </footer>
          </div>

          {isTransitioning && (
              <Transition onComplete={handleTransitionComplete} />
          )}
        </div>
      </>
  );
}
