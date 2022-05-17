import classNames from 'classnames/bind';
import styles from './Tags.module.scss';
const cn = classNames.bind(styles);

import Link from 'next/link';
import { useState } from 'react';

import { Dropdown } from '@design-system';

import { sorted } from '@modules/utility/object';

export interface TagProps {
    name: string;
    count: number;
}

export interface TagsProps {
    allCount: number;
    active: string;
    author: string;
    tags: TagProps[];
}

export function Tags(props: TagsProps) {
    const [tags, setTags] = useState(props.tags);

    return (
        <div
            className={classNames(
                'col-lg-3',
                cn('tags')
            )}>
            <ul className="mt-4">
                <div
                    className={classNames(
                        'd-flex justify-content-between',
                        cn('category')
                    )}>
                    <div className="h6 font-weight-bold">
                        카테고리
                    </div>
                    <Dropdown
                        button={
                            <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        }
                        menus={[
                            {
                                name: '이름순',
                                onClick: () => setTags(sorted(tags, { key: 'name' }))
                            },
                            {
                                name: '작성 갯수순',
                                onClick: () => setTags(sorted(tags, {
                                    key: 'count',
                                    reverse: true
                                }))
                            }
                        ]}
                    />
                </div>
                <Link
                    href="/[author]/posts"
                    as={`/@${props.author}/posts`}
                    scroll={false}>
                    <li>
                        <a
                            className={classNames(
                                'ns',
                                'shallow-dark',
                                cn({ active: props.active === 'all' })
                            )}>
                            전체 포스트 ({props.allCount})
                        </a>
                    </li>
                </Link>
                {tags.map((item, idx) => (
                    <Link
                        key={idx}
                        href="/[author]/posts/[tag]"
                        as={`/@${props.author}/posts/${item.name}`}
                        scroll={false}>
                        <li>
                            <a
                                className={classNames(
                                    'ns',
                                    'shallow-dark',
                                    cn({ active: props.active === item.name })
                                )}>
                                {item.name} ({item.count})
                            </a>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}