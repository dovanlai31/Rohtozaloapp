/**
 * @author: van.lai
 * @date: 2018-12-08 10:18:17
 *
 *
 */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme';
import {AppNavigation} from '../../app-navigation';
import {TextCmp} from '../../common-components';
import {normalize} from '../../theme/FontSize';

export default class OverlayComponent extends React.Component {
  _renderContent() {
    const {
      title,
      desc,
      submitText,
      cancelText,
      renderContent,
      componentId,
    } = this.props;
    if (renderContent) {
      return renderContent(componentId);
    }
    return (
      <View>
        <View style={styles.contentContainer}>
          <TextCmp style={styles.title}>{title}</TextCmp>
          <TextCmp style={styles.desc}>{desc}</TextCmp>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[styles.btn, styles.activeButton]}
              onPress={this._onSubmit}>
              <TextCmp style={styles.btnSubmitText}>
                {submitText || 'Ok'}
              </TextCmp>
            </TouchableOpacity>
            {!!cancelText && (
              <TouchableOpacity style={[styles.btn]} onPress={this._onCancel}>
                <TextCmp style={styles.btnCancelText}>{cancelText}</TextCmp>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this._renderContent()}</View>;
  }

  _close = () => {
    const {tapToDismiss} = this.props;
    if (tapToDismiss) {
      AppNavigation.dismissOverlay(this.props.componentId);
    }
  };

  _onSubmit = () => {
    AppNavigation.dismissOverlay(this.props.componentId);
    const {onSubmit} = this.props;
    if (onSubmit) {
      onSubmit();
    }
  };

  _onCancel = () => {
    AppNavigation.dismissOverlay(this.props.componentId);
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorOpacity(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    width: '80%',
    paddingTop: 10,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: normalize('Large'),
    fontWeight: 'bold',
    marginTop: 5,
  },
  desc: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.colorOpacity(1),
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: Colors.upColor,
  },
  btnSubmitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: normalize('Large'), color: Colors.statusbarcolor,
  },
  btnCancelText: {
    fontWeight: 'bold',
    fontSize: normalize('Large'),
    color: Colors.statusbarcolor,
  },
});
