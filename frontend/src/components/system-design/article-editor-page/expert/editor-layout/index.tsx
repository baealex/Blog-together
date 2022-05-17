import {
    useEffect, useState
} from 'react';

import {
    CheckBox,
    Loading,
    Modal
} from '@design-system';

import {
    InputForm,
    SelectForm
} from '../../shared/forms';
import { EditorContent } from '../editor-content';
import { EditorTitle } from '../../shared/editor-title';

import * as API from '@modules/api';

import { modalStore } from '@stores/modal';

interface Props {
    title: {
        value: string;
        onChange: (value: string) => void;
    },
    content: {
        value: string;
        onChange: (value: string) => void;
    }
    series: {
        value: string;
        onChange: (value: string) => void;
    }
    tags: {
        value: string;
        onChange: (value: string) => void;
    }
    image: {
        onChange: (image: File) => void;
    }
    publish: {
        title: string;
        buttonText: string;
    }
    isHide: {
        value: boolean;
        onChange: (value: boolean) => void;
    }
    isAd: {
        value: boolean;
        onChange: (value: boolean) => void;
    }
    onSubmit: (onFail: () => void) => void;
    addon?: {
        sideButton: JSX.Element | JSX.Element[];
        modal: JSX.Element | JSX.Element[];
    }
}

export function EditorLayout(props: Props) {
    const [ isSubmit, setIsSubmit ] = useState(false);

    const [ series, setSeries ] = useState<API.GetSettingSeriesDataSeries[]>();

    const [ isOpenPublishModal, setIsOpenPublishModal ] = useState(modalStore.state.isPublishModalOpen);

    useEffect(modalStore.syncValue('isPublishModalOpen', setIsOpenPublishModal), []);

    useEffect(() => {
        API.getSettingSeries().then((response) => {
            const { data } = response;
            setSeries(data.body.series);
        });

        const handleDropEvent = (e: DragEvent) => {
            e.preventDefault();
        };

        document.body.addEventListener('dragover', handleDropEvent);
        document.body.addEventListener('drop', handleDropEvent);

        return () => {
            document.body.removeEventListener('dragover', handleDropEvent);
            document.body.removeEventListener('drop', handleDropEvent);
        };
    }, []);

    const handleSubmit = async () => {
        modalStore.onCloseModal('isPublishModalOpen');
        setIsSubmit(true);
        await props.onSubmit(() => {
            setIsSubmit(false);
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <EditorTitle
                        value={props.title.value}
                        onChange={props.title.onChange}
                        onChangeImage={props.image.onChange}
                    />
                </div>
            </div>
            <EditorContent
                value={props.content.value}
                onChange={props.content.onChange}
                addon={props.addon}
            />
            <Modal
                title={props.publish.title}
                isOpen={isOpenPublishModal}
                onClose={() => modalStore.onCloseModal('isPublishModalOpen')}
                submitText={props.publish.buttonText}
                onSubmit={() => handleSubmit()}>
                <SelectForm
                    name="series"
                    title="시리즈"
                    onChange={(e) => props.series.onChange(e.target.value)}>
                    <>
                        <option value="">선택하지 않음</option>
                        {series?.map((item, idx) => (
                            <option
                                key={idx}
                                value={item.url}
                                selected={props.series.value == item.url ? true : false}>
                                {item.title}
                            </option>
                        ))}
                    </>
                </SelectForm>
                <InputForm
                    title="키워드"
                    type="text"
                    name="tags"
                    maxLength={50}
                    value={props.tags.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.tags.onChange(e.target.value)}
                    placeholder="띄어쓰기 혹은 반점으로 구분하세요."
                />
                <CheckBox
                    label="포스트를 숨깁니다."
                    defaultChecked={props.isHide.value}
                    onClick={(value: boolean) => props.isHide.onChange(value)}
                />
                <CheckBox
                    label="포스트에 광고가 있습니다."
                    defaultChecked={props.isAd.value}
                    onClick={(value: boolean) => props.isAd.onChange(value)}
                />
            </Modal>

            {props.addon?.modal}

            {isSubmit ? <Loading block/> : ''}
        </div>
    );
}