import React, { ReactNode, useRef, useState } from 'react';
import { Modal } from 'antd';
import type {ModalProps} from 'antd'

import Draggable from 'react-draggable';

interface IDraggableModal extends ModalProps {
    open: boolean
    setOpen: Function
    children?:  ReactNode | undefined,
    props: ModalProps
  }

export const DraggableModal: React.FC<IDraggableModal> = (
    {
        open,
        setOpen,
        children,
        props
    }
) => {
    const {title, footer} = props
    const draggleRef = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const handleCancel = () => {
        setOpen(false);
    };



    const onStart = (_event: any, uiData: any) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    return (
        <Modal
            open={open}
            title={
                <div
                    style={{
                        width: '100%',
                        cursor: 'move',
                    }}
                    // onMouseOver={() => {
                    //   if (disabled) {
                    //     setDisabled(false);
                    //   }
                    // }}
                    // onMouseOut={() => {
                    //   setDisabled(true);
                    // }}
                    // fix eslintjsx-a11y/mouse-events-have-key-events
                    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                    onFocus={() => { }}
                    onBlur={() => { }}
                // end
                >
                    {title}
                </div>
            }
            modalRender={(modal) => (
                <Draggable
                    // disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            // onOk={()=>handleCreate(values)}
            onCancel={handleCancel}
            footer={footer}
            {...props}
        >
            {children}
        </Modal>
    )
};