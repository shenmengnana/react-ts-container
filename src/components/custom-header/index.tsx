import React, {FC, useState} from 'react';
import './index.less';
const CusHeader: FC = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="cus-header flex">
      <div className="header-left">logo </div>
      <div className="header-main flex-center-center flex1">
        <div className="">撤销</div>
        <div className="">恢复</div>
      </div>
      <div className="header-right">用户</div>
    </div>
  );
};

export default CusHeader;
