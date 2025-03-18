import React, {useState} from 'react'

function Message(message) {
    const [item, setItem] = useState(message)
  return (
              <div className={`flex flex-row ${item.idUser === 1 ? 'justify-content-start' : 'justify-content-end'}`}>
                  {item.idUser === 1 && (
                      <div className="col-1">
                          <img
                              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                              alt="avatar"
                              className="avatar"
                          />
                      </div>
                  )}
                  <div className="col-11">
                      <div className="flex flex-row">
                          <div className="col-11">
                              <span>{item.message}</span>
                          </div>
                          <div className="col-1">
                              <span>{item.date}</span>
                          </div>
                      </div>
                  </div>
                  {item.idUser !== 1 && (
                      <div className="col-1">
                          <img
                              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                              alt="avatar"
                              className="avatar"
                          />
                      </div>
                  )}
              </div>
  )
}

export default Message