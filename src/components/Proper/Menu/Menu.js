import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Proper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, hideOnClick = false, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    function renderItems() {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                ></MenuItem>
            );
        });
    }
    const hanldeBack = () => {
        setHistory((pre) => pre.slice(0, pre.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={hanldeBack}></Header>}
                <div className={cx('menu-body')}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleReset = () => {
        setHistory((pre) => pre.slice(0, 1));
    };
    return (
        <Tippy
            delay={[0, 700]}
            interactive
            hideOnClick={hideOnClick}
            placement="bottom-end"
            offset={[12, 8]}
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}
MenuItem.proTypes = {
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.bool,
    items: PropTypes.array,
    onChange: PropTypes.func,
};
export default Menu;
