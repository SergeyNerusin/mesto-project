## Проект: Место
### Статус: Учебный проект Яндекс практикум.
  - проект находится в стадии разработки, добавлен фукционал на основе языка программирования JS (JavaScript). Функциональность: - добавление фотоматериала с возможностью отметки понравившихся мест, реализовано(изменение аватар, имени профиля и профессии) управление профилем пользователя с помощью модалного окна,
  - данные о пользователе, карточках загружаются с сервера 

#### Используемые технологии:
- язык разметки HTML5,
- таблица каскадных стилей CSS3:
   - технологии создания адаптивной верстки:
      - flex
      - grid layout
      - media responsive - адаптивная вёрстка под экраны разной ширины
        в т.ч. мобильных устройств.
- файловая структура стилей скомпанована по БЭМ методологии Nested
- Добавлена логика работы сайта с использованием JS.
- Сборка сайта реализована с использованием пакета Webpack. 


### Краткое описание структуры проекта:
**Деректории:**
 
**blocks** - включает css компоненты используемые для стилизации проекта,
**components** - размещены файлы - модули js:
-*api.js* - модуль взаимодействия с сервером для получения данных,
-*cards.js* - модуль работы с карточками(фотоматериалом),
-*modal.s* - модуль работы с модальными окнами,
-*validate.js* - модуль для провеки корректности вводимых данных - соответствующих типам данных полей ввода.     
**fonts** - включает в себя поддиректорию - Inter - шрифты,  и файл font.css для подключения шрифтов.
**images** - изображения(логотип, фавикон, svg - файлы для оформления интерфейса).
**pages** - размещены файлы:
-*index.css* - сборочный файл стилей используемых в проекте,
-*index.js* - главный модуль взаимодействия и отработки функционала.
**utils** - размещены файлы:
-*constants.js* - модуль в котором собраны необходимые селекторы  для управления интерактивом сайта с помощью js,
-*utils.js*  - модуль в котором расположен сервисный код используемый несколькими модулями js. 
**vendor** - содержит стороннний файл normalize.css для корректировки однообразнасти отображения проекта в разных браузерах.

__Функциональные возможности:__
Содержит фотоматериалы для ознакомления.

[Ссылка на проект](https://sergeynerusin.github.io/mesto-project/ "Проект Место")
