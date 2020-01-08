// import 'core-js/';
import Noti from '../src/Notification'

describe('Noti test', () => {
    it('should be object ', function () {
        const n = new Noti();
        expect(typeof n).toEqual('object');
    });

    it('should add element to DOM', function () {
        const n = new Noti();
        n.showNotification();
        const notification = document.querySelector('.js-notification');
        // console.log(notification,notification.length);
        expect(typeof notification).toEqual('object');
    });

    it('should remove element from DOM', function () {
        const n = new Noti('top', 'right', 5, false, 500);
        n.showNotification();
        setTimeout(() => {
            const notification = document.querySelector('.js-notification');
            expect(typeof notification).toEqual('null');
        });
    });
});
