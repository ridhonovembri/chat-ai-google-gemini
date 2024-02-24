**Imasjid 1.0.0 - Prayer Time Application**
-
* Prayer Time - algorithm follows  [http://praytimes.org](http://praytimes.org/)
* Support location by coordinate (latitude and longitude)
* Support time adjustment
* Autoplay slide
* Hadist of the day
* Countdown to Adzan
* Countdown to Iqomah
* Marquee text

***TechStack***
-
* Database SQLite  [https://www.sqlite.org/index.html](https://www.sqlite.org/index.html)
* Backend :
    -   NodeJs  [https://nodejs.org/en/download](https://nodejs.org/en/download)
    -   ExpressJS  [https://expressjs.com/](https://expressjs.com/)
    -   Sequelize ORM  [https://sequelize.org/](https://sequelize.org/)
* Frontend
    -   VueJs 3  [https://vuejs.org/](https://vuejs.org/)
    -   Quasar Component  [https://quasar.dev/](https://quasar.dev/)

Disclaimer
-
Aplikasi ini 100% GRATIS untuk digunakan, disalin, dimodifikasi, didistribusikan. Dilarang memperjualbelikan aplikasi ini dengan alasan apapun.

:author={RNOVEMBRI}

![image](https://github.com/ridhonovembri/imasjid/assets/6411417/3adceab6-b4d3-45f6-a804-3d05682a81f6)

![image](https://github.com/ridhonovembri/imasjid/assets/6411417/bb53d77e-e56b-4ab2-b6a0-da199e8d1e7b)

***Installation***
-
* Install NodeJs - [https://nodejs.org/en/download](https://nodejs.org/en/download)
* Download Live folder
* Extract zip file
* Go to root folder and execute command 'npm install'
* Run application by execute 'node index.js' and web server will run 'App listening on port 3000'
* Open browser and open link http://localhost:3000 - for dashboard http://localthost:3000/dashboard
* Install applications as windows services using NSSM as below statement (execute on root folder) :
    - nssm install imasjid-service "C:\Program Files\nodejs\node.exe"
    - nssm set imasjid-service AppDirectory "D:\imasjid"
    - nssm set imasjid-service AppParameters index.js
    - nssm start imasjid-service