import React from 'react';
import styles from './index.module.scss';
var ProgressCircle = function (_a) {
    var percentage = _a.percentage;
    return (<div className={styles.progressCircle} style={{ '--progress': "".concat(percentage, "%") }}>
      <div className={styles.progressCircleInner}>
        <div className={styles.progressCirclePercentage}>{percentage}%</div>
      </div>
    </div>);
};
export default ProgressCircle;
