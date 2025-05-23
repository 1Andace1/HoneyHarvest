'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 9,
          productId: 1,
          text: '— Почему пасечник, когда собирает мед, надевает на голову сетку?\n— Если его пчелы потом узнают, ему трындец.',
          isVerified: true,
          likesQuantity: 103,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 6,
          productId: 1,
          text: 'Еле удержался от того, чтобы не съесть сразу полбанки',
          isVerified: true,
          likesQuantity: 75,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 7,
          productId: 1,
          text: 'Самое то - утром выпить чаю с этим мёдом, чтобы зарядиться энергией для работы со студентами',
          isVerified: true,
          likesQuantity: 64,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 8,
          productId: 1,
          text: 'Очень вкусно!! Единственный недостаток - тяжело остановиться и всё не съесть за раз',
          isVerified: true,
          likesQuantity: 56,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 10,
          productId: 2,
          text: 'Пока не пробовала, но судя по отзывам, хороший продукт. Упаковка замечательная, в подарок тоже хорошо. Своё впечатление добавлю позднее',
          isVerified: true,
          likesQuantity: 48,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 9,
          productId: 3,
          text: 'Мед отличный, аромат, вкус прекрасный',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 8,
          productId: 4,
          text: 'Хорошо упаковано, быстрая доставка, понравилась цена -заказывал впервые. Пока не пробовал',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 7,
          productId: 5,
          text: 'Очень вкусный мед, понравилась кремовидная текстура и янтарный цвет',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 6,
          productId: 6,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 7,
          productId: 7,
          text: 'Классный медок. Сделайте мне персональную скидку и я еще куплю',
          isVerified: false,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 10,
          productId: 1,
          text: 'Супер!!! Куплю ещё по баночке мёда на подарки друзьям и родственникам',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 6,
          productId: 7,
          text: 'Мне понравился, очень вкусный',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 1,
          text: 'вкусный и свежий. обязательно куплю ещё',
          isVerified: false,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 2,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 1,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 3,
          text: 'Мне понравился, очень вкусный',
          isVerified: true,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 4,
          text: 'вкусный и свежий. обязательно куплю ещё',
          isVerified: true,
          likesQuantity: 1,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 5,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 4,
          text: 'Классный медок. Сделайте мне персональную скидку и я еще куплю',
          isVerified: false,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 4,
          text: 'Продам курсы по обучению професси курьера. Научу также лёгкому трудоустройству после окончания курсов. Самая востребованная профессия, что подтверждается последними социологическими исследованиями. Высокие зарплаты. Звоните в любое время суток: +7123456789',
          isVerified: false,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 4,
          text: 'не разбираюсь в мёде, а уж чистый липовый купил первый раз. поэтому с помощью племяшки проводил простейшие химические опыты, которые нашёл в интернете. и йод, и уксус и химический карандаш и др. все испытания мёд прошёл. то есть это, как минимум, не фальсификат, напичканный для удешевления всяким барахлом. Вкус мёда необычный, но приятный. сладость долго стоит во рту, а послевкусие довольно продолжительное, с лёгкой горчинкой. так как и должно быть в липовом мёде.',
          isVerified: false,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 3,
          text: 'Спасибо этой пасеке за вкусный свежий мёд. Быстрая доставка. Цены в этом интернет-магазине лучше, чем в супермаркете',
          isVerified: true,
          likesQuantity: 5,
          createdAt: '2023-08-05 09:18:23.802 +0500',
        },
        {
          userId: 13,
          productId: 3,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 3,
          createdAt: '2023-09-10 11:02:12.802 +0500',
        },
        {
          userId: 14,
          productId: 3,
          text: 'вкусный и свежий. обязательно куплю ещё такого мёда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: '2023-10-25 19:35:48.802 +0500',
        },
        {
          userId: 15,
          productId: 7,
          text: 'Это НАСТОЯЩИЙ МЁЁЁД!!! Хочу ЕЩЁЁЁ!!!',
          isVerified: true,
          likesQuantity: 3,
          createdAt: '2023-10-25 19:35:48.802 +0500',
        },
        {
          userId: 16,
          productId: 2,
          text: 'Очень вкусный. Сделайте скидку, тогда я ещё куплю',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 2,
          text: 'Спасибо за Ваш труд. Организуйте экскурсии на Ваши пасеки! Я приеду!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 10,
          text: 'Это очень вкусно. Сладкая, но при этом сахар в крови не повышает. И достаточно 1/4 ч.л.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 4,
          text: 'Этот мёд был взят специально на пробу. Очень густой , красивый цвет. Аромат очень тонкий. Самый что ни на есть настоящий мёд, проверено с годами. Мед беру разный , какой есть в продаже. Очень необычный вкус именно у этого меда. Буду есть по кофейной ложечке, как деликатес. Спасибо пчелкам и ребятам за ваш труд и отношение к своему делу. Я очень люблю липу и каштан. Но с этой пасеки беру все, что предлагают',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 5,
          text: 'Покупала для себя. Очень понравился. диабетикам самое то. Банка пришла отлично упакована. Если бы не упаковка самой банки, то точно бы разбилась, поскольку коробка была вся помята. Так же очень понравился подарок. Спасибо!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 21,
          text: 'Редко пишу отзывы. Но! Это волшебство! Запах! Вкус! Консистенция! 100 из 100 попадание в вкус кокоса,миндаля,и нежной сладкой текстуры. Вау. Сдерживаю себя не больше ложки в день,из за ккал.Но это супер.Закажу в подарок подругам и родным',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 8,
          text: 'Очень понравился. диабетикам самое то. Банка пришла отлично упакована. Покупала для себя. Если бы не упаковка самой банки, то точно бы разбилась, поскольку коробка была вся помята. Так же очень понравился подарок. Спасибо!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 9,
          text: 'Коробка дошла без единого повреждения. Всё в идеальном состоянии! Чувствуется забота о покупателях и видно, что люди сами всё производят и отправляют, а не просто перепродают. Мёд покупала на подарок. Кажому по баночке. А одну с кедровым орехом оставила себе. Запах меда присутствует. А вкус... Мммм.... Просто невероятный! Еле остановилась, чтобы за день не съесть пол банки) Не ожидала такого вкуса и качества. Очень довольна покупкой и всем любителям меда и орехов советую. А если вы не любитель, то уверена, что после этой покупки им станете)))  Спасибо!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 9,
          text: 'Впервые заказали мед у данного продавца ориентируясь на отзывы и цену. Порадовала быстрая доставка и хорошая упаковка, большой плюс пластиковая тара, крышка открыли без проблем. На этикетке дана вся информация согласно карточки товара, вес соответствует. Мед понравился густой, однородной. Донниковый мед побывали впервые и он очень понравился, на фото видно сколько осталось через несколько дней после открытия банки. Вкус насыщенный, ароматный, мед имеет приятное послевкусие, порадовало качество продукта и цена. Спасибо продавцу, будем заказывать ещё',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 10,
          text: 'Всё устраивает . Хорошие вкусовые качества. Мне всё понравилось. Недостатков нет. Доставка быстрая. Спасибо. Рекомендую',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 11,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 12,
          text: 'Очень ароматный мед. Вкус более терпкий, чем у Майского. Загустел полностью. Майский более мягкий, кремообразный. Этот с более крупными кристаллами. Цвет - светлая охра, очень красивый. Мужу больше всего понравился именно этот мед. Единственное, сверху меда образовалась тоненькая белая "пенка", не знаю должно ли так быть. Но вкуса меда она не портит, ничем "забродившим" не пахнет. Указан ГОСТ. .',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 13,
          text: 'От многих недугов одно из лучших средств. Прополис со сливочным маслом избавил меня от бактерии Helicobacter pylori. Личный опыт применения чуда - масла',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 15,
          text: 'Уже писала в отзыве про Майский мед, что качество меда у это фирмы всегда на высоте. Разные сорта с разными вкусовыми характеристиками, на любой вкус. Очень понравилась новая упаковка с подробной информацией. Указаны основные медоносы, место и время сбора, время цветения, и даже погодные условия во время цветения. Грамотный маркетинговый ход :)) Развес по 1кг тоже порадовал. Мы мед часто покупаем, приходилось выбрасывать красивые стеклянные банки, жалко, но не хранить же их. Они хороши как подарочная упаковка, а для себя в самый раз покупать именно пластиковые килограммовые упаковки. Всё равно же потом перекладываем. Кстати, упаковки все пришли целые, спасибо Озону. А производителю спасибо за вкусный качественный мед! ',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 14,
          text: 'не первый мед который заказываю у продавца, товар хорошо запакован, упаковка просто на пятерку, мед супер вкусный!!!!! качество не умею проверять ..верю что мед без сахара лишнего)',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 15,
          text: 'Вкус отличный, мед густой и тягучий, как "сливочная тянучка". Аромат умеренный, ненавязчивый. Цвет очень красивый, как топленое молоко. Хорошая упаковка, с приложением комментария от фирмы производителя. Цена адекватная качеству и даже ниже, чем в магазинах Санкт-Петербурга и на различных "Ярмарках меда". Рекомендую попробовать именно этот мед, "Редкий мед натуральный Донниаовый". Он замечательный во всех отношениях.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 15,
          text: 'Мощный иммуномодулятор.Готовим много блюд именно с гречишным мёдом: в кофе добавляем взбитые сливки и мёд. Цукаты с гречишным мёдом- вкусно. Запекаем груши с адыгейским сыром и мёдом, добавить можно и инжир',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 16,
          text: 'Спасибо производителям меда "Донниковый" за высокое качество и прекрасный вкус вашей продукции. Я с первых 2-х ложек почувствовала оздоравливающий эффект. От зимней питерской хандры и простуды не осталось и следа.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 17,
          text: 'Очень вкусно!! Единственный недостаток - тяжело остановиться и всё не съесть за раз',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 17,
          text: 'Это очень вкусно! Свежий тягучий мед со свежими и вкусными орехами. Орешки все что заявлены есть. Сочетание просто бомбическое. Аромат тоже прекрасный. Куплю в школу учителям на подарки по такой баночке! Конфеты уже всем надоели, а такой полезный и вкусный подарок на Новый год им должен понравиться. ',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 18,
          text: 'Уже три банки заказали! Очень вкусный мед! Вероятно предоставленная полная информация о пасеке поспособствовала тому, чтобы выбор пал именно на мед данного производителя. Мед спокойно доехал до г. Дербента, и там им от души полакомились!) Спасибо большое производителю! Судя по всему, это настоящий мед! Будем заказывать еще!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 19,
          text: 'Очень вкусный мед, дозатор, приятная упаковка, название',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 20,
          text: 'Очень крутой мед! Пробовал и цветочный и акациевый у этого бренда, безумно вкусно и качественно, что редкость сегодня. Это точно бестселлер и лидер среди меда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 21,
          text: 'Редко пишу отзывы. Но! Это волшебство! Запах! Вкус! Консистенция! 100 из 100 попадание в вкус кокоса,миндаля,и нежной сладкой текстуры. Вау. Сдерживаю себя не больше ложки в день,из за ккал.Но это супер.Закажу в подарок подругам и родным',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 22,
          text: 'Баночка пришла, надёжно упакованная, в целости и сохранности, мембрана на месте. Смотрится очень красиво! 🥰🥰🥰 Ещё и подарочек положили! Очень мило! Спасибо продавцу! 💜💜💜 Свежий натуральный полезный вкусный мёд! Приходится себя тормозить, чтобы не переедать))) Может стать классным подарком друзьям, близким, ну или себе любимым))) 😁👌 Очень рекомендую! Мёд - супер!',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 22,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 23,
          text: 'Покупаю мед только этого производителя. Ни разу не было подделки. Пробовала практически все виды. С маточным молочком очень мягкий вкус',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 24,
          text: 'Необычный, на мой взгляд с приятным послевкусием',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 25,
          text: 'Мед очень вкусный и качественный. Пахнет изумительно. Пьëм чай с удовольствием). Рекомендую',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 26,
          text: 'Пока не пробовала, но судя по отзывам, хороший продукт. Упаковка замечательная, в подарок тоже хорошо. Своё впечатление добавлю позднее',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 27,
          text: 'Мед отличный, аромат, вкус прекрасный',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 12,
          productId: 28,
          text: 'Хорошо упаковано, быстрая доставка, понравилась цена -заказывал впервые. Пока не пробовал',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 13,
          productId: 28,
          text: 'Очень вкусный мед, понравилась кремовидная текстура и янтарный цвет',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 14,
          productId: 29,
          text: 'Самый настоящий Гречишный! терпкий, с легкой горчинкой и даже першением в горле. Интенсивный сладкий запах.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 15,
          productId: 27,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 16,
          productId: 28,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 17,
          productId: 29,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 11,
          productId: 30,
          text: 'Очень вкусно и полезно! Рекомендую.',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
