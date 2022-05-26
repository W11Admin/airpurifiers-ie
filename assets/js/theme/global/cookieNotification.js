import utils from '@bigcommerce/stencil-utils';

/**
 * European websites must notify users of cookies to comply with European Union law.
 * This will alert shoppers that this website uses cookies.
 */
export default function () {
    /*
    // Here you can override the default browser alert box by hooking to the 'cookie-privacy-notification' hook.
    utils.hooks.on('cookie-privacy-notification', (event, privacyMessage) => {
        // You can make your own custom modal or alert box appear in your theme using the privacyMessage provided
        myCustomAlert(privacyMessage);

        // Call event.preventDefault() to prevent the default browser alert from occurring in stencil-utils
        event.preventDefault();
    });
    */

    const $privacyDialog = $('.cookieMessage');

    if (document.cookie.indexOf('ACCEPT_COOKIE_USAGE') === -1) {
        $privacyDialog.show();
    }

    $('body').on('click', '[data-privacy-accept]', () => {
        const date = new Date();
        date.setDate(date.getDate() + 365);
        document.cookie = `ACCEPT_COOKIE_USAGE=1;expires=${date.toGMTString()}; path=/`;

        utils.hooks.emit('cookie-privacy-accepted');
        $privacyDialog.hide();
    });

    const $messageBox = document.getElementById('message-box');

    function getMessageCookie(cname) {
        const name = `${cname}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return '';
    }

    function createMessageCookie() {
        document.cookie = 'display_message_box=no; expires=10;';
        $messageBox.classList.remove('active');
    }

    const isCookieSet = getMessageCookie('display_message_box');

    if (isCookieSet === '' && $messageBox !== null) {
        document.getElementById('message-button').addEventListener('click', createMessageCookie);
        $messageBox.classList.add('active');
    }
}
