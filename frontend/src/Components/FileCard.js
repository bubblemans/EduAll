import React from 'react'
import '../App.css'
export default function FileCard ({ name, description, date, token  }) {

  function handleDownload() {
    const url = process.env.REACT_APP_BASE_URL + ':5000/file/' + name + '?token=' + token;
    console.log(url);
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    })
  }

  return(
    <div className="file-card">
      <a href="#">
        <button className = "cardButton" onClick={handleDownload}>
          <div> {name}  </div>
          <div> {description} </div>
          <div> {date} </div>
        </button>
      </a>
    </div>
  )
}
