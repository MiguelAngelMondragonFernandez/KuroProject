import React from 'react'

function SideBar() {
    return (
        <>
            <div className="flex flex-col">
                <div className="grid">
                    <div className="col-6 flex flex-row">
                        <h3>Chats</h3>
                    </div>
                    <div className="col-6 flex flex-row">
                        <i className="pi pi-cog" style={{ fontSize: '2rem' }}></i>
                        <i className="pi pi-comment" style={{ fontSize: '2rem' }}></i>
                    </div>
                </div>
            </div>
                {/* fin header */}
        </>
    )
}

export default SideBar