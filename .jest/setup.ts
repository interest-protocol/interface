import '@testing-library/jest-dom';
import ReactModal from 'react-modal';

jest.spyOn(ReactModal, 'setAppElement').mockImplementation(() => {});
