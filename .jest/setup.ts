import '@testing-library/jest-dom';
import ReactModal from 'react-modal';
import { jest } from '@jest/globals';

jest.spyOn(ReactModal, 'setAppElement').mockImplementation(() => {});
