import  { useState } from 'react';
import './Main.css';
import video from './vecteezy_single-bee-on-ground-grooming-wings-and-legs-before_23996078.mp4'
import video1 from './vecteezy_man-s-hand-holds-a-honey-stick-that-is-dripping-onto-the_35173878.mp4'
import png1 from './img/1666491194_51-mykaleidoscope-ru-p-paseka-v-derevne-pinterest-55.jpg'
import png2 from './img/40794069dad5ca5d04d7a4a745f6cdd3.jpg'
import png3 from './img/775161.jpg'
import png4 from './img/paseka@1600.jpg'
function Main(): JSX.Element {
  const [selectedApiary, setSelectedApiary] = useState<string | null>(null);

  const apiaries = [ 
    { name: "Золотой Медведь", description: '(Московская область) Пасека "Золотой Медведь" славится своим экологически чистым медом и широким ассортиментом продукции. Здесь используются традиционные методы пчеловодства, обеспечивающие высокое качество меда. Пасека также предлагает экскурсии и мастер-классы, что делает её популярным местом для тех, кто интересуется пчеловодством и эко-продуктами. Уникальная атмосфера и забота о каждой пчелиной семье делают эту пасеку особенной.', imageUrl: png1 },
    { name: "Алиса", description: '(Краснодарский край) Пасека "Алиса" известна своим разнообразным ассортиментом меда, включая редкие сорта, такие как гречишный и лесной мед. Здесь активно продвигаются эко-продукты и здоровое питание. Пасека участвует в различных выставках и фестивалях, что делает её известным и уважаемым брендом в пчеловодстве. Экологическая чистота и традиционные методы производства делают мед "Алисы" особенно ценным.', imageUrl: png2},
    { name:  "Медовый Дом", description: '(Тверская область) Пасека "Медовый Дом" славится своим традиционным подходом к пчеловодству и высоким качеством продукции. Здесь используются методы, сохраняющие естественные условия для пчел, что обеспечивает натуральный и полезный мед. Пасека также предлагает экскурсии и продажу продуктов пчеловодства, что делает её привлекательным местом для посетителей. Уникальная атмосфера и забота о каждой пчелиной семье делают эту пасеку особенной.', imageUrl: png3},
    { name:  "Пчелка", description: '(Ленинградская область) Пасека "Пчелка" известна своим широким ассортиментом меда и сопутствующих продуктов. Здесь активно продвигаются эко-продукты и здоровое питание. Пасека участвует в различных выставках и фестивалях, что делает её известным и уважаемым брендом в пчеловодстве. Посетители могут насладиться экскурсиями и приобрести высококачественные продукты пчеловодства. Экологическая чистота и традиционные методы производства делают мед "Пчелки" особенно ценным.', imageUrl: png4 },
  ];

  return (
    <>
    <div className='all'>
    <div className="main-container">
      <header className="header">
      <video className='video' src={video}  autoPlay muted loop id="myVideo">
        </video>
       
        <div className="header-text">
          <div>HONEY HARVEST</div>
          {/* <p>Краткое описание магазина</p> */}
        </div>
      </header>
     
       
      <div className='navigation'>
      <div id='box1' className='navigation-box'> <h3 className='log'>   Экологически чистый продукт <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/5904/5904807.png'></img> </h3>
        Наш мед собирается с незагрязненных природных территорий, обеспечивая вас натуральным и здоровым продуктом без примесей и химикатов.
        
          </div>
     <div id='box2' className='navigation-box'> <h3 className='log2'>  Высокое качество и вкус <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/4794/4794500.png'></img> </h3>Мы тщательно отбираем и проверяем каждую партию меда, чтобы гарантировать его превосходный вкус и полезные свойства.
          </div>
      <div id='box3' className='navigation-box'> <h3 className='log'>  Поддержка местного хозяйства <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/5493/5493038.png'></img> </h3>Покупая наш мед, вы не только получаете уникальный продукт, <br /> но и поддерживаете мелких производителей и сохранение традиционных методов пчеловодства.
          </div>
      </div>
      <div className='rewiew'>
      <div className='rewiew-video'>
      <p className='video'> <iframe  width="540" height="315" src="https://www.youtube.com/embed/U-6fhnTK5H0?si=72l1DQ52y2coX6Ph" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></p>
      </div>
      <video className='video-background' src={video1} autoPlay muted loop></video>
      <div className='rewiew-text'>
        
    <p><h3 className='log1'>Разнообразие сортов меда:</h3> <p className='lilText'> От классического цветочного и липового до экзотического гречишного и лесного. У нас вы найдете мед, подходящий для любого вкуса и предпочтения.</p></p>

    <p><h3 className='log1'>Эко-продукция:</h3> <p className='lilText'>Мы гордимся тем, что предлагаем только натуральные и экологически чистые продукты. <br />Наш мед не содержит добавок, красителей или консервантов.</p></p>

    <p><h3 className='log1'>Профессиональные консультации:</h3><p className='lilText'> Наши опытные консультанты помогут вам выбрать лучший мед для ваших нужд, будь то для повседневного употребления, лечебных целей или кулинарных экспериментов.</p></p>
  </div>
      </div>
      <section className="about-us">
        <h2 className='onas'>Наши пасеки </h2>
        {/* <a href="#apiary-selection" className="arrow-down"></a> */}
      </section>

      <section id="apiary-selection" className="apiary-selection">
        {apiaries.map((apiary, index) => (
          <button className='theme' key={index} onClick={() => setSelectedApiary(apiary.name)}>
            {apiary.name}
          </button>
        ))}
      </section>

      {selectedApiary && (
        <section className="apiary-details">
          {apiaries.map((apiary, index) => (
            selectedApiary === apiary.name && (
              <div key={index} className="apiary-details-content">
                <div className="apiary-details-text">
                  <h2 className='name'>{apiary.name} </h2>
                  <p className='descrip'>{apiary.description}</p>
                </div>
                <img src={apiary.imageUrl} alt={apiary.name} className="apiary-details-image" />
              </div>
            )
          ))}
        </section>
      )}
    
    </div>   
    </div>
    <div>
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Контакты</h3>
            <p>Адрес: ул. Пчеларева, д. 123, г. Медовск</p>
            <p>Телефон: +7 (123) 456-78-90</p>
            <p>Email: info@paseka-shop.ru</p>
          </div>
          <div className="footer-section">
            <h3 className='menu'>Меню</h3>
            <a href="#about-us">О нас</a>
            <a href="#apiary-selection">Пасеки</a>
            <a href="#rewiew">Отзывы</a>
          </div>
          <div className="footer-section">
            <h3>Социальные сети</h3>
            <div className="social-icons">
              <a href="https://facebook.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png'></img></a>
              <a href="https://twitter.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/3670/3670055.png'></img></a>
              <a href="https://instagram.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/2504/2504930.png'></img></a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default Main;