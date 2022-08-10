import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlesTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import classNames from 'classnames/bind';

import { Wrapper as ProperWrapper } from '~/components/Proper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
                .then((res) => res.json())
                .then((res) => {
                    setSearchResults(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(true);
                });
        }, 3000);
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlesTippy
            interactive={true}
            visible={showResult && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <ProperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResults.map((result) => {
                            return <AccountItem key={result.id} data={result} />;
                        })}
                    </ProperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => {
                        setShowResult(true);
                    }}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlesTippy>
    );
}

export default Search;
