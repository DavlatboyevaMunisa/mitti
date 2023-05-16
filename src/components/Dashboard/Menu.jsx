import React from 'react'
import {FaTelegramPlane} from 'react-icons/fa'
import {AiFillAudio} from 'react-icons/ai'
import {BsFillCameraFill} from 'react-icons/bs'
import './Menu.css'

function Menu() {
    const list = document.querySelectorAll(".list");
        function activeLink() {
            list.forEach((item) => {
                item.classList.remove('active');
                this.classList.add('active');
            })
        }
        list.forEach((item) =>
            item.addEventListener('click', activeLink));
  return (
    <div className='APP'>
              <div className="navigation">
                    <ul>
                        <li className="list active">
                            <a>
                                <span className="icon"><FaTelegramPlane /></span>
                            </a>
                        </li>
                        <li className="list" onClick={ () => {}}>
                            <a>
                                <span className="icon"><AiFillAudio /></span>
                            </a>
                        </li>
                        <li className="list">
                            <a>
                                <span className="icon"><BsFillCameraFill /></span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
              </div>
  )
}

export default Menu