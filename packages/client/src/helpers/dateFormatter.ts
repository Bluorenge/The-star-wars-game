function dateFormater(unformatedDate: string | null | undefined) {
  if (!unformatedDate) {
    return null;
  }
  const calcDate = new Date(unformatedDate);

  if (isNaN(+calcDate)) {
    return unformatedDate;
  }

  const day = calcDate.getDate();
  const diff = new Date().getDate() - day;
  console.log('diff: ', diff);

  const isYesterday = diff === 1;
  const isToday = diff >= 0 && diff < 1;

  const hour = calcDate.getHours();
  const calcHour = hour >= 10 ? hour : `0${hour}`;
  const minutes = calcDate.getMinutes();
  const calcMinutes = minutes >= 10 ? minutes : `0${minutes}`;

  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const calcMouth = months[calcDate.getMonth()];

  let calcDay;

  if (isToday) {
    calcDay = 'Сегодня';
  } else if (isYesterday) {
    calcDay = 'Вчера';
  } else {
    calcDay = day + calcMouth;
  }

  return `${calcDay} ${calcHour}:${calcMinutes}`;
}

export default dateFormater;
