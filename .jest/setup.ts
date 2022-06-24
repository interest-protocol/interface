import '@testing-library/jest-dom';
import 'jest-styled-components';
import ReactModal from 'react-modal';

jest.spyOn(ReactModal, 'setAppElement').mockImplementation(() => {});
