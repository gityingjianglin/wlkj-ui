import Vue from 'vue';
import { triggerEvent } from '../util';
import Notification from 'packages/notification';

describe('Notification', () => {
  afterEach(() => {
    let ele = document.querySelector('.wl-notification');
    if (!ele) return;
    if (ele && ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
    if (ele.__vue__) {
      ele.__vue__.$destroy();
    }
  });

  it('create', () => {
    Notification({
      title: '海洋馆',
      message: '鲸鱼',
      duration: 0
    });
    const group = document.querySelector('.wl-notification__group');
    const title = group.querySelector('.wl-notification__title');
    const content = group.querySelector('.wl-notification__content p');
    expect(document.querySelector('.wl-notification')).to.exist;
    expect(title.textContent).to.equal('海洋馆');
    expect(content.textContent).to.equal('鲸鱼');
  });

  it('auto close', (done) => {
    Notification({
      message: '测试消息',
      duration: 500
    });
    expect(document.querySelector('.wl-notification')).to.exist;
    setTimeout(() => {
      expect(document.querySelector('.wl-notification')).to.not.exist;
      done();
    }, 1000);
  });

  it('normal close', (done) => {
    Notification({
      message: '测试消息'
    });
    setTimeout(() => {
      document.querySelector('.wl-notification__closeBtn').click();
      setTimeout(() => {
        expect(document.querySelector('.wl-notification')).to.not.exist;
        done();
      }, 500);
    }, 500);
  });

  it('html string as message', () => {
    Notification({
      message: '<strong>老虎</strong>',
      dangerouslyUseHtmlString: true,
      duration: 0
    });
    const message = document.querySelector('.wl-notification__content strong');
    expect(message.textContent).to.equal('老虎');
  });

  it('create by vnode', () => {
    let vm = new Vue();
    let h = vm.$createElement;
    Notification({
      message: h('p', { style: { color: 'red' }}, '狮子')
    });
    const message = document.querySelector('.wl-notification__content');
    expect(message.innerHTML).to.equal('<p style="color: red;">狮子</p>');
  });

  it('alias by vnode', () => {
    let vm = new Vue();
    let h = vm.$createElement;
    Notification.error({
      message: h('p', { style: { color: 'red' }}, '狮子')
    });
    const message = document.querySelector('.wl-notification__content');
    expect(message.innerHTML).to.equal('<p style="color: red;">狮子</p>');
  });

  it('invoke with type', () => {
    Notification.success({
      message: '斑马'
    });
    expect(document.querySelector('.wl-notification').__vue__.type).to.equal('success');
  });

  it('reset timer', (done) => {
    Notification({
      message: '鳄鱼',
      duration: 1000
    });
    setTimeout(() => {
      triggerEvent(document.querySelector('.wl-notification'), 'mouseenter');
      setTimeout(() => {
        triggerEvent(document.querySelector('.wl-notification'), 'mouseleave');
        expect(document.querySelector('.wl-notification')).to.exist;
        done();
      }, 800);
    }, 500);
  });

  it('no close button', done => {
    Notification({
      message: '狐狸',
      showClose: false
    });
    setTimeout(() => {
      expect(document.querySelector('.wl-notification__closeBtn')).to.not.exist;
      done();
    }, 500);
  });
});
