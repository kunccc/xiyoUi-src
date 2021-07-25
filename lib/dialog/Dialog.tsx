import React, {useState, useEffect, ReactNode, ReactFragment} from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';
import './dialog.scss';

interface Props {
  visible: boolean;
  title?: string;
  type: 'confirm' | 'alert' | 'modal';
  closeOnMask?: boolean;
  onClose: Function;
  onCancel?: Function;
  onConfirm?: Function;
}

const Dialog: React.FC<Props> = ({onClose, visible, closeOnMask, title, type, children, onCancel, onConfirm}) => {
  return (ReactDOM.createPortal(
    <>
      <div className={`xiyo-dialog-mask ${visible ? 'visible' : ''}`}
           onClick={() => closeOnMask && onClose()}/>
      <div className={`xiyo-dialog ${visible ? 'visible' : ''}`}>
        <span className="xiyo-dialog-close" onClick={() => onClose()}/>
        <header>{title}</header>
        <main>{children}</main>
        <footer>
          {type === 'confirm' && <Button onClick={() => onCancel && onCancel() || onClose()}>取消</Button>}
          {(type === 'confirm' || type === 'alert') &&
          <Button onClick={() => onConfirm && onConfirm() || onClose()} level="main">确定</Button>}
        </footer>
      </div>
    </>
    , document.body));
};

interface alertProps {
  unmount: Function
}

const AlertDialog: React.FC<alertProps> = ({children, unmount}) => {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
    setTimeout(() => unmount(), 300);
  };
  useEffect(() => setVisible(true), []);
  return (
    <>
      <div className={`xiyo-dialog-mask ${visible ? 'visible' : ''}`}/>
      <div className={`xiyo-dialog ${visible ? 'visible' : ''}`}>
        <span className="xiyo-dialog-close" onClick={close}/>
        <header>提示</header>
        <main>{children}</main>
        <footer>
          <Button onClick={close} level="main">确定</Button>
        </footer>
      </div>
    </>
  );
};

const alert = (content: string) => {
  const unmount = () => ReactDOM.unmountComponentAtNode(container) && container.remove();
  const component = <AlertDialog unmount={unmount}>{content}</AlertDialog>;
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(component, container);
};

interface confirmProps {
  unmount: Function;
  success: Function;
  fail: Function;
}

const ConfirmDialog: React.FC<confirmProps> = ({children, unmount, success, fail}) => {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
    setTimeout(() => unmount(), 300);
  };
  useEffect(() => setVisible(true), []);
  return (
    <>
      <div className={`xiyo-dialog-mask ${visible ? 'visible' : ''}`}/>
      <div className={`xiyo-dialog ${visible ? 'visible' : ''}`}>
        <span className="xiyo-dialog-close" onClick={close}/>
        <header>提示</header>
        <main>{children}</main>
        <footer>
          <Button onClick={() => fail() || close()}>取消</Button>
          <Button onClick={() => success() || close()} level="main">确定</Button>
        </footer>
      </div>
    </>
  );
};

const confirm = (content: string, success: Function, fail: Function) => {
  const unmount = () => ReactDOM.unmountComponentAtNode(container) && container.remove();
  const component = <ConfirmDialog unmount={unmount} success={success} fail={fail}>{content}</ConfirmDialog>;
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(component, container);
};

interface modalProps {
  unmount: Function;
}

const ModalDialog: React.FC<modalProps> = ({children, unmount}) => {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
    setTimeout(() => unmount(), 300);
  };
  useEffect(() => setVisible(true), []);
  return (
    <>
      <div className={`xiyo-dialog-mask ${visible ? 'visible' : ''}`}/>
      <div className={`xiyo-dialog ${visible ? 'visible' : ''}`}>
        <span className="xiyo-dialog-close" onClick={close}/>
        <header>提示</header>
        <main>{children}</main>
      </div>
    </>
  );
};

const modal = (content: ReactNode | ReactFragment) => {
  const unmount = () => ReactDOM.unmountComponentAtNode(container) && container.remove();
  const component = <ModalDialog unmount={unmount}>{content}</ModalDialog>;
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(component, container);
};

export {alert, confirm, modal};

export default Dialog;