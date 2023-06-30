import { triggerEvent } from '../util';
import Message from 'packages/message';

describe('Message', () => {
  afterEach(() => {
    let ele = document.querySelector('.wl-message');
    if (!ele) return;
    if (ele && ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
    if (ele.__vue__) {
      ele.__vue__.$destroy();
    }
  });

  it('create', () => {
    Message('豹子');
    expect(document.querySelector('.wl-message')).to.exist;
  });

  it('automatically close', done => {
    Message({
      message: '老虎',
      duration: 500
    });
    const message = document.querySelector('.wl-message__content');
    expect(document.querySelector('.wl-message')).to.exist;
    expect(message.textContent).to.equal('老虎');
    setTimeout(() => {
      expect(document.querySelector('.wl-message')).to.not.exist;
      done();
    }, 1000);
  });

  it('normal close', done => {
    Message({
      message: '狮子',
      showClose: true
    });
    setTimeout(() => {
      document.querySelector('.wl-message__closeBtn').click();
      setTimeout(() => {
        expect(document.querySelector('wl-message')).to.not.exist;
        done();
      }, 500);
    }, 1000);
  });

  it('custom icon', done => {
    Message({
      message: '犀牛',
      iconClass: 'wl-icon-test'
    });
    setTimeout(() => {
      const icon = document.querySelector('.wl-message i');
      expect(icon.classList.contains('wl-icon-test')).to.true;
      done();
    }, 500);
  });

  it('html string', () => {
    Message({
      message: '<strong>猩猩</strong>',
      dangerouslyUseHTMLString: true
    });
    const ele = document.querySelector('.wl-message strong');
    expect(ele.textContent).to.equal('猩猩');
  });

  it('close all', done => {
    Message({
      message: '夏天',
      duration: 0
    });
    Message({
      message: '淑女',
      duration: 0
    });
    setTimeout(() => {
      Message.closeAll();
      setTimeout(() => {
        expect(document.querySelector('.wl-message')).to.not.exist;
        done();
      }, 500);
    }, 500);
  });

  it('invoke with type', () => {
    Message.success('狗狗');
    expect(document.querySelector('.wl-message').__vue__.type).to.equal('success');
  });

  it('center', () => {
    Message({
      message: '长颈鹿',
      center: true,
      duration: 0
    });
    expect(document.querySelector('.wl-message').classList.contains('is-center')).to.true;
  });

  it('reset timer', done => {
    Message({
      message: '斑马',
      duration: 1000
    });
    setTimeout(() => {
      triggerEvent(document.querySelector('.wl-message'), 'mouseenter');
      setTimeout(() => {
        expect(document.querySelector('.wl-message')).to.exist;
        done();
      }, 700);
    }, 500);
  });

});
