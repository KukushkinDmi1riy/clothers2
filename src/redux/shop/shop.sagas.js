import { takeEvery, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils' 

export function* fetchCollectionsAsync() {
    
    try {
        const collectionRef = yield firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTION_START, 
        fetchCollectionsAsync 
    );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}