import React, { useState } from 'react'

function Qrcode() {
    const [img,setImg] = useState('');
    const [loading,setLoading] = useState(false);
    const [data,setQrData] = useState('');
    const [size,setSize] = useState('');
    function generateQr(){
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&&data=${encodeURIComponent(data)}`
            setImg(url)
        }
        catch(error){
            console.error('error has raise while generating a Qr code',error);
        }
        finally{
            setLoading(false)
        }
     }
     function download(){
      fetch(img).then((Response)=>Response.blob()).then((blob)=>{
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob);
        link.download = "QR Code.png";
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
      })
     }
  return (
    <div className='headc'>
      <h1 className='header'>Welcome to Qr Code Generator</h1><br />
      <div className='maincontainer'>
        {loading && <p>Please wait...</p>}
        <div className='imge'>
            {img && <img src={img} className='image' />}
        </div>
        <form action="#">
            <label htmlFor="address" className='addrlabel'>Enter the URL</label><br />
            <input type="text" className='addrqrcode'id='address' placeholder='Address' onChange={(event)=>{setQrData(event.target.value)}} /><br />
            <label htmlFor="address" className='sizelabel'>Enter the Size</label><br />
            <input type="text" className='size' placeholder='size eg(150,360,...)' onChange={(e)=>{setSize(e.target.value)}} />
        </form>
        </div>
        <div className='btn'>
            <button onClick={generateQr} className='generate'>Generate Qr Code</button>
            <button onClick={download} className='download'>Download QrCode</button>
        </div>
        <p className='footer'>For More Projects Contact <a href="https://vigneshpyc.github.io/portfolio/">Vignesh Muvis Tech</a></p>
    </div>
  )
}

export default Qrcode