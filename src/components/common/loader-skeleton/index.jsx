import React from 'react';
import styles from './loader.module.scss';
var LoaderSkeleton = function (_a) {
    var width = _a.width, _b = _a.height, height = _b === void 0 ? '100px' : _b;
    return (<div className={styles.loader} style={{ '--loader-width': width, '--loader-height': height }}></div>);
};
export default LoaderSkeleton;
