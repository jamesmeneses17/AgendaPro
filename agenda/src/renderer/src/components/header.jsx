import React from 'react';

function Header() {
  const minimizeWindow = () => {
    window.electron.ipcRenderer.send('minimize-window');
  };

  const maximizeWindow = () => {
    window.electron.ipcRenderer.send('maximize-window');
  };

  const closeWindow = () => {
    window.electron.ipcRenderer.send('close-window');
  };

  return (
    <header className="flex justify-between items-center bg-blue-600 text-white p-2" style={{ WebkitAppRegion: 'drag' }}>
      <div className="text-lg font-semibold pl-2">AgendaPro</div>
      <div className="flex space-x-2 pr-2" style={{ WebkitAppRegion: 'no-drag' }}>
        <button onClick={minimizeWindow} className="hover:bg-blue-700 p-2 rounded">
          <span className="material-icons">remove</span>
        </button>
        <button onClick={maximizeWindow} className="hover:bg-blue-700 p-2 rounded">
          <span className="material-icons">crop_square</span>
        </button>
        <button onClick={closeWindow} className="hover:bg-red-700 p-2 rounded">
          <span className="material-icons">close</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
