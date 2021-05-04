import React, { useContext, useEffect, useState } from 'react'
import FileCard from '../Components/FileCard'
import { ContextStore } from '../ContextStore';

export default function FileUpload() {
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ showSidebar, setShowSidebar] = SideBar;
  const [ user, setUser ] = CurrentUser;
  const [ fileData, setFileData] = useState([]);

  useEffect(() => {
    setShowSidebar(true);
    fetchExistingFiles();
  },[]);

  function fetchExistingFiles() {
    const token = user.token;
    const url = process.env.REACT_APP_BASE_URL + ':5000/file?token=' + token;
    fetch(url)
      .then(res => res.json())
      .then(data => setFileData(data))
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    const fileName = file.name;
    uploadFile(file, fileName)
      .then(() => {
        fetchExistingFiles();
        e.target.value = null;
      })
  }

  function uploadFile(file, name) {
    const token = user.token;
    const url = process.env.REACT_APP_BASE_URL + ':5000/file/' + name + '?token=' + token;
    const formData = new FormData();
		formData.append('file', file);
    return fetch(url, {
      method: 'POST',
      body: formData
    })
  }

  return(
    <div className="file-upload">
        <input type="file" onChange={handleUpload}/>
      {fileData.map(item=> {
        return <FileCard name={item.name}  description={item.description} date={item.date} token={user.token}  />
      })}
    </div>
  )
}