import React from 'react'

export default function options({question}) {
  return (
    <div className="options">
        {question.options.map((option) => (
          <button className="btn btn-option" key={option}>{option}</button>
        ))}
      </div>
  )
}
