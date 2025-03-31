import React, {useState} from 'react'

function Message({idUser, message, date}) {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id); // Estado para almacenar el ID del usuario autenticado
  return (
              <div className={`flex flex-row ${idUser === userId ? 'justify-content-start' : 'justify-content-end'}`}>
                  {idUser === userId && (
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
                              <span>{message}</span>
                          </div>
                          <div className="col-1">
                              <span>{date}</span>
                          </div>
                      </div>
                  </div>
                  {idUser !== userId && (
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