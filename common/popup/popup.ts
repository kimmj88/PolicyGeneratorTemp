import { Component } from 'vue';
import { Dialog } from 'quasar';
import { AlertView, PopupView } from 'components/common';
import { ALERT_TYPE } from 'common/enum';

interface PopupViewProps {
  title?: string;
  width?: number;
  height?: number;
  component?: string | Component;
  componentProps?: any;
  onOk?: (payload?: any) => void;
  onDismiss?: () => void;
}

interface AlertViewProps {
  title?: string;
  width?: number;
  height?: number;
  content?: string;
  type?: ALERT_TYPE;
  onOk?: (payload?: any) => void;
  onCancel?: () => void;
  onDismiss?: () => void;
}

export function openPopup(option: PopupViewProps) {
  return Dialog.create({
    component: PopupView,
    componentProps: {
      title: option.title,
      height: `${option.height}px`,
      width: `${option.width}px`,
      bodyComponent: option.component,
      bodyComponentProps: option.componentProps,
    },
  })
    .onOk(option.onOk ? option.onOk : () => void 0)
    .onDismiss(option.onDismiss ? option.onDismiss : () => void 0);
}

export function openAlert(option: AlertViewProps) {
  return Dialog.create({
    component: PopupView,
    componentProps: {
      title: option.title || 'Alert',
      height: `${option.height}px`,
      width: `${option.width}px`,
      bodyComponent: AlertView,
      bodyComponentProps: {
        content: option.content,
        type: option.type || ALERT_TYPE.OK,
      },
    },
  })
    .onOk(option.onOk ? option.onOk : () => void 0)
    .onCancel(option.onCancel ? option.onCancel : () => void 0)
    .onDismiss(option.onDismiss ? option.onDismiss : () => void 0);
}
