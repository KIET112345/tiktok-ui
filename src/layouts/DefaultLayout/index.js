import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from './Header';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);
function DefaultLayOut({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
DefaultLayOut.prototype = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayOut;
