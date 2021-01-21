export function Reviewer(rootArr, userArr) {
  const hitCount = userArr // Количество входимых в число цифр 
  .map((item) => Number.parseInt(item)) // Переводим вводимую строку в массив Number
  .filter((number) => rootArr.includes(number)) // Валово получаем совпадающие цифры
  .filter((item, pos, self) => self.indexOf(item) == pos).length // Отсеивает повторения и получаем их кол-во
  
  const superHitCount = userArr // Количество четко попавших цифр
  .map((item) => Number.parseInt(item)) // Переводим вводимую строку в массив Number
  .filter(
    (item, pos, self) => rootArr.indexOf(item) == self.indexOf(item)
  ).length // Получаем совпадающие по позициям цифры // Получаем их кол-во

  if (superHitCount === rootArr.length) {
    return {
      hitCount: hitCount,
      superHitCount: superHitCount,
      state: true,
    };
  } else {
    return {
      hitCount: hitCount,
      superHitCount: superHitCount,
      state: false,
    };
    }
  }
