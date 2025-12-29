import type { Meta, StoryObj } from '@storybook/react';
import { Layout, LayoutProps } from './Layout';
import React from 'react';
import { bigText } from 'src/constants/bigText';
import Modal from 'src/shared/Modal/Modal';
import { ThemeProvider } from 'src/shared/ThemeContext/ThemeContext';
import BtToBacket from 'src/shared/BtToBacket/BtToBasket';
import { middleText } from 'src/constants/middleText';
import ProductCard from 'src/shared/ProductCard/ProductCard';
import { shortText } from 'src/constants/shortText';
import DetailedProductCard from 'src/shared/DetailedProductCard/DetailedProductCard';
import CartItem from 'src/shared/CartItem/CartItem';

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
                <BtToBacket count={0} />
                <BtToBacket count={1} />
                <p>{middleText}</p>
                <ProductCard image="" count={0} price={1999} name={shortText} description={middleText} />
                <ProductCard image="cat.jpg" count={0} price={1999} name={shortText} description={middleText} />
                <DetailedProductCard image="cat.jpg" count={0} price={1999} name={shortText} category="Cats">
                    {bigText}
                </DetailedProductCard>
                <CartItem image="" count={1} price={1999} name={shortText} />
                <CartItem image="cat.jpg" count={2} price={1999} name={shortText} />

                {bigText}
                {bigText}
            </>
        )
    },
    render: (args: LayoutProps) => {
        return (
            <ThemeProvider>
                <Layout>{args.children}</Layout>
            </ThemeProvider>
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
                <Modal visible={true}>
                    <h2>Modal window caption</h2>
                    <p>Modal window text</p>
                </Modal>
            </>
        )
    },
    render: (args: LayoutProps) => {
        return (
            <ThemeProvider>
                <Layout>{args.children}</Layout>
            </ThemeProvider>
        );
    }
};
