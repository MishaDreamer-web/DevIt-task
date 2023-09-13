// 1\. Напишите функцию deepEqual для проверки двух обьектов на идентичность.
// Пример:
// ```
// deepEqual({name: 'test'}, {name: 'test'}) // output true
// deepEqual({name: 'test'}, {name: 'test1'}) // output false
// deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
// deepEqual({name: 'test'}, {name: 'test', age: 10}) // false
// ```
//Функція для порівняння об'єктів з одним рівнем вкладення
const deepEqual = (obj1, obj2) => {
  // Потрібно використати метод JSON.stringify(obj) для перетворення об'єктів в рядок
  // та порівняти два рядки на рівність методом строгої рівності
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

console.log('task-1');
console.log(deepEqual({ name: 'test' }, { name: 'test' })); // output true
console.log(deepEqual({ name: 'test' }, { name: 'test1' })); // output false
console.log(
  deepEqual(
    { name: 'test', data: { value: 1 } },
    { name: 'test', data: { value: 2 } },
  ),
); // output false
console.log(deepEqual({ name: 'test' }, { name: 'test', age: 10 })); // false

// 2\. Напишите функцию генератор chunkArray, которая возвращает итератор
// возвращающий части массива указанной длинны.

// Пример:

// ```
// const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
// iterator.next() // { value: [1,2,3], done: false }
// iterator.next() // { value: [4,5,6], done: false }
// iterator.next() // { value: [7,8], done: false }
// iterator.next() // { value: undefined, done: true }
// ```
// Функція генератор chunkArray що першим аргументом приймає масив а другим кількість
// елементів в масиві що вона поверне

function* chunkArray(arr, num) {
  // До поки переданий масив має довжину більше нуля виконуємо splice та повертаємо об'єкт з
  //value - результатом поверненим з методу splice та done з false - якщо генератор не завершив виконання
  // послідовних операцій та true якщо завершив

  while (arr.length > 0) yield arr.splice(0, num);
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

console.log('task-2');
console.log(iterator.next()); // { value: [1,2,3], done: false }
console.log(iterator.next()); // { value: [4,5,6], done: false }
console.log(iterator.next()); // { value: [7,8], done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 3\. Напишите функцию обертку, которая на вход принимает массив функций и их
// параметров, а возвращает массив результатов их выполнения. Количество аргументов
// исполняемой функции **не ограничено**!

// Пример:

// ```
// const f1 = (cb) => {cb(1)}
// const f2 = (a, cb) => {cb(a)}
// const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}

// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]]
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
//  // Output: [1, 2, [3, 4]]
// ```

// Функція bulkRun приймає в якості аргументу масив функцій та значень arrFunc

function bulkRun(arrFunc) {
  // З допомогою метода map отримуємо кожен елемент масиву з якого деструктуризуємо саму
  // функцію та її аргументи та повертаємо результат яким буде створення нового промісу
  // відразу з викликом функції resolve в якій повертаємо отриману функцію з масиву функцій з
  // розпиленим масивом аргументів та викликом функції result в якій викликаємо саму ж функцію
  // resolve передаючи аргументом цю ж функцію result. Отриманий масив результатів повертаємо
  // в виклику методу Promise.all

  return Promise.all(
    arrFunc.map(([func, args]) => {
      return new Promise(resolve => {
        func(...args, res => {
          resolve(res);
        });
      });
    }),
  );
}

const f1 = cb => {
  cb(1);
};
const f2 = (a, cb) => {
  cb(a);
};
const f3 = (a, b, cb) => {
  setTimeout(() => cb([a, b]), 1000);
};

setTimeout(() => console.log('task-3'), 1000);
// console.log('task-3');
//Повертаємо наш результат законсоливши його в методі then
bulkRun([
  [f1, []],
  [f2, [2]],
  [f3, [3, 4]],
]).then(console.log); // Output: [1, 2, [3, 4]]

// 4\. Напишите метод arrayToObject, который превращает массив в объект
// (использовать рекурсию). Пример:

// ```
// var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

// arrayToObject(arr)
// // Outputs: {
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// ```

console.log('task-4');

// Функція arrayToObject що приймає аргументом масив та перетворює його в об'єкт

function arrayToObject(arr) {
  // Порожній об'єкт в який запишем результат перебору масиву
  const obj = {};

  // Перебираємо масив отримуючи значення кожного підмасиву як пару ключ:value
  // та перевіряємо value кожної пари на те чи є масивом, та якщо value це ще один
  // масив то знов викликаємо нашу функцію arrayToObject, а якщо value не є масивом
  // тоді записуємо в наш об'єкт obj нову властивість obj[key] зі значенням value
  for (const [key, value] of arr) {
    if (Array.isArray(value)) {
      obj[key] = arrayToObject(value);
    } else {
      obj[key] = value;
    }
  }

  // Та повертаємо наш результат
  return obj;
}

var arr = [
  ['name', 'developer'],
  ['age', 5],
  [
    'skills',
    [
      ['html', 4],
      ['css', 5],
      ['js', 5],
    ],
  ],
];

console.log(arrayToObject(arr));

//
// 5\. Написать обратный метод (см. задачу 4) objectToArray, который из объекта
// создаст массив. Пример:

// ```
// objectToArray({
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// })

// // Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]
// ```

// Для зручності записуємо об'єкт в змінну obj

const obj = {
  name: 'developer',
  age: 5,
  skills: {
    html: 4,
    css: 5,
    js: 5,
  },
};

// Функція objectToArray що приймає аргументом об'єкт та перетворює його в масив

const objectToArray = obj => {
  // Порожній масив в який запишем результат перебору об'єкту
  const arr = [];

  // Перебираємо об'єкт, отримуючи кожну властивість та перевіряємо чи вона не є об'єктом,
  // якщо тип властивості не є об'єкт то записуємо в наш масив arr нову пару [ключ,значення ключа],
  // в іншому випадку тип властивості є об'єкт тому визиваємо знову нашу функцію для значення ключа та
  // також записуємо результат до масиву arr
  for (let key in obj) {
    !(typeof obj[key] === 'object')
      ? arr.push([key, obj[key]])
      : arr.push([key, objectToArray(obj[key])]);
  }

  // Повертаємо результат з функції
  return arr;
};

console.log('task-5');
console.log(objectToArray(obj));

//
// 6\. Есть функция `primitiveMultiply`, которая умножает числа, но случайным
// образом может выбрасывать исключения типа: `NotificationException`,
// `ErrorException`. Задача написать функцию обертку которая будет повторять
// вычисление при исключении `NotificationException`, но прекращать работу при
// исключениях `ErrorException`

// Пример:

// ```
// function NotificationException() {}
// function ErrorException() {}
// function primitiveMultiply(a, b) {
//   const rand = Math.random();
//   if (rand < 0.5) {
//     return a * b;
//   } else if(rand > 0.85) {
//     throw new ErrorException()
//   } else {
//     throw new NotificationException()
//   }
// }

// function reliableMultiply(a, b) {
//   // Ваш код
// }

// console.log(reliableMultiply(8, 8));
// ```
//
function NotificationException() {}
function ErrorException() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) return a * b;
  else if (Math.random() > 0.85) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

// Функція reliableMultiply приймаючи два аргументи перемножує їх між собою
// та повертає результат за винятком якщо отримуємо помилку ErrorException

function reliableMultiply(a, b) {
  // Намагаємося отримати результат з функції primitiveMultiply

  try {
    console.log(primitiveMultiply(a, b));
  } catch (error) {
    // Якщо отримуємо помилку то перевіряємо чи помилка являється екземпляром NotificationException

    if (error instanceof NotificationException) {
      // Та якщо являється екземпляром виконуємо функцію reliableMultiply знову

      return reliableMultiply(a, b);
    } else {
      // В інших випадках зупиняємо виконання та логуємо помилку

      console.log('error');
    }
  }
}

console.log('task-6');
reliableMultiply(8, 8);
//
// 7\. Напишите функцию, которая берет объект любой вложенности и преобразует ее в
// единую плоскую карту с разными уровнями, разделенными косой чертой ( `'/'`).

// Пример:

// ```
// const obj = {
//   a: {
//     b: {
//       c: 12,
//       d: 'Hello World'
//     },
//     e: [1,2,3]
//   }
// };

// mapObject(demoData);
// // Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }
// ```
//

// Функція перетворення об'єкта в об'єкт плоского рівня вкладеності що приймає об'єкт як аргумент

const mapObject = demoData => {
  // Порожній об'єкт в який запишем результат перетворення вхідного об'єкту demoData

  const res = {};

  // Функція трансформації вхідного об'єкта demoData що приймає аргументами об'єкт obj
  // та ключ objKey з початковим значення пустого рядку

  function transform(obj, objKey = '') {
    // Перебираємо пари ключа та значення отриманого результату методу Object.entries масиву obj
    // та записуємо новий ключ в змінну newKey

    for (const [key, value] of Object.entries(obj)) {
      let newKey = objKey ? `${objKey}/${key}` : key;

      // Потім робимо перевірку значення з перебору на те чи це є об'єкт та не є масив

      if (typeof value === 'object' && !Array.isArray(value)) {
        // Та викликаємо нашу функцію знову, передавши наше значення value та новий ключ як аргументи
        transform(value, newKey);
      } else {
        // В іншому випадку додаємо значення value в об'єкт res з ключем newKey

        res[newKey] = value;
      }
    }
  }
  // Виклик самої функції transform

  transform(demoData);
  //Повертаємо результат роботи функції масив res

  return res;
};

const obj7 = {
  a: {
    b: {
      c: 12,
      d: 'Hello World',
    },
    e: [1, 2, 3],
  },
};

console.log('task-7');
console.log(mapObject(obj7));

//

// 8\. Напишите функцию `combos`, которая принимает положительное целое число `num`
// и возвращает массив массивов положительных целых чисел, где сумма каждого
// массива равна `num`. Массивы не должны повторяться.

// Пример:

// ```
// combos(3);
// // Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]
// ```

// Функція combos що приймає аргументом число для створення масиву масивів
// чисел де сума чисел кожного масиву рівна вхідному аргументу функції combos

const combos = num => {
  // Порожній масив в який запишем результат перебору об'єкту

  let res = [];

  // Функція створення масиву масивів, що аргументами приймає число number що
  // буде шуканою сумою чисел масивів, поточного початковго результуючого масиву currentArr,
  // та початкового числа startNum
  function numSum(number, currentArr, startNum) {
    // Перевіряємо чи вхідне число number рівне нулю, та записуємо масив currentArr в наш вихідний масив res

    if (number === 0) {
      res.push([...currentArr]);
      return;
    } else if (number > 0) {
      // В іншому випадку перебираємо можливі числа які дадут шукану комбінацію чисел

      for (let i = startNum; i <= number; i++) {
        // Додаємо число і до поточного масиву currentArr

        currentArr.push(i);
        // Знову викликаємо внутрішню функцію numSum з переданими аргументами
        // та віднімаємо від вхідного числа number число і для знаходження наступних комбінацій

        numSum(number - i, currentArr, i);
        // Після завершення функції видаляємо з масиву currentArr останню комбінацію для виконання наступної ітерації

        currentArr.pop();
      }
    }
  }
  // Викликаємо внутрішню функцію numSumз переданими аргументами

  numSum(num, [], 1);
  // Повертаємо результат в масиві res

  return res;
};

console.log('task-8');
console.log(combos(3));
console.log(combos(10));

//

// 9\. Напишите функцию `add`, которая бы работала следующим образом
// `add(1)(2)(7)...(n)`. Количество последовательных визовов неограничено.

// Пример:

// ```
// Number(add(1)(2)); // == 3
// Number(add(1)(2)(5)); // == 8
// Number(add(1)(2)(-3)(4)); //  == 4
// Number(add(1)(2)(3)(4)(-5)); // == 5
// ```

// Функція додавання чисел що приймає вхідний аргумент число х

function add(x) {
  // Змінна для зберігання суми чисел з початковим

  let currentSum = x;

  function addNumber(y) {
    // Внутрішня функція що приймає аргумент у та ддодає до зовнішнього результату currentSum

    currentSum += y;
    // Повертаємо нашу внутріню функцію addNumber та при кожному наступному виклику
    // вона буде додавати аргумент у до currentSum та знов повертати себе ж
    return addNumber;
  }

  // Використовуючи метод toString повертаємо наше число currentSum
  addNumber.toString = function () {
    return currentSum;
  };
  return addNumber;
}

console.log('task-9');
console.log(Number(add(1)(2))); // 3
console.log(Number(add(1)(2)(5))); // 8
console.log(Number(add(1)(2)(-3)(4))); // 4
console.log(Number(add(1)(2)(3)(4)(-5))); // 5

//

// JavaScript Tasks Page

const TasksPage = () => {
  return (
    <main>
      <h1>JavaScript tasks!</h1>
      <h2>Please open the console in your developer tools!</h2>
    </main>
  );
};

export default TasksPage;
