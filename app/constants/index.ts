export const navigationLinks = [
  {
    href: '/library',
    label: 'Library',
  },

  {
    img: '/icons/user.svg',
    selectedImg: '/icons/user-fill.svg',
    href: '/my-profile',
    label: 'My Profile',
  },
];

export const adminSideBarLinks = [
  {
    img: '/icons/admin/home.svg',
    route: '/admin',
    text: 'Home',
  },
  {
    img: '/icons/admin/users.svg',
    route: '/admin/users',
    text: 'All Users',
  },
  {
    img: '/icons/admin/book.svg',
    route: '/admin/books',
    text: 'All Books',
  },
  {
    img: '/icons/admin/bookmark.svg',
    route: '/admin/borrow-records',
    text: 'Borrow Records',
  },
  {
    img: '/icons/admin/user.svg',
    route: '/admin/account-requests',
    text: 'Account Requests',
  },
];

export const FIELD_NAMES = {
  fullName: 'Полное имя',
  email: 'Email',
  libraryId: 'Номер пропуска библиотеки',
  password: 'Password',
  libraryCard: 'Загрузите пропуск библиотеки',
};

export const FIELD_TYPES = {
  fullName: 'text',
  email: 'email',
  libraryId: 'number',
  password: 'password',
};

export const sampleBooks = [
  {
    id: 1,
    title: 'Алмазный меч',
    author: 'Ильяс Есенберлин',
    genre: 'Исторический роман / Эпопея',
    rating: 4.6,
    totalCopies: 20,
    availableCopies: 10,
    description:
      "Роман 'Алмазный меч' (Алмас қылыш) является первой частью исторической трилогии 'Кочевники' Ільяса Есенберлина. В книге рассказывается о создании Казахского ханства, борьбе Керея и Жәнібека за независимость, противостоянии с внешними врагами и становлении государства.",
    coverColor: '#0d2d48',
    coverUrl:
      'https://static.insales-cdn.com/r/Jo9mxYj74AM/rs:fit:1000:1000:1/plain/images/products/1/6839/426465975/1999304_550.jpg@jpg',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      "Роман 'Острый меч' (Алмазный меч) повествует о создании Казахского ханства в XV веке. Керей и Жәнібек уходят из-под власти Абулхаира и закладывают основу независимого государства. В книге описываются их сражения, дипломатические ходы и первые шаги к объединению казахских племен.",
  },
  {
    id: 2,
    title: 'Қара сөздер/Слова назидания',
    author: 'Абай Құнанбаев',
    genre: 'Казахская Классика',
    rating: 4.9,
    totalCopies: 99,
    availableCopies: 50,
    description:
      'Сборник философских размышлений и моральных наставлений великого казахского поэта, философа и просветителя Абая Кунанбаева. Эти слова назидания остаются актуальными даже спустя века.',
    coverColor: '#ffcc00',
    coverUrl:
      'https://resources.cdn-kaspi.kz/img/m/p/he8/h36/69983338364958.jpg?format=gallery-medium',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Сборник философских размышлений и моральных наставлений великого казахского поэта, философа и просветителя Абая Кунанбаева. Эти слова назидания остаются актуальными даже спустя века.',
  },
  {
    id: 3,
    title: 'Kemel adam/Кемел адам',
    author: 'Қайрат Жолдыбайұлы',
    genre: 'Психология',
    rating: 4.7,
    totalCopies: 9,
    availableCopies: 5,
    description:
      'Автор рассматривает концепцию «кемел адам» — идеального человека, который стремится к духовному и интеллектуальному совершенству.',
    coverColor: '#ffffff',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShRgK7cWR_-7UAPFDCWREKZdeRz4eSeSncOg&s',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Автор рассматривает концепцию «кемел адам» — идеального человека, который стремится к духовному и интеллектуальному совершенству.',
  },
  {
    id: 4,
    title: 'Менің атым Қожа',
    author: 'Бердібек Соқпақбаев',
    genre: 'Детская литература',
    rating: 4.9,
    totalCopies: 40,
    availableCopies: 30,
    description:
      'Классическая повесть о мальчике Коже, его детстве, шалостях и стремлении стать хорошим человеком.',
    coverColor: '#d89941',
    coverUrl:
      'https://static.insales-cdn.com/images/products/1/4594/633573874/%D0%BA%D0%BE%D0%B6%D0%B0_%D0%BF%D0%BE%D0%BA%D0%B5%D1%82%D0%B1%D1%83%D0%BA%D0%BA--min.jpg',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Добрая и поучительная история о детстве, дружбе и моральных ценностях.',
  },
  {
    id: 5,
    title: 'Ақиқаттан аттауға болмайды',
    author: 'Дінмұхамед Қонаев',
    genre: 'Биографии, мемуары',
    rating: 4.9,
    totalCopies: 30,
    availableCopies: 12,
    description:
      'Книга представляет собой откровенный рассказ о жизни и политической карьере Кунаева, его взглядах на развитие Казахстана в составе СССР, взаимоотношениях с союзными и республиканскими руководителями. Автор делится воспоминаниями о ключевых исторических событиях, вызовах и достижениях своего времени.',
    coverColor: '#d96113',
    coverUrl: 'https://www.nlrk.kz/images/novinki/2022/09/img641.jpg',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Книга представляет собой откровенный рассказ о жизни и политической карьере Кунаева, его взглядах на развитие Казахстана в составе СССР, взаимоотношениях с союзными и республиканскими руководителями. Автор делится воспоминаниями о ключевых исторических событиях, вызовах и достижениях своего времени.',
  },
  {
    id: 6,
    title: 'Ұшқан ұя',
    author: 'Бауыржан Момышулы',
    genre: 'Казахская Классика',
    rating: 4.7,
    totalCopies: 40,
    availableCopies: 25,
    description:
      'Книга рассказывает о детстве автора, проведенном в традиционной казахской семье. Через воспоминания о родителях, бабушке и дедушке раскрываются нравственные устои, обычаи, семейные ценности и жизненная философия казахского народа.',
    coverColor: '#01be81',
    coverUrl:
      'https://tengrinews.kz/userdata/u398/2023-07/resize/af293a8d5c9b6f4e3e401cad748c87b5.jpeg',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Книга рассказывает о детстве автора, проведенном в традиционной казахской семье. Через воспоминания о родителях, бабушке и дедушке раскрываются нравственные устои, обычаи, семейные ценности и жизненная философия казахского народа.',
  },
  {
    id: 7,
    title: 'Бейсен және болмыс',
    author: 'Керімбай С., Құспан А.',
    genre: 'Психология популярная',
    rating: 4.8,
    totalCopies: 25,
    availableCopies: 3,
    description:
      'Книга представляет собой сборник воспоминаний, размышлений и жизненных принципов Бейсен Құранбек. Она основана на его интервью, записях, а также на рассказах его друзей, коллег и близких людей. Особое внимание уделяется его взглядам на человеческие ценности, добро, честность, ответственность перед обществом и стремление помогать людям.',
    coverColor: '#d5b67b',
    coverUrl:
      'https://resources.cdn-kaspi.kz/img/m/p/h02/h88/85767456817182.jpg?format=gallery-medium',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'Книга представляет собой сборник воспоминаний, размышлений и жизненных принципов Бейсен Құранбек. Она основана на его интервью, записях, а также на рассказах его друзей, коллег и близких людей. Особое внимание уделяется его взглядам на человеческие ценности, добро, честность, ответственность перед обществом и стремление помогать людям.',
  },
  {
    id: 8,
    title: 'Ботагоз',
    author: 'Сабит Муканов',
    genre: 'Драма',
    rating: 4.8,
    totalCopies: 10,
    availableCopies: 5,
    description:
      'В центре повествования — Среднеазиатское восстание 1916 года. Это история о том, как казахский народ сделал важный шаг к своей независимости.',
    coverColor: '#46605f',
    coverUrl:
      'https://harpersbazaar.kz/wp-content/uploads/2022/06/sabit_mukanov__botagoz-1.jpeg',
    videoUrl: '/sample-video.mp4?updatedAt=1722593504152',
    summary:
      'В центре повествования — Среднеазиатское восстание 1916 года. Это история о том, как казахский народ сделал важный шаг к своей независимости.',
  },
];

export const sorts = [
  {
    value: 'oldest',
    label: 'Oldest',
  },
  {
    value: 'newest',
    label: 'Newest',
  },
  {
    value: 'available',
    label: 'Available',
  },
  {
    value: 'highestRated',
    label: 'Highest Rated',
  },
];

export const userRoles = [
  {
    value: 'user',
    label: 'User',
    bgColor: 'bg-[#FDF2FA]',
    textColor: 'text-[#C11574]',
  },
  {
    value: 'admin',
    label: 'Admin',
    bgColor: 'bg-[#ECFDF3]',
    textColor: 'text-[#027A48]',
  },
];

export const borrowStatuses = [
  {
    value: 'overdue',
    label: 'Overdue',
    bgColor: 'bg-[#FFF1F3]',
    textColor: 'text-[#C01048]',
  },
  {
    value: 'borrowed',
    label: 'Borrowed',
    bgColor: 'bg-[#F9F5FF]',
    textColor: 'text-[#6941C6]',
  },
  {
    value: 'returned',
    label: 'Returned',
    bgColor: 'bg-[#F0F9FF]',
    textColor: 'text-[#026AA2]',
  },
];
