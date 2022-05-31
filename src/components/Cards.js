import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './Card.css'

import { Modal } from 'react-bootstrap'


/* LOCALSTORAGE DAKİ "%50 İNDİRİM" BİLGİSİ İÇİN SABİT DEĞER ATANDI */

let localData = false;

/* CARD COMPONENTİNE API DEN GELEN VERİLER BASTIRILDI */ 

const Cards = () => {
    const [product, setProduct] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({}) // POPUP için state kullanıldı
    const [show, setShow] = useState(false);



    const handleClose = () => setShow(false);

    // handleShow fonk. tetiklendiğinde sırasıyla popup, modal görüntüleme ve ls'ye data kaydedildi

    const handleShow = (item) => {
      setSelectedProduct(item)
      setShow(true)
      localStorage.setItem('items', JSON.stringify(item));

    };

    useEffect(() => {

        axios.get('https://landingpage.sercair.com/api/V1/device/all')
        .then((res)=> setProduct(res.data.data))        
        .catch((err) => alert('Something went wrong'))
        
        const items = JSON.parse(localStorage.getItem('items')); // localstor. dan veriler alınıyor
        //console.log(items)
          if (items) {                  //verileri alırken logic kuruyoruz ve kullanıyoruz. 
            setSelectedProduct(items);
            localData = true;
            setShow(true);
          }
        
    }, [])

    //console.log(localData)

  return (

    /* STATE İLE YAKALANAN DATA MAP FUNCT. İLE CARD YAPISINA BASTIRILIYOR */ 
    
    <div className='cardDiv'>
      {product?.map((item, index) =>(
        
        
          <div className='cardItems' key={index} >
            <img className='cardImage' src={item.imageUrl} alt="itemImage" />            
            <div>
                <h2>Sercair</h2>
                <p>{item.deviceName}</p>
              </div>    
            <button type='button' className='btn btn-primary' onClick={()=> handleShow(item)}>DETAY</button> 
            {/* Yukarıda handleShow funct. ile item gönderiyoruz. setSelectedProduct state ile kullanılmak için */}

            
          </div>
        
      
      ))}
                  {/* selectedProduct'taki veriler POPUP'a aktarıldı */}
                    <Modal className="modal-text" show={show} onHide={handleClose} animation={false} >
                      <Modal.Header className="text-header" >
                        <Modal.Title ><img className="text-img" src={selectedProduct?.imageUrl} alt=""/></Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="text-body">
                        <h3>Sercair</h3>
                        <p style={{fontWeight: 'bold', fontSize: '13px'}}>{selectedProduct?.deviceName}</p>
                        <p>{selectedProduct?.desc}</p>
                        </Modal.Body>
                      <Modal.Footer className="text-center" >
                        { localData && <p><span> %50 </span>İNDİRİM</p>}
                      </Modal.Footer>
                    </Modal>
                 
                    
                 
      
    </div>
)}


export default Cards



     