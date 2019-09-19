import positionController from '../controller/positionController';
import searchController from '../controller/searchController';
import profileController from '../controller/profileController';

export default class Routr{
    constructor(){
        this.initEvent();
        new positionController().render();
    }

    initEvent(){
        window.addEventListener("hashchange",()=>{
            console.log(location.hash);
            let hash = location.hash.replace('#','');
            switch(hash){
                case "position":
                    new positionController().render();
                    break;
                case "search":
                    new searchController().render();
                    break;
                case "profile":
                    new profileController().render();
                    break;
            }
        })
    }
}