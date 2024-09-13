import React from 'react'

const App = () => {
  return (
      <div className="flex">
        <div className="hidden md:block md:w-1/2 h-screen">
          <img
            src="https://picsum.photos/3000/3000"
            className="h-screen"
            alt=""
            srcset=""
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex items-center h-screen p-8">
            <div className="login w-4/5">
              <h1 className="text-4xl font-semibold mb-4 text-slate-700">Login</h1>
              <label className="font-medium mb-2 text-slate-500">Username</label>
              <input
                type="text"
                className="border border-slate-200 mb-3 w-full rounded p-1"
                placeholder="Input your username"
              />
              <label className="font-medium mb-2 text-slate-500">Password</label>
              <input
                type="text"
                className="border border-slate-200 mb-3 w-full rounded p-1"
                placeholder="Input your password"
              />
              <div className="flex justify-end">
                <button className="bg-slate-500 text-white px-6 py-2 rounded">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App