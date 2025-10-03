import React from 'react'

const List = () => {
  return (
    <>
     <div className="text-center my-8">
        <h2 className="text-xl font-bold">Це спільний контент для всіх!</h2>
        <p>Він завжди буде показуватись.</p>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Доступні кімнати</h1>

      <div className="border rounded-lg p-4 flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-xl font-semibold">Кімната №1</h2>
          <p className="text-gray-600">Ціна: 500₴ / ніч</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Забронювати
        </button>
      </div>

      <div className="border rounded-lg p-4 flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-xl font-semibold">Кімната №2</h2>
          <p className="text-gray-600">Ціна: 650₴ / ніч</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Забронювати
        </button>
      </div>

      <div className="border rounded-lg p-4 flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-xl font-semibold">Кімната №3</h2>
          <p className="text-gray-600">Ціна: 800₴ / ніч</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Забронювати
        </button>
      </div>
    </div></>
  )
}

export default List