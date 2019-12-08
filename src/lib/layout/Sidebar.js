import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utility/generic'
import interact from 'interactjs'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number,
    groupHeights: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    onResizeSidebar: PropTypes.func,
    isRightSidebar: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.height === this.props.height &&
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights)
    )
  }

  setResizeRef = element => {
    const { isRightSidebar } = this.props
    if (element) {
      this.interact = interact(element)
        .resizable({
          edges: {
            left: isRightSidebar,
            right: !isRightSidebar,
            top: false,
            bottom: false
          }
        })
        .on('resizestart', e => {
          this.setState({
            resizing: true,
            resizeEdge: isRightSidebar ? 'left' : 'right',
            resizeStart: e.pageX,
            resizeTime: 0
          })
        })
        .on('resizemove', e => {
          if (this.state.resizing) {
            if (this.props.onResizeSidebar) {
              this.props.onResizeSidebar(isRightSidebar, e.pageX)
            }
          }
        })
        .on('resizeend', e => {
          if (this.state.resizing) {
            if (this.props.onResizeSidebar) {
              this.props.onResizeSidebar(isRightSidebar, e.pageX)
            }
            this.setState({
              resizing: null,
              resizeStart: null,
              resizeEdge: null,
              resizeTime: null
            })
          }
        })
    } else if (this.interact) {
      this.interact.unset()
    }
  }

  renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, {
        group,
        isRightSidebar
      })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render() {
    const {
      width,
      groupHeights,
      height,
      isRightSidebar,
      headerHeight = 60
    } = this.props
    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`,
      top: `${headerHeight}px`,
      [isRightSidebar ? 'right' : 'left']: 0,
      position: 'sticky',
      zIndex: 100
    }

    const groupsStyle = {
      width: `${width}px`
    }

    let groupLines = this.props.groups.map((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index]}px`,
        lineHeight: `${groupHeights[index]}px`
      }

      return (
        <div
          key={_get(group, groupIdKey)}
          className={
            'rct-sidebar-row rct-sidebar-row-' +
            (index % 2 === 0 ? 'even' : 'odd')
          }
          style={elementStyle}
        >
          {this.renderGroupContent(
            group,
            isRightSidebar,
            groupTitleKey,
            groupRightTitleKey
          )}
        </div>
      )
    })

    return (
      <div
        className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')}
        style={sidebarStyle}
      >
        <div style={groupsStyle}>{groupLines}</div>
        <div
          ref={this.setResizeRef}
          className={'rct-sidebar-resize'}
          style={isRightSidebar ? { left: 0 } : { right: 0 }}
        />
      </div>
    )
  }
}
