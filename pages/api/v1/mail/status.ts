import { pingChimpy } from '../../../../api/mail';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const status = async (): Promise<void> => await pingChimpy();

export default status;
