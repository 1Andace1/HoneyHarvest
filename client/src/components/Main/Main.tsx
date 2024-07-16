import  { useState } from 'react';
import './Main.css';


function Main(): JSX.Element {
  const [selectedApiary, setSelectedApiary] = useState<string | null>(null);

  const apiaries = [
    { name: 'Пасека 1', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://www.apiworld.ru/upload/iblock/407/40794069dad5ca5d04d7a4a745f6cdd3.jpg' },
    { name: 'Пасека 2', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://pics.photographer.ru/nonstop/pics/pictures/775/775161.jpg' },
    { name: 'Пасека 3', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://mig.pics/x/uploads/posts/2022-10/1666491194_51-mykaleidoscope-ru-p-paseka-v-derevne-pinterest-55.jpg' },
    { name: 'Пасека 4', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://storage.empire-tourism.ru/site_files/20011/700/paseka@1600.jpg' },
  ];

  return (
    <>
    <div className='all'>
    <div className="main-container">
      <header className="header">
      <video  src="https://media.istockphoto.com/id/682672366/ru/видео/медоносная-пчела-приближается-к-белому-цвету-и-пытается-приземлиться-на-лепесток.mp4?s=mp4-640x640-is&k=20&c=Y0MzB6RZdlJOGWOKUmupU_298_B_NCZFlgVubPg-RxQ="  autoPlay loop muted className="video-background">
        </video>
        <div className="header-text"></div>
        <div className="header-text">
          <h1>Магазин меда</h1>
          <p>Краткое описание магазина</p>
        </div>
      </header>
     
       
      <div className='navigation'>
      <div id='box1' className='navigation-box'> <h3 className='log'>Экологически чистый продукт <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/5904/5904807.png'></img> </h3>
        Наш мед собирается с незагрязненных природных территорий, обеспечивая вас натуральным и здоровым продуктом без примесей и химикатов.
        
          </div>
     <div id='box2' className='navigation-box'> <h3 className='log'>Высокое качество и вкус <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/4794/4794500.png'></img> </h3>Мы тщательно отбираем и проверяем каждую партию меда, чтобы гарантировать его превосходный вкус и полезные свойства.
          </div>
      <div id='box3' className='navigation-box'> <h3 className='log'>Поддержка местного хозяйства <img className='helpimg' src='https://cdn-icons-png.flaticon.com/512/5493/5493038.png'></img> </h3>Покупая наш мед, вы не только получаете уникальный продукт, но и поддерживаете мелких производителей и сохранение традиционных методов пчеловодства.
          </div>
      </div>
      <div className='rewiew'>
      <div className='rewiew-video'>
      <p className='video'> <iframe  width="540" height="315" src="https://www.youtube.com/embed/U-6fhnTK5H0?si=72l1DQ52y2coX6Ph" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></p>
      </div>
      <div className='rewiew-text'>
    

    <p><h3 className='log'>Разнообразие сортов меда:</h3> <p className='lilText'> От классического цветочного и липового до экзотического гречишного и лесного. У нас вы найдете мед, подходящий для любого вкуса и предпочтения.</p></p>

    <p><h3 className='log'>Эко-продукция:</h3> <p className='lilText'>Мы гордимся тем, что предлагаем только натуральные и экологически чистые продукты. Наш мед не содержит добавок, красителей или консервантов.</p></p>

    <p><h3 className='log'>Профессиональные консультации:</h3><p className='lilText'> Наши опытные консультанты помогут вам выбрать лучший мед для ваших нужд, будь то для повседневного употребления, лечебных целей или кулинарных экспериментов.</p></p>
  </div>
      </div>
      <section className="about-us">
        <h2>О нас </h2>
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
                  <h2 className='name'>{apiary.name}</h2>
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
            <h3>Меню</h3>
            <a href="#about-us">О нас</a>
            <a href="#apiary-selection">Пасеки</a>
            <a href="#rewiew">Отзывы</a>
          </div>
          <div className="footer-section">
            <h3>Социальные сети</h3>
            <div className="social-icons">
              <a href="https://facebook.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png'></img></a>
              <a href="https://twitter.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/3670/3670055.png'></img></a>
              <a href="https://instagram.com"><img className='society' src='https://cdn-icons-png.flaticon.com/512/1384/1384063.png'></img></a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default Main;