import  { useState } from 'react';
import { useAppSelector } from "../../redux/hooks";
import './Main.css'



function Main(): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [selectedApiary, setSelectedApiary] = useState<string | null>(null);

  const apiaries = [
    { name: 'Пасека 1', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://www.apiworld.ru/upload/iblock/407/40794069dad5ca5d04d7a4a745f6cdd3.jpg' },
    { name: 'Пасека 2', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://pics.photographer.ru/nonstop/pics/pictures/775/775161.jpg' },
    { name: 'Пасека 3', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://mig.pics/x/uploads/posts/2022-10/1666491194_51-mykaleidoscope-ru-p-paseka-v-derevne-pinterest-55.jpg' },
    { name: 'Пасека 4', description: 'Et provident ex alias. Quas illo aut rem itaque dolorum. Ut est itaque similique ad necessitatibus optio. Quas vero id quia occaecati temporibus. Non ea distinctio dolores quo delectus ipsum accusantium autem aut.Hic inventore aut ab a in. Sed aliquam possimus ipsam laboriosam. Facilis est quibusdam repudiandae velit aliquid voluptas repellat dolore. Modi enim enim.Quis est consequatur et aut repellat quos et fuga aspernatur. Perspiciatis nihil ipsam enim velit dolores. Quibusdam fugiat eligendi qui dolor. Officiis itaque nulla ad quasi quibusdam eum. Tempora voluptas explicabo est a atque. Labore quis omnis qui sed.', imageUrl: 'https://storage.empire-tourism.ru/site_files/20011/700/paseka@1600.jpg' },
  ];

  return (
    <div className="main-container">
      <header className="header">
        <video  src="https://media.istockphoto.com/id/682672366/ru/видео/медоносная-пчела-приближается-к-белому-цвету-и-пытается-приземлиться-на-лепесток.mp4?s=mp4-640x640-is&k=20&c=Y0MzB6RZdlJOGWOKUmupU_298_B_NCZFlgVubPg-RxQ="  autoPlay loop muted className="video-background">
        </video>
        <div className="header-text">
          <h1>Магазин меда</h1>
          <p>Краткое описание магазина</p>
        </div>
      </header>
      <div className='navigation'>
      <div id='box1' className='navigation-box'>Наш мед добывают так и так и еще
         так дбихукщхлхщкулщхпкулхукзпдхукпзукхпщзд
        цкзщуцлзщзлауцзщлуцазщлуцазщлуца
        цхдл-цула-щуцлалуцл-алуц-щалу-цщла-щу
        цла-щлуц-ал-ущцлцща
          </div>
     <div id='box2' className='navigation-box'>Наш мед добывают так и так и еще так дбихукщхлхщкулщх
      пкулхукзпдхукпзукхпщзд
        цкзщуцлзщзлауцзщлуцазщлуцазщлуца
        цхдл-цула-щуцлалуцл-алуц-щалу-
          </div>
      <div id='box3' className='navigation-box'>Наш мед добывают так и так и еще так дбихукщхлхщкулщхпкулхукзпдхукпзу
        кхпщзд
        цкзщуцлзщзлауцзщлуцазщлуцазщлуца
        цхдл-цула-щуцлалуцл-
          </div>
      </div>
      <div className='rewiew'>
      <div className='rewiew-video'>
      <p><iframe width="560" height="315" src="https://www.youtube.com/embed/U-6fhnTK5H0?si=72l1DQ52y2coX6Ph" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>
      </div>
      <div className='rewiew-text'>
    <p>Что мы предлагаем:

Разнообразие сортов меда: От классического цветочного и липового до экзотического гречишного и лесного. У нас вы найдете мед, подходящий для любого вкуса и предпочтения.

Эко-продукция: Мы гордимся тем, что предлагаем только натуральные и экологически чистые продукты. Наш мед не содержит добавок, красителей или консервантов.

Подарочные наборы: Идеальный выбор для тех, кто ищет оригинальные и полезные подарки. Наши подарочные наборы включают мед, прополис, пергу и другие продукты пчеловодства.

Профессиональные консультации: Наши опытные консультанты помогут вам выбрать лучший мед для ваших нужд, будь то для повседневного употребления, лечебных целей или кулинарных экспериментов.

Онлайн-заказ и доставка: Мы предлагаем удобную онлайн-платформу для заказа и доставку нашей продукции прямо к вашему дому.</p>
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
                  <h2>{apiary.name}</h2>
                  <p>{apiary.description}</p>
                </div>
                <img src={apiary.imageUrl} alt={apiary.name} className="apiary-details-image" />
              </div>
            )
          ))}
        </section>
      )}
       <footer className="footer">
        <div className="footer-content">
          <h3>Контакты</h3>
          <p>Адрес: ул. Пчеларева, д. 123, г. Медовск</p>
          <p>Телефон: +7 (123) 456-78-90</p>
          <p>Email: info@paseka-shop.ru</p>
        </div>
    
      </footer>
    </div>   
  );
}

export default Main;