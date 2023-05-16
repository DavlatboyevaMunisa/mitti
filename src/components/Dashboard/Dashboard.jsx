import React,{useState} from 'react'
import './Dashboard.css'
import {HiUserCircle} from 'react-icons/hi'
import {FaTelegramPlane} from 'react-icons/fa'
import {AiFillAudio} from 'react-icons/ai'
import {BsFillCameraFill} from 'react-icons/bs'


const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Dashboard() {

  const list = document.querySelectorAll(".list");
        function activeLink() {
            list.forEach((item) => {
                item.classList.remove('active');
                this.classList.add('active');
            })
        }
        list.forEach((item) =>
            item.addEventListener('click', activeLink));

  const [messages, setMessages] = useState([
    {
      content: "Sizga qanday yordam bera olaman!",
      role: "assistant"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      content: e.target[0].value,
      role: "user"
    }

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    e.target.reset();

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...newMessages],
    });

    setMessages([...newMessages, completion.data.choices[0].message]);
    setIsTyping(false);
  }

  return (
    <div className='dashboard'>
        <header>
          <p>MittiAI</p>
          <span className='absolute'>{isTyping && <small>MittiAI yozmoqda...</small>} </span>
          <button><HiUserCircle /></button>
        </header>
        <div>
        <main className='main'>
        {
            messages.length && messages.map((msg, i) => {
              return (
                <div className="mittiai" key={'chatKey' + i}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {/* <img src={msg.role === 'assistant' ? '<HiUserCircle />' : '<HiUserCircle />'} /> */}
                      <HiUserCircle />
                    </div>
                  </div>
                  <div className="chat-bubble">{msg.content}</div>
                </div>
              )
            })
          }
        </main>
        <footer className='dashboardFooter'>
          <form className='footerForm' action="#" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="#">
              <input className='footerInput' type="text" placeholder="MittiAI uchun savol yozing, istalgan narsani so'rang!"/>
              <button className='footerButton' type='submit'><FaTelegramPlane /></button>
            </label>
            <label htmlFor="#">
              {/* <button className='btn send'><FaTelegramPlane /></button>
              <button className='btn audio'><AiFillAudio /></button>
              <button className='btn camera'><BsFillCameraFill /></button> */}
              <div className='APP'>
              <div className="navigation">
                    <ul>
                        <li className="list active" onClick={() => {}}>
                            <p>
                                <span className="icon"><FaTelegramPlane /></span>
                            </p>
                        </li>
                        <li className="list" onClick={ () => {}}>
                            <p>
                                <span className="icon"><AiFillAudio /></span>
                            </p>
                        </li>
                        <li className="list" onClick={() => {}}>
                            <p>
                                <span className="icon"><BsFillCameraFill /></span>
                            </p>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
              </div>
            </label>
          </form>
        </footer>
        </div>
    </div>
  )
}

export default Dashboard