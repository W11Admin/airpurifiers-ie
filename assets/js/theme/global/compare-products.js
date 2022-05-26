import { showAlertModal } from './modal';

function decrementCounter(counter, item) {
    const index = counter.indexOf(item);

    if (index > -1) {
        counter.splice(index, 1);
    }
}

function incrementCounter(counter, item) {
    counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
    if (counter.length > 1) {
        if (!$link.is('visible')) {
            $link.addClass('show');
        }
        $link.find('a').attr('href', `${urls.compare}/${counter.join('/')}`);
        $link.find('span.compareCount').html(counter.length);
    } else {
        $link.removeClass('show');
    }
}

export default function ({ noCompareMessage, urls }) {
    let compareCounter = [];

    const $compareLink = $('[data-compare-nav]');

    $('body').on('compareReset', () => {
        const $checked = $('body').find('input[name="products\[\]"]:checked');

        compareCounter = $checked.length ? $checked.map((index, element) => element.value).get() : [];
        updateCounterNav(compareCounter, $compareLink, urls);
    });

    $('body').triggerHandler('compareReset');

    $('body').on('click', '[data-compare-id]', event => {
        const product = event.currentTarget.value;
        const $clickedCompareLink = $('[data-compare-nav]');

        if (event.currentTarget.checked) {
            incrementCounter(compareCounter, product);
        } else {
            decrementCounter(compareCounter, product);
        }

        updateCounterNav(compareCounter, $clickedCompareLink, urls);
    });

    $('body').on('click', '[data-compare-nav]', () => {
        const $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

        if ($clickedCheckedInput.length <= 1) {
            showAlertModal(noCompareMessage);
            return false;
        }
    });
}
