import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import serializer from '@emotion/jest';
import '@testing-library/jest-dom';

require('jest-fetch-mock').enableMocks();

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
