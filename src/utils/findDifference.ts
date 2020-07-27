// Core
import _ from 'lodash';
console.log('"|_(ʘ_ʘ)_/" =>: _', _);

// type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
//     Pick<T, Exclude<keyof T, Keys>>
//     & {
//         [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
//     }[Keys]

// export function findDifferrence(entities: [ Object extends PatialEntity]): [string[], string[]] {

//     const currentEntityIds = entities.map(({ id }) => id);
//     const intersection = _.intersection(sceneIds, currentEntityIds);
//     const addSceneIds = _.difference(sceneIds, intersection);
//     const removeSceneIds = _.difference(currentEntityIds, intersection);
//     return []
// }
