import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(res => {
            const animatedHurtClass = 'heart__button--float';
            const isHearted = this.heart.classList.toggle('heart__button--hearted');
            $('.heart-count').textContent = res.data.hearts.length;
            if (isHearted) {
                this.heart.classList.add(animatedHurtClass);
                setTimeout(() => this.heart.classList.remove(animatedHurtClass), 2500);
            }
        })
}

export default ajaxHeart;