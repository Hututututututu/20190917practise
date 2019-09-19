import User from './user';
import Router from './router/index';

class App {
    constructor() {
        this.getName();
        this.initEvent();
        new Router();
    }

    async getName(){
        let name = await new User().getName();
        console.log(name);
    }

    initEvent() {
        $("nav").on('click', 'li', function () {
          $(this).addClass("active").siblings().removeClass('active');
          let hash = $(this).attr("data-hash");
          location.hash = hash;
        })
      }
}

new App();