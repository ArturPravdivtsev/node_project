const EventEmitter = require('events');
const moment = require('moment');

const emitter = new EventEmitter();

const getTime = ({ now, event }) => {
    let leftTime = event - now;

    if (leftTime < 0) {
        emitter.removeAllListeners();
        return console.log('Таймер закончил отсчет!');
    }

    let duration = moment.duration(leftTime, 'seconds');

    console.log('Осталось секунд', duration.seconds(), 'минут', duration.minutes(), 'часов', duration.hours(), 'дней', duration.days(), 'месяцев', duration.months(), 'лет', duration.years());
}

const runTimer = async (eventDate) => {
    emitter.emit('timer', { now: moment().unix(), event: moment(eventDate, "m-h-DD-MM-YYYY").unix() });

    await new Promise(resolve => setTimeout(resolve, 1000));
    await runTimer(eventDate);
}

emitter.on('timer', getTime);

const eventDate = process.argv[2];

if (moment(eventDate, "m-h-DD-MM-YYYY").unix() - moment().unix() > 0) {
    runTimer(eventDate);
} else {
    console.log('Дата меньше текущей!');
}