import {ADD, ADD_NUMBER, SUB} from '../actions/actionTypes';

import imgProcuct1 from '../../img/shoes-1.png';
import imgProcuct2 from '../../img/shoes-2.png';
import imgProcuct3 from '../../img/shoes-3.png';
import imgProcuct4 from '../../img/shoes-4.png';
import imgProcuct5 from '../../img/shoes-5.png';
import imgProcuct6 from '../../img/shoes-6.png';

import imgProcuct1_1 from '../../img/shoes-1.png';
import imgProcuct1_2 from '../../img/shoes-1-2.png';
import imgProcuct1_3 from '../../img/shoes-1-3.png';

const initialState = {
  counter: 0,
  name: 'Valeriy',
  products: [
    [
        imgProcuct1,
        'Product 1',
        50,
        [
          imgProcuct1_1,
          imgProcuct1_2,
          imgProcuct1_3
        ]
    ],
    [
        imgProcuct2,
        'Product 2',
        60
    ],
    [
        imgProcuct3,
        'Product 3',

        40
    ],
    [
        imgProcuct4,
        'Product 4',
        20
    ],
    [
        imgProcuct5,
        'Product 5',
        45
    ],
    [
        imgProcuct6,
        'Product 6',
        40
    ]
]
}

export default function counter1(state = initialState, action) {
  switch(action.type) {
    case ADD:
      return {
        counter: state.counter + 30
      }
    case SUB:
      return {
        counter: state.counter - 1
      }
    case ADD_NUMBER:
      return {
        counter: state.counter + action.payload
      }
    default:
      return state
  }
}