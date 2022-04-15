
import { Link } from 'react-router-dom'

import { APP_HOME } from '../../router'
import './test.module.less'
import { useState } from 'react'

import { Message, Button, Modal } from '@arco-design/web-react';

const Test = (props:any):JSX.Element => {
  console.log(props)
  const [visible, setVisible] = useState(false);
  return (
    <div styleName='test'>
      <Link
        to={APP_HOME}
      >
        <span>Test</span>
      </Link>

      <div className='test1'>  <Button
        onClick={() => {
          Message.info('This is an info message!');
        }}
        type='primary'
      >
        Open Message
      </Button></div>
      <Button onClick={() => setVisible(true)} type='primary'>
        Open Modal
      </Button>
      <Modal
        title='Modal Title'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </Modal>
    </div>
  )
}

export default Test
