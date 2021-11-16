import React from 'react';
import { mount } from 'enzyme';
import { FieldSize } from './FieldSize';

describe('FieldSize', () => {
    it('calls setSmall() callback when #btSmall is clicked', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(
            <FieldSize setSmall={mockCallBack} setMedium={() => {}} setLarge={() => {}} />
        );
        wrapper.find('#btSmall').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setMedium() callback when #btMedium is clicked', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(
            <FieldSize setSmall={() => {}} setMedium={mockCallBack} setLarge={() => {}} />
        );
        wrapper.find('#btMedium').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls setLarge() callback when #btLarge is clicked', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(
            <FieldSize setSmall={() => {}} setMedium={() => {}} setLarge={mockCallBack} />
        );
        wrapper.find('#btLarge').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
