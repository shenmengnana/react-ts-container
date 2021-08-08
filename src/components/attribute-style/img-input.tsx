import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, Input, Upload, message} from 'antd';
import {UploadChangeParam, RcFile} from 'antd/lib/upload';
import {FormInstance} from 'rc-field-form';
interface CallbackType {
  (result: any): void;
}
interface ImgInputProps {
  label?: string;
  name?: string;
  form: FormInstance;
  maxSize?: number;
  upload: CallbackType;
  src: string;
}
function getBase64(originFileObj: RcFile, callback: CallbackType) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(originFileObj);
}

const ImgInput = ({label, name = 'value', form, maxSize = 600, upload, src}: ImgInputProps) => {
  const [imgUrl, setimgUrl] = useState('');
  const imgChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      info.file.originFileObj &&
        getBase64(info.file.originFileObj, imageUrl => {
          setimgUrl(imageUrl);
          form.setFieldsValue({[name]: imageUrl});
          upload({[name]: imageUrl});
        });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const beforeUpload = (file: File) => {
    const isLimit = file.size / 1024 < maxSize;
    if (!isLimit) {
      message.error(`图片大小不能超过${maxSize}k`);
    }
    return isLimit;
  };
  const textareaChange = (e: any) => {
    if (!e.target.value) {
      setimgUrl('');
      upload({[name]: ''});
    }
  };
  useEffect(() => {
    setimgUrl(src);
  }, [src]);
  return (
    <Space align="start">
      <Form.Item label={label || '图片地址'} name={name}>
        <Input.TextArea style={{height: '104px'}} onChange={textareaChange} />
      </Form.Item>
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={imgChange}
      >
        {imgUrl ? <img src={imgUrl} alt="" /> : '上传'}
      </Upload>
    </Space>
  );
};

export default ImgInput;
