import type { Meta, StoryObj } from '@storybook/react';
import { Layout, LayoutProps } from './Layout';
import React from 'react';
import { bigText } from 'src/constants/bigText';
import Modal from 'src/shared/Modal/Modal';
import BtToBacket from 'src/shared/BtToBacket/BtToBasket';
import { middleText } from 'src/constants/middleText';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import { shortText } from 'src/constants/shortText';
import DetailedProductCard from 'src/shared/DetailedProductCard/DetailedProductCard';
import CartItem from 'src/shared/CartItem/CartItem';
import { I18nProvider } from 'src/shared/I18nContext/I18nContext';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IAppController } from 'src/app/AppController.types';

const meta: Meta<typeof Layout> = {
    title: 'shared/Layout',
    component: Layout,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LayoutWithScroll: Story = {
    args: {
        children: (
            <>
                <ProductCard
                    image=""
                    count={0}
                    price={1999}
                    name={shortText}
                    description={middleText}
                    detailedDescription={bigText}
                />
                <div style={{ clear: 'both' }} />
                <BtToBacket count={0} />
                <BtToBacket count={1} />
                <p>{middleText}</p>
                <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} />
                <div style={{ clear: 'both' }} />
                <DetailedProductCard image="cat.jpg" count={0} price={1999} name={shortText} category="Cats">
                    {bigText}
                </DetailedProductCard>
                <div style={{ clear: 'both' }} />
                <CartItem image="" count={1} price={1999} name={shortText} />
                <CartItem image="cat.jpg" count={2} price={1999} name={shortText} />

                {bigText}
                {bigText}
            </>
        )
    },
    render: (args: LayoutProps) => {
        const ctrl = castPartialTo<IAppController>({});
        return (
            <I18nProvider>
                <Layout ctrl={ctrl}>{args.children}</Layout>
            </I18nProvider>
        );
    }
};

export const LayoutWithScrollAndModal: Story = {
    args: {
        children: (
            <>
                {bigText}
                {bigText}
                {bigText}
                <Modal visible={true} handleBtCloseClick={() => null}>
                    <h2>Modal window caption</h2>
                    <p>Modal window text</p>
                </Modal>
            </>
        )
    },
    render: (args: LayoutProps) => {
        const ctrl = castPartialTo<IAppController>({});
        return (
            <I18nProvider>
                <Layout ctrl={ctrl}>{args.children}</Layout>
            </I18nProvider>
        );
    }
};
