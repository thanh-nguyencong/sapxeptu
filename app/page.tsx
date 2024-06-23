'use client'
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const unscrambledPlaceholders = ['N', 'H', 'Ậ', 'P', '\u00A0', 'T', 'Ừ', '\u00A0', 'C', 'Ầ', 'N', '\u00A0', 'Đ', 'O', 'Á', 'N']
    let isPlaceholderScrambled = false
    const transitionDelay = 20
    const transitionCount = 10
    const transition = (count, randomTransition, finalTransition) => {
      if (count === transitionCount) {
        finalTransition()
      } else {
        setTimeout(() => {
          randomTransition()
          transition(count + 1, randomTransition, finalTransition)
        }, transitionDelay)
      }
    }
    const placeholderInterval = setInterval(() => {
      const placeholders = document.getElementsByClassName('placeholder')
      if (isPlaceholderScrambled) {
        // Set them back to 'NHẬP TỪ CẦN ĐOÁN'
        for (let i = 0; i < placeholders.length; i++) {
          transition(
              0,
              () => placeholders[i].textContent = String.fromCharCode(Math.floor(Math.random() * 26) + 65),
              () => placeholders[i].textContent = unscrambledPlaceholders[i]
          )
        }
      } else {
        // Scramble them
        for (let i = 0; i < placeholders.length; i++) {
            transition(
                0,
                () => placeholders[i].textContent = String.fromCharCode(Math.floor(Math.random() * 26) + 65),
                () => placeholders[i].textContent = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
            )
        }
      }
      isPlaceholderScrambled = !isPlaceholderScrambled
    }, 1000)
    return () => clearInterval(placeholderInterval)
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const submitResponse = await fetch(`/api/submit?submittedText=${text}`, {
        method: 'GET',
    })
    const submitJson = await submitResponse.json()
    setWords(submitJson.words)
    setIsSubmitting(false)
  }

  const handleReplay = () => {
    const resultElement = document.getElementById('result')
    resultElement.animate(
        [
            { transform: 'translateY(0)' },
            { transform: 'translateY(100vh)' }
        ],
        {
          duration: 200,
          fill: 'both'
        })
    setTimeout(() => setWords([]), 1000)
  }

  return (
    <main className="min-h-screen h-full flex items-center justify-center p-24">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center font-mono text-3xl sm:text-5xl absolute">
        <div className="-z-1 flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        </div>
        <div className={`title absolute -translate-x-full h-screen w-[30vw] opacity-75 overflow-y-hidden uppercase font-extrabold text-5xl sm:text-9xl`}>
          {['đoán', 'đoán', 'đoán', 'đoán', 'đoán', 'đoán'].map((word, index) => <div key={index} className="title-character h-[20vh]">{word}</div>)}
        </div>
        <div className="absolute flex items-center justify-center">
          <input
              type="text"
              className="absolute bg-transparent dark:text-white focus:outline-none focus:ring-0 text-center uppercase"
              autoFocus={true}
              onChange={e => setText(e.target.value)}
          />
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>N</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>H</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>Ậ</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>P</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>&nbsp;</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>T</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>Ừ</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>&nbsp;</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>C</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>Ầ</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>N</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>&nbsp;</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>Đ</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>O</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>Á</p>
          <p className={`placeholder ${text ? 'hidden' : 'visible'} text-gray-500 dark:text-gray-500 dark:opacity-50 -z-10`}>N</p>
        </div>
        <div className={`${text ? 'visible' : 'hidden'} absolute top-40`}>
          <button
              type="submit"
              className={`px-10 py-5 flex justify-center items-center w-72 text-white text-2xl border rounded-xl transition duration-200 hover:bg-gray-200 hover:text-black active:bg-white active:text-black`}
              onClick={handleSubmit}
          >
            {isSubmitting ? 'Real quick' : 'Thử hử'}
            {isSubmitting &&
                <svg className={"h-8 w-8 ml-3"} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <circle className="spin2" cx="10" cy="10" fill="none"
                          r="8" stroke="currentColor"
                          strokeDasharray="1 2"
                          strokeLinecap="round"/>
                </svg>
                ||
                <svg className="arrow h-8 w-8 ml-3 translate-y-2 fill-current" xmlns="http://www.w3.org/2000/svg"
                     viewBox="5 0 25 25">
                  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
              </svg>
            }
          </button>
        </div>
      </div>
      {words.length > 0 &&
          <div id='result' className="absolute h-screen w-screen grid grid-cols-2 z-10 bg-black">
            <div className={'flex w-full flex-col justify-center items-center text-white text-3xl sm:text-5xl'}>
              <div className={"mb-10"}>
                {words[Math.floor(Math.random() * words.length)].toUpperCase()} chứ gì
              </div>
              <div>
                <button
                    type={"submit"}
                    className={`px-10 py-5 flex justify-center items-center w-72 text-white text-2xl border rounded-xl transition duration-200 hover:bg-gray-200 hover:text-black active:bg-white active:text-black`}
                    onClick={handleReplay}
                >
                  Chơi lại
                  <svg className="arrow h-8 w-8 ml-3 translate-y-2 fill-current" xmlns="http://www.w3.org/2000/svg"
                       viewBox="5 0 25 25">
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className={'flex w-full items-center justify-center text-white text-3xl sm:text-5xl'}>
              <Image alt="hehehe liu liu hehehe"
                   src={"https://lh5.googleusercontent.com/proxy/N_Cfi5UzncKM6z0q3JQG1MppuUL8f1HnVFY3TNPpArohHJvyW7GnO79YUXKrADx6B1efORGC0NU0PrE-zmu-7FPU277oPufR5zAjTFuMIw"}
              />
            </div>
          </div>
      }
    </main>
  );
}
