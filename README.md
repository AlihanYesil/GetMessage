# GetMessage



uygulamayı kullana bilmeniz için verileri tutacağımız bir DB niz olması gerekir.

indirdikten sonra GetMessage-main dosyasını masaüstüne sürükle bırak yapıyoruz ve kullandığınız IDE ile açın.



GetMessage/data  klasörüne giriyoruz.

data uygulamanın apisidir bu api php nin framework olan laravel ile yazılmıştır.

kurulum için şu adımları izleyiniz:

env dosyasını düzenleyin.

terminal ekranına gelip şunları yazıyoruz.

composer install / composer i 

php artisan key:generate 

php artisan migrate yazarak ilgili db yi bizim için oluşturuyoruz.

php artisan serve --port 80 yazıp laravel projemizi başlatıyoruz.(80 portunda kullanın api olarak 80 portu tercih edildi)

yeni terminal açıyoruz.


GetMessage/getmessage  klasörüne giriyoruz.

getmessage uygulamanın döndüğü yerdir(Client) . javascript in Vue.js  framework ile yazılmıştır.

terminal ekranına gelip şunları yazıyoruz:

npm install / npm i

npm run serve yazarak çalıştıyoruz.

vue js hazırdır.yeni terminal açıyoruz.


GetMessage/server  klasörüne giriyoruz.

server uygulamanın anlık haberleşme sağlaması için gerekli bir uygulamadır  . Node.js in WebSocket framework ile yazılmıştır.

websockets, tcp uzerinden çift yönlü iletisim kurulmasını sağlayan bir teknolojidir.

terminal ekranına gelip şunları yazıyoruz:

npm install / npm i

npm start yazarak nodemon ile başlatabiliriz. yada node server yazıp normal başlatma yapabilir.

Nodemon nedir: Nodemon, NodeJS tabanlı uygulama geliştirirken dosyalarınızdaki değişiklikleri algılayıp otomatik olarak sunucuyu sizin için baştan başlatan bir araçtır.

ve artık uygulama hazır kullanabilirsiniz iyi eğlenceler.





 
