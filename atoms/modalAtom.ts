import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})

// state 하나에 두가지 다른 props
// key 값은 전역적으로 고유하도록, 기본값도 가짐
// 읽고 쓰기 위해서 useRecoilState 라는 훅을 사용
// useState와 비슷하지만 상태가 컴포넌트 간에 공유될 수 있다. 