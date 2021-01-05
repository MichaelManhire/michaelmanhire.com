import React, { useState } from "react"
import { Link } from "gatsby"
import { Transition } from "@headlessui/react"
import Michael from "../images/michael.jpg"

const Layout = ({ location, title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="fixed inset-0 flex z-40">
          <Transition
            show={isOpen}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div className="fixed inset-0" ref={ref}>
                <div className="absolute inset-0 bg-gray-600 opacity-75" />
              </div>
            )}
          </Transition>
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {(ref) => (
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white" ref={ref}>
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <figure className="flex-shrink-0 flex items-center px-4">
                    <img className="rounded-full" src={Michael} alt="Michael Manhire" width="32" height="32" />
                    <figcaption className="ml-2 text-md font-semibold text-gray-900">Michael Manhire</figcaption>
                  </figure>
                  <nav className="mt-5 px-2 space-y-1">
                    <Link className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-2 py-2 text-base font-medium rounded-md transition-all" activeClassName="bg-gray-100 hover:bg-gray-100 text-gray-900 cursor-default" to="/">
                      <svg className="mr-3 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Blog
                    </Link>
                    <Link className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-2 py-2 text-base font-medium rounded-md transition-all" activeClassName="bg-gray-100 hover:bg-gray-100 text-gray-900 cursor-default" to="/about">
                      <svg className="mr-3 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      About Me
                    </Link>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a className="flex-shrink-0 inline-flex items-center px-4 py-2 mx-auto border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" href="mailto:michaelmanhire@gmail.com">
                    Get In Touch
                    <svg className="ml-2 -mr-1 h-5 w-5" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </Transition>
          <div className="flex-shrink-0 w-14" />
        </div>
      </div>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <figure className="flex items-center flex-shrink-0 px-4">
                <img className="rounded-full" src={Michael} alt="Michael Manhire" width="32" height="32" />
                <figcaption className="ml-2 text-md font-semibold text-gray-900">Michael Manhire</figcaption>
              </figure>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <Link className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all" activeClassName="bg-gray-100 hover:bg-gray-100 text-gray-900 cursor-default" to="/">
                  <svg className="mr-3 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blog
                </Link>
                <Link className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all" activeClassName="bg-gray-100 hover:bg-gray-100 text-gray-900 cursor-default" to="/about">
                  <svg className="mr-3 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About Me
                </Link>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a className="flex-shrink-0 inline-flex items-center px-4 py-2 mx-auto border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all" href="mailto:michaelmanhire@gmail.com">
                Get In Touch
                <svg className="ml-3 -mr-1 h-5 w-5" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-gray-900">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
