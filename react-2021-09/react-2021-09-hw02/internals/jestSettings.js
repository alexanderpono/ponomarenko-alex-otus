import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import serializer from '@emotion/jest';

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
